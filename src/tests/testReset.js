import fetch from 'node-fetch';

const serverUrl = 'https://express-backend-exp.vercel.app/reset/resetKV';

async function resetCounters() {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
      // Optionally add body if you need to send data in the request
    });

    const responseData = await response.json();
    console.log('Response:', responseData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

resetCounters();
