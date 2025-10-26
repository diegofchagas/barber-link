import Header from "./components/header"
import { Button } from "./components/ui/button"
import Image from "next/image"
import BarbershopItem from "./components/barbershop-item"
import { db } from "./_lib/prisma"
import Footer from "./components/footer"
import { searchForServices } from "./_constants/search-for-services"
import BookingItem from "./components/booking-item"
import Search from "./components/search"
import Link from "next/link"

export default async function Home() {
  const barberShops = await db.barberShop.findMany({})
  const popularBarberShops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })
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

        {/* Agendamentos */}

        <BookingItem />

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

      <Footer />
    </div>
  )
}
