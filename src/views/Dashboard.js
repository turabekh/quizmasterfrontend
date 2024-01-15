import React, { useEffect, useState } from 'react';
import {
  Typography,
  Tabs,
  Tab,
  Paper,
  Box,
  Button,
} from '@mui/material';
import SchoolService from '../services/SchoolService'; // Import the service

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(0);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const dashboardData = await SchoolService.fetchDashboardData();
        setData(dashboardData);
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangeTopic = (event, newValue) => {
    setSelectedTopic(newValue);
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <Paper elevation={3}>
        <Tabs
          value={selectedTopic}
          onChange={handleChangeTopic}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {data.map((course) => (
            <Tab label={course.course.description} key={course.id} />
          ))}
        </Tabs>
      </Paper>
      <Box mt={2}>
        <Paper elevation={3}>
          <Box p={2}>
            {data[selectedTopic]?.topics.map((topic) => (
              <div key={topic.id}>
                <Typography variant="h6" gutterBottom>
                  {topic.title}
                </Typography>
                <Box display="flex" flexWrap="wrap">
                  {topic.quizzes.map((quiz) => (
                    <Box key={quiz.id} m={1} style={{ width: '100%' }}>
                      <Paper elevation={2}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                          <Typography variant="subtitle2">
                            {quiz.title}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            href={`/quiz/${quiz.id}`}
                            disabled={!quiz?.is_active}
                          >
                            Take Quiz
                          </Button>
                        </Box>
                      </Paper>
                    </Box>
                  ))}
                </Box>
              </div>
            ))}
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Dashboard;
