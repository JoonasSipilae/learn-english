# learn-english

Project url: https://learn-english-123.onrender.com/

CLICK ME FOR THE PROJECT VIDEO!!!
[![Project video](image-3.png)](https://youtu.be/-CVtge5ls2k?si=YpE-UvDcM9bxJsAl "Project video")

If the website doesnt load words immediately, please give it a minute to reconnect.
The free hosting at render spins down server connection after some inactivity.

# How to use the application ?

On "Main" page:

- Click the gray button to toggle translation direction between eng->fin and fin->eng.
- Click Start game to start playing.
- Once played through you will see a final score as well as what words
  you got right and what were wrong.

![Main page](image.png)

On "Panel" page:

- Login using a password.
- Type finnish and english word and click "Add word" to add it to the database.
- Click "Display all words" to see all words in database.
- Click "Hide panel" or exit tab to exit panel (you need to authenticate again when entering the tab again)
- Type words ID and click "Delete word" to delete it from the database.

![Panel page](image-1.png)

On "Info" page:

- Information about the project
- Password for demonstrative purposes

![Panel page](image-2.png)

# What is the purpose of the application ?

This app is designed to teach finnish people english or vice versa.
This project was made as a part of a school course at Tampere University of Applied Sciences.
The purpose of the project was to learn how to build a full stack application using react, sql and express.

# What does the application consist of ?

The web application consists of 3 pages:

1. Main: The "Learn English app" itself.
2. Info: Little info page.
3. Panel: An admin panel where you can observe, add and delete new words.

All the source code has been commented.
Application uses React-router-dom, mysql, express, cors, body-parser and axios.

Application source code consists of multiple files.

1. App.js: This component handles routes and displays navbar + currently active page.
2. Main.js: The game itself, translation direction and score.
3. Managepanel: Admin panel where you can modify the database items. (needs password)
4. Info.js: Some info about the project.
5. Nav.js: Navbar, you can switch between pages.
6. App.css: Styling and layout.
7. Index.js: Default, displays App.js in strict mode.

# How does the database connection work ?

Database connection is running on another server
curl: https://learn-english-123-server.onrender.com/words

The Server app contains two files:

1. Server.js: Connects to database. fetches data, handles ManagePanels add and delete requests.
2. config.js: Contains connection information.

- These server files are stored in src/server for demonstrative purposes even though they are not needed in this repository.
- The server application connects to TAMKs database

# Created by: Joonas Sipilä

# 01/2024
