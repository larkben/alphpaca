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
import { default as CreateTokenContractJson } from "../createtoken/CreateToken.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import {
  DIAOracleValue,
  DIARandomValue,
  PlayerData,
  AllStructs,
} from "./types";

// Custom types for the contract
export namespace CreateTokenTypes {
  export type Fields = {
    owner: Address;
    contract: HexString;
    alphfee: bigint;
    alphcollected: bigint;
  };

  export type State = ContractState<Fields>;

  export type DestroyEvent = ContractEvent<{ user: Address }>;
  export type CreateTokenEvent = ContractEvent<{
    user: Address;
    contract: HexString;
  }>;

  export interface CallMethodTable {
    getFee: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    buildtoken: {
      params: CallContractParams<{
        symbol: HexString;
        name: HexString;
        decimals: bigint;
        tokenTotal: bigint;
      }>;
      result: CallContractResult<null>;
    };
    updatefee: {
      params: CallContractParams<{ newfee: bigint }>;
      result: CallContractResult<null>;
    };
    collectfees: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<null>;
    };
    destroycreator: {
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
    getFee: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    buildtoken: {
      params: SignExecuteContractMethodParams<{
        symbol: HexString;
        name: HexString;
        decimals: bigint;
        tokenTotal: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    updatefee: {
      params: SignExecuteContractMethodParams<{ newfee: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    collectfees: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    destroycreator: {
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
  CreateTokenInstance,
  CreateTokenTypes.Fields
> {
  encodeFields(fields: CreateTokenTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { Destroy: 0, CreateToken: 1 };
  consts = { ErrorCodes: { InvalidCaller: BigInt("1") } };

  at(address: string): CreateTokenInstance {
    return new CreateTokenInstance(address);
  }

  tests = {
    getFee: async (
      params: Omit<
        TestContractParamsWithoutMaps<CreateTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getFee", params, getContractByCodeHash);
    },
    buildtoken: async (
      params: TestContractParamsWithoutMaps<
        CreateTokenTypes.Fields,
        {
          symbol: HexString;
          name: HexString;
          decimals: bigint;
          tokenTotal: bigint;
        }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "buildtoken", params, getContractByCodeHash);
    },
    updatefee: async (
      params: TestContractParamsWithoutMaps<
        CreateTokenTypes.Fields,
        { newfee: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "updatefee", params, getContractByCodeHash);
    },
    collectfees: async (
      params: Omit<
        TestContractParamsWithoutMaps<CreateTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "collectfees", params, getContractByCodeHash);
    },
    destroycreator: async (
      params: Omit<
        TestContractParamsWithoutMaps<CreateTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "destroycreator", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: CreateTokenTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const CreateToken = new Factory(
  Contract.fromJson(
    CreateTokenContractJson,
    "",
    "2417efe145ca648a8d8cbc37ef9bc41b7d2f28406925fe7a88725c33a61542d9",
    AllStructs
  )
);
registerContract(CreateToken);

// Use this class to interact with the blockchain
export class CreateTokenInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<CreateTokenTypes.State> {
    return fetchContractState(CreateToken, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeDestroyEvent(
    options: EventSubscribeOptions<CreateTokenTypes.DestroyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      CreateToken.contract,
      this,
      options,
      "Destroy",
      fromCount
    );
  }

  subscribeCreateTokenEvent(
    options: EventSubscribeOptions<CreateTokenTypes.CreateTokenEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      CreateToken.contract,
      this,
      options,
      "CreateToken",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      CreateTokenTypes.DestroyEvent | CreateTokenTypes.CreateTokenEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      CreateToken.contract,
      this,
      options,
      fromCount
    );
  }

  view = {
    getFee: async (
      params?: CreateTokenTypes.CallMethodParams<"getFee">
    ): Promise<CreateTokenTypes.CallMethodResult<"getFee">> => {
      return callMethod(
        CreateToken,
        this,
        "getFee",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    buildtoken: async (
      params: CreateTokenTypes.CallMethodParams<"buildtoken">
    ): Promise<CreateTokenTypes.CallMethodResult<"buildtoken">> => {
      return callMethod(
        CreateToken,
        this,
        "buildtoken",
        params,
        getContractByCodeHash
      );
    },
    updatefee: async (
      params: CreateTokenTypes.CallMethodParams<"updatefee">
    ): Promise<CreateTokenTypes.CallMethodResult<"updatefee">> => {
      return callMethod(
        CreateToken,
        this,
        "updatefee",
        params,
        getContractByCodeHash
      );
    },
    collectfees: async (
      params?: CreateTokenTypes.CallMethodParams<"collectfees">
    ): Promise<CreateTokenTypes.CallMethodResult<"collectfees">> => {
      return callMethod(
        CreateToken,
        this,
        "collectfees",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    destroycreator: async (
      params?: CreateTokenTypes.CallMethodParams<"destroycreator">
    ): Promise<CreateTokenTypes.CallMethodResult<"destroycreator">> => {
      return callMethod(
        CreateToken,
        this,
        "destroycreator",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getFee: async (
      params: CreateTokenTypes.SignExecuteMethodParams<"getFee">
    ): Promise<CreateTokenTypes.SignExecuteMethodResult<"getFee">> => {
      return signExecuteMethod(CreateToken, this, "getFee", params);
    },
    buildtoken: async (
      params: CreateTokenTypes.SignExecuteMethodParams<"buildtoken">
    ): Promise<CreateTokenTypes.SignExecuteMethodResult<"buildtoken">> => {
      return signExecuteMethod(CreateToken, this, "buildtoken", params);
    },
    updatefee: async (
      params: CreateTokenTypes.SignExecuteMethodParams<"updatefee">
    ): Promise<CreateTokenTypes.SignExecuteMethodResult<"updatefee">> => {
      return signExecuteMethod(CreateToken, this, "updatefee", params);
    },
    collectfees: async (
      params: CreateTokenTypes.SignExecuteMethodParams<"collectfees">
    ): Promise<CreateTokenTypes.SignExecuteMethodResult<"collectfees">> => {
      return signExecuteMethod(CreateToken, this, "collectfees", params);
    },
    destroycreator: async (
      params: CreateTokenTypes.SignExecuteMethodParams<"destroycreator">
    ): Promise<CreateTokenTypes.SignExecuteMethodResult<"destroycreator">> => {
      return signExecuteMethod(CreateToken, this, "destroycreator", params);
    },
  };

  async multicall<Calls extends CreateTokenTypes.MultiCallParams>(
    calls: Calls
  ): Promise<CreateTokenTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends CreateTokenTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<CreateTokenTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | CreateTokenTypes.MultiCallParams
      | CreateTokenTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      CreateToken,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
