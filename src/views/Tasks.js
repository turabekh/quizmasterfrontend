import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import SchoolService from '../services/SchoolService';

const Tasks = () => {
  const [topicsData, setTopicsData] = useState([]);

  useEffect(() => {
    // Fetch the topics and tasks data from SchoolService
    const fetchData = async () => {
      try {
        const topics = await SchoolService.getTextTopicTasks();
        setTopicsData(topics);
      } catch (error) {
        console.error('Error fetching topics and tasks:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{padding: "16px"}}>
      <Typography variant="h4" style={{ marginBottom: '16px' }}>
        Tasks
      </Typography>
      {topicsData?.map((topic) => (
        <Paper key={topic.id} elevation={3} style={{ marginBottom: '16px', padding: "26px" }}>
          <Typography variant="h6" gutterBottom>
            {topic.title}
          </Typography>
          <List>
            {topic?.tasks?.map((task) => (
              <ListItem
                key={task.id}
                component={Link}
                to={`/task/${task.id}`}
                button
              >
                <ListItemText primary={task.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </div>
  );
};

export default Tasks;
