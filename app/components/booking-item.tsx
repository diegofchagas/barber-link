import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import React from "react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barberShop: true
        }
      }
    }
  }>
}
// Receber agendamento como prop

const BookingItem = ({ booking }: BookingItemProps) => {

if (!booking) return null;

  const isConfirmed = isFuture(new Date(booking.date))
  
  return (
    <>
      {/* <p>Agendamentos</p> */}

      <Card className="mt-2">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge variant={isConfirmed ? 'default' : 'outline'}>{ isConfirmed ? 'Confirmado': 'Finalizado'}</Badge>
            <p className="font-bold">{booking.service.name}</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png" />
              </Avatar>
              <p className="text-sm">{booking.service.barberShop.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</p>
              <p className="text-2xl ">{format(booking.date, "d", { locale: ptBR })}</p>
            <p className="text-sm">{format(booking.date, "HH:mm")}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
