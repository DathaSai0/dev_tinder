DAY1

Create a repository
Initialize the repository
node_modules, package.json, package-lock.json
Install express
Create a server
Listen to port 7777
Write request handlers for /test, /hello
Install nodemon and update scripts inside package.json
difference between "~"tilde and "^"carrot

DAY2

- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extensions ex. /hello, / , hello/2, /xyz
- Order of the routes matter a lot
- Install Postman app and make a workspace/collectio > test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Play with routes and route extensions ex. /hello, / , hello/2, /xyz
- Order of the routes matter a lot
- Install Postman app and make a workspace/collectio > test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (), \* in the routes
- Use of regex in routes /a/, /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

DAY3

- Multiple Route Handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3], rH4, rH5);
- What is a Middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling using app.use("/", (err, req, res, next) = {});

DAY 4

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7777
- Create a userSchema & user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman

DAY 5

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object returned
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documentation for Model methods
- explore more in the find by id AndUpdate options 3rd parameter
- Explore schematype options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validations on each field in Schema
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanitizing - Add API validation for each field
- Install validator
- Explore validator library function and Use validator funcs for password, email,

DAY 6

- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is excrypted password
- Create login API
- Compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create a JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

DAY7

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under repective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API ⇒ forgot password API
- Make you validate all data in every POST, PATCH apis

DAY8

- Create Connnection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- schema.pre("save") function
- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantage of creating?
- Read this article about compound indexes - https://www.mongodb.com/docs/manual/core/indexes-index-types/index-compound/

DAY9

- Write code with proper validations for POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
- Create GET GET /user/connections

- Logic for GET /feed API
- Explore the $in, $and, $ne and other query operatorators
- Pagination

DAY10

- Signup on AWS
- Launch instance
- in that instance
- once that instance is been created you need to click on the url and then in the details on top connect will be there to connect in our teminal and there follow for the SSH commands

  - you need to generate the key-pair secrete keys which will generate the pem file which will be useful for the login to the server later when ever we want update the server

  - that pem file is like key to access the aws server

- first open the terminal and go the folder where our pem file is been downloaded and write the command with chmod 400 <filepath>.pem
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html/
  - Enable port :80 of your instance
- Backend - updated DB password - allowed ec2 instance public IP on mongodb server - npm intsall pm2 -g - pm2 start npm --name "devTinder-backend" -- start - pm2 logs - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name> - config nginx - /etc/nginx/sites-available/default - restart nginx - sudo systemctl restart nginx - Modify the BASEURL in frontend project to "/api"
  /feed?page=1&Limit=10 ⇒ 1–10 ⇒ .skip(0) & .limit(10)
  /feed?page=2&Limit=10 ⇒ 11–20 ⇒ .skip(10) & .limit(10)
  /feed?page=3&Limit=10 ⇒ 21–30 ⇒ .skip(20) & .limit(10)

  # socket Integration

  - create the frontend ui 
  - create the server using http module and pass that express app to that server
  -  and run the app using that server using instead of app
  - create the socket by passing the server and cors origin

