'use client';

import {useStore} from "@lib/context/store-context";
import {useRegions} from "medusa-react";
import {useEffect, useMemo, useState} from "react";
import ReactCountryFlag from "react-country-flag";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import {ChevronRightIcon} from "@radix-ui/react-icons";


export default function CountrySelectDesktop() {
    const {countryCode, setRegion} = useStore();
    const {regions} = useRegions();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [current, setCurrent] = useState(null);

    const options = useMemo(() => {
        return regions
            ?.map((r) => {
                return r.countries.map((c) => ({
                    country: c.iso_2,
                    region: r.id,
                    label: c.display_name,
                    currency: r?.currency_code.toUpperCase()
                }));
            })
            .flat();
    }, [regions]);

    useEffect(() => {
        if (countryCode) {
            const option = options?.find((o) => o.country === countryCode);
            setCurrent(option);
        }
    }, [countryCode, options]);

    const handleChange = (option) => {
        setRegion(option.region, option.country);
        onOpenChange();
    };

    return (
        <>
            {isOpen && <Overlay />}
            <Button onPress={onOpen}
                    className="top-1 right-1 text-base font-semibold leading-5 text-slate-11 hover:text-indigo-500  dark:hover:text-cgreen p-3 bg-white dark:bg-sky-1">
                Free Shipping to:
                <ReactCountryFlag
                    svg
                    style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "10px",
                        marginRight: "8px"
                    }}
                    countryCode={current?.country}
                    alt={current?.label}
                />
                <h3 className="font-semibold tracking-wider text-slate-12 ">
                    {current?.label}
                </h3>

                <ChevronRightIcon className="ml-2 h-4 w-4 text-slate-12" aria-hidden="true"/>


            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                size="2xl"
                className=" mx-auto bg-cyan-1 z-20"

            >
                <ModalContent className="py-6">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-row  items-center justify-center mx-auto text-xl pb-8 text-slate-12">
                                Select Delivery Country
                            </ModalHeader>
                            <ModalBody className="justify-start items-start mx-auto">
                                <div className="grid grid-cols-3 gap-4 text-left pl-2">
                                    {options?.map((option, index) => (
                                        <Button
                                            key={index}
                                            onPress={() => handleChange(option)}
                                            className={`text-left justify-start text-slate-12 text-md transition duration-150 ease-in-out hover:text-indigo-500 dark:hover:text-cgreen 
                ${option.country === current?.country ? "font-bold underline underline-offset-2" : ""}`}>
                                            <ReactCountryFlag
                                                svg
                                                style={{
                                                    width: "24px",
                                                    height: "24px",
                                                }}
                                                countryCode={option.country}
                                            />
                                            <span style={{marginLeft: "8px"}}>
                    {option.label} - {option.currency}
                </span>
                                        </Button>
                                    ))}
                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

function Overlay() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            WebkitBackdropFilter: 'blur(5px)',
            backdropFilter: 'blur(5px)',
            zIndex: 10,
        }}></div>
    );
}