import { Card, CardContent } from "@/components/ui/card"
import React from "react"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-gray-400">
            © 2023 Copyright <strong>FSW Barber</strong>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
