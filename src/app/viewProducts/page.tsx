"use client";
import { FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ListedProductListProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  imageString: string;
};



const ListedProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ListedProductListProps[]>([]);
 
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = () => {
      const storedProducts = localStorage.getItem("dbProducts");
      const parsedProducts: ListedProductListProps[] = storedProducts
        ? JSON.parse(storedProducts)
        : [];

      setProducts(parsedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 justify-center">
      {products.map((product, index) => (
        <Card key={product.id + index} className="relative group">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button onClick={()=> router.push(`/editpage?id=${product.id}`)} className="text-gray-500 hover:text-black">
              <FiEdit size={25} />
            </Button>
          </div>
          <CardHeader>
            <div>
              <Image
                src={product.imageString}
                alt={product.category || ""}
                width={500}
                height={200}
                layout="responsive"
                loading="lazy"
              />
            </div>
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex flex-col">
              <div>{product.description}</div>
              <div className="flex justify-between">
                <span>$ {product.price}</span>
                <span>{product.category}</span>
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Link
              href={{
                pathname: "/viewProducts/productId",
                query: {
                  id: product.id,
                },
              }}
            >
              <Button variant="outline">View Product</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ListedProductsPage;
