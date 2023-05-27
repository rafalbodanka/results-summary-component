const reaction = document.querySelector('#reaction')
const memory = document.querySelector('#memory')
const verbal = document.querySelector('#verbal')
const visual = document.querySelector('#visual')

const reaction_points = reaction.querySelector('.detail_points')
const memory_points = memory.querySelector('.detail_points')
const verbal_points = verbal.querySelector('.detail_points')
const visual_points = visual.querySelector('.detail_points')

const result_points = document.querySelector('.result_points')

const drawResult = (results) => {
    const randomNum = Math.floor(Math.random() * 4);
    return results[randomNum];
}

const getResult = async () => {
    const response = await fetch('data.json')
    const data = await response.json()
    const result = await drawResult(data);
    return result;
}

const result = getResult().then(result => {
    reaction_points.innerHTML = result.reaction;
    memory_points.innerHTML = result.memory;
    verbal_points.innerHTML = result.verbal;
    visual_points.innerHTML = result.visual;
  
    const average = (result.reaction + result.memory + result.verbal + result.visual) / 4;
  
    // Animation of loading user total result
    const startValue = 0;
    const finalValue = average;
    const duration = 7; // Duration of the transition in seconds
    const steps = average; // Number of steps for the transition
  
    // Define the power function for the delay
    function powerDelay(t, a) {
      return Math.pow(t, a);
    }
  
    // Calculate the increment value for each step
    const increment = (finalValue - startValue) / steps;
  
    let currentValue = startValue;
  
    function updateValue() {
      if (currentValue <= finalValue) {
        // Display the current value
        result_points.innerHTML = Math.ceil(currentValue);
  
        currentValue += increment;
  
        // Calculate the power delay based on the current value
        const delay = powerDelay(currentValue / finalValue, 2) * (duration * 1000) / steps; // Adjust the exponent (3) as needed
  
        // Schedule the next update with the power delay
        if (currentValue <= finalValue) {
          setTimeout(updateValue, delay);
        }
      }
    }
  
    // Start the transition
    updateValue();
  });