/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_WEATHER_API_KEY: string;
    REACT_APP_USER_API_URL: string;
    REACT_APP_TODO_LIST_API: string;
    REACT_APP_TMDB_AUTH: string;
    REACT_APP_TMDB_URL: string;
  }
}
