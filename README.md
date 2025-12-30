# 🏨 Wanderlust (Airbnb Clone)
<p align="center">
  <a href="https://airbnb-colon-ccm2.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  &nbsp;&nbsp;
  <a href="https://github.com/dk2430098/airbnb_colon" target="_blank">
    <img src="https://img.shields.io/badge/GitHub%20Repo-View%20Code-black?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

A full-stack web application replicating the core features of Airbnb, built with the MERN stack (MongoDB, Express, React-like EJS, Node.js). This project features a modern, responsive UI using Tailwind CSS and offers a complete booking and property management experience.

## ✨ Key Features

### 🌟 Core Functionality
*   **Property Management:** Users can **Add**, **Edit**, and **Delete** their own listings.
*   **Booking System:** Users can book properties (simulated flow).
*   **Search & Filter:** Real-time search by Title, Location, or Country.
*   **Authentication:** Secure User Sign Up, Login, and Logout functionality (Passport.js).
*   **Authorization:** Granular permissions - only the owner of a listing can edit or delete it.

### 🎨 Modern UI/UX
*   **Glassmorphism Design:** Modern, translucent aesthetic using Tailwind CSS.
*   **Responsive Layout:** Fully optimized for Mobile, Tablet, and Desktop.
*   **Interactive Wishlist:** 
    *   **Like Properties:** Users can add listings to their Wishlist.
    *   **Live Updates:** Heart icon toggles state instantly.
*   **User Dashboard:** A central hub to manage:
    *   **My Listings** (Properties you host)
    *   **My Wishlist** (Properties you liked)
    *   **Hosting Stats**

### 🛠️ Tech Stack
*   **Frontend:** EJS (Templating), Tailwind CSS, Vanilla JavaScript.
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB (with Mongoose).
*   **Authentication:** Passport.js (Local Strategy), Express Session.
*   **Validation:** Joi (Server-side schema validation).

## 🚀 Getting Started

### Prerequisites
*   Node.js installed.
*   MongoDB installed and running.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/dk2430098/airbnb_colon.git
    cd airbnb_colon
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add:
    ```env
    MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
    PORT=8080
    SECRET=your_super_secret_code
    ```

4.  **Run the Server**
    ```bash
    nodemon app.js
    ```

5.  **Open in Browser**
    Visit `http://localhost:8080`

## 📂 Project Structure
```
airbnb_colon/
├── controllers/    # Business logic for Listings and Users
├── models/         # Mongoose Schemas (Listing, User, Review)
├── routes/         # Express Routes
├── views/          # EJS Templates
│   ├── includes/   # Partials (Navbar, Footer, Flash)
│   ├── layouts/    # Base Layout (Boilerplate)
│   ├── listing/    # Listing Pages (Index, Show, New, Edit)
│   └── users/      # User Pages (Login, Signup, Dashboard)
├── public/         # Static Assets (CSS, JS, Images)
├── init/           # Database Initialization Scripts
├── app.js          # Main Application Entry Point
└── package.json    # Dependencies
```

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License
This project is for educational purposes.
