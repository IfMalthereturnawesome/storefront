"use client"

import { useAccount } from "@lib/context/account-context"
import UnderlineLink from "@modules/common/components/underline-link"
import Spinner from "@modules/common/icons/spinner"
import React, { useEffect } from "react"
import AccountNav from "../components/account-nav"

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const { customer, retrievingCustomer, checkSession } = useAccount()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (retrievingCustomer || !customer) {
    return (
      <div className="flex items-center justify-center w-full min-h-[640px] h-full text-slate-12">
        <Spinner size={36} />
      </div>
    )
  }

  return (
    <div className="flex-1 small:py-12 small:bg-cyan-1">
      <div className="flex-1 h-full max-w-5xl mx-auto bg-cyan-1 flex flex-col">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] small:px-8 py-6 small:py-12 ">
          <div>
            <AccountNav />
          </div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-slate-5 px-8 py-12 gap-x-8">
          <div>
            <h3 className="text-xl-semi mb-4">Got questions?</h3>
            <span className="text-small-regular">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/contact" className={"text-slate-12"}>
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
