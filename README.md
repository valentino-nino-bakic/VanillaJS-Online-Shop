# Yorkshire Ecommerce

Node(ExpressJS) server-side rendering ecommerce application

## Technologies Used

- JavaScript (Vanilla)
- Node(ExpressJS)
- EJS(Embedded JavaScript) - generating html on server
- Mongoose - interacting with MongoDB
- GSAP - JS animation library
- JWT - authentication


## Features

### User Actions

- **Signup**
- **Login**
- **Modify account**
- **Delete account**

- **Search products**
- **Filter products**

- **Add to cart**
- **Checkout**

- **Post message on website for any help needed**


### Admin Actions

- **Manage users**
- **Manage products**
- **Manage orders**
- **Reply to users via email**

<br />
<br />


## Installation

#### Prerequisites
- [Node](https://nodejs.org/en) - You must have it installed on your system
- [MongoDB Atlas account](https://www.mongodb.com/) - Sign up and [create a new cluster](https://www.mongodb.com/docs/guides/atlas/cluster/)
- [SendGrid account](https://sendgrid.com/en-us) - Sign up and follow [these 5 steps](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/quickstart-nodejs)
and feel free to ignore 4th step and set up [Single Sender Verification](https://www.twilio.com/docs/sendgrid/ui/sending-email/sender-verification)
instead of [Domain Authentication](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#twilio-docs-content-area)

<br />


Follow the steps below to run the project locally on your machine:

**1. Clone this repository**
```bash
git clone https://github.com/valentino-nino-bakic/VanillaJS-Online-Shop.git
```

**2. Make sure you're in the project root**
```bash
 cd <directory-you-cloned-this-repo-to>
 ```

**3. Install dependencies**
```bash
 npm install
 ```

**4. Create '.env' file**
```bash
 touch .env
 ```

**5. Open up newly created '.env' file then paste the following contents to it and make sure you replace placeholder values with your own variables values:**

```dotenv
PORT=8080
DB_CONNECTION_STRING='mongodb+srv://<yourusername>:<yourpassword>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=<appname>'
SECRET_KEY='<your_JWT_secret_key>'
SENDGRID_API_KEY='<your_sendgrid_api_key>'
SENDGRID_FROM_EMAIL='<your_verified_email_address>'
 ```

**6. Import initial products to your Mongo database**
```bash
 node importInitialProductsToMongoDB.js
 ```

 **7. Run server with nodemon so you don't have to do it manually every time you make some changes**
```bash
 npx nodemon server.js
 ```

<br />

#### Almost there
To access the admin panel for the first time, you need to go to your MongoDB atlas then manually change the role of some existing user from 'user' to 'admin' so the website could recognize you as an administrator


***
And you're all set! Feel free to open up your browser and visit your website at http://localhost:8080
