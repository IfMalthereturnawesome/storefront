import React, { ReactNode } from 'react';

type ContainerProps = {
    children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-6 2xs:py-6 xs:py-8  sm:py-10 lg:py-12 2xl:py-14 3xl:py-16">
                {children}
            </div>
        </section>
    );
};

export default Container;
