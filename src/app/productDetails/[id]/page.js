"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Image from "next/image";

const ProductDetails = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      // Redirect to home if token does not exist
      router.push("/");
      return;
    }

    if (id) {
      axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
        setProduct(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
        });
        setLoading(false);
      });
    }
  }, [id, router]);
  const [isFormDataChanged, setIsFormDataChanged] = useState(false);

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
    setIsFormDataChanged(true);
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
    setIsFormDataChanged(true);
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormDataChanged) {
      // No changes in form data, do not hit the API
      return;
    }

    setLoading(true);
    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
      console.log("Product updated successfully!");
      setLoading(false);
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      await router.push("/");
    } catch (error) {
      console.error("Error updating product: ", error);
      setLoading(false);
      toast.error("Error updating product. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  if (loading) {
    return (
      <Container
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return <div>Error loading product details.</div>;
  }

  return (
    <>
      <Header />
      <Container
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          marginTop: "50px",
        }}
      >
        <ToastContainer />
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>
            <Box
              style={{ position: "relative", width: "80%", height: "220px" }}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
              />
            </Box>
            <Typography variant="body1" color="textSecondary" component="div">
              <strong>Price: ${product.price}</strong> <br />
              <strong>Category: {product.category}</strong> <br />
            </Typography>
            <Typography variant="body1" color="textSecondary" component="div">
              {product.description}
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <Box mt={2}>
                <TextField
                  label="Title"
                  fullWidth
                  value={formData.title}
                  onChange={handleTitleChange}
                />
              </Box>
              <Box mt={2}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </Box>
              <Box mt={2}>
                <Button variant="contained" color="primary" type="submit">
                  Update
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ProductDetails;
