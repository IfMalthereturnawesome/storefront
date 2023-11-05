import { useStore } from "@lib/context/store-context";
import { LineItem, Region } from "@medusajs/medusa";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import NativeSelect from "@modules/common/components/native-select";
import Trash from "@modules/common/icons/trash";
import Thumbnail from "@modules/products/components/thumbnail";

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">;
  region: Region;
};

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore();
  const productHandle = item.title.replace(/\s+/g, '-').toLowerCase();  // Replace spaces with hyphens

    const handleQuantityChange = (change: number) => {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1 && newQuantity <= item.variant.inventory_quantity) {
            updateItem({ lineId: item.id, quantity: newQuantity });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-4 items-center">
            {/* Responsive width for the thumbnail */}
            <div className="w-2/3  md:w-[120px]">
                <Thumbnail productHandle={productHandle} size="full" />
            </div>
            <div className="text-base-regular flex flex-col gap-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
                    <div className="flex flex-col">
                        <span className="text-slate-12">{item.title}</span>
                        <LineItemOptions variant={item.variant} />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-4 md:mt-0">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            disabled={item.quantity <= 1}
                            className={`px-4 py-2 bg-cyan-3 hover:bg-cyan-4 text-slate-12 focus:outline-none ${item.quantity <= 1 ? 'text-slate-700/25' : ''}`}
                        >
                            –
                        </button>
                        <span className="px-4 py-2 border-l border-r border-gray-300">
              {item.quantity}
            </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            disabled={item.quantity >= item.variant.inventory_quantity}
                            className="px-4 py-2 bg-cyan-3 hover:bg-cyan-4 text-slate-12 focus:outline-none"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="flex items-end justify-between text-small-regular flex-1">
                    <div>
                        <button
                            className="flex items-center gap-x-1 text-slate-11"
                            onClick={() => deleteItem(item.id)}
                        >
                            <Trash size={14} />
                            <span>Remove</span>
                        </button>
                    </div>
                    <div>
                        <LineItemPrice item={item} region={region} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
