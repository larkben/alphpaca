/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as BurnTokenContractJson } from "../burn/BurnToken.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace BurnTokenTypes {
  export type Fields = {
    tokensburned: bigint;
    tokenid: HexString;
    owner: Address;
  };

  export type State = ContractState<Fields>;

  export type BurnEvent = ContractEvent<{
    from: Address;
    amount: bigint;
    token: HexString;
  }>;
  export type DestroyEvent = ContractEvent<{ from: Address }>;

  export interface CallMethodTable {
    getSymbol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
}

class Factory extends ContractFactory<
  BurnTokenInstance,
  BurnTokenTypes.Fields
> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as BurnTokenTypes.Fields;
  }

  eventIndex = { Burn: 0, Destroy: 1 };
  consts = { Error: { InvalidCaller: BigInt(0) } };

  at(address: string): BurnTokenInstance {
    return new BurnTokenInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<TestContractParams<BurnTokenTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getSymbol", params);
    },
    getName: async (
      params: Omit<TestContractParams<BurnTokenTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getName", params);
    },
    burntoken: async (
      params: TestContractParams<BurnTokenTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "burntoken", params);
    },
    destroy: async (
      params: Omit<TestContractParams<BurnTokenTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroy", params);
    },
  };
}

// Use this object to test and deploy the contract
export const BurnToken = new Factory(
  Contract.fromJson(
    BurnTokenContractJson,
    "",
    "f2def89f6c6812d5b48e2bc92ed1fc50520dfb84621676d9aa3e9e3b2bba609c"
  )
);

// Use this class to interact with the blockchain
export class BurnTokenInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<BurnTokenTypes.State> {
    return fetchContractState(BurnToken, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeBurnEvent(
    options: EventSubscribeOptions<BurnTokenTypes.BurnEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BurnToken.contract,
      this,
      options,
      "Burn",
      fromCount
    );
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<BurnTokenTypes.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BurnToken.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      BurnTokenTypes.BurnEvent | BurnTokenTypes.DestroyEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      BurnToken.contract,
      this,
      options,
      fromCount
    );
  }

  methods = {
    getSymbol: async (
      params?: BurnTokenTypes.CallMethodParams<"getSymbol">
    ): Promise<BurnTokenTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        BurnToken,
        this,
        "getSymbol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getName: async (
      params?: BurnTokenTypes.CallMethodParams<"getName">
    ): Promise<BurnTokenTypes.CallMethodResult<"getName">> => {
      return callMethod(
        BurnToken,
        this,
        "getName",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends BurnTokenTypes.MultiCallParams>(
    calls: Calls
  ): Promise<BurnTokenTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      BurnToken,
      this,
      calls,
      getContractByCodeHash
    )) as BurnTokenTypes.MultiCallResults<Calls>;
  }
}
