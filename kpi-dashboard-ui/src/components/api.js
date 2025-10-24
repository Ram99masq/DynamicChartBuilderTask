import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7122/api/kpi",
});

// 📤 Upload CSV file
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// 📊 Compute KPI
export const computeKPI = async (request) => {

  try {
  const response = await api.post("/compute", request, {
   headers: {
    "Content-Type": "application/json"
      },
      });
  return response.data;
    } catch (error) {
    console.error("Error calling /compute:", error);
    throw error;
  }
};

// 💾 Save KPI preset
export const savePreset = async (request) => {
  const response = await api.post("/presets", request);
  return response.data;
};

// 📂 Get all saved presets
export const getPresets = async () => {
  const response = await api.get("/presets");
  return response.data;
};

export default api;
