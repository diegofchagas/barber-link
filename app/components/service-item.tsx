"use client"
import { Card, CardContent } from "@/components/ui/card"
import { BarberShop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import {Sheet,SheetClose,SheetContent,SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import getBookings from "../_actions/get-bookings"



interface ServiceItemProps {
  service: BarbershopService
  barbershop: BarberShop["name"]
}

const availableTimes = [
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const getTimeList = (bookings: Booking[])=> {
  return availableTimes.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    if (bookings.some((b) => b.date.getHours() === hour && b.date.getMinutes() === minutes)) {
      return false
    }
    return true
  })
  
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  //const router = useRouter();

  const handleSelectDay = (day: Date | undefined) => {
    setSelectDay(day)
  }

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectDay || !selectedTime) {
        toast.error("Por favor, selecione uma data e horário.")
        return
      }
 
      const hour = Number(selectedTime?.split(":")[0])
      const minute = Number(selectedTime?.split(":")[1])
      const newDate = set(selectDay, { minutes: minute, hours: hour })

      await createBooking({
        userId: (data?.user as any).id, // Replace with actual user ID
        serviceId: service.id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
      //router.push("/agendamentos")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva. Tente novamente.")
    }
  }

  async function handleAgendar() {
  await handleCreateBooking()
  setDialogOpen(true)
  }

  useEffect(() => {
    const fetch = async () => {
      if (!selectDay) return
      const bookings = await getBookings({ date: selectDay, serviceId: service.id })
          setDayBookings(bookings)
    }
    fetch()
  },[selectDay, service.id])

  console.log(dayBookings, ' days bookings')


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

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                    disabled={{ before: new Date() }}
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
                    {getTimeList(dayBookings).map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="cursor-pointer rounded-full"
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
                      <CardContent className="space-y-3 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <strong className="font-medium">
                            {service.name}
                          </strong>
                          <span className="text-sm font-medium">
                            {" "}
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </span>
                        </div>

                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-gray-500">Data</span>
                          <span className="text-sm">
                            {format(selectDay, "d 'de' MMMM", { locale: ptBR })}
                          </span>
                        </div>

                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-gray-500">Horário</span>
                          <span className="text-sm">{selectedTime}</span>
                        </div>

                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Barbearia
                          </span>
                          <span className="text-sm">{barbershop}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="px-5">
                  <SheetClose asChild>
                    <Button
                      disabled={!selectDay || !selectedTime}
                      className="w-full cursor-pointer"
                      onClick={async () => {
                        await handleAgendar()
                        setSheetOpen(false)
                        setTimeout(() => {
                          setDialogOpen(true)
                        }, 150)
                      }}
                    >
                      Agendar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className={`${dialogOpen ? "block" : "hidden"}`}>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    disabled={!selectDay || !selectedTime}
                    className="w-full cursor-pointer"
                  >
                    Agendar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xs sm:max-w-md">
                  <DialogHeader className="flex items-center">
                    <Image
                      src="/check-circle-2.svg"
                      alt="confirmação"
                      width={72}
                      height={72}
                    />
                    <DialogTitle className="text-base">
                      Reserva Efetuada!
                    </DialogTitle>
                    <DialogDescription>
                      Sua reserva foi agendada com sucesso.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={async () => await handleCreateBooking()}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
