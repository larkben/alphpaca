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
import { default as LoaneeMarketContractJson } from "../test/LoaneeMarket.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import {
  DIAOracleValue,
  PairInfo,
  PlayerData,
  TokenData,
  AllStructs,
} from "./types";

// Custom types for the contract
export namespace LoaneeMarketTypes {
  export type Fields = {
    creator: Address;
    token: HexString;
    tokenAmount: bigint;
    minTokenAmount: bigint;
    minInterest: bigint;
    maxTime: bigint;
    liquidation: boolean;
    parentContract: Address;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getLoaneeTokenDetails: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[HexString, bigint]>;
    };
    getLoaneeDetails: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<[Address, bigint, bigint, bigint, boolean]>;
    };
    editMarketValues: {
      params: CallContractParams<{
        caller: Address;
        newMinAmount: bigint;
        newInterest: bigint;
        newTime: bigint;
        canBeLiq: boolean;
      }>;
      result: CallContractResult<null>;
    };
    delegate: {
      params: CallContractParams<{ caller: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    add: {
      params: CallContractParams<{
        caller: Address;
        amount: bigint;
        gas: boolean;
      }>;
      result: CallContractResult<null>;
    };
    withdraw: {
      params: CallContractParams<{ caller: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    destroy: {
      params: CallContractParams<{ caller: Address }>;
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
    getLoaneeTokenDetails: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getLoaneeDetails: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    editMarketValues: {
      params: SignExecuteContractMethodParams<{
        caller: Address;
        newMinAmount: bigint;
        newInterest: bigint;
        newTime: bigint;
        canBeLiq: boolean;
      }>;
      result: SignExecuteScriptTxResult;
    };
    delegate: {
      params: SignExecuteContractMethodParams<{
        caller: Address;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    add: {
      params: SignExecuteContractMethodParams<{
        caller: Address;
        amount: bigint;
        gas: boolean;
      }>;
      result: SignExecuteScriptTxResult;
    };
    withdraw: {
      params: SignExecuteContractMethodParams<{
        caller: Address;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    destroy: {
      params: SignExecuteContractMethodParams<{ caller: Address }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  LoaneeMarketInstance,
  LoaneeMarketTypes.Fields
> {
  encodeFields(fields: LoaneeMarketTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  at(address: string): LoaneeMarketInstance {
    return new LoaneeMarketInstance(address);
  }

  tests = {
    getLoaneeTokenDetails: async (
      params: Omit<
        TestContractParamsWithoutMaps<LoaneeMarketTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<[HexString, bigint]>> => {
      return testMethod(
        this,
        "getLoaneeTokenDetails",
        params,
        getContractByCodeHash
      );
    },
    getLoaneeDetails: async (
      params: Omit<
        TestContractParamsWithoutMaps<LoaneeMarketTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<
      TestContractResultWithoutMaps<[Address, bigint, bigint, bigint, boolean]>
    > => {
      return testMethod(
        this,
        "getLoaneeDetails",
        params,
        getContractByCodeHash
      );
    },
    editMarketValues: async (
      params: TestContractParamsWithoutMaps<
        LoaneeMarketTypes.Fields,
        {
          caller: Address;
          newMinAmount: bigint;
          newInterest: bigint;
          newTime: bigint;
          canBeLiq: boolean;
        }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "editMarketValues",
        params,
        getContractByCodeHash
      );
    },
    delegate: async (
      params: TestContractParamsWithoutMaps<
        LoaneeMarketTypes.Fields,
        { caller: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "delegate", params, getContractByCodeHash);
    },
    add: async (
      params: TestContractParamsWithoutMaps<
        LoaneeMarketTypes.Fields,
        { caller: Address; amount: bigint; gas: boolean }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "add", params, getContractByCodeHash);
    },
    withdraw: async (
      params: TestContractParamsWithoutMaps<
        LoaneeMarketTypes.Fields,
        { caller: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "withdraw", params, getContractByCodeHash);
    },
    destroy: async (
      params: TestContractParamsWithoutMaps<
        LoaneeMarketTypes.Fields,
        { caller: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "destroy", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: LoaneeMarketTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const LoaneeMarket = new Factory(
  Contract.fromJson(
    LoaneeMarketContractJson,
    "",
    "1ae6139a0303d73f0cf5aa0e142a74d2d87b64e49e025b79766b3e277679dc0f",
    AllStructs
  )
);
registerContract(LoaneeMarket);

// Use this class to interact with the blockchain
export class LoaneeMarketInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<LoaneeMarketTypes.State> {
    return fetchContractState(LoaneeMarket, this);
  }

  view = {
    getLoaneeTokenDetails: async (
      params?: LoaneeMarketTypes.CallMethodParams<"getLoaneeTokenDetails">
    ): Promise<LoaneeMarketTypes.CallMethodResult<"getLoaneeTokenDetails">> => {
      return callMethod(
        LoaneeMarket,
        this,
        "getLoaneeTokenDetails",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getLoaneeDetails: async (
      params?: LoaneeMarketTypes.CallMethodParams<"getLoaneeDetails">
    ): Promise<LoaneeMarketTypes.CallMethodResult<"getLoaneeDetails">> => {
      return callMethod(
        LoaneeMarket,
        this,
        "getLoaneeDetails",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    editMarketValues: async (
      params: LoaneeMarketTypes.CallMethodParams<"editMarketValues">
    ): Promise<LoaneeMarketTypes.CallMethodResult<"editMarketValues">> => {
      return callMethod(
        LoaneeMarket,
        this,
        "editMarketValues",
        params,
        getContractByCodeHash
      );
    },
    delegate: async (
      params: LoaneeMarketTypes.CallMethodParams<"delegate">
    ): Promise<LoaneeMarketTypes.CallMethodResult<"delegate">> => {
      return callMethod(
        LoaneeMarket,
        this,
        "delegate",
        params,
        getContractByCodeHash
      );
    },
    add: async (
      params: LoaneeMarketTypes.CallMethodParams<"add">
    ): Promise<LoaneeMarketTypes.CallMethodResult<"add">> => {
      return callMethod(
        LoaneeMarket,
        this,
        "add",
        params,
        getContractByCodeHash
      );
    },
    withdraw: async (
      params: LoaneeMarketTypes.CallMethodParams<"withdraw">
    ): Promise<LoaneeMarketTypes.CallMethodResult<"withdraw">> => {
      return callMethod(
        LoaneeMarket,
        this,
        "withdraw",
        params,
        getContractByCodeHash
      );
    },
    destroy: async (
      params: LoaneeMarketTypes.CallMethodParams<"destroy">
    ): Promise<LoaneeMarketTypes.CallMethodResult<"destroy">> => {
      return callMethod(
        LoaneeMarket,
        this,
        "destroy",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getLoaneeTokenDetails: async (
      params: LoaneeMarketTypes.SignExecuteMethodParams<"getLoaneeTokenDetails">
    ): Promise<
      LoaneeMarketTypes.SignExecuteMethodResult<"getLoaneeTokenDetails">
    > => {
      return signExecuteMethod(
        LoaneeMarket,
        this,
        "getLoaneeTokenDetails",
        params
      );
    },
    getLoaneeDetails: async (
      params: LoaneeMarketTypes.SignExecuteMethodParams<"getLoaneeDetails">
    ): Promise<
      LoaneeMarketTypes.SignExecuteMethodResult<"getLoaneeDetails">
    > => {
      return signExecuteMethod(LoaneeMarket, this, "getLoaneeDetails", params);
    },
    editMarketValues: async (
      params: LoaneeMarketTypes.SignExecuteMethodParams<"editMarketValues">
    ): Promise<
      LoaneeMarketTypes.SignExecuteMethodResult<"editMarketValues">
    > => {
      return signExecuteMethod(LoaneeMarket, this, "editMarketValues", params);
    },
    delegate: async (
      params: LoaneeMarketTypes.SignExecuteMethodParams<"delegate">
    ): Promise<LoaneeMarketTypes.SignExecuteMethodResult<"delegate">> => {
      return signExecuteMethod(LoaneeMarket, this, "delegate", params);
    },
    add: async (
      params: LoaneeMarketTypes.SignExecuteMethodParams<"add">
    ): Promise<LoaneeMarketTypes.SignExecuteMethodResult<"add">> => {
      return signExecuteMethod(LoaneeMarket, this, "add", params);
    },
    withdraw: async (
      params: LoaneeMarketTypes.SignExecuteMethodParams<"withdraw">
    ): Promise<LoaneeMarketTypes.SignExecuteMethodResult<"withdraw">> => {
      return signExecuteMethod(LoaneeMarket, this, "withdraw", params);
    },
    destroy: async (
      params: LoaneeMarketTypes.SignExecuteMethodParams<"destroy">
    ): Promise<LoaneeMarketTypes.SignExecuteMethodResult<"destroy">> => {
      return signExecuteMethod(LoaneeMarket, this, "destroy", params);
    },
  };

  async multicall<Calls extends LoaneeMarketTypes.MultiCallParams>(
    calls: Calls
  ): Promise<LoaneeMarketTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends LoaneeMarketTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<LoaneeMarketTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | LoaneeMarketTypes.MultiCallParams
      | LoaneeMarketTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      LoaneeMarket,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
