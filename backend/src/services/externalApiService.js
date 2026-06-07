import axios from "axios";

export const fetchExternalDataset = async () => {
  const tokenResponse = await axios.post(`${process.env.BASE_URL}/public/token`, {
    studentId: process.env.STUDENT_ID,
    password: process.env.STUDENT_PASSWORD,
    set: process.env.STUDENT_SET
  });

  const { token, dataUrl } = tokenResponse.data;

  const datasetResponse = await axios.get(`${process.env.BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return datasetResponse.data;
};