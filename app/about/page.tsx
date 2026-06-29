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
            sx={{ fontWeight: "bold", mb: 2 }} // รวม fontWeight และระยะห่างไว้ใน sx
          >
            About This Project
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            โปรเจกต์นี้เป็นการพัฒนาระบบ Pokedex เพื่อแสดงข้อมูลโปเกม่อน
            โดยดึงข้อมูลจาก PokeAPI ผ่านเทคนิค Pagination และแสดงผลผ่าน Material
            UI (MUI)
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
              <strong>ผู้พัฒนา:</strong> [ชื่อ-นามสกุลของคุณ]
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>รายวิชา:</strong> [ชื่อวิชา / รหัสวิชา]
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>หลักสูตร:</strong> [ชื่อหลักสูตร / สาขาวิชา]
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>มหาวิทยาลัย:</strong> [ชื่อมหาวิทยาลัย]
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<GitHubIcon />}
            href="https://github.com/your-username/your-repo"
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
