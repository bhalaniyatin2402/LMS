# Learning Management System using MERN stack

### User Credentials for Testing
#### currently payment gateway of razorpay is going to trouble on razorpay side in test mode so you can test via this users.
- `user one`
  - `email` : one@gmail.com
  - `password` : one@1234
- `user two`
  - `email` : two@gmail.com
  - `password` : two@1234

## Features

- `authentication`
  - complete auth including update profile, forgot, reset and change password
- `authoriztion` - protected routes that access by only admin
- `protected courses` - user access only purchase courses
- `lecture notes` - user add notes to each lecture
- `lecture mark` - user can mark viewd lecture
- `dashboard` - details of users and courses

## Project Setup

To run project locally

- clone repo

```
git clone https://github.com/bhalaniyatin2402/LMS.git
```

### Frontend setup

- `cd client` in root directory
- `npm install` in client directory to install all depedncies
- `npm run dev` to start project

### Backend setup

- `cd server` in root directory
- `npm install` in server directory to install all depedncies
- Set `environment variables`
  - `PORT` - port number to listen the server
  - `FRONT_URL`
  - `MONGO_URL` - url of your local_database or Atlas
  - secret token and expiry
    - `JWT_SECRET_KEY`
    - `JWT_EXPIRY`
  - gmail credentials
    - `SMTP_USERNAME`
    - `SMTP_PASSWORD`
  - cloudinary credentials
    - `CLOUD_NAME`
    - `CLOUD_API_KEY`
    - `CLOUD_API_SECRET`
  - stripe credentials
    - `STRIPE_SECRET`
- `npm run dev` to start project
