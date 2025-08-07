import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <Image
            src="/logo.svg"
            alt="Barber Link Logo"
            width={120}
            height={18}
          />
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
