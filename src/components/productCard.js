import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

const ProductCard = ({ product, onDelete }) => {
  const MAX_DESCRIPTION_LENGTH = 200;

  const truncatedDescription =
    product.description.length > MAX_DESCRIPTION_LENGTH
      ? product.description.substring(0, MAX_DESCRIPTION_LENGTH - 3) + "..."
      : product.description;

  return (
    <Card
      sx={{
        width: 360,
        height: 380,
        margin: 1,
        position: "relative",
        backgroundColor: "#777777",
      }}
    >
      <Image
        src={product.image}
        alt={product.title}
        width={100}
        height={100}
        objectFit="cover"
        style={{ marginTop: "5px" }}
      />
      <CardContent>
        <Typography variant="h6" color="white">
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          sx={{
            maxHeight: 100,
            overflow: "hidden",
            fontWeight: "bold",
          }}
        >
          {truncatedDescription}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Link href={`/productDetails/${product.id}`}>
          <a style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.5)",
                color: "white",
              }}
            >
              View Details
            </Button>
          </a>
        </Link>
        <DeleteIcon
          color="error"
          onClick={() => onDelete(product.id)}
          style={{ cursor: "pointer", marginRight: "17px", marginTop: "5px" }}
        />
      </Box>
    </Card>
  );
};

export default ProductCard;
