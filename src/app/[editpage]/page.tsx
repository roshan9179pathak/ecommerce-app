"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiEdit, FiSave } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

type Product = {
  title: string;
  description: string;
  imageString: string;
  price: number;
  quantity: number;
  id: number;
};

type EditState = {
  title: boolean;
  description: boolean;
  image: boolean;
  price: boolean;
  quantity: boolean;
};

const ProductEditPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    imageString: "/image.png",
    price: 0,
    quantity: 0,
  });

  const [isEditing, setIsEditing] = useState<EditState>({
    title: false,
    description: false,
    image: false,
    price: false,
    quantity: false,
  });

  const toggleEditMode = (field: keyof EditState) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const dbProducts = localStorage.getItem("dbProducts");
    const parsedProducts = dbProducts ? JSON.parse(dbProducts) : [];
    const foundProduct = parsedProducts.find(
      (storedProduct: Product) => storedProduct.id === id
    );
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? +value : value,
    }));
  };

  const updateStore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const dbProducts = localStorage.getItem("dbProducts");
    const parsedProducts = dbProducts ? JSON.parse(dbProducts) : [];

    const updatedProducts = parsedProducts.map((storedProduct: Product) =>
      storedProduct.id === id ? product : storedProduct
    );
    localStorage.setItem("dbProducts", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const dbProducts = localStorage.getItem("dbProducts");
    const parsedProducts = dbProducts ? JSON.parse(dbProducts) : [];

    const newDBProducts = parsedProducts.filter(
      (storedProduct: Product) => storedProduct.id !== id
    );
    localStorage.setItem("dbProducts", JSON.stringify(newDBProducts));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          name="title"
          value={product.title}
          readOnly={!isEditing.title}
          onChange={handleChange}
          className={`w-full border-b ${
            isEditing.title ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <Button onClick={() => toggleEditMode("title")}>
          {isEditing.title ? <FiSave /> : <FiEdit />}
        </Button>
      </div>
      <div className="flex items-center mb-4">
        <textarea
          name="description"
          value={product.description}
          readOnly={!isEditing.description}
          onChange={handleChange}
          className={`w-full border-b ${
            isEditing.description ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <Button onClick={() => toggleEditMode("description")}>
          {isEditing.description ? <FiSave /> : <FiEdit />}
        </Button>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium">Product Image</label>
        <Image
          src={product.imageString}
          alt="Product"
          width={200}
          height={200}
          className="rounded object-cover"
        />
        <Input
          type="file"
          name="imageString"
          disabled={!isEditing.image}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setProduct((prev) => ({ ...prev, imageString: imageUrl }));
            }
          }}
        />
        <Button onClick={() => toggleEditMode("image")}>
          {isEditing.image ? <FiSave /> : <FiEdit />}
        </Button>
      </div>
      <div className="flex items-center mb-4">
        <Input
          type="number"
          name="price"
          value={product.price}
          readOnly={!isEditing.price}
          onChange={handleChange}
          className={`w-full border-b ${
            isEditing.price ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <Button onClick={() => toggleEditMode("price")}>
          {isEditing.price ? <FiSave /> : <FiEdit />}
        </Button>
      </div>
      <div className="flex items-center mb-4">
        <Input
          type="number"
          name="quantity"
          value={product.quantity}
          readOnly={!isEditing.quantity}
          onChange={handleChange}
          className={`w-full border-b ${
            isEditing.quantity ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <Button onClick={() => toggleEditMode("quantity")}>
          {isEditing.quantity ? <FiSave /> : <FiEdit />}
        </Button>
      </div>
      <div className="flex justify-between">
        <Button onClick={updateStore} className="border border-black">
          Save Changes
        </Button>
        <Button
          onClick={deleteProduct}
          className="border border-black bg-red-500 text-white"
        >
          Delete Product
        </Button>
      </div>
    </div>
  );
};

export default ProductEditPage;
