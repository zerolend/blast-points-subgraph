import { Address, BigInt } from "@graphprotocol/graph-ts";
import { BalanceTransfer as BalanceTransferEvent } from "../generated/USDBAToken/USDBAToken";
import {
  USDBATokenBalanceTransfer as BalanceTransfer,
  USDBUser,
} from "../generated/schema";

const findOrGetUser = (who: Address) => {
  let user = USDBUser.load(who);
  if (!user) {
    user = new USDBUser(who);
    user.balance = new BigInt(0);
    user.accumulatedPoints = new BigInt(0);
    user.lastUpdatedAt = Date.now();
  }

  return user;
};

export function handleBalanceTransfer(event: BalanceTransferEvent): void {
  let entity = new BalanceTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.index = event.params.index;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  const user = findOrGetUser(event.params.from);

  const accumulatedPoints = user.balance.times(
    new BigInt(Date.now() - user.lastUpdatedAt)
  );

  user.accumulatedPoints = user.accumulatedPoints.plus(accumulatedPoints);
  user.save();
}
