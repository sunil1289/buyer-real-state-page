
# EstateHub — Buyer Portal

A simple real estate portal where buyers can sign up, log in, and save properties they like.

Built with Node.js, Express, React, Tailwind CSS and MongoDB.

---

## Setup

**1. Clone the project**

git clone https://github.com/sunil1289/buyer-real-state-page
cd buyer-real-state-page

**2. Set up MongoDB**

Download MongoDB Compass from https://www.mongodb.com/products/compass

Open it and connect to mongodb://localhost:27017
No need to create a database — it gets created automatically.

**3. Create a .env file inside the backend folder**

PORT=backend port usally 5000


MONGO_URI=mongodb:  --- your mongodb local adress


JWT_SECRET= your generted key

**4. Run the backend**

cd backend
npm install
npm run dev

You should see: Server running on port 5000 and MongoDB Connected

**5. Run the frontend (open a new terminal)**

cd frontend

npm install

npm start

App opens at http://localhost:3000

---

## How it works

Sign up — click Register, fill in your name, email and password, hit Create account


Log in — enter your email and password, hit Sign in, you land on your dashboard


Add a property — click Add property, fill in the name, location, price and optional photo, hit Save property


Edit a property — click Edit on any card, update what you want, hit Save changes

Remove a property — click Remove on any card and it disappears instantly


Log out — click Sign out in the navbar and you go back to the login page


---

Make sure MongoDB Compass is open and running before you start the backend.
