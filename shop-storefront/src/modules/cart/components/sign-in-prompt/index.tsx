import Button from "@modules/common/components/button"
import Link from "next/link"
import SecondaryButton from "@modules/common/components/button/SecondaryButton";

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
          <SecondaryButton variant="secondary" className={"!min-h-[0] h-[46px] w-[80px] custom-button-neo__dark-black rounded-none"}>Sign in</SecondaryButton>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
