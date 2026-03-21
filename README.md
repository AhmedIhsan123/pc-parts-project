# SurgeForge


## Team Members

- **Ahmed Ihsan** - [@AhmedIhsan123](https://github.com/AhmedIhsan123)
- **Elvin Hrytsyuk** - [@Elvin-code-dev](https://github.com/Elvin-code-dev)
- **Jason Makhovitskiy** - [@jmakho01](https://github.com/jmakho01)
- **Anthony Kravchishin** – [@Kravcant](https://github.com/Kravcant)
---

## Project Overview

**SurgeForge** is a modern eCommerce web application focused on PC components. This webpage is designed to provide users with a streamlined experience for browsing, filtering, and purchasing computer hardware.

The application emphasizes:
- Advanced filtering and search functionality
- Clean, intuitive UI/UX
- Server side rendering
- MySQL database integration
- REST-style API endpoints
- Session-based authentication and protected routes

This project is intended to serve as an example of a well structured, dynamic web application.

Currently the project reflects *Milestone #3 - Authentication & Authorization*.

---

## Tech Stack

- **Frontend:** HTML / CSS / JavaScript
- **Backend:** Node.js / Express
- **Database:** MySQL / Docker
- **Auth:** express-session + bcrypt
- **Version Control:** Git & GitHub

---

## Project Architecture

The project is split into two independent Node.js servers:

| Server | Default Port | Role |
|---|---|---|
| `pc-parts-api` | `8001` | REST API + EJS SSR (backend) |
| `frontend` | `8002` | Frontend server (proxies auth checks to API) |

The frontend server does **not** have its own database connection. It validates sessions by calling `http://localhost:8001/auth/check` on every protected request.

---

## Setup Instructions

### Prerequisites

- Node.js >= 18
- Docker (for MySQL)
- A `.env` file in each server directory (see below)

### 1. Clone the repository

```bash
git clone https://github.com/AhmedIhsan123/pc-parts-project.git
cd pc-parts-project
```

### 2. Configure environment variables

Create a `.env` file inside **`pc-parts-api/`**:

```env
PORT=8001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pcparts
```

Create a `.env` file inside **`frontend/`**:

```env
PORT=8002
```

### 3. Set up the database

Run the following scripts against your MySQL instance in order:

```bash
# 1. Create the schema (drops and recreates the pcparts database)
mysql -u root -p < pc-parts-api/src/scripts/schema.sql

# 2. Seed initial product and category data
mysql -u root -p < pc-parts-api/src/scripts/seed.sql
```

The schema creates three tables: `categories`, `products`, and `users`.

### 4. Install dependencies and start the servers

```bash
# Install API dependencies and start
cd pc-parts-api
npm install
npm run dev

# In a new terminal, install frontend dependencies and start
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:8002`.

---

## Authentication Flow

SurgeForge uses **server-side session authentication** powered by `express-session` and `bcrypt`. Sessions are stored in memory on the API server and identified by an `httpOnly` cookie.

### Register

1. User submits a username, password, and confirmation via the registration form (`/register`).
2. The frontend sends `POST /register` to the API.
3. The API validates all fields and checks that the passwords match.
4. The password is hashed with bcrypt (10 salt rounds) before being stored in the `users` table.
5. On success, the API responds with `{ success: true }`.

### Login

1. User submits credentials via the login form (`/login`).
2. The frontend sends `POST /login` to the API.
3. The API looks up the user by username and compares the submitted password against the stored bcrypt hash.
4. On success, the user object (`userId`, `username`) is written to `req.session.user` and the API responds with `{ success: true, user: { ... } }`.
5. The browser receives a session cookie that is sent automatically on all subsequent requests.

### Logout

1. User clicks the logout button, which triggers `GET /logout`.
2. The API calls `req.session.destroy()`, invalidating the session on the server.
3. The API responds with `{ success: true }`.

### Session Check

Both servers use an internal `GET /auth/check` endpoint to verify whether a request carries a valid session:

- Returns `200 { loggedIn: true, user: { ... } }` if the session is active.
- Returns `401 { loggedIn: false }` if the session is missing or expired.

The frontend server calls this endpoint as middleware on every page load to populate `res.locals.user` for use in EJS templates, and to guard protected routes before rendering them.

---

## Routes

### Frontend Routes (`frontend` server — port 8002)

| Method | Path | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Landing page |
| `GET` | `/login` | Public | Login page |
| `GET` | `/register` | Public | Registration page |
| `GET` | `/products` | Protected | Product listing page |
| `GET` | `/products/:id` | Protected | Product detail page |

Unauthenticated users who attempt to access a protected frontend route are redirected to `/login`.

---

## API Endpoints

All API endpoints are served by the `pc-parts-api` server on port **8001**.

### Authentication Endpoints (Public)

| Method | Path | Description |
|---|---|---|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Log in and create a session |
| `GET` | `/logout` | Destroy the current session |
| `GET` | `/auth/check` | Check if the current session is valid |

### Products Endpoints (Protected)

All product endpoints require a valid session. Requests without an active session receive `401 Unauthorized`.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products` | Return all products |
| `GET` | `/api/products/:id` | Return a single product by ID |
| `GET` | `/api/products/search` | Filter and sort products (see query params below) |
| `GET` | `/api/products/search-global` | Lightweight name search (returns `id`, `product_name`, `price`, `image_url`) |

#### `/api/products/search` — Supported Query Parameters

At least one parameter is required. All parameters are optional and combinable.

| Parameter | Type | Description |
|---|---|---|
| `category` | string (comma-separated) | Filter by one or more category names |
| `brand` | string (comma-separated) | Filter by one or more brand names |
| `minPrice` | number | Minimum price (inclusive) |
| `maxPrice` | number | Maximum price (inclusive) |
| `minRating` | number | Minimum rating (0.0 – 5.0) |
| `sort` | string | Sort order: `featured`, `price-asc`, `price-desc`, `rating`, `name-asc` |

**Example:**
```
GET /api/products/search?category=GPU,CPU&minPrice=100&maxPrice=500&sort=price-asc
```

#### `/api/products/search-global` — Supported Query Parameters

| Parameter | Type | Description |
|---|---|---|
| `search` | string | Partial product name to match (up to 10 results) |

**Example:**
```
GET /api/products/search-global?search=RTX
```

### Cart Endpoints (Protected — session-scoped)

The cart lives inside `req.session.cart` on the API server. It is created on first use and persists for the duration of the browser session. All cart endpoints require an active session.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/cart` | Return the current session cart |
| `POST` | `/api/cart/items` | Add an item, or increment its quantity if it already exists |
| `DELETE` | `/api/cart/items/:productId` | Remove an item from the cart entirely |
| `POST` | `/api/cart/clear` | Empty the cart |

When an item is added via `POST /api/cart/items`, the server responds with the full updated cart. The frontend re-renders the cart drawer immediately without a page reload.

---

## Session-Based Cart

The checkout cart is session-based, meaning it lives entirely on the server inside `req.session.cart` for the duration of a user's browser session. The cart is created on first use and persists automatically across page navigation until the session expires or the user clears their browser cookies.

When a user adds an item, the browser sends a `POST /api/cart/items` request to the Express API. The server finds the matching session, pushes the item into `req.session.cart` (or increments its quantity if it's already there), and responds with the full updated cart. The frontend receives that response and immediately re-renders the cart drawer — no page refresh required.
