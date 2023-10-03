import AccountLayout from "@modules/account/templates/account-layout"
import React from "react";

export default function AccountPageLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    return (
        <div className={"text-slate-11 prose-h3:text-slate-12  prose-h1:text-slate-1"}>
        <AccountLayout>{children}</AccountLayout>
        </div>
    )
}
