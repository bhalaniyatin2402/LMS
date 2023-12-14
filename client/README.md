# Frontend of LMS using React + Vite

## Routes
- `/` 
- `/about`
- `/courses`
- `/register`
- `/login`
- `/forgot/password`
- `/reset/password/:resetToken`

### Access - Only Logged in User Allowed
- `/user/profile`
- `/user/edit-profile`
- `/user/change-password`
- `/course/:courseId`
- `/user/courses`

### Access - Only Admin is Allowed
- `/course/create`
- `/course/update`
- `/course/lecture/add`
- `/course/lecture/update`
- `/admin/dashboard`

### payment gateway
- `/checkout`
- `/payment/success`
- `/payment/failure`

### Error Handling
- `*` - 404 - page not found
- `/denied` - 403 - access denied
- `/error` - 500 - something went wrong


## npm modules
- @reduxjs/toolkit
- react-redux
- formik
- socket.io-client
- yup
- react-hot-toast
- daisyui
- react-i18next
- react-icons
- react-router-dom
- sass


## File Structure
-  `public` - streamy logo shows in tab
-  `src`
    -  `assets` - images like avatar, no-photo etc..
    -  `components`
        - `forms` - checkbox and custom form input
        - `layouts` - common layouts that use most
        - `ui` - component that use repetatively
    -  `constants` - store some data and form schemas
    -  `pages` - pages describe same as in Routes above
    -   `redux` 
        - `services` - describe services of lms api
        - `slices` - slice to manage state globally
        - `store.js` - store data of services and slice 
    -  `routes` - set up custom routes using react-router-dom
    -   `styles` - style using scss for pages and componets
    -  `App.jsx`
    - `index.scss`
    - `main.jsx`
    - `mixins.scss`
- `index.html` - root element
- `.gitignore`
- `package.json`
-  `tailwind.config.js`


## Project Setup
To run project locally
- Clone repo
- `npm install` in root directory to install all depedncies
- Set for `environment variables` in root
    - `VITE_APP_TMDB_TOKEN` - for get access of tmdb api to get result - get on tmdb site by login and get token
- `npm run dev` to start project
