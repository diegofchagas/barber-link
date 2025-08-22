import { Card, CardContent } from "@/components/ui/card"
import { BarberShop } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: BarberShop
}

export default function BarbershopItem({ barbershop }: BarbershopItemProps) {
  return (
    <>
      <Card className="mt-6 min-w-[159px]">
        <CardContent className="p-0">
          <div className="relative h-[159px] w-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="rounded-2xl object-cover p-1"
            />
          </div>
          <div className="px-2 py-3">
            <h3 className="truncate font-semibold">{barbershop.name}</h3>
            <p className="truncate text-xs text-gray-400">
              {barbershop.address}
            </p>
            <Button asChild variant="secondary" className="mt-3 w-full">
              <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
