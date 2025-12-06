import axios from "axios";
const base = import.meta.env.VITE_BACKEND_URL || "https://studysphere-rqsc.onrender.com";
export default axios.create({ baseURL: base });
