const apiURL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
const apiKey = process.env.REACT_APP_API_KEY; // Replace with your actual API key

export const headers = {
    'Authorization': `Bearer ${apiKey}`
};

export const summarizeText = (text, maxLength, minLength) => {
    return fetch(apiURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
         inputs: text,
         parameters: {
            max_length: maxLength,
            min_length: minLength
         }
      })
    })
    .then(response => response.json());
};