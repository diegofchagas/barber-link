import Header from "./components/header"
import { Button } from "./components/ui/button"
import Image from "next/image"
import BarbershopItem from "./components/barbershop-item"
import { db } from "./_lib/prisma"
import { searchForServices } from "./_constants/search-for-services"
import BookingItem from "./components/booking-item"
import Search from "./components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { isFuture } from "date-fns"
import { authOptions } from "./_lib/auth"

export default async function Home() {
    const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return <p>Você precisa estar logado</p>
    // }
  const barberShops = await db.barberShop.findMany({})
  const popularBarberShops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })

    const bookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: {
        include: {
          barberShop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
    }) : []
  
  const confirmedBookings = bookings.filter((booking) => { return isFuture(new Date(booking.date)) })
  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {session?.user?.name}</h2>
        <p>{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex items-center gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {searchForServices.map((option) => (
            <Button
              key={option.title}
              variant="secondary"
              className="gap-2"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 mb-2 h-[150px] w-full">
          <Image
            src="/banner.svg"
            alt="banner-barber-link"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {confirmedBookings.length > 0 && (
            <div className="mt-4">
              <strong className="text-xs text-gray-500">AGENDAMENTOS</strong>
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
        )}

        {/* Barbearias */}
        <h2 className="mt-6">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((option) => (
            <BarbershopItem key={option.id} barbershop={option} />
          ))}
        </div>

        <h2>Populares</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((option) => (
            <BarbershopItem key={option.id} barbershop={option} />
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
