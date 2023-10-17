import Footer from '@/components/ui/Footer';
import Header from "@/components/ui/Header";


export default function PageLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
        <>
            <Header className={"bg-cyan-1 dark:bg-mask-black"}/>
            <main className="grow bg-custom-white dark:bg-mask-black pt-[70px] lg:pt-[104px]">
                {children}
            </main>
            <Footer/>
        </>
    )
}
