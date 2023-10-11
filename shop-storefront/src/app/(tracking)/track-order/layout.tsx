export default function PageLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
        <>

            <main className="grow bg-cyan-1">
                {children}
            </main>

        </>
    )
}
