import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Button from "@modules/common/components/button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import {ShoppingBagIcon} from '@heroicons/react/24/outline';
import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import { Fragment } from "react"
import {getLocaleForRegion} from "@/utils/hooks/localeUtils";

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()
  const locale = getLocaleForRegion(cart?.region?.name) || "en-US";

  return (
    <div className="h-full pl-3 z-50 flex lg:w-1/6 justify-center items-center" onMouseEnter={open} onMouseLeave={close}>
      <Popover className="relative h-full ">
        <Popover.Button className="h-full">
          <div className="relative inline-flex pt-1 ">
            {/* Shopping bag icon */}
            <Link href="/cart">
              <ShoppingBagIcon className="h-5 w-5 xl:h-6 xl:w-6 stroke-mask-black dark:stroke-custom-white " />
            </Link>

            {/* Item count */}
            {totalItems > 0 && (
                <div
                    className="absolute top-[3px] right-0  transform translate-x-1/2 -translate-y-1/2 bg-blue-10 dark:bg-[#297DB5] rounded-full text-white  h-5 w-5 flex items-center justify-center"
                >
                  <span className={"text-slate-1 dark:text-slate-12 text-xs font-bold "}>{totalItems}</span>
                </div>
            )}
          </div>
        </Popover.Button>
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] -right-5 bg-cyan-1 border-x border-b border-slate-5 w-[410px] text-slate-12"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi text-slate-12">Shopping Bag</h3>
            </div>
            {cart && items?.length ? (
              <>
                <div className=" max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                  {items
                      .sort((a, b) => {
                        return a.created_at > b.created_at ? -1 : 1
                      })
                      .map((item) => {
                        const productHandle = item.title.replace(/\s+/g, '-').toLowerCase();  // Create handle from title
                        return (
                            <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
                              <div className="w-[122px]">
                                <Thumbnail productHandle={productHandle} size="full" />  {/* Updated line */}
                              </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[130px]">
                                  <Link
                                    href={`/products/${item.variant.product.handle}`}
                                    legacyBehavior
                                  >
                                    {item.title}
                                  </Link>
                                </h3>
                                <LineItemOptions variant={item.variant} />
                                <span>Quantity: {item.quantity}</span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  region={cart.region}
                                  item={item}
                                  style="tight"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-end justify-between text-small-regular flex-1">
                            <div>
                              <button
                                className="flex items-center gap-x-1 text-slate-10"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                        )
                        })}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-11 font-semibold">
                      Subtotal{" "}
                      <span className="font-normal">(incl. taxes)</span>
                    </span>
                    <span className="text-large-semi">
                      {formatAmount({
                        amount: cart.subtotal || 0,
                        region: cart.region,

                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,

                      })}
                    </span>
                  </div>
                  <Link href="/cart" passHref>
                    <Button>Go to bag</Button>
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-cyan-1 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-slate-12">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <Link href="/store">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
