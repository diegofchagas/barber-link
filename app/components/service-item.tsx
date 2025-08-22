import { Card, CardContent } from "@/components/ui/card"
import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="mt-6">
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
          <Image
            className="rounded-lg object-cover"
            width={150}
            height={150}
            src={service.imageUrl}
            alt={service.name}
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">{service.name}</h2>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-primary text-sm font-semibold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </span>
            <Button size="sm" variant="secondary">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
