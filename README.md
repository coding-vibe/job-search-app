# Job search

Job Search Web Application - a modern, user-friendly web application that helps users search for jobs tailored to their profile. Built with a focus on responsive design, usability, and seamless interaction.

## Features

- Account registration
- JWT login
- Search jobs by keyword
- View job details
- Add/Remove jobs to favorite list.

## Tech stack

FE:

- React
- TypeScript
- Next.js
- Tailwind
- Formik

BE:

- Express.js
- MongoDB
- Mongoose
- Passport.js

## Running of the app

### Back-end

Source code for the API is located in `backend` folder.

1. Create `.env` using `env-template`.
2. Install dependencies - `npm i`.
3. Start the project using `npm start`

View [**Demo**](https://job-search-api-4gyq.onrender.com)

**Important**: the back-end is deployed on free plan of Render. Render shuts down the server instance due to long periods of inactivity and relaunches the app on a new request. According to Render docs restart of the server can take up to 50 sec. 

### Front-end

1. Create `.env` using `env-template`.
2. Install dependencies - `npm i`.
3. Prepare production build using `npm run build`
4. Start application - `npm start`.

View [**Demo**](https://job-search-app-ruddy-six.vercel.app/jobs)
