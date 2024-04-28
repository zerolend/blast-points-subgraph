import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  BalanceTransfer,
  Burn,
  Initialized,
  Mint,
  Transfer
} from "../generated/USDBAToken/USDBAToken"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createBalanceTransferEvent(
  from: Address,
  to: Address,
  value: BigInt,
  index: BigInt
): BalanceTransfer {
  let balanceTransferEvent = changetype<BalanceTransfer>(newMockEvent())

  balanceTransferEvent.parameters = new Array()

  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  balanceTransferEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return balanceTransferEvent
}

export function createBurnEvent(
  from: Address,
  target: Address,
  value: BigInt,
  balanceIncrease: BigInt,
  index: BigInt
): Burn {
  let burnEvent = changetype<Burn>(newMockEvent())

  burnEvent.parameters = new Array()

  burnEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam(
      "balanceIncrease",
      ethereum.Value.fromUnsignedBigInt(balanceIncrease)
    )
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return burnEvent
}

export function createInitializedEvent(
  underlyingAsset: Address,
  pool: Address,
  treasury: Address,
  incentivesController: Address,
  aTokenDecimals: i32,
  aTokenName: string,
  aTokenSymbol: string,
  params: Bytes
): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "underlyingAsset",
      ethereum.Value.fromAddress(underlyingAsset)
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "incentivesController",
      ethereum.Value.fromAddress(incentivesController)
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "aTokenDecimals",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(aTokenDecimals))
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("aTokenName", ethereum.Value.fromString(aTokenName))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "aTokenSymbol",
      ethereum.Value.fromString(aTokenSymbol)
    )
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("params", ethereum.Value.fromBytes(params))
  )

  return initializedEvent
}

export function createMintEvent(
  caller: Address,
  onBehalfOf: Address,
  value: BigInt,
  balanceIncrease: BigInt,
  index: BigInt
): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "balanceIncrease",
      ethereum.Value.fromUnsignedBigInt(balanceIncrease)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return mintEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
