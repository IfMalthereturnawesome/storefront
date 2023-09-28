import { useStore } from "@lib/context/store-context";
import { useRegions } from "medusa-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import {ChevronRightIcon} from "@radix-ui/react-icons";

export default function CountrySelectMobile() {
    const { countryCode, setRegion } = useStore();
    const { regions } = useRegions();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [current, setCurrent] = useState(null);

    const options = useMemo(() => {
        return regions
            ?.map((r) => {
                return r.countries.map((c) => ({
                    country: c.iso_2,
                    region: r.id,
                    label: c.display_name,
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
            <Button onPress={onOpen} className={"top-1 text-base font-normal leading-5 text-gray-500 transition duration-150 ease-in-out hover:text-indigo-500 dark:text-gray-400 dark:hover:text-cgreen p-3 bg-white dark:bg-sky-1"}>
                Free Shipping to:
                <ReactCountryFlag
                    svg
                    style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "8px",
                        marginRight: "6px"
                    }}
                    countryCode={current?.country}
                />
               <h3 className={"font-semibold tracking-wider text-slate-12"}> {current?.label}</h3>
                <ChevronRightIcon className="ml-2 h-4 w-4 text-slate-12" aria-hidden="true" />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                size="full"
                backdrop={"opaque"}
                className={"max-w-[90vw] mx-auto bg-cyan-1 w-auto"}
            >
                <ModalContent className={" py-6"}>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-row justify-between items-center text-slate-12">

                            Select Country
                            </ModalHeader>
                            <ModalBody className="justify-start items-start mx-auto">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left pl-2">
                                    {options?.map((option, index) => (
                                        <Button key={index} onPress={() => handleChange(option)} className="text-left justify-start text-slate-12 text-sm hover:text-blue-10">
                                            <ReactCountryFlag
                                                svg
                                                style={{
                                                    width: "24px",
                                                    height: "24px",
                                                }}
                                                countryCode={option.country}
                                            />
                                            <span style={{ marginLeft: "8px" }}>
                                                {option.label}
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
