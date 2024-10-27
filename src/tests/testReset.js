import fetch from 'node-fetch';

const serverUrl = 'https://express-backend-exp.vercel.app/reset/resetKV';

async function resetCounters() {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();
    console.log('Response:', responseData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

resetCounters();
