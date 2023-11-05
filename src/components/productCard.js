import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductCard = ({ product, onDelete }) => {
  const MAX_DESCRIPTION_LENGTH = 300;

  const truncatedDescription =
    product.description.length > MAX_DESCRIPTION_LENGTH
      ? product.description.substring(0, MAX_DESCRIPTION_LENGTH - 3) + "..."
      : product.description;

  return(
    
    <Card sx={{ width: 320, height: 280, margin: 1, position: "relative" }}>
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxHeight: 100, overflow: "hidden" }}
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
            <Button variant="contained" color="primary">
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
