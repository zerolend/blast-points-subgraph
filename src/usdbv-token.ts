import {
  Approval as ApprovalEvent,
  BorrowAllowanceDelegated as BorrowAllowanceDelegatedEvent,
  Burn as BurnEvent,
  Initialized as InitializedEvent,
  Mint as MintEvent,
  Transfer as TransferEvent,
} from "../generated/USDBVToken/USDBVToken";
import {
  USDBVTokenApproval as Approval,
  USDBVTokenBorrowAllowanceDelegated as BorrowAllowanceDelegated,
  USDBVTokenBurn as Burn,
  USDBVTokenInitialized as Initialized,
  USDBVTokenMint as Mint,
  USDBVTokenTransfer as Transfer,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBorrowAllowanceDelegated(
  event: BorrowAllowanceDelegatedEvent
): void {
  let entity = new BorrowAllowanceDelegated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.fromUser = event.params.fromUser;
  entity.toUser = event.params.toUser;
  entity.asset = event.params.asset;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBurn(event: BurnEvent): void {
  let entity = new Burn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.target = event.params.target;
  entity.value = event.params.value;
  entity.balanceIncrease = event.params.balanceIncrease;
  entity.index = event.params.index;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.underlyingAsset = event.params.underlyingAsset;
  entity.pool = event.params.pool;
  entity.incentivesController = event.params.incentivesController;
  entity.debtTokenDecimals = event.params.debtTokenDecimals;
  entity.debtTokenName = event.params.debtTokenName;
  entity.debtTokenSymbol = event.params.debtTokenSymbol;
  entity.params = event.params.params;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.caller = event.params.caller;
  entity.onBehalfOf = event.params.onBehalfOf;
  entity.value = event.params.value;
  entity.balanceIncrease = event.params.balanceIncrease;
  entity.index = event.params.index;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
