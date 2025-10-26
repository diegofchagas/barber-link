import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import SidebarItem from "./sidebar-item"
import Link from "next/link"

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Barber Link Logo"
              width={120}
              height={18}
            />
          </Link>

          <SidebarItem />
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
