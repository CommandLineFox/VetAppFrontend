# VetAppFrontend

Master Studies Project - Veterinary Clinic Management System (Client Side)

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-E2E-17202C?style=flat-square&logo=cypress&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Stable-009639?style=flat-square&logo=nginx&logoColor=white)

## Project Overview

This is the frontend client for the Veterinary Clinic Management System. It provides a modern, responsive user interface for veterinarians and clinic staff to manage patients, owners, medical examinations, and appointments. The application communicates with the Spring Boot backend via a secure REST
API.

## Core Features

* **Secure Dashboard**: Protected routes and role-based UI components based on JWT tokens.

* **Patient Management**: Create, update, and search for pet records and medical histories.

* **Examination Workflow**: Intuitive forms for recording medical examinations and prescriptions.

* **Responsive Design**: Fully optimized for various screen sizes using Tailwind CSS.

* **Real-time Validatio**n: Robust form handling and error feedback for a smooth user experience.

## Tehnlogies

| Layer             | Technology                                                                                                  |
|:------------------|:------------------------------------------------------------------------------------------------------------|
| **Library**       | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)                  |
| **Styling**       | ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) |
| **State/Routing** | ![Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat&logo=react-router&logoColor=white)   |
| **API Client**    | ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat&logo=axios&logoColor=white)                  |
| **E2E Testing**   | ![Cypress](https://img.shields.io/badge/-Cypress-17202C?style=flat&logo=cypress&logoColor=white)            |
| **Server**        | ![Nginx](https://img.shields.io/badge/-Nginx-009639?style=flat&logo=nginx&logoColor=white)                  |
| **Build Tool**    | ![NPM](https://img.shields.io/badge/-NPM-CB3837?style=flat&logo=npm&logoColor=white)                        |

## Installation and Setup

### Prerequisites

* Node.js (v18 or higher)
* NPM (v9 or higher)
* Running VetAppBackend instance

### Configuration

1. Environment Variables: Create a .env file in the root directory:

```env
    REACT_APP_API_URL=http://localhost:8080/api
```

### Building and Running

This assumes that you have a running backend instance with a database initialized.

1. Clone the repository:

```bash
    git clone https://github.com/CommandLineFox/VetAppFrontend.git
```

2. Navigate to the project root:

```bash
    cd VetAppFrontend
```

3. Install dependencies:

```bash
    npm install
```

4. Start the development server:

```bash
    npm start
```

## Running with Docker (Production Mode)

The frontend is containerized using a multi-stage Docker build, serving static files via Nginx.
Steps

### Prerequisites
- Docker
- Docker Compose

### Steps

1. Build and start the container:
    
```bash
    docker-compose up --build
```

The application will be available at `http://localhost:3000`.

## Testing

End-to-End (E2E) tests are implemented using Cypress to ensure the full-stack flow works correctly.
Running Tests

To run tests in headless mode:

```bash
    npm run cypress:run
```

To open the interactive Cypress Test Runner:

```bash
    npm run cypress:open
```

## System Architecture

The frontend follows a modular component-based architecture:

* Components: Reusable UI elements (Buttons, Inputs, Modals).

* Pages: Main views (Login, Dashboard, PatientProfile).

* Services: API communication logic using Axios interceptors for JWT injection.

* Hooks: Custom React hooks for shared logic (e.g., authentication, data fetching).

* Context: Global state management for user sessions and notifications.