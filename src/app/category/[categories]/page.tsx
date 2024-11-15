import React from "react";

import ProductsPage from "@/app/componentsP/ProductsPage";

type ProductsData = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
};

async function getProducts(category: string): Promise<ProductsData[]> {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );

  return await response.json();
}

const CategoryPage = async ({
  searchParams,
}: {
  searchParams: {
    category: string;
  };
}) => {
  const { category } = searchParams;

  const data = await getProducts(category);

  return <ProductsPage productList={data} />;
};

export default CategoryPage;
