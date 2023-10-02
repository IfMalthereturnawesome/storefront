import React, {useState} from 'react';
import CustomSwitch from "components/elements/CustomSwitch";
import Link from 'next/link';


interface SizeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({isOpen, onClose}) => {
    const [unit, setUnit] = useState<'cm' | 'in'>('cm');
    const [activeTab, setActiveTab] = useState<'chart' | 'measure' | 'region'>('chart');

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex flex-col bg-white w-full max-w-4xl rounded-lg shadow-md overflow-hidden">
                <header className="bg-white p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Size Guide</h2>
                    <button onClick={onClose} className="text-gray-700">
                        <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </header>

                <nav className="bg-white flex justify-between items-center border-b border-gray-300">
                    <div className="flex space-x-0 w-full">
                        <button
                            className={`flex-1 text-center focus:outline-none py-2 ${activeTab === 'chart' ? 'text-gray-800 border-b-2 border-black' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('chart')}
                        >
                            Size Chart
                        </button>
                        <button
                            className={`flex-1 text-center focus:outline-none py-2 ${activeTab === 'measure' ? 'text-gray-800 border-b-2 border-black' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('measure')}
                        >
                            How to Measure
                        </button>
                    </div>

                </nav>


                <div className="flex-grow p-4 bg-[#F5F4F4] text-gray-700 overflow-y-auto h-[450px]">


                    {activeTab === 'chart' && (
                        <div>
                            <div
                                className="flex justify-between items-center py-4 px-2 m-0 leading-5 text-black align-baseline border-0 lg:leading-5">
                                <h3 className="text-lg font-bold text-gray-800">Sleep Mask</h3>
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
                                    <tr className="bg-white text-black text-md">
                                        <th className="px-4 py-2 border border-gray-300">Size</th>
                                        <th className="px-4 py-2 border border-gray-300">Head
                                            Circumference {(unit === 'cm' ? '(cm)' : '(in)')}</th>
                                        <th className="px-4 py-2 border border-gray-300">Typical Male</th>
                                        <th className="px-4 py-2 border border-gray-300">Typical Female</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 border border-gray-300">2XS</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {unit === 'cm' ? 52 : parseFloat((52 * 0.393701).toFixed(2))}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">Uncommon</td>
                                        <td className="px-4 py-2 border border-gray-300">Uncommon</td>
                                    </tr>
                                    <tr className="bg-[#F5F4F4]">
                                        <td className="px-4 py-2 border border-gray-300">XS</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {unit === 'cm' ? 53 : parseFloat((53 * 0.393701).toFixed(2))}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">Common</td>
                                        <td className="px-4 py-2 border border-gray-300">Common</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 border border-gray-300">Small</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {unit === 'cm' ? '54 - 55' : `${parseFloat((54 * 0.393701).toFixed(2))} - ${parseFloat((55 * 0.393701).toFixed(2))}`}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">Average</td>
                                        <td className="px-4 py-2 border border-gray-300">Average</td>
                                    </tr>
                                    <tr className="bg-[#F5F4F4]">
                                        <td className="px-4 py-2 border border-gray-300">Medium</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {unit === 'cm' ? '56 - 57' : `${parseFloat((56 * 0.393701).toFixed(2))} - ${parseFloat((57 * 0.393701).toFixed(2))}`}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">Average</td>
                                        <td className="px-4 py-2 border border-gray-300">Average</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 border border-gray-300">Large</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {unit === 'cm' ? '58 - 59' : `${parseFloat((58 * 0.393701).toFixed(2))} - ${parseFloat((59 * 0.393701).toFixed(2))}`}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">Common</td>
                                        <td className="px-4 py-2 border border-gray-300">Common</td>
                                    </tr>
                                    <tr className="bg-[#F5F4F4]">
                                        <td className="px-4 py-2 border border-gray-300">XL</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {unit === 'cm' ? '60 - 61' : `${parseFloat((60 * 0.393701).toFixed(2))} - ${parseFloat((61 * 0.393701).toFixed(2))}`}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">Common</td>
                                        <td className="px-4 py-2 border border-gray-300">Uncommon</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 border border-gray-300">2XL</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {unit === 'cm' ? 62 : parseFloat((62 * 0.393701).toFixed(2))}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">Uncommon</td>
                                        <td className="px-4 py-2 border border-gray-300">Rare</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'measure' && (
                        <div>
                            <div className={"py-4 px-2 m-0 leading-5 text-black align-baseline border-0  lg:leading-5"}>
                                <h3 className="text-lg font-bold text-gray-800">How to measure your head?</h3>
                            </div>
                            <div className={"pb-2 px-3 m-0 leading-5 text-black align-baseline border-0 text-md"}>
                                <p className="text-gray-700 mt-2">Follow these steps to measure the circumference of
                                    your
                                    head:</p>
                                <ol className="list-decimal pl-5 mt-2 text-gray-700 text-md">
                                    <li>Use a soft measuring tape.</li>
                                    <li>Start from just above your eyebrows and wrap the tape around the back of your
                                        head
                                        at the widest part.
                                    </li>
                                    <li>Note down the measurement.</li>
                                    <li>Select the size that best fits your measurement from the size chart above.</li>
                                </ol>
                            </div>
                        </div>
                    )}


                </div>

                <footer className="bg-mask-black p-4">
                    <p className="text-sm text-gray-100">
                        Still unsure? Check out our&nbsp;
                        <Link href="/faq" className="text-white font-semibold hover:underline">
                            Sizing FAQs
                        </Link>
                        &nbsp;or&nbsp;
                        <Link href="/contact" className="text-white font-semibold hover:underline">
                            Contact Us&nbsp;
                        </Link>
                        directly.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default SizeGuideModal;