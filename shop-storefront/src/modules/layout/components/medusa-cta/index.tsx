import Image from 'next/image'
import Link from 'next/link'

const MedusaCTA = () => {
  return (
    <div className="py-4 flex justify-center items-center w-full">
      <div className="content-container flex justify-center flex-1">
        <a href="https://stripe.com" target="_blank" rel="noreferrer">
          <PoweredBy />
        </a>
      </div>
    </div>
  )
}

const PoweredBy = () => {
  return (
      <Image src={"/images/powered-by-stripe.svg"} width={125} height={125} alt={"Powered by Stripe"}/>
  )
}

export default MedusaCTA
