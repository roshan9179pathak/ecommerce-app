import ProductPage from "../../componentsP/ProductPage";

async function ProductServerPage({
  searchParams,
}: {
  searchParams: { productId: number };
}) {
  const productData = await getProduct(searchParams.productId);

  return <ProductPage productData={productData} />;
}

export default ProductServerPage;

async function getProduct(productId: number) {

  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );

    if(response.ok){
      const data = await response.json()
      return data;
    }

  } catch (error) {
    console.log(error);
    
  }
}
