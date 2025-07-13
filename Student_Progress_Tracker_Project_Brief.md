# Student Progress Tracker — Project Brief

## Project Overview
A modern school management web app for Super Admins, Teachers, and Parents to manage students, classes, and track academic performance.

---

## Core Requirements

### 1. User Roles & Authentication
- **Super Admin:**  
  - Secure login with password.
  - Registers Teachers and Parents, assigning their email addresses.
- **Teacher & Parent:**  
  - No password-based login.
  - Recognized by entering their registered email address.
  - Receive a one-time code (OTP) via email to access their dashboard.
  - No persistent accounts or passwords for these roles.

### 2. Dashboard & Navigation
- **Super Admin:**  
  - Full dashboard with management of all users, classes, subjects, and performance data.
- **Teacher:**  
  - Sees only assigned classes and students.
  - Can enter and view student scores.
- **Parent:**  
  - Sees a dashboard with cards for each of their children (students).
  - Clicking a student card opens a detailed dashboard for that student, showing academic information and performance.

### 3. Student & Academic Management
- **CRUD:** Students, Teachers, Classes, Subjects.
- **Student Registration:** Name, Admission No, Gender, Class, Subjects, Parent Info, Photo upload.
- **Assign Subjects:** Assign subjects to students.
- **Performance Tracking:** Teachers enter scores per subject/student/term.

### 4. Class & Subject Dashboards
- View students by class.
- Subject sidebar: click to view performance chart.
- Interactive charts (Chart.js):  
  - X-axis: Student names  
  - Y-axis: Scores  
  - Unique color per student  
  - Hover for details

### 5. Data Model & API
- **Tables:** students, teachers, parents, classes, subjects, student_subjects, performance.
- **API Endpoints:**  
  - `/api/students`  
  - `/api/teachers`  
  - `/api/classes`  
  - `/api/subjects`  
  - `/api/performance`
- Use Admission Number (not email) for student identification.

### 6. File Uploads
- Student photo upload (with preview).

### 7. Export & Reporting (Future)
- Export reports as CSV/PDF.

---

## Tech Stack

- **Frontend:** React (with Tailwind CSS or Bootstrap), Chart.js
- **Backend:** Node.js/Express or PHP/MySQL (XAMPP compatible), or Firebase/Supabase
- **Database:** MySQL (or compatible)
- **Other:** Responsive, accessible UI

---

## Deliverables

- Modern React app with clean, role-based dashboard
- Secure authentication & one-time code for Teachers/Parents
- Full CRUD for students, teachers, classes, subjects
- Class dashboard with live subject performance charts
- Parent dashboard with student cards and detailed views
- Export option (CSV/PDF) — future enhancement

---

## Notes

- Prioritize security and data privacy.
- Use modular, reusable React components.
- Use Admission Number for student identification.
- Email-based one-time code authentication for Teachers and Parents.

---

## Progress Log

- [x] Project brief and requirements written
- [x] Next.js + Tailwind CSS project detected and dependencies installed
- [x] Initial folder structure created (`components/`, `features/`, `pages/`)
- [x] Base layout and navigation (Navbar) set up using App Router
- [x] Landing page and role-based entry points created
- [x] Super Admin authentication flow (login page, route protection) implemented
- [x] Super Admin dashboard layout and navigation scaffolded
- [x] Students and Teachers management (list/add/edit/delete) implemented
- [x] Parents management (list/add/edit/delete) implemented
- [x] Classes management (list/add/edit/delete) implemented
- [x] Subjects management (list/add/edit/delete) implemented
- [x] Assign Subjects to Students feature implemented
- [x] Class Dashboard and Subject Performance Chart built
- [x] Custom Rules CRUD (add/edit/delete) in Super Admin Settings
- [x] All admin student links (Students, Parents, Classes) now route to student dashboard
- [x] React key warning fixed in rules list

---

**Please build this project from scratch in React, following these requirements and improving on any flaws from the previous PHP/XAMPP version.**
