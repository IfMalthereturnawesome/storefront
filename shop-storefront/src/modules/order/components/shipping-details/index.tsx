import { Address, ShippingMethod } from "@medusajs/medusa"

type ShippingDetailsProps = {
  address: Address
  shippingMethods: ShippingMethod[]
}


const ShippingDetails = ({
  address,
  shippingMethods,
}: ShippingDetailsProps) => {
  return (
    <div className="text-base-regular">
      <h2 className="text-large-semi">Delivery</h2>
      <div className="my-2">
        <h3 className="text-base-regular text-slate-12">Address</h3>
        <div className="flex flex-col text-slate-11 text-xs">
          <span>{`${address.first_name} ${address.last_name}`}</span>
          <span>{`${address.address_1}${
            address.address_2 && ", " + address.address_2
          }`}</span>
          <span>{`${address.city}, ${address.province} ${address.postal_code}`}</span>
          <span>{address.country_code?.toUpperCase()}</span>
        </div>
      </div>
      <div className="my-2">
        <h3 className="text-base-regular text-slate-12">Delivery method</h3>
          <div className={"text-xs"}>
              {shippingMethods.map((sm) => {
                  const servicePoint = address.metadata.selectedServicePoint;

                  return (
                      <div key={sm.id}>
                          <div className="text-slate-11">{sm.shipping_option.name}</div>
                          {/*  @ts-ignore */}
                          <div className="text-slate-11 font-bold">{servicePoint.name}</div>
                          <div className="text-slate-11">
                              {/*  @ts-ignore */}
                              {servicePoint.address.street}, {servicePoint.address.city} {servicePoint.address.zip_code}
                          </div>
                      </div>
                  );
              })}
          </div>

      </div>
    </div>
  )
}

export default ShippingDetails
