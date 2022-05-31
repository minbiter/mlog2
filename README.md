# Mlog2 Frontend & Backend

<p align="center">
  <img src="https://user-images.githubusercontent.com/77476340/161494223-7ca881de-df2a-4f64-89c0-fc8b60cdd04f.png" alt="Mlog2-5542556" style="zoom: 33%; height: 150px; width: 150px" />
</p>


This is a **Mlog2 application** that recommends music through the sentiment analysis of the user's diary.

I expect it to be a good project to check and show my development knowledge.

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
  npm run start
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/minvis95/Mlog2/blob/main/LICENSE) file for details.
