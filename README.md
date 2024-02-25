# cointab
This project is based on adding the data into database and toggling the button according to it .The post page also provide a way to download the data into excel format

## Project Type
 Fullstack

  ## Deplolyed App
 Frontend: https://cointab-jade.vercel.app
Backend: https://cointab-znde.onrender.com

  ## Video Walkthrough of the project
https://drive.google.com/file/d/1aaXqGts08irj4GNcDUDQwErsWhXw13Bx/view?usp=sharing
## Features
List out the key features of your application.

- Adding the data to database
- Rendering data from api
- Downloading in Excel format

## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running. For BE/FS projects, guide the reviewer how to check mongodb schema etc.

cd Backend
npm install
npm run server

cd Frontend
npm install
npm run start

## API Endpoints

GET  "/user"  : get all the data of the user
GET  /user/:id  : get data of the specific user
Post  /user/add  : Add data of the user


GET  "/post"  : get all the post
GET  /post/:id  : get post of the specific user
Post  /post/add  : Add post of the specific user
GET   /user/export/:id  :Download post of specific user





