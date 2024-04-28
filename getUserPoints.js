const axios = require("axios");

const getUSDBPoints = async (address, usdbPointsTotal, wethPointsTotal) => {
  console.log("analyzing user", address);
  console.log("blast points earned from USDB contract", usdbPointsTotal);
  console.log("blast points earned from WETH contract", wethPointsTotal);

  const url =
    "https://api.goldsky.com/api/public/project_clsk1wzatdsls01wchl2e4n0y/subgraphs/zerolend-blast-points/1.0.0/gn";

  const query = `{
        usdbuser(id: "${address}") {
            id
            accumulatedPoints
            debt
            balance
        }
        wethuser(id: "${address}") {
            id
            accumulatedPoints
            debt
            balance
        }
        core(id:"1") {
            id
            totalPointsUSDB
            totalPointsWETH
        }
    }`;

  const data = await axios.post(url, {
    query,
  });

  const results = data.data.data;

  const percentage = 100000000;

  const usdbPointsEarnedPercentage =
    (BigInt(results.usdbuser.accumulatedPoints) * BigInt(percentage)) /
    BigInt(results.core.totalPointsUSDB);

  const usdbPointsEarned =
    Number(usdbPointsEarnedPercentage * BigInt(usdbPointsTotal)) / 100000000;

  const wethPointsEarnedPercentage =
    (BigInt(results.wethuser.accumulatedPoints) * BigInt(percentage)) /
    BigInt(results.core.totalPointsWETH);

  const wethPointsEarned =
    Number(wethPointsEarnedPercentage * BigInt(wethPointsTotal)) / 100000000;

  console.log("blast points earned from USDB", usdbPointsEarned);
  console.log("blast points earned from WETH", wethPointsEarned);
};

getUSDBPoints(
  "0x00489ddbf5aa399ee576c066a25cc908e038721f",
  540000000,
  1040000000
);
