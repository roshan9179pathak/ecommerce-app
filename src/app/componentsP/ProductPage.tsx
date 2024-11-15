"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

const ProductPage = ({ productData }: { productData: ProductProps }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={productData.image}
            alt={productData.title}
            layout="fill"
            objectFit="contain"
            loading="lazy"
            className="bg-gray-100"
          />
        </div>

        {/* Product Details */}
        <Card className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-white">
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl font-semibold text-gray-800">
              {productData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow mt-2">
            <CardDescription className="text-sm md:text-base text-gray-600">
              {productData.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <div className="text-lg font-bold text-gray-800">
              ${productData.price}
            </div>

            <div className="flex items-center gap-4">
              <span
                className="cursor-pointer text-lg md:text-xl text-gray-800"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity((prev) => prev - 1);
                  } else {
                    alert("Please add at least 1 item");
                  }
                }}
              >
                -
              </span>
              <span className="text-lg md:text-xl text-gray-800">
                {quantity}
              </span>
              <span
                className="cursor-pointer text-lg md:text-xl text-gray-800"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                +
              </span>
            </div>

            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addToCart({
                      id: productData.id,
                      title: productData.title,
                      image: productData.image,
                      quantity: quantity,
                      price: productData.price,
                    })
                  );
                  setQuantity(1);
                }}
                className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;
