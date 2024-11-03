# Kanban Board

## Overview

This project is a task management application that allows users to create, edit, and manage boards, columns, tasks, and subtasks. Users can sign in using Google OAuth, and their data is stored in a MongoDB database. The application is built using React for the frontend and Express for the backend.

## Features

- **User Authentication**: Users can sign in using Google OAuth.
- **Board Management**: Users can create, edit, and delete boards.
- **Column Management**: Users can add columns to boards and manage them.
- **Task Management**: Users can add tasks to columns, edit them, and mark subtasks as completed.

## Project Structure

### Frontend

The frontend is built using React and is located in the `client/src` directory. Here are the key components and their locations:

- **App.jsx**: The main application component.
- **Sidebar.jsx**: The sidebar component that displays all boards.
- **BoardForm.jsx**: The form component for creating and editing boards.
- **TaskForm.jsx**: The form component for creating and editing tasks.
- **Toolbar.jsx**: The toolbar component that provides actions for the current board.
- **Content.jsx**: The main content component that displays the columns and tasks.
- **DeleteForm.jsx**: The form component for deleting boards and tasks.
- **Overlay.jsx**: The overlay component for displaying forms and spinners.
- **SignInForm.jsx**: The form component for signing in with Google OAuth.
- **TaskDetails.jsx**: The component for displaying task details.
- **Task.jsx**: The component for displaying a single task.
- **Column.jsx**: The component for displaying a single column.
- **BoardButton.jsx**: The button component for selecting a board.
- **Spinner.jsx**: The spinner component for indicating loading state.

### Backend

The backend is built using Express and is located in the `server` directory. Here are the key files and their locations:

- **server.js**: The main server file that sets up the Express application and connects to MongoDB.
- **config/dbConn.js**: The file that contains the function to connect to MongoDB.
- **controllers/boardController.js**: The controller file for handling board-related requests.
- **controllers/taskController.js**: The controller file for handling task-related requests.
- **routes/data.js**: The file that defines the routes for handling data-related requests.
- **model/User.js**: The Mongoose model file for the User schema.

## Getting Started

### Installation

1. Install the dependencies:

```bash
npm install
```

2. Start the application:

```bash
npm start
```

3. Open your browser and navigate to `http://localhost:5000`.

## Demo

You can find the link of the demo [here](https://www.loom.com/share/064525aff05e496b99d4886d393c47cf?sid=4080f40e-9146-4937-a985-4ff5d1c00b71)
