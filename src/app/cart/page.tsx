"use client";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/features/cartSlice";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CartProduct = {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
};

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: any) => state.cart.items
  ) as CartProduct[];

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <p>Loading...</p>;
  }

  const handleIncreaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeFromCart({ id }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-5 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded"
                  />
                </div>
                <span className="text-lg font-medium">{item.title}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </Button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <Button
                  onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  +
                </Button>
              </div>

              <span className="text-lg font-semibold text-green-600">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <Button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <AiOutlineDelete className="w-6 h-6" />
              </Button>
            </div>
          ))}

          <div className="mt-6 text-right font-semibold text-2xl text-gray-800">
            Total:{" "}
            <span className="text-green-600">
              $
              {cartItems
                .reduce(
                  (total: number, item: any) =>
                    total + item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
