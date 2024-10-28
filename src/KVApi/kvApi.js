import { kv } from "@vercel/kv";
const initExpKV = {"maleCounter":0,"femaleCounter":0};
const showAllKVs = async () => {
// Get all keys
  try {
    const keys = await kv.keys('*'); // Get all keys (use * to match all)
    const keyValuePairs = [];

    // Loop through each key to get its value
    for (const key of keys) {
      const value = await kv.get(key);
      keyValuePairs.push({ key, value });
    }

    console.log('All Key-Value Pairs:', keyValuePairs);
  } catch (error) {
    console.error('Error fetching key-value pairs:', error);
  }}

  const addKeyValueToKVs = async (key, value) => {
    try {
      // Store the key-value pair in Redis
      await kv.set(key, value);
      console.log(`Successfully added key: ${key} with value: ${JSON.stringify(value)}`);
    } catch (error) {
      console.error('Error adding key-value to KV:', error);
    }
  };

  const deleteKey = async (key) => {
    try {
      // Delete the key from Redis
      await kv.del(key);
      
      // Log a success message
      console.log(`Successfully deleted key: ${key}`);
    } catch (error) {
      // Handle any errors that might occur during the key deletion
      console.error('Error deleting key from KV:', error);
    }
  };

  // Helper function to add new experiment data
  const addNewExpData = async (expName) => {
    await addKeyValueToKVs(expName, initExpKV);
    console.log(`added new exp data for ${expName}`);
  };
  const increaseExpSubjectByOne = async (expName, genderCounter) => {
    let expJson = await kv.get(expName);

    if (!expJson) {
        // Initialize the experiment data if it doesn't exist
        await addNewExpData(expName);
        expJson = await kv.get(expName); // Retrieve the newly initialized data
    }

    console.log(`before updating : ${JSON.stringify(expJson)}`);

    // Update the gender counter
    expJson[genderCounter] = expJson[genderCounter] + 1;

    // Save the updated data back to kv
    await kv.set(expName, expJson);

    console.log(`after updating : ${JSON.stringify(expJson)}`);
};
const resetExpDate = async (exp) =>{
    const expJson = await kv.get(exp);
    console.log(`before updating : ${expJson}`)
    kv.set(exp,initExpKV);
    console.log(`after updating : ${expJson}`)
    }
export {resetExpDate,showAllKVs,addKeyValueToKVs,deleteKey,increaseExpSubjectByOne};