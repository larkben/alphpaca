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
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
  Narrow,
} from "@alephium/web3";
import { default as BattleFactoryContractJson } from "../gamefi/battle/BattleFactory.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import { DIAOracleValue, PlayerData, AllStructs } from "./types";

// Custom types for the contract
export namespace BattleFactoryTypes {
  export type Fields = {
    admin: Address;
    pvp: HexString;
    oracle: HexString;
    gameFi: HexString;
    token: HexString;
    tokenAmount: bigint;
  };

  export type State = ContractState<Fields>;

  export type BattleCreateEvent = ContractEvent<{
    nftOne: HexString;
    creator: Address;
    wagerToken: HexString;
    wager: bigint;
  }>;
  export type BattleStartEvent = ContractEvent<{
    nftOne: HexString;
    nftTwo: HexString;
    reward: bigint;
    hpOne: bigint;
    hpTwo: bigint;
  }>;
  export type BattleEndEvent = ContractEvent<{
    nftOne: HexString;
    nftTwo: HexString;
    winner: HexString;
  }>;
  export type BattleLeaveEvent = ContractEvent<{
    nftOne: HexString;
    nftLeft: HexString;
    who: Address;
    nftWon: HexString;
    winner: Address;
  }>;
  export type BattleAttackEvent = ContractEvent<{
    winner: Address;
    nft: HexString;
    remainingHealth: bigint;
  }>;
  export type BattleCancelEvent = ContractEvent<{
    nftOne: HexString;
    who: Address;
  }>;

  export interface CallMethodTable {
    isSupercharged: {
      params: CallContractParams<{ nft: HexString }>;
      result: CallContractResult<boolean>;
    };
    assignReward: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getWagerDetails: {
      params: CallContractParams<{ nft: HexString }>;
      result: CallContractResult<[HexString, bigint]>;
    };
    createBattle: {
      params: CallContractParams<{
        nft: HexString;
        wagerToken: HexString;
        amount: bigint;
      }>;
      result: CallContractResult<null>;
    };
    start: {
      params: CallContractParams<{ nft: HexString; opponent: HexString }>;
      result: CallContractResult<null>;
    };
    attack: {
      params: CallContractParams<{ nft: HexString }>;
      result: CallContractResult<null>;
    };
    leavebattle: {
      params: CallContractParams<{ nft: HexString }>;
      result: CallContractResult<null>;
    };
    cancel: {
      params: CallContractParams<{ nft: HexString }>;
      result: CallContractResult<null>;
    };
    fund: {
      params: CallContractParams<{
        who: Address;
        id: HexString;
        amount: bigint;
        topup: boolean;
      }>;
      result: CallContractResult<null>;
    };
    upgrade: {
      params: CallContractParams<{ newCode: HexString }>;
      result: CallContractResult<null>;
    };
    upgradeFields: {
      params: CallContractParams<{
        newCode: HexString;
        immutable: HexString;
        mutable: HexString;
      }>;
      result: CallContractResult<null>;
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
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    isSupercharged: {
      params: SignExecuteContractMethodParams<{ nft: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    assignReward: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getWagerDetails: {
      params: SignExecuteContractMethodParams<{ nft: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    createBattle: {
      params: SignExecuteContractMethodParams<{
        nft: HexString;
        wagerToken: HexString;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    start: {
      params: SignExecuteContractMethodParams<{
        nft: HexString;
        opponent: HexString;
      }>;
      result: SignExecuteScriptTxResult;
    };
    attack: {
      params: SignExecuteContractMethodParams<{ nft: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    leavebattle: {
      params: SignExecuteContractMethodParams<{ nft: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    cancel: {
      params: SignExecuteContractMethodParams<{ nft: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    fund: {
      params: SignExecuteContractMethodParams<{
        who: Address;
        id: HexString;
        amount: bigint;
        topup: boolean;
      }>;
      result: SignExecuteScriptTxResult;
    };
    upgrade: {
      params: SignExecuteContractMethodParams<{ newCode: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    upgradeFields: {
      params: SignExecuteContractMethodParams<{
        newCode: HexString;
        immutable: HexString;
        mutable: HexString;
      }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  BattleFactoryInstance,
  BattleFactoryTypes.Fields
> {
  encodeFields(fields: BattleFactoryTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = {
    BattleCreate: 0,
    BattleStart: 1,
    BattleEnd: 2,
    BattleLeave: 3,
    BattleAttack: 4,
    BattleCancel: 5,
  };
  consts = {
    BattleFactoryErrorCodes: {
      NotAdmin: BigInt("0"),
      NotSupercharged: BigInt("1"),
    },
  };

  at(address: string): BattleFactoryInstance {
    return new BattleFactoryInstance(address);
  }

  tests = {
    isSupercharged: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { nft: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<boolean>> => {
      return testMethod(this, "isSupercharged", params, getContractByCodeHash);
    },
    assignReward: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleFactoryTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "assignReward", params, getContractByCodeHash);
    },
    getWagerDetails: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { nft: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<[HexString, bigint]>> => {
      return testMethod(this, "getWagerDetails", params, getContractByCodeHash);
    },
    createBattle: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { nft: HexString; wagerToken: HexString; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "createBattle", params, getContractByCodeHash);
    },
    start: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { nft: HexString; opponent: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "start", params, getContractByCodeHash);
    },
    attack: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { nft: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "attack", params, getContractByCodeHash);
    },
    leavebattle: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { nft: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "leavebattle", params, getContractByCodeHash);
    },
    cancel: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { nft: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "cancel", params, getContractByCodeHash);
    },
    fund: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { who: Address; id: HexString; amount: bigint; topup: boolean }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "fund", params, getContractByCodeHash);
    },
    upgrade: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { newCode: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "upgrade", params, getContractByCodeHash);
    },
    upgradeFields: async (
      params: TestContractParamsWithoutMaps<
        BattleFactoryTypes.Fields,
        { newCode: HexString; immutable: HexString; mutable: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "upgradeFields", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: BattleFactoryTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const BattleFactory = new Factory(
  Contract.fromJson(
    BattleFactoryContractJson,
    "",
    "aa16f114c184851beb77111230f1d7924dc4a9f847372166539df2443c59d014",
    AllStructs
  )
);
registerContract(BattleFactory);

// Use this class to interact with the blockchain
export class BattleFactoryInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<BattleFactoryTypes.State> {
    return fetchContractState(BattleFactory, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeBattleCreateEvent(
    options: EventSubscribeOptions<BattleFactoryTypes.BattleCreateEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BattleFactory.contract,
      this,
      options,
      "BattleCreate",
      fromCount
    );
  }

  subscribeBattleStartEvent(
    options: EventSubscribeOptions<BattleFactoryTypes.BattleStartEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BattleFactory.contract,
      this,
      options,
      "BattleStart",
      fromCount
    );
  }

  subscribeBattleEndEvent(
    options: EventSubscribeOptions<BattleFactoryTypes.BattleEndEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BattleFactory.contract,
      this,
      options,
      "BattleEnd",
      fromCount
    );
  }

  subscribeBattleLeaveEvent(
    options: EventSubscribeOptions<BattleFactoryTypes.BattleLeaveEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BattleFactory.contract,
      this,
      options,
      "BattleLeave",
      fromCount
    );
  }

  subscribeBattleAttackEvent(
    options: EventSubscribeOptions<BattleFactoryTypes.BattleAttackEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BattleFactory.contract,
      this,
      options,
      "BattleAttack",
      fromCount
    );
  }

  subscribeBattleCancelEvent(
    options: EventSubscribeOptions<BattleFactoryTypes.BattleCancelEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      BattleFactory.contract,
      this,
      options,
      "BattleCancel",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | BattleFactoryTypes.BattleCreateEvent
      | BattleFactoryTypes.BattleStartEvent
      | BattleFactoryTypes.BattleEndEvent
      | BattleFactoryTypes.BattleLeaveEvent
      | BattleFactoryTypes.BattleAttackEvent
      | BattleFactoryTypes.BattleCancelEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      BattleFactory.contract,
      this,
      options,
      fromCount
    );
  }

  view = {
    isSupercharged: async (
      params: BattleFactoryTypes.CallMethodParams<"isSupercharged">
    ): Promise<BattleFactoryTypes.CallMethodResult<"isSupercharged">> => {
      return callMethod(
        BattleFactory,
        this,
        "isSupercharged",
        params,
        getContractByCodeHash
      );
    },
    assignReward: async (
      params?: BattleFactoryTypes.CallMethodParams<"assignReward">
    ): Promise<BattleFactoryTypes.CallMethodResult<"assignReward">> => {
      return callMethod(
        BattleFactory,
        this,
        "assignReward",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getWagerDetails: async (
      params: BattleFactoryTypes.CallMethodParams<"getWagerDetails">
    ): Promise<BattleFactoryTypes.CallMethodResult<"getWagerDetails">> => {
      return callMethod(
        BattleFactory,
        this,
        "getWagerDetails",
        params,
        getContractByCodeHash
      );
    },
    createBattle: async (
      params: BattleFactoryTypes.CallMethodParams<"createBattle">
    ): Promise<BattleFactoryTypes.CallMethodResult<"createBattle">> => {
      return callMethod(
        BattleFactory,
        this,
        "createBattle",
        params,
        getContractByCodeHash
      );
    },
    start: async (
      params: BattleFactoryTypes.CallMethodParams<"start">
    ): Promise<BattleFactoryTypes.CallMethodResult<"start">> => {
      return callMethod(
        BattleFactory,
        this,
        "start",
        params,
        getContractByCodeHash
      );
    },
    attack: async (
      params: BattleFactoryTypes.CallMethodParams<"attack">
    ): Promise<BattleFactoryTypes.CallMethodResult<"attack">> => {
      return callMethod(
        BattleFactory,
        this,
        "attack",
        params,
        getContractByCodeHash
      );
    },
    leavebattle: async (
      params: BattleFactoryTypes.CallMethodParams<"leavebattle">
    ): Promise<BattleFactoryTypes.CallMethodResult<"leavebattle">> => {
      return callMethod(
        BattleFactory,
        this,
        "leavebattle",
        params,
        getContractByCodeHash
      );
    },
    cancel: async (
      params: BattleFactoryTypes.CallMethodParams<"cancel">
    ): Promise<BattleFactoryTypes.CallMethodResult<"cancel">> => {
      return callMethod(
        BattleFactory,
        this,
        "cancel",
        params,
        getContractByCodeHash
      );
    },
    fund: async (
      params: BattleFactoryTypes.CallMethodParams<"fund">
    ): Promise<BattleFactoryTypes.CallMethodResult<"fund">> => {
      return callMethod(
        BattleFactory,
        this,
        "fund",
        params,
        getContractByCodeHash
      );
    },
    upgrade: async (
      params: BattleFactoryTypes.CallMethodParams<"upgrade">
    ): Promise<BattleFactoryTypes.CallMethodResult<"upgrade">> => {
      return callMethod(
        BattleFactory,
        this,
        "upgrade",
        params,
        getContractByCodeHash
      );
    },
    upgradeFields: async (
      params: BattleFactoryTypes.CallMethodParams<"upgradeFields">
    ): Promise<BattleFactoryTypes.CallMethodResult<"upgradeFields">> => {
      return callMethod(
        BattleFactory,
        this,
        "upgradeFields",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    isSupercharged: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"isSupercharged">
    ): Promise<
      BattleFactoryTypes.SignExecuteMethodResult<"isSupercharged">
    > => {
      return signExecuteMethod(BattleFactory, this, "isSupercharged", params);
    },
    assignReward: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"assignReward">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"assignReward">> => {
      return signExecuteMethod(BattleFactory, this, "assignReward", params);
    },
    getWagerDetails: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"getWagerDetails">
    ): Promise<
      BattleFactoryTypes.SignExecuteMethodResult<"getWagerDetails">
    > => {
      return signExecuteMethod(BattleFactory, this, "getWagerDetails", params);
    },
    createBattle: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"createBattle">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"createBattle">> => {
      return signExecuteMethod(BattleFactory, this, "createBattle", params);
    },
    start: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"start">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"start">> => {
      return signExecuteMethod(BattleFactory, this, "start", params);
    },
    attack: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"attack">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"attack">> => {
      return signExecuteMethod(BattleFactory, this, "attack", params);
    },
    leavebattle: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"leavebattle">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"leavebattle">> => {
      return signExecuteMethod(BattleFactory, this, "leavebattle", params);
    },
    cancel: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"cancel">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"cancel">> => {
      return signExecuteMethod(BattleFactory, this, "cancel", params);
    },
    fund: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"fund">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"fund">> => {
      return signExecuteMethod(BattleFactory, this, "fund", params);
    },
    upgrade: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"upgrade">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"upgrade">> => {
      return signExecuteMethod(BattleFactory, this, "upgrade", params);
    },
    upgradeFields: async (
      params: BattleFactoryTypes.SignExecuteMethodParams<"upgradeFields">
    ): Promise<BattleFactoryTypes.SignExecuteMethodResult<"upgradeFields">> => {
      return signExecuteMethod(BattleFactory, this, "upgradeFields", params);
    },
  };

  async multicall<Calls extends BattleFactoryTypes.MultiCallParams>(
    calls: Calls
  ): Promise<BattleFactoryTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends BattleFactoryTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<BattleFactoryTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | BattleFactoryTypes.MultiCallParams
      | BattleFactoryTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      BattleFactory,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
