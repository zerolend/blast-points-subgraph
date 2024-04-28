import { BigInt } from "@graphprotocol/graph-ts";
import { Core, USDBUser } from "../generated/schema";

import { Transfer as TransferEvent } from "../generated/USDBVToken/USDBVToken";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const findOrGetUser = (who: string, timestamp: BigInt): USDBUser => {
  let user = USDBUser.load(who.toString());
  if (!user) {
    user = new USDBUser(who.toString());
    user.balance = new BigInt(0);
    user.debt = new BigInt(0);
    user.accumulatedPoints = new BigInt(0);
    user.lastUpdatedAt = timestamp;
    user.save();
  }

  return user;
};

const findOrGetCore = (): Core => {
  let core = Core.load("1");
  if (!core) {
    core = new Core("1");
    core.totalPointsUSDB = new BigInt(0);
    core.totalPointsWETH = new BigInt(0);
    core.save();
  }

  return core;
};

const calculateAccumulatedPoints = (
  user: USDBUser,
  timestamp: BigInt
): BigInt => {
  const currentBalance = user.balance.minus(user.debt);
  const timeElapsed = timestamp.minus(user.lastUpdatedAt);
  const accumulatedPoints = currentBalance.times(timeElapsed);
  return accumulatedPoints;
};

function updateUser(address: string, timestamp: BigInt, balance: BigInt): void {
  const user = findOrGetUser(address, timestamp);
  const core = findOrGetCore();

  const accumulatedPoints = calculateAccumulatedPoints(user, timestamp);
  user.accumulatedPoints = user.accumulatedPoints.plus(accumulatedPoints);
  user.balance = user.balance.plus(balance);
  user.lastUpdatedAt = timestamp;

  core.totalPointsUSDB = core.totalPointsUSDB.plus(accumulatedPoints);

  user.save();
  core.save();
}

function updateUserDebt(
  address: string,
  timestamp: BigInt,
  balance: BigInt
): void {
  const user = findOrGetUser(address, timestamp);
  const core = findOrGetCore();

  const accumulatedPoints = calculateAccumulatedPoints(user, timestamp);
  user.accumulatedPoints = user.accumulatedPoints.plus(accumulatedPoints);
  user.debt = user.debt.plus(balance);
  user.lastUpdatedAt = timestamp;

  core.totalPointsUSDB = core.totalPointsUSDB.plus(accumulatedPoints);

  user.save();
  core.save();
}

export function handleTransferDebt(event: TransferEvent): void {
  // subtract and update from
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    updateUserDebt(
      event.params.from.toHexString(),
      event.block.timestamp,
      event.params.value.neg()
    );
  }

  if (event.params.to.toHexString() != ZERO_ADDRESS) {
    updateUserDebt(
      event.params.to.toHexString(),
      event.block.timestamp,
      event.params.value
    );
  }
}

export function handleTransferSupply(event: TransferEvent): void {
  // subtract and update from
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    updateUser(
      event.params.from.toHexString(),
      event.block.timestamp,
      event.params.value.neg()
    );
  }

  if (event.params.to.toHexString() != ZERO_ADDRESS) {
    updateUser(
      event.params.to.toHexString(),
      event.block.timestamp,
      event.params.value
    );
  }
}
