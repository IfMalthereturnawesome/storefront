import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import {useRegions} from "medusa-react";
import {useMemo} from "react";


const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
}: ProductPreviewType) => {


  return (
    <Link href={`/products/${handle}`}>
      <div>
        <Thumbnail productHandle={handle} size="full" />
        <div className="text-base-regular mt-2">
          <span>{title}</span>
          <div className="flex items-center gap-x-2 mt-1">
            {price ? (
              <>
                {price.price_type === "default" && (
                  <span className="line-through text-gray-500">
                    {price.original_price}
                  </span>
                )}
                <span
                  className={clsx("font-semibold", {
                    "text-rose-500": price.price_type === "default",
                  })}
                >
                  {price.calculated_price}
                </span>
              </>
            ) : (
              <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductPreview
