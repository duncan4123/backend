const fs = require('fs');
const path = require('path');

interface PriceData {
  timestamp: number;
  low: string;
  high: string;
  open: string;
  close: string;
}

function generatePriceData(endTimestamp: number, days: number): PriceData[] {
  const priceData: PriceData[] = [];
  let currentTimestamp = endTimestamp - (days - 1) * 86400; // Calculate the start timestamp

  // Initial price
  let lowPrice = 0.1;
  let highPrice = 1.99;
  let openPrice = 0.1;
  let closePrice = 1.99;

  // Add the first candle with the initial price settings
  priceData.push({
    timestamp: currentTimestamp,
    low: lowPrice.toString(),
    high: highPrice.toString(),
    open: openPrice.toString(),
    close: closePrice.toString(),
  });

  currentTimestamp += 86400; // Increment by one day (86400 seconds)

  // Define trend targets and durations
  const trends = [
    { target: 30, duration: 20 },
    { target: 50, duration: 20 },
    { target: 80, duration: 20 },
    { target: 50, duration: 10 },
    { target: 100, duration: 20 },
  ];

  let trendIndex = 0;
  let trendDays = 0;

  // Generate prices for the remaining days
  for (let i = 1; i < days; i++) {
    if (trendDays >= trends[trendIndex].duration) {
      trendIndex = (trendIndex + 1) % trends.length;
      trendDays = 0;
    }

    const targetPrice = trends[trendIndex].target;
    const trendFactor = 1 + (targetPrice - closePrice) / 1000; // Adjust this factor to control the trend strength
    const volatilityFactor = 1 + (Math.random() - 0.5) / 10; // Introduce more volatility

    lowPrice = Math.min(
      Math.max(
        parseFloat(
          (
            closePrice *
            (Math.random() * 0.1 + 0.95) *
            trendFactor *
            volatilityFactor
          ).toFixed(3)
        ),
        0.1
      ),
      130
    );
    highPrice = Math.min(
      Math.max(
        parseFloat(
          (
            lowPrice *
            (Math.random() * 0.09 + 1.01) *
            trendFactor *
            volatilityFactor
          ).toFixed(3)
        ),
        0.1
      ),
      130
    );
    openPrice = closePrice; // Open price is the previous day's close price
    closePrice = highPrice;

    priceData.push({
      timestamp: currentTimestamp,
      low: lowPrice.toString(),
      high: highPrice.toString(),
      open: openPrice.toString(),
      close: closePrice.toString(),
    });

    currentTimestamp += 86400; // Increment by one day (86400 seconds)
    trendDays++;
  }

  return priceData; // No need to reverse the array
}

// Set the end timestamp to today's date at midnight
const endDate = new Date();
endDate.setHours(0, 0, 0, 0);
const endTimestamp = Math.floor(endDate.getTime() / 1000);

// Generate 90 days of data
const priceData = generatePriceData(endTimestamp, 90);

// Ensure the directory exists
const outputPath = path.join(
  'C:\\Users\\Windows\\Documents\\GitHub\\graphene-frontend\\src\\mocks',
  'agt-usdc-mock-data.json'
);
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Prepare the data with the message at the top
// const message = "This is the file\n";
const dataToWrite = JSON.stringify(priceData, null, 2);

// Save the generated data to agt-usdc-mock-data.json
fs.writeFileSync(outputPath, dataToWrite);

// Print the generated data
// priceData.forEach((entry) => {
//     console.log(entry);
// });
