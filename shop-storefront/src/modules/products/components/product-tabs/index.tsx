import { Tab } from "@headlessui/react"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { useMemo } from "react"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      {
        label: "Shipping & Returns",
        component: <ShippingInfoTab />,
      },
      {
        label: "Product Information",
        component: <ProductInfoTab product={product} />,
      }

    ]
  }, [product])
  return (
      <div className="max-w-8xl my-2 border rounded-xl border-slate-11 h-full py-6 px-5 mx-auto bg-white dark:bg-cyan-2">
        <Tab.Group>
          <Tab.List className="flex divide-x">
            {tabs.map((tab, i) => (
                <Tab
                    key={i}
                    className={({ selected }) =>
                        `flex-1 text-center  text-sm py-2 
                 ${selected ? 'border-b-2 border-gray-600 dark:border-gray-200' : 'border-b-2 border-transparent'}`
                    }
                >
                  {tab.label}
                </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab, j) => {
              return <div key={j}>{tab.component}</div>
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
  );
};
const ProductInfoTab = ({ product }) => {
  return (
      <Tab.Panel className="py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material || "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of Origin</span>
            <p>{product.origin_country || "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Washing Instructions</span>
            {/* Check if metadata is an object and has the washing property */}
            <p>{"Hand Wash"}</p>
          </div>

          <div>

            <span className="font-semibold">Shipping Information</span>
            <p>Weight: {product.weight ? `${product.weight} g` : "-"} Size: {product.length && product.width && product.height ? `${product.length}L x ${product.width}W x ${product.height}H` : "-"}</p>
          </div>

        </div>
        {product.tags?.length ? (
            <div>
              <span className="font-semibold">Tags</span>
              {/* Render tags */}
            </div>
        ) : null}
      </Tab.Panel>
  )
}


const ShippingInfoTab = () => {
  return (
      <Tab.Panel className="py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {/* Free Shipping Info */}
          <div className="flex items-start gap-x-2">
            <div>
              <span className="font-semibold">Free Shipping in EU</span>
              <p>We offer free shipping on all orders within the EU.</p>
            </div>
          </div>

          {/* Fast Delivery Info */}
          <div className="flex items-start gap-x-2">

            <div>
              <span className="font-semibold">Fast delivery</span>
              <p>
                Your package will arrive in 1-5 business days.
              </p>
            </div>
          </div>

          {/* Simple Exchanges Info */}
          <div className="flex items-start gap-x-2">

            <div>
              <span className="font-semibold">Simple exchanges</span>
              <p>
                Is the fit not quite right? No worries - we&apos;ll exchange your
                product for a new one.
              </p>
            </div>
          </div>

          {/* Easy Returns Info */}
          <div className="flex items-start gap-x-2">

            <div>
              <span className="font-semibold">Easy returns</span>
              <p>
                Just return your product and we&apos;ll refund your money. No
                questions asked.
              </p>
            </div>
          </div>
        </div>
      </Tab.Panel>
  );
};
export default ProductTabs
