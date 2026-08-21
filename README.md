# 🚀 GradeHub Client

GradeHub Client is the React frontend for **GradeHub**, an academic and result management platform. It provides dedicated interfaces for students and administrators to manage and view academic information, courses, results, transcripts, registrations, notifications, and profile settings.

The application is built with React, Vite, Tailwind CSS, React Router, and a collection of reusable UI and feature components.

## 🔗 Related Repository

- Backend API: `https://github.com/mtech10/gradehub-server`

## ✨ Features

### 🔐 Authentication

- Login and registration flows
- Protected application routes
- Role-based routing for students and administrators
- Authentication context/state management

### 🎓 Student Portal

The student application currently includes:

- **Dashboard**
  - Academic statistics
  - Recent results
  - CGPA/performance visualization
  - Current semester courses
  - Upcoming activities

- **Results**
  - Academic result records
  - Session selection
  - Result filtering
  - Result statistics
  - Reusable data tables

- **Academic Transcript**
  - Student information
  - Academic sessions
  - Semester records
  - Course results
  - Semester GPA summaries
  - Transcript viewing and print/download actions

- **GPA Calculator**
  - Course-based GPA calculations
  - Credit-unit and grade-point handling

- **Courses**
  - Current/available course information
  - Course details

- **Course Registration**
  - Current academic-session course registration workflow

- **Notifications**
  - Academic and system notifications

- **Profile**
  - Student profile information

- **Settings**
  - Student account/application settings

### 👨‍💼 Admin Portal

The admin application currently includes:

- Dashboard
- Student management
- Add student
- Edit student
- Student details
- Course management
- Add course
- Edit course
- Course details
- Result management
- Result upload
- Department management
- Add department
- Edit department
- Department details
- Admin profile
- Notifications
- Settings

### 📥 Bulk Data Upload

The frontend includes reusable bulk-upload functionality and downloadable CSV templates for administrative workflows.

Available templates include:

- Students
- Courses
- Results

The templates are available under:

```text
public/templates/
```

### 🧩 Reusable UI System

The application uses reusable UI and feature components including:

- Buttons
- Inputs
- Selects
- Badges
- Cards
- Data tables
- Accordions
- Stat cards
- Page headers
- Filter drawers
- Toolbars
- Bulk action bars
- Bulk upload modals
- Forms
- Layout components

The project also centralizes application configuration and UI constants to reduce duplication and maintain consistency.

## 🛠️ Tech Stack

### Core

- **React 19**
- **Vite**
- **React Router DOM**
- **Tailwind CSS 4**

### UI & Interaction

- **Lucide React**
- **React Icons**
- **Framer Motion**
- **React Hot Toast**

### Forms & Validation

- **React Hook Form**
- **Zod**
- **@hookform/resolvers**

### Data & Visualization

- **Axios**
- **Recharts**
- **clsx**

The exact dependency versions are maintained in `package.json`.

## 📁 Project Structure

The frontend lives inside the `gradehub-client` directory:

```text
gradehub-client/
├── public/
│   ├── templates/
│   │   ├── courses_template.csv
│   │   ├── results_template.csv
│   │   └── students_template.csv
│   └── ...
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── results/
│   │   ├── transcript/
│   │   ├── ui/
│   │   └── layout/
│   │
│   ├── constants/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── student/
│   │
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
└── vite.config.js
```

## 🧭 Application Routes

### Student

```text
/student
/student/results
/student/transcript
/student/gpa-calculator
/student/courses
/student/course-registration
/student/notifications
/student/profile
/student/settings
```

### Admin

```text
/admin
/admin/dashboard
/admin/students
/admin/students/new
/admin/students/:id
/admin/students/:id/edit
/admin/courses
/admin/courses/new
/admin/courses/:id
/admin/courses/:id/edit
/admin/results
/admin/results/upload
/admin/departments
/admin/departments/add
/admin/departments/:id
/admin/departments/:id/edit
/admin/profile
/admin/notifications
/admin/settings
```

These routes are protected by role-aware routing so student and administrator interfaces remain separated.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- A running GradeHub backend API

### Install

From the repository root:

```bash
cd gradehub-client
npm install
```

### Environment Variables

Create a `.env` file in `gradehub-client` for the API configuration used by the application.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, point the variable to the deployed GradeHub API.

> Do not commit `.env` files containing private configuration or secrets.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 🌐 Deployment

The frontend is deployed separately from the backend API.

Production frontend:

```text
https://gradehub-hym1.onrender.com
```

The frontend communicates with the GradeHub server through the configured API base URL.

## 🔄 Frontend ↔ Backend

The client is designed to consume the REST API exposed by the GradeHub server.

The backend repository contains API areas for:

- Authentication
- Departments
- Faculties
- Academic sessions
- Semesters
- Levels
- Courses
- Students
- Course registrations
- Results
- Transcripts
- Dashboard data
- Profiles
- Notifications
- Promotion rules
- Application options

Backend repository:

`https://github.com/mtech10/gradehub-server`

## 📌 Development Status

GradeHub Client is an actively developed application.

Major student and administrative interfaces are implemented, with ongoing refinement of workflows, data handling, validation, responsiveness, and production behavior.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Run lint/build checks:

```bash
npm run lint
npm run build
```

5. Commit your changes:

```bash
git commit -m "Add your feature"
```

6. Push the branch:

```bash
git push origin feature/your-feature
```

## Demo Access

The deployed GradeHub portal includes demo accounts for evaluation.

### Student Account

| Field | Details |
|---|---|
| Email | `ademola@student.ghu.edu.ng` |
| Password | `password` |
| Role | Student |

### Admin Account

| Field | Details |
|---|---|
| Email | `admin2@gradehub.com` |
| Password | `Password123!` |
| Role | Administrator |


> These credentials are provided specifically for demonstration and grading purposes. Please do not use them for real or sensitive information.
>

7. Open a Pull Request.

## 📄 License

This project is currently intended for educational and development purposes.
