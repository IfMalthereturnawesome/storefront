// BillingAddress.tsx:

import { CheckoutFormValues } from "@lib/context/checkout-context";
import ConnectForm from "@modules/common/components/connect-form";
import Input from "@modules/common/components/input";
import CountrySelect from "../country-select";

const BillingAddress = () => {
  return (
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
            <div className="flex flex-col gap-y-4 md:gap-y-3 2xl:gap-y-2">
              {/* Ensure each field is full width on small screens and adjust as necessary on larger screens */}
              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-2 gap-y-4">
                <Input
                    label="First name *"
                    {...register("billing_address.first_name", {
                      required: "First name is required",
                    })}
                    autoComplete="given-name"
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    label="Last name *"
                    {...register("billing_address.last_name", {
                      required: "Last name is required",
                    })}
                    autoComplete="family-name"
                    errors={errors}
                    touched={touchedFields}
                />
              </div>
              <Input
                  label="Company (optional)"
                  {...register("billing_address.company")}
                  autoComplete="organization"
                  errors={errors}
                  touched={touchedFields}
              />
              <Input
                  label="Address *"
                  {...register("billing_address.address_1", {
                    required: "Address is required",
                  })}
                  autoComplete="address-line1"
                  errors={errors}
                  touched={touchedFields}
              />
              <Input
                  label="Apartments, suite, etc."
                  {...register("billing_address.address_2")}
                  autoComplete="address-line2"
                  errors={errors}
                  touched={touchedFields}
              />
              {/* Adjust for postal code and city to be side by side on larger screens */}
              <div className="flex flex-col md:grid md:grid-cols-[122px_1fr] md:gap-x-2 gap-y-4">
                <Input
                    label="Postal code *"
                    {...register("billing_address.postal_code", {
                      required: "Postal code is required",
                    })}
                    autoComplete="postal-code"
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    label="City *"
                    {...register("billing_address.city", {
                      required: "City is required",
                    })}
                    autoComplete="address-level2"
                    errors={errors}
                    touched={touchedFields}
                />
              </div>
              <CountrySelect
                  {...register("billing_address.country_code", {
                    required: "Country is required",
                  })}
                  autoComplete="country"
                  errors={errors}
                  touched={touchedFields}
              />
              <Input
                  label="State / Province"
                  {...register("billing_address.province")}
                  autoComplete="address-level1"
                  errors={errors}
                  touched={touchedFields}
              />
              <Input
                  label="Phone"
                  {...register("billing_address.phone")}
                  autoComplete="tel"
                  errors={errors}
                  touched={touchedFields}
              />
            </div>
        )}
      </ConnectForm>
  )
}

export default BillingAddress;
