"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ mb: 4, background: "#ef5350" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Pokédex
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/about">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
