import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import Login from '../views/Login';
import Register from '../views/Register';
import UpdateProfile from '../views/UpdateProfile';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword';
import Dashboard from "../views/Dashboard";
import QuizzesList from '../views/QuizzesList';
import QuizPage from '../views/QuizPage';
import Gradebook from '../views/Gradebook';
import AttemptDetail from '../views/AttemptDetail';
import QuizLeaderboard from '../views/QuizLeaderboard';
import Tasks from '../views/Tasks';
import Task from '../views/Task';
import AuthService from '../services/AuthService';

const isAuthenticated = () => {
  return AuthService.isAuthenticated();
}


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute isAuthenticated={isAuthenticated()}>
          <Login />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute isAuthenticated={isAuthenticated()}>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute isAuthenticated={isAuthenticated()}>
          <Register />
        </PublicRoute>
      } />
      <Route path="/forgot-password" element={
        <PublicRoute isAuthenticated={isAuthenticated()}>
          <ForgotPassword />
        </PublicRoute>
      } />
      <Route path="/password-reset-confirm/:uidb64/:token" element={
        <PublicRoute isAuthenticated={isAuthenticated()}>
          <ResetPassword />
        </PublicRoute>
      } />
      <>
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/quizzes" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <QuizzesList />
          </ProtectedRoute>
        } />
        <Route path="/quiz/:quizId" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <QuizPage />
          </ProtectedRoute>
        } />
        <Route path="/update-profile" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <UpdateProfile />
          </ProtectedRoute>
        } />
        <Route path="/gradebook" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Gradebook />
          </ProtectedRoute>
        } />
        <Route path="/attempt/:attemptID" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <AttemptDetail />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <QuizLeaderboard />
          </ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Tasks />
          </ProtectedRoute>
        } />
        <Route path="/task/:taskId" element={
          <ProtectedRoute isAuthenticated={isAuthenticated()}>
            <Task />
          </ProtectedRoute>
        } />
      </>
    </Routes>
  );
};

export default AppRoutes;
