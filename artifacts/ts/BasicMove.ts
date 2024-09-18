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
} from "@alephium/web3";
import { default as BasicMoveContractJson } from "../gamefi/moves/BasicMove.ral.json";
import { getContractByCodeHash } from "./contracts";
import { MoveReturn, AllStructs } from "./types";

// Custom types for the contract
export namespace BasicMoveTypes {
  export type Fields = {
    nftIndex: bigint;
    tokenUri: HexString;
    collectionId: HexString;
    power: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getTokenUri: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getCollectionIndex: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[HexString, bigint]>;
    };
    getNFTIndex: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    editUri: {
      params: CallContractParams<{ newUri: HexString }>;
      result: CallContractResult<null>;
    };
    performMove: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<MoveReturn>;
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
    getTokenUri: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getCollectionIndex: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getNFTIndex: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    editUri: {
      params: SignExecuteContractMethodParams<{ newUri: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    performMove: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  BasicMoveInstance,
  BasicMoveTypes.Fields
> {
  encodeFields(fields: BasicMoveTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  consts = { ErrorCodes: { NotCalledFromCollection: BigInt("0") } };

  at(address: string): BasicMoveInstance {
    return new BasicMoveInstance(address);
  }

  tests = {
    getTokenUri: async (
      params: Omit<
        TestContractParamsWithoutMaps<BasicMoveTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getTokenUri", params, getContractByCodeHash);
    },
    getCollectionIndex: async (
      params: Omit<
        TestContractParamsWithoutMaps<BasicMoveTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<[HexString, bigint]>> => {
      return testMethod(
        this,
        "getCollectionIndex",
        params,
        getContractByCodeHash
      );
    },
    getNFTIndex: async (
      params: Omit<
        TestContractParamsWithoutMaps<BasicMoveTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getNFTIndex", params, getContractByCodeHash);
    },
    editUri: async (
      params: TestContractParamsWithoutMaps<
        BasicMoveTypes.Fields,
        { newUri: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "editUri", params, getContractByCodeHash);
    },
    performMove: async (
      params: Omit<
        TestContractParamsWithoutMaps<BasicMoveTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<MoveReturn>> => {
      return testMethod(this, "performMove", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: BasicMoveTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const BasicMove = new Factory(
  Contract.fromJson(
    BasicMoveContractJson,
    "",
    "64999dc96de4d67708ed525228a98425ecca3a3b0626d66b3cb6475e03ac3f5a",
    AllStructs
  )
);

// Use this class to interact with the blockchain
export class BasicMoveInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<BasicMoveTypes.State> {
    return fetchContractState(BasicMove, this);
  }

  view = {
    getTokenUri: async (
      params?: BasicMoveTypes.CallMethodParams<"getTokenUri">
    ): Promise<BasicMoveTypes.CallMethodResult<"getTokenUri">> => {
      return callMethod(
        BasicMove,
        this,
        "getTokenUri",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getCollectionIndex: async (
      params?: BasicMoveTypes.CallMethodParams<"getCollectionIndex">
    ): Promise<BasicMoveTypes.CallMethodResult<"getCollectionIndex">> => {
      return callMethod(
        BasicMove,
        this,
        "getCollectionIndex",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getNFTIndex: async (
      params?: BasicMoveTypes.CallMethodParams<"getNFTIndex">
    ): Promise<BasicMoveTypes.CallMethodResult<"getNFTIndex">> => {
      return callMethod(
        BasicMove,
        this,
        "getNFTIndex",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    editUri: async (
      params: BasicMoveTypes.CallMethodParams<"editUri">
    ): Promise<BasicMoveTypes.CallMethodResult<"editUri">> => {
      return callMethod(
        BasicMove,
        this,
        "editUri",
        params,
        getContractByCodeHash
      );
    },
    performMove: async (
      params?: BasicMoveTypes.CallMethodParams<"performMove">
    ): Promise<BasicMoveTypes.CallMethodResult<"performMove">> => {
      return callMethod(
        BasicMove,
        this,
        "performMove",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getTokenUri: async (
      params: BasicMoveTypes.SignExecuteMethodParams<"getTokenUri">
    ): Promise<BasicMoveTypes.SignExecuteMethodResult<"getTokenUri">> => {
      return signExecuteMethod(BasicMove, this, "getTokenUri", params);
    },
    getCollectionIndex: async (
      params: BasicMoveTypes.SignExecuteMethodParams<"getCollectionIndex">
    ): Promise<
      BasicMoveTypes.SignExecuteMethodResult<"getCollectionIndex">
    > => {
      return signExecuteMethod(BasicMove, this, "getCollectionIndex", params);
    },
    getNFTIndex: async (
      params: BasicMoveTypes.SignExecuteMethodParams<"getNFTIndex">
    ): Promise<BasicMoveTypes.SignExecuteMethodResult<"getNFTIndex">> => {
      return signExecuteMethod(BasicMove, this, "getNFTIndex", params);
    },
    editUri: async (
      params: BasicMoveTypes.SignExecuteMethodParams<"editUri">
    ): Promise<BasicMoveTypes.SignExecuteMethodResult<"editUri">> => {
      return signExecuteMethod(BasicMove, this, "editUri", params);
    },
    performMove: async (
      params: BasicMoveTypes.SignExecuteMethodParams<"performMove">
    ): Promise<BasicMoveTypes.SignExecuteMethodResult<"performMove">> => {
      return signExecuteMethod(BasicMove, this, "performMove", params);
    },
  };

  async multicall<Callss extends BasicMoveTypes.MultiCallParams[]>(
    ...callss: Callss
  ): Promise<BasicMoveTypes.MulticallReturnType<Callss>> {
    return (await multicallMethods(
      BasicMove,
      this,
      callss,
      getContractByCodeHash
    )) as BasicMoveTypes.MulticallReturnType<Callss>;
  }
}
