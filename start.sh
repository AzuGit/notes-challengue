#!/bin/bash

# Navigate to the backend directory and install dependencies
cd backend
npm install

# Start the backend server
npm start &

# Navigate to the frontend directory and install dependencies
cd ../frontend
npm install

# Start the frontend server
npm start &

# Wait for both processes to finish
wait