// import fetch from 'node-fetch';

// const serverUrl = 'https://express-backend-exp.vercel.app/reset/resetKV';

// async function resetCounters() {
//   try {
//     const response = await fetch(serverUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const responseData = await response.json();
//     console.log('Response:', responseData);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

// resetCounters();
const getParticipantNum = async (exp) => {  
  const devUrl = 'http://localhost:3000/data/participantCounter';
  const serverUrl = 'https://all-experiments-backend.vercel.app/data/participantCounter';
  
  try {
      const response = await fetch(serverUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ exp }) // Send exp in the request body
      });
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      const result = await response.json(); // Parse response as JSON
      console.log('Male Counter:', result.maleCounter);
      console.log('Female Counter:', result.femaleCounter);
      
      return result;
  } catch (error) {
      console.error('Error fetching participant counters:', error);
  }
}