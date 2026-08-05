# 🎓 Smart Attendance Management System

A full-stack attendance management system developed to digitize attendance tracking in educational institutions. The system provides separate dashboards for Students, Faculty, and Administrators with role-based access and real-time attendance management.

---

## 📌 Problem Statement

Traditional attendance management relied on manual processes, making it time-consuming, error-prone, and difficult to monitor across multiple classes and departments.

---

## 💡 Solution

Developed a web-based attendance management system that enables:

- Students to view attendance records
- Faculty to mark and manage attendance
- Administrators to manage faculty, monitor attendance statistics, and generate reports

The application was deployed on AWS cloud infrastructure during development using EC2, Aurora RDS, Amazon S3, and a custom VPC.

> **Note:** The cloud infrastructure has been terminated after project completion to avoid recurring AWS costs. The complete source code, architecture diagrams, and documentation remain available in this repository.

---

# ✨ Features

## Student

- Secure Login
- Dashboard
- Attendance Percentage
- Attendance History
- Institutional Announcements
- Feedback Portal

## Faculty

- Faculty Dashboard
- Mark Attendance
- Attendance Overview
- Defaulters List
- Attendance Records

## Administrator

- Admin Dashboard
- Manage Faculty
- Add Faculty
- Delete Faculty
- Mark Attendance
- Attendance Analytics
- CSV Report Generation

---

# 🛠 Tech Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Axios

## Backend

- Node.js
- Express.js
- REST API

## Database

- MySQL
- Amazon Aurora RDS

## Cloud Services

- AWS EC2
- Amazon Aurora RDS
- Amazon S3
- AWS VPC

---

# ☁ Cloud Architecture

The application was originally deployed on AWS using:

- Virtual Private Cloud (VPC)
- Amazon EC2
- Amazon Aurora RDS
- Amazon S3
- Security Groups
- Internet Gateway

Cloud architecture documentation is available in the **architecture/** folder.

---

# 🗄 Database Design

The database follows a normalized relational model consisting of:

- Student
- Faculty
- Admin
- Course
- Semester
- Attendance
- Login Access
- Student_Course
- Faculty_Course


# 📂 Project Structure

```
frontend/
backend/
database/
architecture/
screenshots/
docs/

---

# 🚀 Future Improvements

- JWT Authentication
- Password Encryption
- Docker Deployment
- CI/CD Pipeline
- Email Notifications
- Mobile Responsive Design
- Attendance Analytics Dashboard

---

# 👨‍💻 Author

**Vijay Ravi**

email : vijayravi2705@gmail.com

---

# 📄 License

This project is intended for educational and portfolio purposes.
