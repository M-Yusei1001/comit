import { redirect } from "next/navigation"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  return (
    <form
      action={async() => {
        "use server";
        try{
          await signIn("google");
        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`/`);
          }
          throw error;
        }
      }}
    >
      <button type="submit" className="btn btn-primary">
        Signin with Google
      </button>
    </form>
  )
}