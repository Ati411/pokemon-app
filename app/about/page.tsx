import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function AboutPage() {
  return (
    <Container maxWidth="sm">
      <Card sx={{ borderRadius: 4, boxShadow: 3, mt: 4 }}>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold", // ย้ายมาไว้ใน sx
              mb: 2, // ใช้ mb (margin-bottom) แทน gutterBottom
            }}
          >
            About This Project
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            โปรเจกต์นี้เป็นการพัฒนาระบบ Pokedex เพื่อแสดงข้อมูล Pokemon
            โดยดึงข้อมูลจาก PokeAPI, pokeapi.co
          </Typography>

          <Box
            sx={{
              mt: 4,
              textAlign: "left",
              bgcolor: "#f9f9f9",
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1">
              <strong>Developer:</strong> [Athiwat Tangrusicharoen]
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>Course:</strong> [Front-end Web Programming / IN403101]
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>Major:</strong> [Computer Science]
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>University:</strong> [Khon Kaen University]
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<GitHubIcon />}
            href="https://github.com/Ati411/pokemon-app"
            target="_blank"
            sx={{
              mt: 4,
              bgcolor: "#24292e",
              color: "white",
              "&:hover": { bgcolor: "#1b1f23" },
            }}
          >
            Source Code บน GitHub
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
