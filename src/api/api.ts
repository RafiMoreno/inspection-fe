import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const uploadImagesApi = async (imageFields: {label : string; image: File, preview: string}[]) => {
    try {
        const formData = new FormData();
        
        imageFields.forEach((field) => {
            formData.append(`labels`, field.label);
            formData.append(`images`, field.image);
        });

        const response = await api.post("/api/upload", formData)
        return response.data
    } catch(err) {
        console.error(err);
        throw err;
    }
}
