import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Header = ({ setIsLoggedIn }) => {
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    router.replace("/login");
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Products
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
