"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isProductAdded } from "@/features/productSlice";

type Product = {
  id: number;
  image: File | "";
  imageString: string | "";
  title: string;
  description: string;
  price: number;
  quantity: number;
};

const AddProduct: React.FC = () => {
  const [dbProducts, setdbProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: Number(Date.now() + Math.ceil(Math.random() * 100000000)),
    image: "",
    imageString: "",
    title: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const storedProducts = localStorage.getItem("dbProducts");
    if (storedProducts) {
      setdbProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    if (dbProducts.length > 0) {
      localStorage.setItem("dbProducts", JSON.stringify(dbProducts));
      dispatch(isProductAdded(true));
    }
  }, [dbProducts]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProduct({ ...product, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setProduct((prev) => ({
            ...prev,
            imageString: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = (product: Product) => {
    setdbProducts((prev) => [...prev, product]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.title || !product.description || !product.price || !product.quantity || !product.image) {
      alert("Please fill out all fields and upload an image.");
      return;
    }
    const newProduct: Product = product;
    addProduct(newProduct);
    setProduct({
      id: Number(Date.now() + Math.ceil(Math.random() * 100000000)),
      image: "",
      imageString: "",
      title: "",
      description: "",
      price: 0,
      quantity: 0,
    }); // Reset form after submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
       
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {product.imageString && (
            <div className="mt-4">
              <img
                src={product.imageString}
                alt="Product Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>

  
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={4}
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <Input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

   
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <Input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            required
            min="0"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
