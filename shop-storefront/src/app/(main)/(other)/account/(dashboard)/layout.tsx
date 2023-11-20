import AccountLayout from "@modules/account/templates/account-layout"
import React from "react";

export default function AccountPageLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    return (
        <div className={"text-slate-11 prose prose-slate prose-h3:text-slate-12 px-6 small:px-0 prose-h1:text-slate-12 prose-h2:text-slate-12"}>
        <AccountLayout>{children}</AccountLayout>
        </div>
    )
}
