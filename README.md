#  WanderLust

**WanderLust** is a full-stack travel listing web application inspired by platforms like Airbnb. Users can create, view, edit, and delete listings with descriptions, images, and reviews. This project is built using Node.js, Express.js, MongoDB, and EJS, with validation and flash messaging features integrated.

---

##  Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Frontend**: EJS Templating, Bootstrap 5
* **Validation**: Joi
* **Utilities**: Express-Session, Connect-Flash, Method-Override

---

##  Key Features

*  Create, update, and delete listings
*  Server-side validation using Joi
*  Flash success/error messages using Connect-Flash
*  Reviews with rating and comment per listing
*  Automatically deletes associated reviews when listing is removed
*  Fallback default image if user doesn't provide one

---

##  Installation & Setup

1. **Clone the Repository**

```bash
$ git clone https://github.com/your-username/wanderlust.git
$ cd wanderlust
```

2. **Install Dependencies**

```bash
$ npm install
```

3. **Start MongoDB**
   Ensure MongoDB is installed and running:

```bash
$ mongod
```

4. **Run the Application**

```bash
$ nodemon app.js
# or
$ node app.js
```

By default, the app runs at:

```
http://localhost:8080/
```

---

##  Project Structure

```
wanderlust/
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/
│   ├── data.js
│   └── index.js
├── models/
│   ├── listings.js
│   ├── review.js
│   └── user.js
├── node_modules/
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── favicon.svg
├── routes/
│   ├── category.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/
│   ├── ExpressError.js
│   └── WrapAsync.js
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── searchResults.ejs
│   │   └── show.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   └── error.ejs
├── .env
├── .gitignore
├── app.js
├── middleware.js
├── package-lock.json
├── package.json
├── README.md
└── schema.js

```

---

##  Core Concepts & Flow

* `req.body.listing` is validated using Joi before saving to the database
* EJS forms use nested object naming (`listing[title]`, `listing[image][url]`)
* Default image is set if user does not provide one
* Error handling is centralized using a custom `ExpressError` class and a global error middleware

---

##  Known Limitations / Future Enhancements

*  Reviews cannot be edited
*  Image upload is via URL only (Cloudinary integration planned)

###  Planned Enhancements

* [ ] Add Passport.js authentication
* [ ] Upload images via Cloudinary
* [ ] Implement filtering, tags, and categories
* [ ] Add Mapbox or Leaflet map integration
* [ ] Enable review editing and rating display

---

##  License

This project is for educational use only.

---

##  Credits

Built by Shravani for learning and full-stack development practice.
