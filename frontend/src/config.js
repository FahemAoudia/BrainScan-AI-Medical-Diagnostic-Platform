/** عنوان الـ API: محلياً localhost، وعلى الإنتاج يُمرَّر عند بناء الصورة (REACT_APP_API_URL). */
const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");
export default API_BASE_URL;
