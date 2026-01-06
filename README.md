## Book Library App

A full-stack Book Library application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and JWT-based authentication.

- Public users can view all books.

- Registered users can create, edit, and delete their own books.

- Styled with Tailwind CSS.

## Features

- User Authentication: Register, Login, Logout (JWT-based)

- Book Management: Create, Read, Update, Delete (CRUD)

- Protected Routes: Only owners can edit/delete their books

- Frontend: React.js with Tailwind CSS

- Backend: Node.js, Express.js, MongoDB

## API EndPoints

### For User Endpoints

Method	Endpoint	       Description	         Auth Required

POST	 /user/register	   Register a new user      No

POST	/user/login	       Login and get JWT	      No

### For Books Endpoints

Method	Endpoint	   Description	          Auth Required

GET	    /books	    Get all books	              No

GET	    /books/:id	Get a book by ID	          No

POST	  /books	    Create a new book	          Yes

PUT	    /books/:id	Update a book (owner only)	Yes

DELETE	/books/:id	Delete a book (owner only)	Yes

## Setup Instructions

1. Download or clone this project folder.

  ### For Backend

1. Run this on terminal "cd backend"
2. Run this command "npm install" to install node modules
3. create ".env" file in backend folder and these variables:

   PORT=4000
   
   MONGO_URI="Your MongoDB Connection String"
   
   JWT_SECRET="Your JWT Secret"

4. Lastly Run "npm runs server"

By Following these steps backend run successful.

 ### For Frontend

1. Run this on terminal "cd frontend"
3. Run this command "npm install" to install node modules
4. Lastly Run "npm runs dev"

By Following these steps frontend & backend start working.


   
   
