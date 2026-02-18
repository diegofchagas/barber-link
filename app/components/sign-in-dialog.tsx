import { Button } from "@/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { signIn } from "next-auth/react"
import Image from "next/image"

const SignInDialog = () => {

  const handleLoginWithGoogle = () => signIn("google")
  return (
    <>
      {" "}
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
    </>
  )
}

export default SignInDialog
