"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  CardActionArea,
  Pagination,
  Box,
  Skeleton,
} from "@mui/material";
import Link from "next/link";

interface PokemonResponse {
  count: number;
  results: { name: string; url: string }[];
}

export default function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * itemsPerPage;
    // ดึงข้อมูลทีละหน้าตาม offset และ limit
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${itemsPerPage}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const getPokemonId = (url: string) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  return (
    <Container>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        Pokemon Directory
      </Typography>

      <Grid container spacing={3} sx={{ minHeight: "60vh" }}>
        {loading
          ? Array.from(new Array(itemsPerPage)).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton variant="circular" width={96} height={96} />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={40}
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : pokemonData?.results.map((pokemon) => {
              const pokemonId = getPokemonId(pokemon.url);
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pokemon.name}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      href={`/pokemon/${pokemon.name}`}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          py: 4,
                        }}
                      >
                        <Avatar
                          alt={pokemon.name}
                          sx={{
                            width: 96,
                            height: 96,
                            bgcolor: "#f5f5f5",
                            p: 1,
                          }}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {pokemon.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          #{pokemonId.padStart(4, "0")}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
      </Grid>

      {pokemonData && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={Math.ceil(pokemonData.count / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white", // บังคับให้ตัวเลขและลูกศรทั้งหมดเป็นสีขาว
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "white", // บังคับให้จุดไข่ปลา (...) เป็นสีขาวด้วย
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
}
