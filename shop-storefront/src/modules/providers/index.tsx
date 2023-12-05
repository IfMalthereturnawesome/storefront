"use client"

import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { MedusaProvider, CartProvider } from "medusa-react"
import React, {Suspense} from "react";
import Image from "next/image";
import Link from "next/link";


export default function Providers({ children }: { children: React.ReactNode }) {

  function Fallback() {
    return (
        <div className="flex items-center justify-center h-screen ">


          <div className="flex  items-center  justify-center lg:justify-start">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-8">
            </div>
          </div>
        </div>
    )
  }
  return (

    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <CartDropdownProvider>
        <MobileMenuProvider>
          <CartProvider>
            <Suspense fallback={<Fallback/>}>
            <StoreProvider>

              <AccountProvider>{children}</AccountProvider>
            </StoreProvider>
            </Suspense>
          </CartProvider>
        </MobileMenuProvider>
      </CartDropdownProvider>
    </MedusaProvider>
  )
}
