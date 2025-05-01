# 🧋 BobaShop - EJS + Node.js + MongoDB

BobaShop is a simple e-commerce website for bubble tea, built with:

- 🌐 Node.js & Express (Backend)
- 🖼️ EJS (Templating Engine)
- 🍃 MongoDB (Database)
- 🔄 Nodemon (Dev environment)

---

## 📁 Project Structure

/bobashop ├── public/ # Static files (CSS, images) ├── views/ # EJS templates ├── routes/ # Route handlers ├── controllers/ # Controller logic ├── models/ # Mongoose schemas ├── app.js # Main Express app ├── .env # Environment variables └── package.json # Project metadata & dependencies


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bobashop.git
cd bobashop

npm install

PORT=3000
MONGODB_URI=mongodb://localhost:27017/bobashop

nodemon app.js
http://localhost:4000

