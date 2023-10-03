import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  return (
    <div className="bg-amber-100 px-8 py-24 flex flex-col justify-center items-center text-center">
        <div className="mb-8"></div>
      <h1 className="text-2xl-semi text-gray-900">Your shopping bag is empty</h1>
      <p className="text-base-regular mt-vw-5 mb-vw-4 max-w-[32rem] text-gray-800">
        You don&apos;t have anything in your bag. Let&apos;s change that, use
        the link below to start browsing our products.
      </p>
      <div>
        <UnderlineLink href="/store">Explore products</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
