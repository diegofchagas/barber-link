"use server"
import { db } from "../_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookinhsProps {
  serviceId: string;
  date: Date
}

const getBookings = ({date}: GetBookinhsProps) => {
  return db.booking .findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      }
    }
  })
}

export default getBookings;