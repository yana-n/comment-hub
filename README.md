# Project: Comments with Authorization

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
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_JWT_SECRET=your_secret_key

   ```

5. Run the project:

   ```bash
   npm run dev

   ```

6. Open in your browser:
   ```bash
   http://localhost:3000
   ```
