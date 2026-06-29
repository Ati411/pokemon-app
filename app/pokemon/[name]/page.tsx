"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Skeleton,
  Avatar,
  Divider,
} from "@mui/material";

export default function PokemonDetail() {
  const params = useParams();
  const name = params.name as string;

  const [details, setDetails] = useState<any>(null);
  const [evolutions, setEvolutions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setDetails(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoList: string[] = [];
        let currentEvo = evoData.chain;
        while (currentEvo) {
          evoList.push(currentEvo.species.name);
          currentEvo = currentEvo.evolves_to[0];
        }
        setEvolutions(evoList);
      } catch (error) {
        console.error("Failed to fetch pokemon details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchPokemonData();
  }, [name]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />
      </Container>
    );
  }

  if (!details)
    return (
      <Container>
        <Typography>Not Found</Typography>
      </Container>
    );

  return (
    <Container maxWidth="md">
      <Card sx={{ borderRadius: 4, boxShadow: 4, overflow: "visible", mt: 8 }}>
        <CardContent sx={{ p: 4 }}>
          {/* แก้ไขการใช้ Box ให้ใช้ sx แทน prop ลอยๆ */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: -10,
            }}
          >
            <Avatar
              src={details.sprites.other["official-artwork"].front_default}
              sx={{ width: 200, height: 200, bgcolor: "white", boxShadow: 3 }}
            />
            {/* ย้าย fontWeight มาไว้ใน sx */}
            <Typography
              variant="h3"
              sx={{ textTransform: "capitalize", fontWeight: "bold", mt: 2 }}
            >
              {details.name}
            </Typography>

            <Box sx={{ mt: 2 }}>
              {details.types.map((t: any) => (
                <Chip
                  key={t.type.name}
                  label={t.type.name}
                  sx={{ m: 0.5, textTransform: "capitalize" }}
                  color="primary"
                />
              ))}
            </Box>
          </Box>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* เปลี่ยนจาก item เป็น size={{ ... }} */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                Base Stats
              </Typography>
              {details.stats.map((s: any) => (
                <Box
                  key={s.stat.name}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {s.stat.name.replace("-", " ")}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {s.base_stat}
                  </Typography>
                </Box>
              ))}
            </Grid>

            {/* เปลี่ยนจาก item เป็น size={{ ... }} */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                Sound / Cries
              </Typography>
              {details.cries?.latest ? (
                <audio
                  controls
                  src={details.cries.latest}
                  style={{ width: "100%" }}
                />
              ) : (
                <Typography color="text.secondary">
                  No audio available
                </Typography>
              )}

              <Divider sx={{ my: 3 }} />

              {/* แก้ size="h6" เป็น variant="h6" และเอา fontWeight ใส่ sx */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                Evolution Chain
              </Typography>

              {/* เอา flexWrap มาใส่ใน sx */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {evolutions.map((evo, index) => (
                  <Box key={evo} sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={evo}
                      color={evo === name ? "secondary" : "default"}
                      sx={{ textTransform: "capitalize" }}
                    />
                    {index < evolutions.length - 1 && (
                      <Typography sx={{ mx: 1 }}>→</Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
