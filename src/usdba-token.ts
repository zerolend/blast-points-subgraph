import {
  Approval as ApprovalEvent,
  BalanceTransfer as BalanceTransferEvent,
  Burn as BurnEvent,
  Initialized as InitializedEvent,
  Mint as MintEvent,
  Transfer as TransferEvent,
} from "../generated/USDBAToken/USDBAToken";
import {
  USDBATokenApproval as Approval,
  USDBATokenBalanceTransfer as BalanceTransfer,
  USDBATokenBurn as Burn,
  USDBATokenInitialized as Initialized,
  USDBATokenMint as Mint,
  USDBATokenTransfer as Transfer,
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
  entity.treasury = event.params.treasury;
  entity.incentivesController = event.params.incentivesController;
  entity.aTokenDecimals = event.params.aTokenDecimals;
  entity.aTokenName = event.params.aTokenName;
  entity.aTokenSymbol = event.params.aTokenSymbol;
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
