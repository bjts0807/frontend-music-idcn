import Service from "./Service";
const baseurl = '/api/openai';
//const apiKey = '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';
//const model = 'text-davinci-002';

/* const apiClient = axios.create({
    baseURL: 'https://api.openai.com/v1/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}` // Reemplaza YOUR_API_KEY con tu clave de API de OpenAI
    }
});
 */
export default {
    transposeChords(chords, interval) {
        return Service.post(`${baseurl}/transpose-chords`, {chords,interval});
    }
};
