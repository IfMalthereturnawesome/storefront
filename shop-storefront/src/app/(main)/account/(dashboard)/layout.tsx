import AccountLayout from "@modules/account/templates/account-layout"
import React from "react";

export default function AccountPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AccountLayout>{children}</AccountLayout>
}
