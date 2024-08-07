# Crispy Crumbs: React Website

Welcome to the **Crispy Crumbs** website, a dedicated video sharing platform showcasing only the finest Crispy Crumbs content. This website is built with React to ensure a smooth, interactive, and tasty user experience.

## Crispy Crumbs - Founders

- Ofek Avan Danan (211824727)
- Zohar Mzhen (314621806)
- Dolev Menajem (207272220)

## Running the Crispy Crumbs Website

### Prerequisites

- The website is build and tested to run from a windows machine.
- Node.js
- [CrispyCrumbsServer](https://github.com/Mzhenian/CrispyCrumbsServer) (will be explained below)

for the server:

- MongoDB
  - By default CrispyCrumbs will use "CrispyCrumbs" database in "mongodb://localhost:27017/CrispyCrumbs" connection.

### Download

- First download [CrispyCrumbsWeb](https://github.com/Mzhenian/CrispyCrumbsWeb) as [zip](https://github.com/Mzhenian/CrispyCrumbsWeb/archive/refs/heads/EX2-main.zip) and unzip it
- **or** [clone](https://github.com/Mzhenian/CrispyCrumbsWeb.git) the repository and checkout the EX2-complete branch.
- Second download [CrispyCrumbsServer](https://github.com/Mzhenian/CrispyCrumbsServer) as [zip](https://github.com/Mzhenian/CrispyCrumbsServer/archive/refs/heads/main.zip) and unzip it
- **or** [clone](https://github.com/Mzhenian/CrispyCrumbsServer.git) the repository and checkout the EX2-complete branch.

- Recommended: to use initialization script - put both projects in the same folder, named `CrispyCrumbsWeb` and `CrispyCrumbsServer` accordingly, like this:
![[./readme photos/same-folder.png]]

### Initialization option one: Easy & fast script

After downloading the CrispyCrumbsWeb and CrispyCrumbsServer projects folders into the the same parent folder.

1) open a powershell in `CrispyCrumbsWeb` project-folder.
2) run: `.\init_website.ps1`
3) Enter the new CrispyCrumbs server JWT secret if prompted.
4) wait for the website to open itself.

**Notes:**

- if the server wasn't active when running the script than this method will open the **server** at the background of the current terminal. Which will keep running as long as that terminal is kept open.
- After this initial setup, you can run the website again in the same way
- or run the the site manually as shown below.

### Initialization option two: manually

1) Manually set up and run the server from [CrispyCrumbsServer](https://github.com/Mzhenian/CrispyCrumbsServer) as described in its README.md.
2) Open a terminal in the CrispyCrumbsWeb  project-folder
3) Run `npm install`
4) Run `npm start`
5) wait for the website to open itself.

After the initial initialization, you can run the server by only running the server and running `npm start`

This command will launch the website in address [http://localhost:3000](http://localhost:3000) in your browser.

### Logged in user experience

To experience everything CrispyCrumbs has to offer quickly you can log in using predefined user,  For example:

- **Username:** Tuna
- **Password:** password6

## Website Pages

The photos are not enough; you should go and explore the website yourself :>

### 1. Homepage

The homepage of the Crispy Crumbs website features a search bar at the top, along with buttons for sorting videos by "Newest," "Suggested," and "Most Watched." If you are logged in, you get subscribed, which gives you the videos from the users you follow. A video thumbnail with details such as views, upload date, and title is displayed.

- The top bar displays login and sign-up options if the user isn't registered. If the user is registered, the top bar will display an upload video button and a profile photo of the registered user. Clicking on the profile photo opens a popup menu with additional options. The top bar also includes the logo, a search bar (to be functional in the next exercise), and a light/dark mode toggle (the night mode looks awesome :>).

### 2. Sign Up

This page is for user sign-up or profile editing. It includes fields for entering full name, username, email, password, country, birthday, and phone number. There is also an option to upload a profile photo. The form includes "Sign up" and "Log in" buttons at the top.

### 3. Login

This page is for user login. It includes fields for entering the username and password, along with options to remember the user and a link to recover a forgotten password. There are "Log in" and "Sign up" buttons at the bottom.

### 4. Video Upload

This page is for uploading videos. First, it opens a popup so the user can drag a video to the website. After the user picks a video, the page includes fields for entering the video title, description, category, and tags. There is also an option to upload a thumbnail image for the video. At the bottom, there are "Upload" and "Cancel" buttons.

### 5. Video Page

This page shows a video player at the top left, playing the selected video. Below the video, there are details about the video, including the uploader's name, upload date, views, and tags. Users can see and add comments below the video. On the right side, there is a list of suggested or related videos with thumbnails and view counts. If the comment is yours, you can edit or delete that comment.

### 6. Edit Video

This page is very similar to the Video Upload page but is used for updating an existing video. It includes the same fields: video title, description, category, and tags, along with the option to upload a thumbnail image. Additional options for editing existing content may be present. You can also delete videos on this page.

### 7. Profile Page

This page is designed to edit user details. It includes options to change the user's basic details as well as to update the user's profile picture.

### 8. Profile Edit Page

This page is designed to edit user details. It includes options to change the user's basic details as well as to update the user's profile picture.

## Work Process

The project was a collaborative effort among the three of us. Initially, we focused on building the server. Afterward, we started developing the functions and replacing the previously defined actions in React with server-defined actions that directly interact with MongoDB. Most of the functionality and significant changes were in the AuthContext and VideoContext since the core functionality from part 1 was located there. There were also changes in certain pages and in areas with high functionality, but the website remained quite similar to its previous state.

Similar to part 1, we divided the work among ourselves using Jira.

![Jira Board](<readme photos/Screenshot 2024-07-27 233247.png>)
