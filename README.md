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

This project is intended to serve as an example of a well structured, dynamic web application.

Currently the project reflects *Milestone #2 - Product Catalog & REST Integration*.

---

## Tech Stack

- **Frontend:** HTML / CSS / JavaScript
- **Backend:** Node.js / Express
- **Database:** MySQL / Docker
- **Version Control:** Git & GitHub

---

## Setup Instructions

To setup this repository, just follow these commands: 
(to be filled in later)

---

## SSR Routes

There are two main routes that have been implemented: `/products` and `products/:id`

- `products` - contains information about all products

- `products/:id` - contains information on a single product using its id

---

## API endpoint and supported query parameters

The API endpoint is mounted at `/api/products` and is used to send data from the backend to the frontend.

The supported query parameters of this route include:

- category
`GET /api/products?catergory=`

- brand
`GET /api/products?brand=`

- minPrice
`GET /api/products?minPrice=`

- maxPrice
`GET /api/products?maxPrice=`

- rating
`GET /api/products?rating=`

- sort
`GET /api/products?sort=`

All these parameters can be interacted with on the products page using the filter side menu.

---

## Session-Based Cart

The checkout cart is session-based, meaning it lives entirely on the server inside `req.session.cart` for the duration of a user's browser session. The cart is created on first use and persists automatically across page navigation until the session expires or the user clears their browser cookies.

When a user adds an item, the browser sends a POST /api/cart/items request to the Express API. The server finds the matching session, pushes the item into req.session.cart (or increments its quantity if it's already there), and responds with the full updated cart. The frontend receives that response and immediately re-renders the cart drawer — no page refresh required.

This pattern applies to all of the cart interactions:

```
GET /api/cart - Views cart by returning the current req.session.cart
POST /api/cart/items - Adds new item or increases the quantity if the item already exists
DELETE /api/cart/items/:productId - Removes an item from the cart
POST /api/cart/clear - Removes all items from the cart
```
