import React, {useEffect, useState} from 'react';
import CustomSwitch from "components/elements/CustomSwitch";
import Link from 'next/link';
import Image from "next/image";

interface SizeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SizeGuideMobile: React.FC<SizeGuideModalProps> = ({isOpen, onClose}) => {
    const [unit, setUnit] = useState<'cm' | 'in'>('cm');
    const [activeTab, setActiveTab] = useState<'chart' | 'measure'>('chart');

    useEffect(() => {
        // Accessing `document` inside useEffect to ensure it's client-side
        const mobileActions = document.getElementById('mobile-actions');
        if (mobileActions) {
            mobileActions.style.opacity = isOpen ? '0' : '1';
        }

        // Optional: Return a cleanup function to reset the opacity when the component unmounts
        return () => {
            if (mobileActions) {
                mobileActions.style.opacity = '1';
            }
        };
    }, [isOpen]); // The effect runs only when `isOpen` changes

    if (!isOpen) return null;

    return (
        <div
            className="  flex items-center justify-center z-[80] p-4 modal-overlay md:hidden "
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="flex flex-col bg-custom-white dark:bg-cyan-1  w-full mt-auto h-[calc(100vh-80px)] max-w-md rounded-lg "
            >
                <header className="bg-custom-white dark:bg-cyan-1  p-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Size Guide</h2>
                    <button onClick={onClose} className="text-slate-12">
                        <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </header>

                <nav
                    className="bg-custom-white dark:bg-cyan-1  flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-0 w-full">
                        <button
                            className={`flex-1 text-center focus:outline-none py-2 ${activeTab === 'chart' ? 'text-slate-12 border-b-2 border-slate-12' : 'text-slate-11'}`}
                            onClick={() => setActiveTab('chart')}
                        >
                            Size Chart
                        </button>
                        <button
                            className={`flex-1 text-center focus:outline-none py-2 ${activeTab === 'measure' ? 'text-slate-12 border-b-2 border-slate-12' : 'text-slate-11'}`}
                            onClick={() => setActiveTab('measure')}
                        >
                            How to Measure
                        </button>
                    </div>
                </nav>

                <div
                    className="flex-grow p-4 overflow-y-auto h-full bg-custom-white dark:bg-cyan-2 text-gray-600 dark:text-gray-300">
                    {activeTab === 'chart' && (
                        <div>
                            <div
                                className="flex justify-between items-center py-4 px-2 m-0 leading-5 text-slate-12 align-baseline border-0 lg:leading-5">
                                <h3 className="text-lg font-bold text-slate-12">Sleep Mask</h3>
                                <div className="flex items-center space-x-2 pr-4">
                                    <span
                                        className={`text-sm ${unit === 'cm' ? 'font-bold opacity-100' : 'font-normal opacity-50'}`}>CM</span>
                                    <CustomSwitch
                                        isSelected={unit === 'in'}
                                        onChange={() => setUnit(prev => prev === 'cm' ? 'in' : 'cm')}
                                    />
                                    <span
                                        className={`text-sm ${unit === 'in' ? 'font-bold opacity-100' : 'font-normal opacity-50'}`}>INCH</span>
                                </div>


                            </div>

                            <div className="px-2 pb-4 rounded-md">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="bg-custom-white dark:bg-cyan-2 text-slate-12 text-sm">
                                        <th className="px-4 py-2 border border-slate-6">Size</th>
                                        <th className="px-4 py-2 border border-slate-6">Head
                                            Circumference {(unit === 'cm' ? '(cm)' : '(in)')}</th>
                                        <th className="px-4 py-2 border border-slate-6">Typical Male</th>
                                        <th className="px-4 py-2 border border-slate-6">Typical Female</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-sm text-slate-12">
                                    <tr className="bg-custom-white dark:bg-cyan-1">
                                        <td className="px-4 py-2 border border-slate-6">XS</td>
                                        <td className="px-4 py-2 border border-slate-6">{unit === 'cm' ? '52.0 - 54.5' : `${parseFloat((52.0 * 0.393701).toFixed(2))} - ${parseFloat((54.5 * 0.393701).toFixed(2))}`}</td>
                                        <td className="px-4 py-2 border border-slate-6">Uncommon</td>
                                        <td className="px-4 py-2 border border-slate-6">Common</td>
                                    </tr>
                                    <tr className="bg-custom-white dark:bg-cyan-2">
                                        <td className="px-4 py-2 border border-slate-6">S</td>
                                        <td className="px-4 py-2 border border-slate-6">{unit === 'cm' ? '54.0 - 56.5' : `${parseFloat((54.0 * 0.393701).toFixed(2))} - ${parseFloat((56.5 * 0.393701).toFixed(2))}`}</td>
                                        <td className="px-4 py-2 border border-slate-6">Average</td>
                                        <td className="px-4 py-2 border border-slate-6">Average</td>
                                    </tr>
                                    <tr className="bg-custom-white dark:bg-cyan-1">
                                        <td className="px-4 py-2 border border-slate-6">M</td>
                                        <td className="px-4 py-2 border border-slate-6">{unit === 'cm' ? '56.0 - 58.0' : `${parseFloat((56.0 * 0.393701).toFixed(2))} - ${parseFloat((58.0 * 0.393701).toFixed(2))}`}</td>
                                        <td className="px-4 py-2 border border-slate-6">Average</td>
                                        <td className="px-4 py-2 border border-slate-6">Average</td>
                                    </tr>
                                    <tr className="bg-custom-white dark:bg-cyan-2">
                                        <td className="px-4 py-2 border border-slate-6">L</td>
                                        <td className="px-4 py-2 border border-slate-6">{unit === 'cm' ? '57.5 - 60.0' : `${parseFloat((57.5 * 0.393701).toFixed(2))} - ${parseFloat((60.0 * 0.393701).toFixed(2))}`}</td>
                                        <td className="px-4 py-2 border border-slate-6">Common</td>
                                        <td className="px-4 py-2 border border-slate-6">Common</td>
                                    </tr>
                                    <tr className="bg-custom-white dark:bg-cyan-1">
                                        <td className="px-4 py-2 border border-slate-6">XL</td>
                                        <td className="px-4 py-2 border border-slate-6">{unit === 'cm' ? '59.5 - 62.0' : `${parseFloat((59.5 * 0.393701).toFixed(2))} - ${parseFloat((62.0 * 0.393701).toFixed(2))}`}</td>
                                        <td className="px-4 py-2 border border-slate-6">Common</td>
                                        <td className="px-4 py-2 border border-slate-6">Uncommon</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'measure' && (
                        <div className="px-4 py-2">
                            <div className="text-black">
                                <h3 className="text-lg font-bold text-slate-12">How to measure your head?</h3>
                                <p className="text-slate-12 mt-2 text-sm">Follow these steps to measure the circumference of your head:</p>
                                <div className="mt-3">
                                    <ol className="list-decimal pl-4 text-slate-11 text-sm space-y-2">
                                        <li>Use a soft measuring tape.</li>
                                        <li>Start from just above your eyebrows and wrap the tape around the back of your head at the widest part.</li>
                                        <li>Note down the measurement.</li>
                                        <li>Select the size that best fits your measurement from the size chart above.</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="mt-4 w-full flex justify-center">
                                {/* Adjust the image size for mobile using Tailwind CSS */}
                                <div className="w-1/2 max-w-xs">
                                    {/* Ensure the Image component is from a library like 'next/image' for optimization */}
                                    <Image
                                        src="/images/male-persons-head-head-size.png"
                                        alt="Head with measuring tape"
                                        layout="responsive"
                                        height={200}
                                        width={200}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <footer className="bg-mask-black p-4">
                    <p className="text-sm text-gray-100">
                        Still unsure? Check out our&nbsp;
                        <Link href="/faq" className="text-blue-500 hover:underline">
                            Sizing FAQs
                        </Link>
                        &nbsp;or&nbsp;
                        <Link href="/contact" className="text-blue-500 hover:underline">
                            Contact Us
                        </Link>
                        &nbsp;directly.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default SizeGuideMobile;
