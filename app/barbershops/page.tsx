import { db } from "../_lib/prisma"
import BarbershopItem from "../components/barbershop-item"
import Header from "../components/header"
import Search from "../components/search"

interface BarbershopPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}
const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barberShops = await db.barberShop.findMany({
    where: {
      ...(searchParams?.title
        ? {
            name: {
              contains: searchParams.title,
              mode: "insensitive",
            },
          }
        : {}),
      ...(searchParams?.service
        ? {
            services: {
              some: {
                name: {
                  contains: searchParams.service,
                  mode: "insensitive",
                },
              },
            },
          }
        : {}),
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <p className="mb-3 text-xs font-bold text-gray-400">
          Resultados para {searchParams.title || searchParams.service}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {barberShops.map((barberShop) => (
            <BarbershopItem key={barberShop.id} barbershop={barberShop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
