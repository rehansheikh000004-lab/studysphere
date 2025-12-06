import axios from "axios";
const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export default axios.create({ baseURL: base });
