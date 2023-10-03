import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className=" flex items-start justify-between mb-vw-5">
      <div>
        <h2 className="text-xl-semi text-slate-12">Already have an account?</h2>
        <p className="text-base-regular text-slate-11 mt-2">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <Button myVariant="secondary" className={"text-slate-12 dark:hover:text-slate-1 "}>Sign in</Button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
