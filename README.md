Project Description
This is a full-stack web application that allows users to search for recipes based on a list of ingredients they provide. The project features a RESTful API built with Node.js and a dynamic user interface created with React. The application demonstrates a decoupled architecture, API integration, and basic state management.

Features
Recipe Search: Users can input a list of ingredients and receive a list of matching recipes.

Recipe Details: Users can click on a recipe to view detailed information, including ingredients and instructions.

Responsive UI: The application's interface is designed to be user-friendly on both desktop and mobile devices.

Technologies Used
Backend: Node.js, Express.js, Axios, dotenv

Frontend: React, Axios, React Router DOM

Third-Party API: Spoonacular API

Getting Started (Local Setup)
To run this project locally, follow these simple steps.

Clone the Repository:
git clone [your-repo-url]

Navigate to the project:
cd [your-project-folder]

Automatic Setup with setup.bat
This project includes a batch script to automate the installation of all dependencies for both the frontend and backend. Copy the code below into a new file named setup.bat and save it in the root of your project folder.

setup.bat

Code snippet

@echo off
echo Installing backend dependencies...
cd back
npm install
cd ..

echo Installing frontend dependencies...
cd front\app
npm install
cd ..
cd ..

echo Setup complete! You can now run the project.
pause
Now, double-click the setup.bat file to run it.

Create a .env file
In the back folder, create a file named .env and add your Spoonacular API key.
SPOONACULAR_API_KEY=YOUR_API_KEY

Run the Application
You will need to open two separate terminal windows.

In the first terminal, navigate to the back folder and run the backend server.
cd back
node index.js

In the second terminal, navigate to the front/app folder and run the frontend application.
cd front\app
npm start

Your application will now be running at http://localhost:3000.
