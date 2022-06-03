# Mlog2 Frontend & Backend

<p align="center">
  <img src="https://user-images.githubusercontent.com/77476340/161494223-7ca881de-df2a-4f64-89c0-fc8b60cdd04f.png" alt="Mlog2-5542556" style="zoom: 33%; height: 150px; width: 150px" />
</p>

This is a **Mlog2 application** that recommends music through the sentiment analysis of the user's diary.

I expect it to be a good project to check and show my development knowledge.

## Demo

<img alt="demoImg" src="https://user-images.githubusercontent.com/77476340/171853497-7886f96d-6dcf-4cf4-ab96-217c8adf39b4.png" style="max-width: 100%;">

Try out the [www.mlog2.com](http://www.mlog2.com)!

## Tech Stack

### Frontend

- React, React Hook
- Recoil
- TypeScript
- Emotion

### Backend

- Node.js
- MySQL

## Frontend Structure

```
public
├── favicon.png
├── index.html
└── robots.txt
src
├── @types              # type definition files
├── api                 # api request modules
├── assets              # static files (images)
├── atoms               # recoil states
├── components          # react components
├── context             # react contexts
├── pages               # react page components
├── styles              # global styles
├── types               # types
├── utils               # utility functions
├── App.tsx
└── index.tsx
```

## Backend Structure

- [ERD Docs](https://github.com/minvis95/Mlog2/blob/develop/docs/ERD.png)
- [API Docs](https://github.com/minvis95/Mlog2/blob/develop/docs/API.md)

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/en/).

- Install MySQL.

  - ```
    brew install mysql
    brew services start mysql
    mysql_secure_installation
    ```

- You must prepare Third-Party API's key(**YouTube Data API v3**, **Google Cloud Natural Language API**). 

  Create an `.env` file in your backend file and enter your private key.

  - ```
    DEVELOPMENT_DB_PASSWORD={DB_PASSWORD}
    DEVELOPMENT_URL=http://localhost:8082/
    DEVELOPMENT_ACCESS_ORIGIN=http://localhost:3000
    YOUTUBE_KEY={Youtube_API_KEY}
    NATURAL_LANGUAGE_API_KEY={CNL_API_KEY}
    TOKEN_KEY={JWT_KEY}
    ```

### Run

- Frontend

  ```
  cd frontend
  npm install
  npm run start
  ```

- Backend

  ```
  cd backend
  npm install
  npm run dev
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/minvis95/Mlog2/blob/main/LICENSE) file for details.
