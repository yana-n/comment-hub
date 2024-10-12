# Project: Comments with Authorization

## Demo of the Project

[Click me 👾](https://comment-hub.netlify.app/)

## About the Project

This is a training project created as part of an intensive program. Users can log in, comment and reply to other users' comments.

### Features:

- Log in and register.
- Leave comments, like them, and reply to other users' comments.
- All comments are saved in the database.

## Technologies

- **Vite** – a fast frontend build tool.
- **TypeScript** – to make code strict and understandable.
- **Vue 3** – for a beautiful and reactive interface.
- **Pinia** – for state management.
- **Firebase** – to store data and handle authentication.
- **JWT** – to keep everything secure.

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/yana-n/comments-hub.git
   ```

2. Navigate to the project folder:

   ```bash
   cd comments-hub
   ```

3. Install all dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase and JWT: create .env file and add your keys:

   ```bash
   VITE_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
   VITE_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
   VITE_FIREBASE_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
   VITE_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
   VITE_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
   VITE_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
   ```

5. Run the project:

   ```bash
   npm run dev
   ```

6. Open in your browser:
   ```bash
   http://localhost:3000
   ```
