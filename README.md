# 🥕 Squash

**Squash** is a cozy, beginner-friendly personal finance web app designed to help users
build healthier money habits through thoughtful budgeting and clear insights.

With a calm, fall-inspired interface and a focus on simplicity, Squash makes tracking
spending feel approachable, intentional, and stress-free.

---

## 🍂 What Squash Helps With

- Understanding where your money goes
- Staying mindful about everyday spending
- Building consistent budgeting habits
- Gaining clarity without financial overwhelm

Squash is not about perfection — it’s about progress.

---

## ✨ Features

- Add and track expenses
- Categorize spending
- View recent expense history
- Persistent data storage with PostgreSQL
- Clean REST API built with Express
- Cozy, fall-inspired UI focused on clarity and calm

**Planned features**
- Monthly spending summaries
- Gentle progress indicators for financial goals
- Visual insights by category
- Improved budgeting breakdowns

---

## 🛠 Tech Stack

### Frontend
- React (Create React App)
- JavaScript (ES6+)
- HTML & CSS (custom styling)

### Backend
- Node.js
- Express
- PostgreSQL
- `pg` (node-postgres)

### Tooling
- VS Code
- Git & GitHub
- dotenv
- RESTful API architecture

---

## 🗂 Project Structure

```

squash-finance/
│
├── client/        # React frontend
├── server/        # Express + PostgreSQL backend
└── README.md

````

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/squash-finance.git
cd squash-finance
````

---

### 2. Set up the backend

```bash
cd server
npm install
createdb squash_db
node index.js
```

Create a `.env` file in `server/`:

```env
DATABASE_URL=postgresql://localhost:5432/squash_db
```

---

### 3. Set up the frontend

```bash
cd ../client
npm install
npm start
```

The app will run at:

```
http://localhost:3000
```

---

## 🌿 Why Squash?

The name **Squash** represents making the most of what we have — thoughtfully,
intentionally, and at our own pace.

Inspired by fall, harvest, and cozy productivity, Squash is designed to feel less
like a financial tool and more like a quiet space for reflection and clarity.

---

## 🌱 Future Improvements

* Authentication
* Data visualization (charts)
* Responsive mobile layout
* Deployment (Render / Railway)
* Accessibility improvements

---

## ✨ Author

Built by **tunaabop**
