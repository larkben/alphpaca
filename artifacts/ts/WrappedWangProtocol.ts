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
import { default as WrappedWangProtocolContractJson } from "../wang/WrappedWangProtocol.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import {
  DIAOracleValue,
  DIARandomValue,
  PlayerData,
  AllStructs,
} from "./types";

// Custom types for the contract
export namespace WrappedWangProtocolTypes {
  export type Fields = {
    wwang: HexString;
    wwangamount: bigint;
    owner: Address;
    wang: HexString;
    wangamount: bigint;
    fee: bigint;
    feescollected: bigint;
  };

  export type State = ContractState<Fields>;

  export type WrappedWangMintedEvent = ContractEvent<{
    who: Address;
    amount: bigint;
  }>;
  export type OgWangRedeemedEvent = ContractEvent<{
    who: Address;
    amount: bigint;
  }>;

  export interface CallMethodTable {
    getWWangToken: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getWWangAmount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getOwner: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<Address>;
    };
    getWang: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getFee: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    mintwrapped: {
      params: CallContractParams<{ amount: bigint }>;
      result: CallContractResult<null>;
    };
    mintog: {
      params: CallContractParams<{ amount: bigint }>;
      result: CallContractResult<null>;
    };
    destroyprotocol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<null>;
    };
    collectfees: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<null>;
    };
    topupwwang: {
      params: CallContractParams<{ amount: bigint }>;
      result: CallContractResult<null>;
    };
    editfee: {
      params: CallContractParams<{ newfee: bigint }>;
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
    getWWangToken: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getWWangAmount: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getOwner: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getWang: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getFee: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    mintwrapped: {
      params: SignExecuteContractMethodParams<{ amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    mintog: {
      params: SignExecuteContractMethodParams<{ amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    destroyprotocol: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    collectfees: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    topupwwang: {
      params: SignExecuteContractMethodParams<{ amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    editfee: {
      params: SignExecuteContractMethodParams<{ newfee: bigint }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  WrappedWangProtocolInstance,
  WrappedWangProtocolTypes.Fields
> {
  encodeFields(fields: WrappedWangProtocolTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { WrappedWangMinted: 0, OgWangRedeemed: 1 };
  consts = {
    ErrorCodes: {
      InvalidAmount: BigInt("1"),
      WangInContract: BigInt("2"),
      InvalidCaller: BigInt("3"),
    },
  };

  at(address: string): WrappedWangProtocolInstance {
    return new WrappedWangProtocolInstance(address);
  }

  tests = {
    getWWangToken: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedWangProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getWWangToken", params, getContractByCodeHash);
    },
    getWWangAmount: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedWangProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getWWangAmount", params, getContractByCodeHash);
    },
    getOwner: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedWangProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<Address>> => {
      return testMethod(this, "getOwner", params, getContractByCodeHash);
    },
    getWang: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedWangProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getWang", params, getContractByCodeHash);
    },
    getFee: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedWangProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getFee", params, getContractByCodeHash);
    },
    mintwrapped: async (
      params: TestContractParamsWithoutMaps<
        WrappedWangProtocolTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "mintwrapped", params, getContractByCodeHash);
    },
    mintog: async (
      params: TestContractParamsWithoutMaps<
        WrappedWangProtocolTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "mintog", params, getContractByCodeHash);
    },
    destroyprotocol: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedWangProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "destroyprotocol", params, getContractByCodeHash);
    },
    collectfees: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedWangProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "collectfees", params, getContractByCodeHash);
    },
    topupwwang: async (
      params: TestContractParamsWithoutMaps<
        WrappedWangProtocolTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "topupwwang", params, getContractByCodeHash);
    },
    editfee: async (
      params: TestContractParamsWithoutMaps<
        WrappedWangProtocolTypes.Fields,
        { newfee: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "editfee", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: WrappedWangProtocolTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const WrappedWangProtocol = new Factory(
  Contract.fromJson(
    WrappedWangProtocolContractJson,
    "",
    "69c054e7f2cd8f098e238b8374b493150389ed67f617f6e1baaa6c4c6b329e08",
    AllStructs
  )
);
registerContract(WrappedWangProtocol);

// Use this class to interact with the blockchain
export class WrappedWangProtocolInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<WrappedWangProtocolTypes.State> {
    return fetchContractState(WrappedWangProtocol, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeWrappedWangMintedEvent(
    options: EventSubscribeOptions<WrappedWangProtocolTypes.WrappedWangMintedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WrappedWangProtocol.contract,
      this,
      options,
      "WrappedWangMinted",
      fromCount
    );
  }

  subscribeOgWangRedeemedEvent(
    options: EventSubscribeOptions<WrappedWangProtocolTypes.OgWangRedeemedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WrappedWangProtocol.contract,
      this,
      options,
      "OgWangRedeemed",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WrappedWangProtocolTypes.WrappedWangMintedEvent
      | WrappedWangProtocolTypes.OgWangRedeemedEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      WrappedWangProtocol.contract,
      this,
      options,
      fromCount
    );
  }

  view = {
    getWWangToken: async (
      params?: WrappedWangProtocolTypes.CallMethodParams<"getWWangToken">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"getWWangToken">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "getWWangToken",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getWWangAmount: async (
      params?: WrappedWangProtocolTypes.CallMethodParams<"getWWangAmount">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"getWWangAmount">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "getWWangAmount",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getOwner: async (
      params?: WrappedWangProtocolTypes.CallMethodParams<"getOwner">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"getOwner">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "getOwner",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getWang: async (
      params?: WrappedWangProtocolTypes.CallMethodParams<"getWang">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"getWang">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "getWang",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getFee: async (
      params?: WrappedWangProtocolTypes.CallMethodParams<"getFee">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"getFee">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "getFee",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    mintwrapped: async (
      params: WrappedWangProtocolTypes.CallMethodParams<"mintwrapped">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"mintwrapped">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "mintwrapped",
        params,
        getContractByCodeHash
      );
    },
    mintog: async (
      params: WrappedWangProtocolTypes.CallMethodParams<"mintog">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"mintog">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "mintog",
        params,
        getContractByCodeHash
      );
    },
    destroyprotocol: async (
      params?: WrappedWangProtocolTypes.CallMethodParams<"destroyprotocol">
    ): Promise<
      WrappedWangProtocolTypes.CallMethodResult<"destroyprotocol">
    > => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "destroyprotocol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    collectfees: async (
      params?: WrappedWangProtocolTypes.CallMethodParams<"collectfees">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"collectfees">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "collectfees",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    topupwwang: async (
      params: WrappedWangProtocolTypes.CallMethodParams<"topupwwang">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"topupwwang">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "topupwwang",
        params,
        getContractByCodeHash
      );
    },
    editfee: async (
      params: WrappedWangProtocolTypes.CallMethodParams<"editfee">
    ): Promise<WrappedWangProtocolTypes.CallMethodResult<"editfee">> => {
      return callMethod(
        WrappedWangProtocol,
        this,
        "editfee",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getWWangToken: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"getWWangToken">
    ): Promise<
      WrappedWangProtocolTypes.SignExecuteMethodResult<"getWWangToken">
    > => {
      return signExecuteMethod(
        WrappedWangProtocol,
        this,
        "getWWangToken",
        params
      );
    },
    getWWangAmount: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"getWWangAmount">
    ): Promise<
      WrappedWangProtocolTypes.SignExecuteMethodResult<"getWWangAmount">
    > => {
      return signExecuteMethod(
        WrappedWangProtocol,
        this,
        "getWWangAmount",
        params
      );
    },
    getOwner: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"getOwner">
    ): Promise<
      WrappedWangProtocolTypes.SignExecuteMethodResult<"getOwner">
    > => {
      return signExecuteMethod(WrappedWangProtocol, this, "getOwner", params);
    },
    getWang: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"getWang">
    ): Promise<WrappedWangProtocolTypes.SignExecuteMethodResult<"getWang">> => {
      return signExecuteMethod(WrappedWangProtocol, this, "getWang", params);
    },
    getFee: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"getFee">
    ): Promise<WrappedWangProtocolTypes.SignExecuteMethodResult<"getFee">> => {
      return signExecuteMethod(WrappedWangProtocol, this, "getFee", params);
    },
    mintwrapped: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"mintwrapped">
    ): Promise<
      WrappedWangProtocolTypes.SignExecuteMethodResult<"mintwrapped">
    > => {
      return signExecuteMethod(
        WrappedWangProtocol,
        this,
        "mintwrapped",
        params
      );
    },
    mintog: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"mintog">
    ): Promise<WrappedWangProtocolTypes.SignExecuteMethodResult<"mintog">> => {
      return signExecuteMethod(WrappedWangProtocol, this, "mintog", params);
    },
    destroyprotocol: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"destroyprotocol">
    ): Promise<
      WrappedWangProtocolTypes.SignExecuteMethodResult<"destroyprotocol">
    > => {
      return signExecuteMethod(
        WrappedWangProtocol,
        this,
        "destroyprotocol",
        params
      );
    },
    collectfees: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"collectfees">
    ): Promise<
      WrappedWangProtocolTypes.SignExecuteMethodResult<"collectfees">
    > => {
      return signExecuteMethod(
        WrappedWangProtocol,
        this,
        "collectfees",
        params
      );
    },
    topupwwang: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"topupwwang">
    ): Promise<
      WrappedWangProtocolTypes.SignExecuteMethodResult<"topupwwang">
    > => {
      return signExecuteMethod(WrappedWangProtocol, this, "topupwwang", params);
    },
    editfee: async (
      params: WrappedWangProtocolTypes.SignExecuteMethodParams<"editfee">
    ): Promise<WrappedWangProtocolTypes.SignExecuteMethodResult<"editfee">> => {
      return signExecuteMethod(WrappedWangProtocol, this, "editfee", params);
    },
  };

  async multicall<Calls extends WrappedWangProtocolTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WrappedWangProtocolTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends WrappedWangProtocolTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<WrappedWangProtocolTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | WrappedWangProtocolTypes.MultiCallParams
      | WrappedWangProtocolTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      WrappedWangProtocol,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
