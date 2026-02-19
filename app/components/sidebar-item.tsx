"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import React from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { searchForServices } from "../_constants/search-for-services"
import { Calendar, CalendarIcon, HomeIcon, LogInIcon, LogOut, MenuIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SignInDialog from "./sign-in-dialog"

const SidebarItem = () => {
  const { data } = useSession()
  console.log(data?.user)
  
  const handleLogoutWithGoogle = () => signOut()

  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {/* login */}
        <div className="flex items-center justify-between gap-2 border-b border-solid p-4">
          {!data?.user ? (
            <>
              <h2 className="font-bold">Olá, faça seu login</h2>
              <Dialog>
                <DialogTrigger>
                  {" "}
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] max-w-md">
                  <SignInDialog />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image ?? ""}
                  alt={data?.user?.name ?? ""}
                />
              </Avatar>
              <div className="flex flex-col">
                <strong className="">{data?.user?.name}</strong>
                <span className="text-xs">{data?.user?.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
          <div className="border-b border-solid pb-4">
            <Button
              className={`flex w-full items-center justify-start gap-2 ${pathname === "/" ? "bg-primary" : ""} `}
              variant="ghost"
            >
              <HomeIcon size={18} />
              <Link href="/">Inicio</Link>
            </Button>
            <Button
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${pathname === "/agendamentos" ? "bg-primary" : ""}`}
            >
              <CalendarIcon size={18} />
              <Link href="/agendamentos">
                Agendamentos
              </Link>
            </Button>
          </div>

          {/* servicos */}
          <div className="flex flex-col gap-2 border-b border-solid py-3">
            {searchForServices.map((option) => (
              <SheetClose asChild key={option.title}>
                <Button
                  key={option.title}
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2"
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      alt={option.title}
                      width={16}
                      height={16}
                    />

                    {option.title}
                  </Link>
                </Button>
              </SheetClose>
            ))}
          </div>
          {/* Footer */}
          {data?.user && (
            <div>
              <SheetClose asChild>
                <Button variant="ghost" onClick={handleLogoutWithGoogle}>
                  <LogOut />
                  Sair da conta
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarItem
