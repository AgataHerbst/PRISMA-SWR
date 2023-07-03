import { AppBar, Typography, Container, Toolbar } from "@mui/material";
import Link from "next/link";
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFE4E1'
    },
    secondary: {
      main: '#FF69B4'
    }
  
  }
});

export default function Navbar() {
  return <ThemeProvider theme={theme}>
  <AppBar
    position='static'
  >
    <Container maxWidth="xl">
      <Toolbar disableGutters >
        <Link href="/" className="link">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 15,
              display: { xs: '4', md: '12' },
              fontWeight: 700,
            }}>Home</Typography></Link>
        <Link href="/old" className="link">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 15,
              display: { xs: '4', md: '12' },
              fontWeight: 700,
            }}
          >Table of Users</Typography></Link>
        <Link href="/new" className="link">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 15,
              display: { xs: '4', md: '12' },
              fontWeight: 700,
            }}
          >
            New Page
          </Typography>
        </Link>
      </Toolbar>
    </Container>
  </AppBar>
  </ThemeProvider>
}