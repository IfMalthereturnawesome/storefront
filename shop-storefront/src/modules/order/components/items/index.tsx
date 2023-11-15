import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items";
import { LineItem, Region } from "@medusajs/medusa";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import Thumbnail from "@modules/products/components/thumbnail";
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item";
import Link from "next/link";

type ItemsProps = {
  items: LineItem[];
  region: Region;
  cartId: string;
};

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId);

  return (
      <div className="p-10 border-b border-slate-5 gap-y-4 flex flex-col">
        {enrichedItems?.length
            ? enrichedItems.map((item) => {
              // Given the variant title "Eclipse Black / XL", we'll split it to extract the color
              const variantTitleParts = item.variant.title.split(' / ');
              const color = variantTitleParts[0].toLowerCase().replace(/\s+/g, '-'); // This should give "eclipse-black"
              const productHandle = item.variant.product.handle; // Handle for the product

              return (
                  <div
                      className="grid grid-cols-1 sm:grid-cols-[122px_1fr] gap-x-4 gap-y-2 sm:gap-y-0 sm:gap-x-8"
                      key={item.id}
                  >
                    <div className="w-full xs:w-[160px] sm:w-[122px]">
                      <Thumbnail productHandle={productHandle} color={color} size="full" />
                    </div>
                  <div className="flex flex-col justify-between sm:justify-center">
                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4">
                            <Link href={`/products/${item.variant.product.handle}`} className="text-slate-12 hover:text-blue-500">
                            {item.title}
                            </Link>
                          </h3>
                          <LineItemOptions variant={item.variant} />
                          <span className={"text-small-regular text-slate-11"}>Items: {item.quantity}</span>
                        </div>
                        <div className="flex justify-between py-4">
                          <h3 className={"block sm:hidden text-base-regular text-slate-12 "}>Price</h3>
                          <LineItemPrice region={region} item={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
            })
            : Array.from(Array(items.length).keys()).map((i) => (
                <SkeletonLineItem key={i} />
            ))}
      </div>
  );
};

export default Items;
