# crowdfunding_frontend
# 📱 Crowdfunding Frontend

**Crowdfunding Frontend** is the React-based frontend of a full-stack Crowdfunding App.  
It provides a responsive and user-friendly interface that interacts with the Django backend through RESTful APIs using JWT authentication.

---

## 🚀 Features

- ✅ User registration and login with JWT authentication (via `simplejwt`)
- 🧾 Create, view, edit, and delete crowdfunding campaigns
- 🔍 Search campaigns by date
- 🧠 Form validation using Formik and Yup
- 💄 Styled using Bootstrap
- 📡 Connects to Django REST API (Backend)
- 🔐 Role-based access to modify projects

---

## 🛠️ Tech Stack

- **Frontend:** React.js (with Vite)
- **Authentication:** JWT (via Django REST Framework)
- **Styling:** Bootstrap
- **Form Handling:** Formik + Yup
- **State Management:** React Hooks

---

## 📂 Project Structure

```
crowdfunding_frontend/
│
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (e.g., Navbar, Forms)
│   ├── pages/              # Pages like Login, Register, Projects
│   ├── api/                # API interaction files
│   └── App.jsx             # Main app component
├── .env                   # Environment variables (API URL, etc.)
├── package.json           # Project dependencies and scripts
└── README.md              # Project overview
```

---

## 📦 Getting Started

### 🔧 Prerequisites

- Node.js and npm installed
- Backend (`crowdfunding_backend`) running

### 📥 Installation

```bash
git clone https://github.com/shimaaNasserr/crowdfunding_frontend.git
cd crowdfunding_frontend
npm install
```

### ▶️ Running the App

```bash
npm run dev
```

> Make sure to set the backend API URL in `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

---

## 📡 API Integration

This frontend communicates with the backend via:

- `POST /api/token/` – Login
- `POST /api/token/refresh/` – Refresh token
- `GET /api/projects/` – List all campaigns
- `POST /api/projects/` – Create campaign
- `PUT /api/projects/:id/` – Edit campaign
- `DELETE /api/projects/:id/` – Delete campaign

---


## 📃 License

This project is licensed under the MIT License.

