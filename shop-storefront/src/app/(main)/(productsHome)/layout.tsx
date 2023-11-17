import Footer from '@/components/ui/Footer';
import Header from "@/components/ui/Header";


export default function PageLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
        <div className="flex flex-col min-h-screen">
            <Header className="flex-shrink-0 bg-cyan-1 dark:bg-mask-black" />
            <main className="flex-grow bg-custom-white dark:bg-mask-black mt-[66px] lg:mt-[116px]">
                {children}
            </main>
            <Footer  />
        </div>
    );
}