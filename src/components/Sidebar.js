import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';


const Sidebar = ({ open, onClose }) => {
  const isAuthenticated = AuthService.isAuthenticated(); // Check if the user is authenticated

  const handleLogout = () => {
    AuthService.logout(); // Implement your logout logic
  };

  const publicItems = (
    <List>
      <ListItem style={{ borderBottom: "2px solid black", marginBottom: "20px" }}>
        <ListItemText primary="Quiz Master" />
      </ListItem>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/login">
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem button component={Link} to="/register">
        <ListItemText primary="Register" />
      </ListItem>
      {/* Add more public navigation items as needed */}
    </List>
  );

  const authenticatedItems = (
    <List style={{ paddingTop: "20px" }}>
      <ListItem style={{ borderBottom: "2px solid black", marginBottom: "20px" }}>
        <ListItemText primary="Quiz Master" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/quizzes">
        <ListItemText primary="Quizzes" />
      </ListItem>
      <ListItem button component={Link} to="/gradebook">
        <ListItemText primary="Gradebook" />
      </ListItem>
      <ListItem button component={Link} to="/leaderboard">
        <ListItemText primary="Quiz Leaderboard" />
      </ListItem>
      <ListItem button component={Link} to="/tasks">
        <ListItemText primary="Tasks" />
      </ListItem>
      <ListItem button component={Link} to="/update-profile">
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Logout" />
      </ListItem>
      {/* Add more authenticated navigation items as needed */}
    </List>
  );


  return (
    <Drawer open={open} onClose={onClose}>
      {isAuthenticated ? authenticatedItems : publicItems}
    </Drawer>
  );
};

export default Sidebar;
