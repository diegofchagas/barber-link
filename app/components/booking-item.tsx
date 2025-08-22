import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import React from "react"

// interface BookingItemProps {
//   service: string
//   barberShop: string
//   date: string
//   time: string
// }

// Receber agendamento como prop

const BookingItem = () => {
  return (
    <>
      <p>Agendamentos</p>

      <Card className="mt-6">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge>Confirmado</Badge>
            <p className="font-bold">Corte Cabelo</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png" />
              </Avatar>
              <p className="text-sm">Barbearia Chagas</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">07</p>
            <p className="text-sm">10:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
