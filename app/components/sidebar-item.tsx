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
import { LogInIcon, LogOut, MenuIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

const SidebarItem = () => {
  const { data } = useSession()
  console.log(data?.user)
  const handleLoginWithGoogle = () => signIn("google")
  const handleLogoutWithGoogle = () => signOut()

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
                  <DialogHeader>
                    <DialogTitle>Faça login na plataforma</DialogTitle>
                    <DialogDescription>
                      Conecte-se usando sua conta do Google
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    onClick={handleLoginWithGoogle}
                    variant="outline"
                    className="gap-2 font-bold"
                  >
                    <Image
                      src="/google.svg"
                      alt="fazer login com google"
                      width={18}
                      height={18}
                    />
                    Google
                  </Button>
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
              className="bg-primary flex w-full items-center justify-start gap-2"
              variant="ghost"
            >
              <Image
                className="text-left"
                src="/home.svg"
                alt="home"
                width={16}
                height={16}
              />{" "}
              Inicio
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2"
            >
              <Image
                src="/calendar.svg"
                alt="agendamento"
                width={16}
                height={16}
              />{" "}
              Agendamento
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
          <div>
            <SheetClose asChild>
              <Button variant="ghost" onClick={handleLogoutWithGoogle}>
                <LogOut />
                Sair da conta
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarItem
