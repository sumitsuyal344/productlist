import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "./productCard";
import { Typography, CircularProgress } from "@mui/material";
import Header from "./header";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products?page=${page}&limit=10`)
      .then((response) => {
        setProducts([...products, ...response.data]);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      !loading
    ) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, loading]);

  const handleDelete = (productId) => {
    setLoading(true);
    axios
      .delete(`https://fakestoreapi.com/products/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        style={{
          textAlign: "center",
          margin: "0 auto",
          backgroundColor: "#f0f0f0",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" sx={{ marginTop: "20px" }}>
          Product List
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "80%",
            margin: "20px auto 0px auto",
          }}
        >
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {loading && <CircularProgress style={{ marginTop: "20px" }} />}
      </div>
    </>
  );
};

export default Product;
