'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function MobileNavBar() {

    const pathname = usePathname()

    const links = [
        {
            name: 'Product Information',
            href: '/faq/product-information'
        },
        {
            name: 'Ordering & Payments',
            href: '/faq/ordering-payments'
        },
        {
            name: 'Shipping & Delivery',
            href: '/faq/shipping-delivery'
        },
        {
            name: 'Returns & Exchanges',
            href: '/faq/returns-exchanges'
        },
        {
            name: 'Contact & Support',
            href: '/faq/contact-support'
        },
        {
            name: 'Legal & Privacy',
            href: '/faq/legal'
        }
    ]

    return (
        <aside className="fixed bottom-0 left-1 right-1 bg-cyan-2 border-t border-slate-3 z-10">
            <nav>
                <ul className="flex justify-around items-center h-16">
                    {links.map((link, linkIndex) => (
                        <li key={linkIndex} className="text-center">
                            <Link
                                className={`flex flex-col items-center px-2 py-2 text-2xs xs:text-xs group transition duration-150 ease-in-out ${pathname === link.href ? 'text-blue-500' : ' text-slate-11 hover:text-indigo-500'}`}
                                href={link.href}>
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}