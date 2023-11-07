import {PricedProduct} from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "@modules/products/components/product-actions"
import React from "react"


type ProductInfoProps = {
    product: PricedProduct,
    onColorChange: (color: string) => void

}


const ProductInfo: React.FC<ProductInfoProps> = ({product, onColorChange}) => {




    return (
        <div id="product-info">
            <div className="flex flex-col gap-y-12 xl:max-w-[500px] mx-auto">
                <div>

                    <ProductActions product={product} onColorChange={onColorChange} />

                </div>
            </div>
        </div>
    )
}

export default ProductInfo
