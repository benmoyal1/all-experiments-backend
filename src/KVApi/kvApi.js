import { kv } from "@vercel/kv";
const initExpKV = {'maleCounter':0,'femaleCounter':0};
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
    return keyValuePairs;
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
  const increaseExpSubjectByOne = async (expName, genderCounter) => {
    // Retrieve the current data for the experiment
    let expJson = await kv.get(expName);

    // Initialize the experiment data if it doesn't exist
    if (!expJson) {
        await addNewExpData(expName);
        expJson = await kv.get(expName);
    }

    console.log(`before updating: ${JSON.stringify(expJson)}`);

    // Ensure the genderCounter exists in the retrieved data
    if (expJson.hasOwnProperty(genderCounter)) {
        expJson[genderCounter] += 1;
    } else {
        console.warn(`Counter "${genderCounter}" does not exist in experiment "${expName}".`);
        return;
    }

    // Save the updated data back to kv
    await kv.set(expName, expJson);

    console.log(`after updating: ${JSON.stringify(expJson)}`);
};
const resetExpData = async (expName) =>{
    const expJson = await kv.get(expName);
    console.log(`before updating : ${expJson}`)
    kv.set(expName,initExpKV);
    console.log(`after updating : ${expJson}`)
    }
export {resetExpData as resetExpDate,showAllKVs,addKeyValueToKVs,deleteKey,increaseExpSubjectByOne};