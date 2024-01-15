import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Link, Paper, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './components/Sidebar';
import './App.css';
import QuizLogo from "./assets/anotherlogo.png";

function Footer() {
  return (
    <Paper className="footer">
      &copy; {new Date().getFullYear()} Quiz Master. All rights reserved.
    </Paper>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/" color="inherit" underline="none" onMouseOver={() => setDrawerOpen(!drawerOpen)} >
              <div style={{display: "flex", justifyContent: "center", alignContent: "flex-end", gap: "8px"}}>
                <img src={QuizLogo} alt="Quiz Master" style={{ height: "40px", width: "40px", borderRadius: "50%" }} />
                <span style={{paddingTop: "4px"}}>Quiz Master</span>
              </div>
            </Link>
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            style={{ marginLeft: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <Container style={{ minHeight: "100vh" }}>
        <AppRoutes />
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
