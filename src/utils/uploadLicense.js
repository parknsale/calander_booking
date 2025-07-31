import axios from 'axios';

export async function uploadLicenseImage(file) {
  const form = new FormData();
  form.append('image', file);

  const response = await axios.post('https://whatsapp-qvda.onrender.com/extract-info', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  const raw = response.data.result;
  const cleaned = raw.replace(/```json\n|```/g, '');
  return JSON.parse(cleaned);
}
