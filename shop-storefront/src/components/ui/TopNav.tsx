import Link from 'next/link';
import CountrySelectFlag from "@modules/layout/components/country-select/CountrySelectFlag";

const TopNav = () => {
    return (
        <>
            <ul className="hidden p-0 m-0  leading-5 text-black lg:flex lg:h-8 lg:flex-row  lg:items-center lg:justify-end mx-24">
                <li  className="flex relative items-center mr-2 leading-5 text-left">
                    <CountrySelectFlag/>
                </li>
                <li className="flex relative items-center py-0 px-2 h-full leading-5 text-left">
                    <Link href="/faq"
                          className="text-xs font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        Help
                    </Link>
                </li>
                <li className="flex relative items-center py-0 px-2 h-full leading-5 text-left">
                    <Link href="/trackorder"
                          className="text-xs font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        Track order
                    </Link>
                </li>
                <li className="flex relative items-center py-0 px-2 h-full leading-5 text-left">
                    <Link href="/membership"
                          className="text-xs font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        Become a member
                    </Link>
                </li>

                <li className="flex relative items-center py-0 px-2 h-full leading-5 text-left">
                    <Link href="/account"
                          className="text-xs font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        My account
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default TopNav;


// TopNavMobile

export const TopNavMobile = () => {
    return (
        <ul className="flex p-0 m-0 gap-6 flex-col leading-5 text-black ">
            <li className="flex relative items-center  py-0 px-2 h-full leading-5 text-left">
                <Link href="/faq" className="text-lg w-full font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        Help
                </Link>
            </li>
            <li className="flex relative items-center py-0 px-2 h-full leading-5 text-left">
                <Link href="/trackorder" className="text-lg w-full font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        Track order
                </Link>
            </li>
            <li className="flex relative items-center py-0 px-2 h-full leading-5 text-left">
                <Link href="/membership" className="text-lg w-full font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        Become a member
                </Link>
            </li>

            <li className="flex relative items-center py-0 px-2 h-full leading-5 text-left">
                <Link href="/account" className="text-lg w-full font-normal leading-4 cursor-pointer text-slate-12 hover:text-blue-500">
                        My account
                </Link>
            </li>
        </ul>
    );
}

