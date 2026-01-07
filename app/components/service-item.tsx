"use client"
import { Card, CardContent } from "@/components/ui/card"
import { BarberShop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { format } from "date-fns"


interface ServiceItemProps {
  service: BarbershopService
  barbershop: BarberShop['name']
}

const availableTimes = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const handleSelectDay = (day: Date | undefined) => {
    setSelectDay(day)
  }

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
  }

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

            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="secondary">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectDay}
                    onSelect={handleSelectDay}
                    styles={{
                      weekday: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      day: { width: "100%" },
                      button: { width: "100%" },
                      button_next: { width: "32px", height: "32px" },
                      button_previous: { width: "32px", height: "32px" },
                      month_caption: { textTransform: "capitalize" },
                    }}
                  />
                </div>

                {selectDay && (
                  <div className="flex gap-3 overflow-x-auto border-b p-5 [&::-webkit-scrollbar]:hidden">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleSelectTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectDay && selectedTime && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="p-3 space-y-3">
                        <div className="flex justify-between items-center  mb-2">
                          <strong className="font-medium">{service.name}</strong>
                          <span className="text-sm font-medium">
                            {" "}
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Data</span>
                          <span className="text-sm">{format(selectDay, "d 'de' MMMM", { locale: ptBR })}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Horário</span>
                          <span className="text-sm">{selectedTime}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Barbearia</span>
                          <span className="text-sm">{barbershop}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="px-5">
                  <SheetClose>
                    <Button type="submit" className="w-full">Confirmar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
