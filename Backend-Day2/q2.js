async function doubleNumberWithDelay(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(number * 2);
    }, 1000); // Simulated delay of 1 second
  });
}

async function processArrayWithDelay(numbers) {
  const doubledNumbers = [];
  for (let number of numbers) {
    const doubled = await doubleNumberWithDelay(number);
    doubledNumbers.push(doubled);
  }
  return doubledNumbers;
}


async function main() {
  const numbers = [1, 2, 3, 4, 5];
  console.log(`Original array: ${numbers}`);

  try {
    const doubledNumbers = await processArrayWithDelay(numbers);
    console.log(`Doubled array with delay: ${doubledNumbers}`);
  } catch (error) {
    console.error('Error processing array:', error);
  }
}

main();
