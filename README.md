# 🛒 Phimart — E-Commerce Website

Phimart is a modern **e-commerce platform** that allows users to browse, purchase, and review products easily and securely.  
It features a **React + Tailwind CSS** frontend, a **Django REST Framework** backend, and a **PostgreSQL** database.  
Users can authenticate using **JWT tokens**, make payments via **SSLCommerz**, and manage their profiles effortlessly.  
Admins have full control over managing products, categories, and users.

---

## 🚀 Features

### 👥 User Features
- 🔐 Secure registration and login using JWT authentication  
- 🛍️ Browse and purchase products  
- 💳 Online payment integration using **SSLCommerz**  
- ✍️ Write and manage product reviews  
- 👤 View and update user profile information  

### 🧑‍💼 Admin Features
- 📦 Manage all products (CRUD operations)  
- 🗂️ Manage categories and subcategories  
- 👥 Manage all users (view, update, delete)  
- 💹 View order and payment details  

---

## 🧰 Technologies Used

### 🔙 Backend
- **Django** — Backend framework  
- **Django REST Framework (DRF)** — RESTful API creation  
- **PostgreSQL** — Database  
- **JWT Authentication** — Secure user authentication  
- **SSLCommerz** — Payment gateway integration  

### 🎨 Frontend
- **React.js** — Frontend library  
- **Tailwind CSS** — Utility-first CSS framework for styling  

---

## 🧩 System Architecture

```
Frontend (React + Tailwind)
        |
        | --> REST API (JWT Auth)
        |
Backend (Django + DRF)
        |
        | --> PostgreSQL Database
        |
Payment Gateway (SSLCommerz)
```

---

## ⚙️ Installation & Setup

### 🖥️ Backend Setup (Django)
```bash
# Clone the repository
git clone https://github.com/yourusername/phimart.git
cd phimart/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # For Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables (.env)
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgresql://username:password@localhost:5432/phimart
SSL_COMMERZ_STORE_ID=your_store_id
SSL_COMMERZ_STORE_PASSWORD=your_store_password

# Run migrations
python manage.py migrate

# Start the server
python manage.py runserver
```

### 🌐 Frontend Setup (React)
```bash
cd ../frontend

# Install dependencies
npm install

# Setup environment variables (.env)
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/

# Start the development server
npm run dev
```

---

## 💳 Payment Integration

Phimart uses **SSLCommerz**, a popular Bangladeshi payment gateway, for handling secure transactions.

- Supports multiple payment methods (bKash, Nagad, cards, etc.)
- Integrated with Django via REST API

---

## 🔐 Authentication

Phimart implements **JWT-based authentication**:
- Token issued on login or signup
- Access and refresh tokens used for secure API requests
- Token refresh handled automatically by the frontend

---

## 📂 Project Structure

```
phimart/
├── backend/
│   ├── manage.py
│   ├── core/               # Django settings and URLs
│   ├── products/           # Product and category logic
│   ├── users/              # User authentication and profiles
│   ├── orders/             # Orders and payment handling
│   └── reviews/            # Product reviews
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🧪 Testing

Run backend tests:
```bash
python manage.py test
```

Run frontend tests:
```bash
npm test
```

---

## 🚀 Deployment

Phimart can be deployed on:
- **Backend:** Render / Railway / Heroku  
- **Frontend:** Vercel / Netlify  
- **Database:** PostgreSQL (Render or Supabase)  

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🤝 Contributing

Contributions are welcome!  
1. Fork the repository  
2. Create a new branch (`feature/new-feature`)  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request  

---

## 👨‍💻 Author

**Shahinur Islam**  
📧 Email: shahinurislam728@gmail.com 
🌐 GitHub: [github.com/shahinurbd](https://github.com/shahinurbd)

---

⭐ **If you like this project, give it a star!**
