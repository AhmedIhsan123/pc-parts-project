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

