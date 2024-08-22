// config.js

const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';

const API_URL = isProduction ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_LOCAL_API_URL;
const APP_URL = isProduction ? process.env.REACT_APP_PROD_APP_URL : process.env.REACT_APP_LOCAL_APP_URL;
export { API_URL, APP_URL };
