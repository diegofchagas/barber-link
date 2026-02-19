"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"


interface CreateBookingParams {
  //userId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if(!user) {
    throw new Error("User não autenticado")
  }
  //faço isso para ver se o usuario nao tem id diferente do logado
  await db.booking.create({
    data: {...params, userId: (user.user as any).id },
  })

  revalidatePath("/barbershops/[id]")
}