# RBAC Cybersecurity Demo Dashboard

A full-stack web application demonstrating Authentication and Role-Based Access Control (RBAC) in a cybersecurity context. This project simulates a Cybersecurity Incident Monitoring Dashboard where users with different roles have varying levels of access, permissions, and views.

## 🚀 Features

- **Secure Authentication**: JWT-based login system with robust password hashing.
- **Role-Based Access Control (RBAC)**: Strict permission enforcement on both the frontend UI and backend API routes.
- **Distinct Navigation & Views**: 
  - **Admin**: Full system access, user management, and configuration.
  - **Security Analyst**: Access to live incident logs and threat monitoring panels.
  - **User**: Standard dashboard access.
  - **Guest**: Restricted read-only view.
- **Modern UI/UX**: Clean, responsive, and cybersecurity-themed interface built with React and Tailwind CSS.
- **Live Access Logs**: Simulation of backend access attempts and monitoring.
- **Seed Data**: Pre-configured demo accounts to easily test various roles out of the box.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Security**: JSON Web Tokens (JWT), bcrypt for password hashing

## 📂 Project Structure

- `/frontend` - Contains the React Vite application and UI components.
- `/backend` - Contains the Node.js API, authentication middleware, and database logic.

## 🚦 Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB (if configuring a local database, or use the provided cloud config).

### Installation & Running Locally

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Run the seed file to generate demo users (optional)
   node seed.js
   # Start the Express server
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Start the Vite development server
   npm run dev
   ```

## 🔐 Demo Accounts
*The seed script creates the following demo accounts (check `seed.js` for passwords):*
- `admin@demo.com`
- `analyst@demo.com`
- `user@demo.com`
- `guest@demo.com`

---
*Created and maintained by Dhanalakshmi K.*
