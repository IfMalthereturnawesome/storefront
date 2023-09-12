import Sidebar from '@/components/resources/sidebar';

import AppProvider from '../../app-provider';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type ResourcesLayoutProps = {
  children: React.ReactNode;
};

export default function ResourcesLayout({children}: ResourcesLayoutProps) {
  return (
    <>
      <AppProvider>
        <div className="flex min-h-screen flex-col overflow-hidden bg-cyan-1">
          {/*  Page content */}
          <main className="grow">
            <section className="relative">
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Main content */}
                <div>
                  {/* Sidebar */}
                  <Sidebar />

                  {/* Page container */}
                  <div className="2xl:grow 2xl:pl-64 2xl:pr-0 ">
                    <div className=" pb-8 pt-5 xl:pl-6 xl:pt-28 2xl:pl-12">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </AppProvider>
    </>
  );
}
