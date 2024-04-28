import { BigInt } from "@graphprotocol/graph-ts";
import { Core } from "../generated/schema";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const findOrGetCore = (): Core => {
  let core = Core.load("1");
  if (!core) {
    core = new Core("1");
    core.totalPointsUSDB = new BigInt(0);
    core.totalPointsWETH = new BigInt(0);
    core.save();
  }

  return core;
};

export const calculateAccumulatedPoints = (
  balance: BigInt,
  debt: BigInt,
  lastUpdatedAt: BigInt,
  timestamp: BigInt
): BigInt => {
  const currentBalance = balance.minus(debt);
  const timeElapsed = timestamp.minus(lastUpdatedAt);
  const accumulatedPoints = currentBalance.times(timeElapsed);
  return accumulatedPoints;
};
