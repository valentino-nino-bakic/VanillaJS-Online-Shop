const inProduction = process.env.NODE_ENV === 'production';
const BASE_URL = inProduction ? 'https://vanillajs-online-shop.onrender.com' : 'http://localhost:8080';

export default BASE_URL;
