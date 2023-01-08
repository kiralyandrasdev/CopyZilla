import axios from "axios";

export async function processQuickPrompt(quickPrompt) {
  return await axios.post(
    'http://localhost:7071/api/quickPrompt',
    quickPrompt,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    },
  );
}

export async function processAdvancedPrompt(advancedPrompt) {
  return await axios.post(
    'http://localhost:7071/api/advancedPrompt',
    advancedPrompt,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    },
  );
}