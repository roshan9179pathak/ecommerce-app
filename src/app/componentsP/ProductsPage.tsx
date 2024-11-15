import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductListProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

type ProductsPageProps = {
  productList: ProductListProps[];
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const ProductsPage = ({ productList }: ProductsPageProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {productList.map((product) => (
        <Card
          key={product.id}
          className="bg-white text-black shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <CardHeader className="relative">
            <div className="w-full h-48 relative">
              <Image
                src={product.image}
                alt={product.category}
                layout="fill"
                objectFit="contain"
                className="rounded-t-md bg-gray-100"
                loading="lazy"
              />
            </div>
            <CardTitle className="text-lg font-semibold mt-4 px-4">
              {product.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4">
            <CardDescription>
              <p className="text-gray-600 text-sm">
                {truncateText(product.description, 80)}
              </p>
              <div className="flex justify-between mt-2 text-gray-800">
                <span className="font-medium">${product.price}</span>
                <span className="text-sm capitalize">{product.category}</span>
              </div>
            </CardDescription>
          </CardContent>

          <CardFooter className="px-4 py-4">
            <Link
              href={{
                pathname: "/products/product",
                query: {
                  productId: product.id,
                },
              }}
              passHref
            >
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 rounded-md">
                View Product
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductsPage;
