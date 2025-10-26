import { db } from "@/app/_lib/prisma"
import Footer from "@/app/components/footer"
import PhoneItem from "@/app/components/phone-item"
import ServiceItem from "@/app/components/service-item"
import { Button } from "@/app/components/ui/button"
import { ChevronLeftIcon, MapPin, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarberShopPageProps {
  params: Promise<{ id: string }>
}

const BarberShopPage = async ({ params }: BarberShopPageProps) => {
  // const {id} = await params;

  const barberShopId = await db.barberShop.findUnique({
    where: { id: (await params).id },
    include: { services: true },
  })

  if (!barberShopId) {
    return notFound()
  }
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barberShopId?.imageUrl}
          alt={barberShopId?.name}
          fill
          className="object-cover"
        />
        <Button
          asChild
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h2 className="mb-2 text-xl font-semibold">{barberShopId.name}</h2>
        <div className="flex items-center gap-1">
          <MapPin className="fill-primary stroke-black" size={18} />
          <p>{barberShopId.address}</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h3 className="text-xs font-semibold text-gray-400">SOBRE NÓS</h3>
        <p className="text-sm">{barberShopId.description}</p>
      </div>

      <div className="border-b border-solid p-5">
        <h3 className="text-xs font-semibold text-gray-400">SERVIÇOS</h3>
        {barberShopId.services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>

      {/* Contato */}
      <div className="space-y-3 p-5">
        <h3>Contato</h3>
        {barberShopId.phones.map((item) => (
          <PhoneItem key={item} phone={item} />
        ))}
      </div>

      <Footer />
    </div>
  )
}

export default BarberShopPage
