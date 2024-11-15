import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categoryCardData } from '../data/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CategoryCards = () => {

  const truncateText = (text:string , maxLength: number)=>{
    if(text.length > maxLength){
      text.slice(0 , 80);
    }
    return text;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categoryCardData.map((product) => (
       <Card key={product.id} className="flex flex-col items-center bg-white text-black shadow-lg rounded-lg">
       <CardHeader className="w-72 h-72"> 
         <Image
           src={product.image}
           alt={product.title}
           width={300}
           height={300} 
           className="object-cover rounded-md w-full h-full" 
         />
       </CardHeader>
          <CardTitle className="text-xl font-semibold mt-4">{product.title}</CardTitle>
          <CardContent className="mt-2">
            <CardDescription>{truncateText(product.description , 100)}</CardDescription>
          </CardContent>
          <CardFooter className="mt-4">
            <Link
              href={{
                pathname: '/category/categories',
                query: {
                  category: encodeURIComponent(product.title.toLowerCase()),
                },
              }}
            >
              <Button className="hover:scale-110 transition-transform duration-200" variant="outline">
                Explore
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CategoryCards;
