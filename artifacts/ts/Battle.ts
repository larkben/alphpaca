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
import { default as BattleContractJson } from "../gamefi/battle/Battle.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import {
  DIAOracleValue,
  PairInfo,
  PlayerData,
  TokenData,
  AllStructs,
} from "./types";

// Custom types for the contract
export namespace BattleTypes {
  export type Fields = {
    playerOne: Address;
    nftOne: HexString;
    wagerToken: HexString;
    amount: bigint;
    playerTwo: Address;
    nftTwo: HexString;
    turn: bigint;
    oracle: HexString;
    gamefi: HexString;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getWagerToken: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getWagerAmount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getBattleDetails: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[Address, HexString, Address, HexString]>;
    };
    random: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    endbattle: {
      params: CallContractParams<{ winner: Address }>;
      result: CallContractResult<null>;
    };
    whoTurn: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[Address, HexString, HexString]>;
    };
    acceptBattle: {
      params: CallContractParams<{ nft: HexString; caller: Address }>;
      result: CallContractResult<null>;
    };
    attack: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[Address, HexString, bigint]>;
    };
    leave: {
      params: CallContractParams<{ caller: Address }>;
      result: CallContractResult<null>;
    };
    cancel: {
      params: Omit<CallContractParams<{}>, "args">;
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
    getWagerToken: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getWagerAmount: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getBattleDetails: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    random: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    endbattle: {
      params: SignExecuteContractMethodParams<{ winner: Address }>;
      result: SignExecuteScriptTxResult;
    };
    whoTurn: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    acceptBattle: {
      params: SignExecuteContractMethodParams<{
        nft: HexString;
        caller: Address;
      }>;
      result: SignExecuteScriptTxResult;
    };
    attack: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    leave: {
      params: SignExecuteContractMethodParams<{ caller: Address }>;
      result: SignExecuteScriptTxResult;
    };
    cancel: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<BattleInstance, BattleTypes.Fields> {
  encodeFields(fields: BattleTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  consts = {
    BattleCodes: {
      InvalidPlayer: BigInt("0"),
      BattleIsActive: BigInt("1"),
      NotYourTurn: BigInt("2"),
      NFTFainted: BigInt("3"),
      BattleNotDone: BigInt("4"),
    },
  };

  at(address: string): BattleInstance {
    return new BattleInstance(address);
  }

  tests = {
    getWagerToken: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getWagerToken", params, getContractByCodeHash);
    },
    getWagerAmount: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getWagerAmount", params, getContractByCodeHash);
    },
    getBattleDetails: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<
      TestContractResultWithoutMaps<[Address, HexString, Address, HexString]>
    > => {
      return testMethod(
        this,
        "getBattleDetails",
        params,
        getContractByCodeHash
      );
    },
    random: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "random", params, getContractByCodeHash);
    },
    endbattle: async (
      params: TestContractParamsWithoutMaps<
        BattleTypes.Fields,
        { winner: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "endbattle", params, getContractByCodeHash);
    },
    whoTurn: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<
      TestContractResultWithoutMaps<[Address, HexString, HexString]>
    > => {
      return testMethod(this, "whoTurn", params, getContractByCodeHash);
    },
    acceptBattle: async (
      params: TestContractParamsWithoutMaps<
        BattleTypes.Fields,
        { nft: HexString; caller: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "acceptBattle", params, getContractByCodeHash);
    },
    attack: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<[Address, HexString, bigint]>> => {
      return testMethod(this, "attack", params, getContractByCodeHash);
    },
    leave: async (
      params: TestContractParamsWithoutMaps<
        BattleTypes.Fields,
        { caller: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "leave", params, getContractByCodeHash);
    },
    cancel: async (
      params: Omit<
        TestContractParamsWithoutMaps<BattleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "cancel", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: BattleTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const Battle = new Factory(
  Contract.fromJson(
    BattleContractJson,
    "",
    "10f37961c3315b33831970f85c7261a8daa72b7cfb1e0e4df2d6e934f8d617b0",
    AllStructs
  )
);
registerContract(Battle);

// Use this class to interact with the blockchain
export class BattleInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<BattleTypes.State> {
    return fetchContractState(Battle, this);
  }

  view = {
    getWagerToken: async (
      params?: BattleTypes.CallMethodParams<"getWagerToken">
    ): Promise<BattleTypes.CallMethodResult<"getWagerToken">> => {
      return callMethod(
        Battle,
        this,
        "getWagerToken",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getWagerAmount: async (
      params?: BattleTypes.CallMethodParams<"getWagerAmount">
    ): Promise<BattleTypes.CallMethodResult<"getWagerAmount">> => {
      return callMethod(
        Battle,
        this,
        "getWagerAmount",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getBattleDetails: async (
      params?: BattleTypes.CallMethodParams<"getBattleDetails">
    ): Promise<BattleTypes.CallMethodResult<"getBattleDetails">> => {
      return callMethod(
        Battle,
        this,
        "getBattleDetails",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    random: async (
      params?: BattleTypes.CallMethodParams<"random">
    ): Promise<BattleTypes.CallMethodResult<"random">> => {
      return callMethod(
        Battle,
        this,
        "random",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    endbattle: async (
      params: BattleTypes.CallMethodParams<"endbattle">
    ): Promise<BattleTypes.CallMethodResult<"endbattle">> => {
      return callMethod(
        Battle,
        this,
        "endbattle",
        params,
        getContractByCodeHash
      );
    },
    whoTurn: async (
      params?: BattleTypes.CallMethodParams<"whoTurn">
    ): Promise<BattleTypes.CallMethodResult<"whoTurn">> => {
      return callMethod(
        Battle,
        this,
        "whoTurn",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    acceptBattle: async (
      params: BattleTypes.CallMethodParams<"acceptBattle">
    ): Promise<BattleTypes.CallMethodResult<"acceptBattle">> => {
      return callMethod(
        Battle,
        this,
        "acceptBattle",
        params,
        getContractByCodeHash
      );
    },
    attack: async (
      params?: BattleTypes.CallMethodParams<"attack">
    ): Promise<BattleTypes.CallMethodResult<"attack">> => {
      return callMethod(
        Battle,
        this,
        "attack",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    leave: async (
      params: BattleTypes.CallMethodParams<"leave">
    ): Promise<BattleTypes.CallMethodResult<"leave">> => {
      return callMethod(Battle, this, "leave", params, getContractByCodeHash);
    },
    cancel: async (
      params?: BattleTypes.CallMethodParams<"cancel">
    ): Promise<BattleTypes.CallMethodResult<"cancel">> => {
      return callMethod(
        Battle,
        this,
        "cancel",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getWagerToken: async (
      params: BattleTypes.SignExecuteMethodParams<"getWagerToken">
    ): Promise<BattleTypes.SignExecuteMethodResult<"getWagerToken">> => {
      return signExecuteMethod(Battle, this, "getWagerToken", params);
    },
    getWagerAmount: async (
      params: BattleTypes.SignExecuteMethodParams<"getWagerAmount">
    ): Promise<BattleTypes.SignExecuteMethodResult<"getWagerAmount">> => {
      return signExecuteMethod(Battle, this, "getWagerAmount", params);
    },
    getBattleDetails: async (
      params: BattleTypes.SignExecuteMethodParams<"getBattleDetails">
    ): Promise<BattleTypes.SignExecuteMethodResult<"getBattleDetails">> => {
      return signExecuteMethod(Battle, this, "getBattleDetails", params);
    },
    random: async (
      params: BattleTypes.SignExecuteMethodParams<"random">
    ): Promise<BattleTypes.SignExecuteMethodResult<"random">> => {
      return signExecuteMethod(Battle, this, "random", params);
    },
    endbattle: async (
      params: BattleTypes.SignExecuteMethodParams<"endbattle">
    ): Promise<BattleTypes.SignExecuteMethodResult<"endbattle">> => {
      return signExecuteMethod(Battle, this, "endbattle", params);
    },
    whoTurn: async (
      params: BattleTypes.SignExecuteMethodParams<"whoTurn">
    ): Promise<BattleTypes.SignExecuteMethodResult<"whoTurn">> => {
      return signExecuteMethod(Battle, this, "whoTurn", params);
    },
    acceptBattle: async (
      params: BattleTypes.SignExecuteMethodParams<"acceptBattle">
    ): Promise<BattleTypes.SignExecuteMethodResult<"acceptBattle">> => {
      return signExecuteMethod(Battle, this, "acceptBattle", params);
    },
    attack: async (
      params: BattleTypes.SignExecuteMethodParams<"attack">
    ): Promise<BattleTypes.SignExecuteMethodResult<"attack">> => {
      return signExecuteMethod(Battle, this, "attack", params);
    },
    leave: async (
      params: BattleTypes.SignExecuteMethodParams<"leave">
    ): Promise<BattleTypes.SignExecuteMethodResult<"leave">> => {
      return signExecuteMethod(Battle, this, "leave", params);
    },
    cancel: async (
      params: BattleTypes.SignExecuteMethodParams<"cancel">
    ): Promise<BattleTypes.SignExecuteMethodResult<"cancel">> => {
      return signExecuteMethod(Battle, this, "cancel", params);
    },
  };

  async multicall<Calls extends BattleTypes.MultiCallParams>(
    calls: Calls
  ): Promise<BattleTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends BattleTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<BattleTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends BattleTypes.MultiCallParams | BattleTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(Battle, this, callss, getContractByCodeHash);
  }
}
