📄 README.md

🛍️ Kent's Wardrobe - Full-Stack E-Commerce
Welcome to the official repository for Kent's Wardrobe. This is a React-based retail application integrated with a Spring Boot backend and a TiDB Cloud database.

🚀 Getting Started
To get the project running locally, please follow these steps exactly:

1. Clone the Repository

# Clone the project
git clone https://github.com/charuzur/KentWardrobe-Frontend

# Enter the directory
cd kent-wardrobe

# Switch to the correct development branch
git checkout version2

2. Prerequisites
Node.js (v16 or higher)

Java JDK 17 (or 22)

Maven (for backend dependencies)

Database Connection: We are using Option A: Shared Cloud Method. Please message Charles directly to get the active database credentials and to ensure the TiDB cluster is active before you begin testing.

3. Frontend Installation

# Navigate to the frontend folder
cd kent-wardrobe

# Install dependencies
npm install

# Start the development server
npm start

The application will automatically open at http://localhost:3000.

🛠️ Project Structure
Frontend: React.js (located in /kent-wardrobe)

Backend: Spring Boot (located in the companion /backend repository)

Database: TiDB Cloud (MySQL Dialect)

🔑 Default Credentials for Testing
Use these pre-configured accounts to test role-based functionalities:

Role    Username	Password
Admin	admin	admin123
Shopper	test_user	test123

