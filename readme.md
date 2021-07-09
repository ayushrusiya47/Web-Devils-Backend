# Web DEVil

----Project Description----

# Screenshots

----Screenshots----

# Hosted URL

----If Hosted----

# Features Implemented

## Frontend

----Frontend Features----

## Backend

The backend of the project creates a server and provides several routes for different tasks.

There are two routes under /auth -

- /signUp route - This takes users data and saves that in the database and signs up the user. It also hashes the password before saving.
- /signIn route - This routes takes the user email and password and authenticates user by checking password.

VerifyToken middleware -

- For all the other routes this middleware runs first and it takes token from req.header and authenticates the user to go to the further routes

There are four routes under /event -

- /register route - This route take the event name and registers the user in that event.
- /unregister route - This route take the event name and unregisters the user from that event.
- /status route - This route the current registration status of the events of the user. It
- /openStatus route - This route provides the status of a event if registration is still open.

There are five routes under /admin all -

- /signIn route - This route is the same as signIn route of /auth.
- /getList route - This route provides list of all users and the events they have registeres in.
- /count route - This routes provide no. of registration in the events.
- /eventClose route - This route takes a event and closes registration for that event .
- /eventopen route - This route takes a event and open registration for that event .

There are two routes under /userData -

- /getdata - This route returns the email, name and profile picture code of the user.
- /changeCode - This route takes a new code for a new profile picture an updates that in the database.

# Database structure and basic working of backend

The database of the project contains two tables users and event.  
The users table contains 8 columns for -

- username
- email
- password (hashed)
- 4 boolean rows (e1,e2,e3,e4) for storing if the user is registered in the event
- code (an integer) to store the code of profile picture of the user

The event table contains boolean columns (e1,e2,e3,e4) for storing the opening status of the event. If the event is closed it stores true and false other wise.

##Basic Working

- Signup - The user enters his credentials and first we check if those credentials are already present, if not then we add them in the data base (after hashing password) then we generate a token and send that to front en where it is stored in local storage.
- Signin - The user enter email and password if those are correct we grant him the access.
- register/unregister - We just toogle the boolean value of the concerned event to register/unregister (true / false) in users table.
- Open/Close -We just toogle the boolean value of the concerned event to open/close (false / true) in event table.
- Profile pic - There are 7 profile pic on frontend, user is assigned one code (number between 0 - 6) at the time of signUp which becomes his profile picture (frontend assigns picture from the code).

# Technologies/Libraries/Packages Used

## Backend

- express- for server related works
- dotenv- for setting environment variables
- nodemon- for testing purposes
- bcrypt- for hashing password
- cors- for ???
- jsonwebtoken- for creating and verifying tokens

# Local Setup

- First clone the backend library (https://github.com/ayushrusiya47/Web-Devils-Backend.git) and frontend library (https://github.com/ayushrusiya47/Wev-Devils.git) into your local system.
- Create a database in elephantsql and create two tables by running following command -
  - create table users (id serial primary key not null, username text, email text unique, password text, e1 int, e2 int, e3 int, e4 int, code int)
  - CREATE TABLE event( e1 boolean NOT NULL, e2 boolean NOT NULL, e3 boolean NOT NULL, e4 boolean NOT NULL);
  - INSERT INTO event (e1,e2,e3,e4) VALUES (False, False, False, False);
- Then create a .env file in the backend repository and add following data -
  - DB_URL = Your database Url
  - PRIVATE_KEY = top secret string
- Then run the following command in your terminal
  - npm install
  - npm start
- Your server is started, now add this localhost url in frontend wherever you want to fetch something from backend

# Team Members

Ayush Rusiya (2020IMT-020)
Sanket Santosh Diwate (2020IMT-???)
Shikhar Gupta (2020IMT-???)
