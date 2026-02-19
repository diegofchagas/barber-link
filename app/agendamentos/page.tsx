import Header from "../components/header"
import BookingItem from "../components/booking-item"
import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { isFuture, isPast } from "date-fns"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"


const Appointments = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }
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
  const finishedBookings = bookings.filter((booking) => isPast(new Date(booking.date)))

  return (
    <div>
      <Header />
      <div className="p-5">
        <strong>Agendamentos</strong>

        {confirmedBookings.length > 0 && (
          <div className="mt-4">
            <strong className="text-xs text-gray-500">CONFIRMADOS</strong>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {finishedBookings.length > 0 && (
          <div className="flex flex-col gap-3 mt-4">
            <strong className="text-xs text-gray-500">FINALIZADOS</strong>
            {finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {/* Caso não tenha nenhum agendamento */}
        {bookings.length === 0 && (
            <p className="text-gray-400 text-sm">Você não possui agendamentos.</p>
        )}
      </div>
    </div>
  )
}

export default Appointments
