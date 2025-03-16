"use client";
import React, { useState } from "react";
import { Grid2, Button } from "@mui/material"; // Correction : Utilisation de Grid2
import RdvChoice from "./RdvChoice";

export default function BrandChoice({ setOption }) {
  const [brand, setBrand] = useState("ND");

  return brand === "ND" ? (
    <Grid2 container spacing={3} justifyContent="center" alignItems="center">
      <Grid2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setBrand("AUDI")}
          sx={{ width: 150, height: 50, fontWeight: "bold" }}
        >
          AUDI
        </Button>
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setBrand("SKODA")}
          sx={{ width: 150, height: 50, fontWeight: "bold" }}
        >
          SKODA
        </Button>
      </Grid2>
    </Grid2>
  ) : (
    <RdvChoice setOption={setOption} brand={brand} />
  );
}
