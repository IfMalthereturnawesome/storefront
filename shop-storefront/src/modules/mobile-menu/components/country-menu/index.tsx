import React from "react";
import { useMobileMenu } from "@lib/context/mobile-menu-context";
import { useStore } from "@lib/context/store-context";
import useCountryOptions from "@lib/hooks/use-country-options";
import ChevronDown from "@modules/common/icons/chevron-down";
import X from "@modules/common/icons/x";
import ReactCountryFlag from "react-country-flag";

const CountryMenu = ({ goBack, onCountrySelected, setMobileMenuOpen }) => {
  const { close } = useMobileMenu();
  const { setRegion } = useStore();
  const countryOptions = useCountryOptions();

  const handleSelectCountry = (regionId, countryCode) => {
    setRegion(regionId, countryCode);
    close();
    onCountrySelected();


  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false); // Close the entire mobile menu
  };



  return (
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
          <div className="flex-1 basis-0">
            <button
                className="flex items-center gap-x-2"
                onClick={goBack} // Call the goBack function when the button is clicked
            >
              <ChevronDown className="rotate-90 text-slate-12" size={20} />
            </button>
          </div>
          <div>
            <h1 className="text-large-regular">Free Shipping To</h1>
          </div>
          <div className="flex-1 basis-0 flex justify-end">
            <button onClick={handleCloseMenu} className={"text-slate-12"}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div>
          <ul className="py-4">
            {countryOptions?.map((option) => (
                <li key={option.country}>
                  <button
                      className="px-8 py-4 flex items-center justify-between w-full border-b border-gray-200"
                      onClick={() =>
                          handleSelectCountry(option.region, option.country)
                      }
                  >
                    <div className="flex items-center gap-x-4">
                      <ReactCountryFlag svg countryCode={option.country} alt={option.label} />
                      <span className="text-base-regular text-slate-12">{option.label} - {option.currency} </span>
                    </div>
                    <ChevronDown size={16} className="-rotate-90" />
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default CountryMenu;

