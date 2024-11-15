"use client";
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cartSlice';
import {
  Card,
  CardContent,
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
  imageString: string
};

const EditUploadedProducts = () => {
  const [quantity, setQuantity] = useState(1);
  const [product , setProduct] = useState<ProductProps>({
    id: 0,
    title: 'Image title',
    category: '',
    description: '',
    price: 0,
    image: '',
    imageString: '/image.png'
  });

  const dispatch = useDispatch();
  const searchParamss = useSearchParams();
  const id = Number(searchParamss.get('id'));
  
    useEffect(()=>{
      const dbProducts = localStorage.getItem('dbProducts');
      if(dbProducts){
        const parsedProducts = JSON.parse(dbProducts);
        console.log(parsedProducts);
        console.log(id);
        
        setProduct(()=>{
          const foundProduct = parsedProducts.find((productI:any)=> (productI.id === id));
          console.log(foundProduct);
          
          return foundProduct;
        })
        
      }
    },[])

  return product ? (
    <div className="w-full h-screen relative flex justify-between border border-black pt-7">
    <div className="relative w-full h-64">
      <Image
        src={product?.imageString}
        alt={product?.title}
        layout="fill"
        objectFit="contain"
        loading="lazy"
      />
    </div>
    <Card className="w-3/5 h-3/5">
      <CardHeader>
        <CardTitle>{product?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-around">
        <div>
          <span>${product.price}</span>
        </div>

        <div>
          <span
            className="cursor-pointer"
            onClick={() => {
              if (quantity > 1) {
                setQuantity((prev) => prev - 1);
              } else {
                alert("Please add at least 1 item");
              }
            }}
          >
            -{" "}
          </span>
          <span>{quantity} </span>
          <span
            className="cursor-pointer"
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
                  id: product.id,
                  title: product.title,
                  image: product.imageString,
                  quantity: quantity,
                  price: product.price,
                })
              );

              setQuantity(1);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
  ) : <p>Loading...</p>
};

export default EditUploadedProducts;
