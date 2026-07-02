const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const configureApp = require("./settings/config.js");
const seedAdmin  = require("./seeders/seedAdmin.js");

// Set the defaul environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log(`Current Environment: ${process.env.NODE_ENV}`);

// Load Environment variables from different files based on environment
const envFile = `.env.${process.env.NODE_ENV}`;
console.log(`Loading environment variables from: ${envFile}`);
// configure dotenv earlier in application
dotenv.config({ path: envFile });


const app = express();
const port = parseInt(process.env.PORT) || 3001;


//  Parsing request body
app.use(express.json());
configureApp(app);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log("Connected To MongoDB");

    // Create default admin if it doesn't exist
    await seedAdmin();

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();


