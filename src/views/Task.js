import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Paper,
} from '@mui/material';
import SchoolService from '../services/SchoolService';

const Task = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch the task details using SchoolService
    const fetchTaskData = async () => {
      try {
        const taskData = await SchoolService.getTextTopicTaskByID(taskId);
        setTask(taskData);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskData();
  }, [taskId]);

  return (
    <div style={{padding: "16px"}}>
      {task ? (
        <Paper elevation={3} style={{padding: "16px"}}>
          <Typography variant="h4" gutterBottom>
            {task?.title}
          </Typography>
          <div
            style={{ marginTop: '16px', padding: "16px" }}
            dangerouslySetInnerHTML={{ __html: task.content }}
          />
        </Paper>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default Task;
