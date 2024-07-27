import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";

const SingleProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching product data from an API
    const staticProduct = {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    };

    // Set the static product as the product state
    setProduct(staticProduct);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
          <Image
            src={product.image}
            width={200}
            height={300}
            objectFit="contain"
            alt={product.title}
          />
        <div className="w-1/2 p-4">
          <Typography variant="h4" component="h1">
            {product.title}
          </Typography>
          <Typography variant="h6" component="p" color="textSecondary">
            {product.category}
          </Typography>
          <Typography variant="h5" component="p" color="textPrimary">
            ${product.price}
          </Typography>
          <Typography variant="body1" component="p" color="textSecondary">
            {product.description}
          </Typography>
          <Typography variant="body1" component="p" color="textSecondary">
            Rating: {product.rating.rate} (out of {product.rating.count} reviews)
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
