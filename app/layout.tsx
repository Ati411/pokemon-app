import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ครอบ Provider ตัวนี้ไว้ เพื่อแก้ปัญหา Hydration ของ MUI โดยเฉพาะ */}
        <AppRouterCacheProvider>
          <Navbar />
          <Box sx={{ pb: 8 }}>{children}</Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}