import React from "react";
import {
  MdDeleteOutline,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartItem = ({ item, onToggleSelect, onQtyChange, onRemove }) => {
  const { id, name, img, price, originalPrice, qty, selected } = item;

  return (
    <div className="flex items-center justify-between py-6 border-b">
      {/* checkbox dot + image + info */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggleSelect(id)}
          className="text-2xl focus:outline-none"
        >
          {selected ? (
            <MdRadioButtonChecked className="text-green-500" />
          ) : (
            <MdRadioButtonUnchecked className="text-gray-400" />
          )}
        </button>

        <img src={img} alt={name} className="w-24 h-24 object-cover rounded" />

        <div>
          <p className="text-lg font-medium">{name}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-red-500 font-semibold">
              {price.toLocaleString()}₫
            </span>
            <span className="text-gray-400 line-through text-sm">
              {originalPrice.toLocaleString()}₫
            </span>
          </div>
        </div>
      </div>

      {/* remove + qty */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => onRemove(id)}
          className="text-2xl text-gray-600 hover:text-red-500 focus:outline-none"
        >
          <MdDeleteOutline />
        </button>

        <div className="flex items-center border rounded">
          <button
            onClick={() => onQtyChange(id, qty - 1)}
            className="px-3 py-1 focus:outline-none"
          >
            <AiOutlineMinus />
          </button>
          <span className="px-4">{qty}</span>
          <button
            onClick={() => onQtyChange(id, qty + 1)}
            className="px-3 py-1 focus:outline-none"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
