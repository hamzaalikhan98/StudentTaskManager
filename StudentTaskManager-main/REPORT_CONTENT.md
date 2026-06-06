# Mobile Application Development Lab Project Report

## Title
Student Task Manager Mobile Application

## Introduction
Student Task Manager is a React Native mobile application developed to help students organize their academic tasks. The app allows users to add tasks, view task lists, check details, mark tasks as completed, and manage task categories. It is designed with a clean and responsive interface suitable for Android and iOS devices.

## Project Objectives
- To develop a mobile application using React Native.
- To implement Redux for global state management.
- To use AsyncStorage for local data persistence.
- To demonstrate navigation and data passing between screens.
- To create a professional and user-friendly interface.
- To apply component-based architecture.

## Tools and Technologies
- React Native
- Expo
- JavaScript
- Redux Toolkit
- React Redux
- AsyncStorage
- React Navigation
- Expo Vector Icons

## App Architecture
The project follows a component-based architecture. Screens are separated from reusable components. Redux manages global application state, while AsyncStorage stores data locally. Navigation is handled using Stack Navigator and Bottom Tab Navigator.

## State Management
Redux Toolkit is used to manage task data globally. The taskSlice file contains actions and reducers for adding tasks, deleting tasks, toggling task completion, loading tasks, and clearing all tasks.

## Storage Mechanism
AsyncStorage is used to save user task data locally. This means the data remains available even after closing and reopening the app.

## Screens Explanation
### Splash Screen
Displays the app name and opens the login screen after a short delay.

### Login Screen
Allows the user to enter email and password and move to the main application.

### Signup Screen
Allows a new user to create an account for demo purposes.

### Home Dashboard
Displays total tasks, pending tasks, and completed tasks.

### Add Task Screen
Allows users to enter task title, category, priority, and description.

### Task List Screen
Displays all saved tasks using reusable task cards.

### Task Detail Screen
Shows complete task information and allows status update or deletion.

### Categories Screen
Displays academic task categories such as Assignment, Quiz, Lab, Project, and Presentation.

### Profile Screen
Displays student profile information.

### Settings Screen
Shows app information and provides an option to clear all tasks.

## Challenges Faced
Some challenges included managing data between multiple screens, saving data locally, and keeping the interface responsive. These challenges were solved by using Redux, AsyncStorage, and reusable components.

## Conclusion
The Student Task Manager app successfully fulfills the requirements of the MAD Lab project. It demonstrates React Native navigation, Redux state management, AsyncStorage, reusable components, and professional mobile app design.
