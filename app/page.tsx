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
import { authOptions } from "./api/auth/[...nextauth]/route"
import { isFuture } from "date-fns"

export default async function Home() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return <p>Você precisa estar logado</p>
    }
  const barberShops = await db.barberShop.findMany({})
  const popularBarberShops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })

    const bookings = await db.booking.findMany({
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
    })
  
   const confirmedBookings = bookings.filter((booking) => {return isFuture(new Date(booking.date))} )
  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Diego</h2>
        <p>Sexta, 2 de Fevereiro</p>

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

       <p className="font-bold text-xs mt-4 text-gray-500">AGENDAMENTOS</p>

        {/* tenho que buscar do banco de dados os angedamentos */}
    {confirmedBookings.length > 0 && (
          <div className="mt-4">
            <strong className="text-xs text-gray-500">CONFIRMADOS</strong>
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
