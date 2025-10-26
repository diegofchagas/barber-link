"use client"
import { Smartphone } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("número copiado!")
  }
  return (
    <div key={phone} className="flex justify-between gap-2">
      <div className="flex items-center gap-2">
        <Smartphone /> <p className="text-sm">{phone}</p>
      </div>
      <Button
        onClick={() => handleCopyPhoneClick(phone)}
        variant="outline"
        size="sm"
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
