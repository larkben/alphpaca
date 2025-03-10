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
import { default as WrappedOgAlfProtocolContractJson } from "../walf/WrappedOgAlfProtocol.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import {
  DIAOracleValue,
  DIARandomValue,
  PlayerData,
  AllStructs,
} from "./types";

// Custom types for the contract
export namespace WrappedOgAlfProtocolTypes {
  export type Fields = {
    walf: HexString;
    walfamount: bigint;
    owner: Address;
    ogalf: HexString;
    ogalfamount: bigint;
    fee: bigint;
    feescollected: bigint;
  };

  export type State = ContractState<Fields>;

  export type WrappedAlfMintedEvent = ContractEvent<{
    who: Address;
    amount: bigint;
  }>;
  export type OgAlfRedeemedEvent = ContractEvent<{
    who: Address;
    amount: bigint;
  }>;

  export interface CallMethodTable {
    getWalfToken: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getWalfAmount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getOwner: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<Address>;
    };
    getOgAlf: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getFee: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    mintalf: {
      params: CallContractParams<{ amount: bigint }>;
      result: CallContractResult<null>;
    };
    mintogalf: {
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
    topupwalf: {
      params: Omit<CallContractParams<{}>, "args">;
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
    getWalfToken: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getWalfAmount: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getOwner: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getOgAlf: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getFee: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    mintalf: {
      params: SignExecuteContractMethodParams<{ amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    mintogalf: {
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
    topupwalf: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
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
  WrappedOgAlfProtocolInstance,
  WrappedOgAlfProtocolTypes.Fields
> {
  encodeFields(fields: WrappedOgAlfProtocolTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { WrappedAlfMinted: 0, OgAlfRedeemed: 1 };
  consts = {
    ErrorCodes: {
      InvalidOgAlf: BigInt("0"),
      InvalidWrappedAlf: BigInt("1"),
      OgAlfInContract: BigInt("2"),
      InvalidCaller: BigInt("3"),
    },
  };

  at(address: string): WrappedOgAlfProtocolInstance {
    return new WrappedOgAlfProtocolInstance(address);
  }

  tests = {
    getWalfToken: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getWalfToken", params, getContractByCodeHash);
    },
    getWalfAmount: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getWalfAmount", params, getContractByCodeHash);
    },
    getOwner: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<Address>> => {
      return testMethod(this, "getOwner", params, getContractByCodeHash);
    },
    getOgAlf: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getOgAlf", params, getContractByCodeHash);
    },
    getFee: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getFee", params, getContractByCodeHash);
    },
    mintalf: async (
      params: TestContractParamsWithoutMaps<
        WrappedOgAlfProtocolTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "mintalf", params, getContractByCodeHash);
    },
    mintogalf: async (
      params: TestContractParamsWithoutMaps<
        WrappedOgAlfProtocolTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "mintogalf", params, getContractByCodeHash);
    },
    destroyprotocol: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "destroyprotocol", params, getContractByCodeHash);
    },
    collectfees: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "collectfees", params, getContractByCodeHash);
    },
    topupwalf: async (
      params: Omit<
        TestContractParamsWithoutMaps<WrappedOgAlfProtocolTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "topupwalf", params, getContractByCodeHash);
    },
    editfee: async (
      params: TestContractParamsWithoutMaps<
        WrappedOgAlfProtocolTypes.Fields,
        { newfee: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "editfee", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: WrappedOgAlfProtocolTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const WrappedOgAlfProtocol = new Factory(
  Contract.fromJson(
    WrappedOgAlfProtocolContractJson,
    "",
    "b01b6b7db2945f4a58decc02a85c64337321f852569e692aa793274740f2f626",
    AllStructs
  )
);
registerContract(WrappedOgAlfProtocol);

// Use this class to interact with the blockchain
export class WrappedOgAlfProtocolInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<WrappedOgAlfProtocolTypes.State> {
    return fetchContractState(WrappedOgAlfProtocol, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeWrappedAlfMintedEvent(
    options: EventSubscribeOptions<WrappedOgAlfProtocolTypes.WrappedAlfMintedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WrappedOgAlfProtocol.contract,
      this,
      options,
      "WrappedAlfMinted",
      fromCount
    );
  }

  subscribeOgAlfRedeemedEvent(
    options: EventSubscribeOptions<WrappedOgAlfProtocolTypes.OgAlfRedeemedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      WrappedOgAlfProtocol.contract,
      this,
      options,
      "OgAlfRedeemed",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | WrappedOgAlfProtocolTypes.WrappedAlfMintedEvent
      | WrappedOgAlfProtocolTypes.OgAlfRedeemedEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      WrappedOgAlfProtocol.contract,
      this,
      options,
      fromCount
    );
  }

  view = {
    getWalfToken: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"getWalfToken">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"getWalfToken">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "getWalfToken",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getWalfAmount: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"getWalfAmount">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"getWalfAmount">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "getWalfAmount",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getOwner: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"getOwner">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"getOwner">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "getOwner",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getOgAlf: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"getOgAlf">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"getOgAlf">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "getOgAlf",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getFee: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"getFee">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"getFee">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "getFee",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    mintalf: async (
      params: WrappedOgAlfProtocolTypes.CallMethodParams<"mintalf">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"mintalf">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "mintalf",
        params,
        getContractByCodeHash
      );
    },
    mintogalf: async (
      params: WrappedOgAlfProtocolTypes.CallMethodParams<"mintogalf">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"mintogalf">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "mintogalf",
        params,
        getContractByCodeHash
      );
    },
    destroyprotocol: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"destroyprotocol">
    ): Promise<
      WrappedOgAlfProtocolTypes.CallMethodResult<"destroyprotocol">
    > => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "destroyprotocol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    collectfees: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"collectfees">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"collectfees">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "collectfees",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    topupwalf: async (
      params?: WrappedOgAlfProtocolTypes.CallMethodParams<"topupwalf">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"topupwalf">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "topupwalf",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    editfee: async (
      params: WrappedOgAlfProtocolTypes.CallMethodParams<"editfee">
    ): Promise<WrappedOgAlfProtocolTypes.CallMethodResult<"editfee">> => {
      return callMethod(
        WrappedOgAlfProtocol,
        this,
        "editfee",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getWalfToken: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"getWalfToken">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"getWalfToken">
    > => {
      return signExecuteMethod(
        WrappedOgAlfProtocol,
        this,
        "getWalfToken",
        params
      );
    },
    getWalfAmount: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"getWalfAmount">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"getWalfAmount">
    > => {
      return signExecuteMethod(
        WrappedOgAlfProtocol,
        this,
        "getWalfAmount",
        params
      );
    },
    getOwner: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"getOwner">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"getOwner">
    > => {
      return signExecuteMethod(WrappedOgAlfProtocol, this, "getOwner", params);
    },
    getOgAlf: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"getOgAlf">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"getOgAlf">
    > => {
      return signExecuteMethod(WrappedOgAlfProtocol, this, "getOgAlf", params);
    },
    getFee: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"getFee">
    ): Promise<WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"getFee">> => {
      return signExecuteMethod(WrappedOgAlfProtocol, this, "getFee", params);
    },
    mintalf: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"mintalf">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"mintalf">
    > => {
      return signExecuteMethod(WrappedOgAlfProtocol, this, "mintalf", params);
    },
    mintogalf: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"mintogalf">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"mintogalf">
    > => {
      return signExecuteMethod(WrappedOgAlfProtocol, this, "mintogalf", params);
    },
    destroyprotocol: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"destroyprotocol">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"destroyprotocol">
    > => {
      return signExecuteMethod(
        WrappedOgAlfProtocol,
        this,
        "destroyprotocol",
        params
      );
    },
    collectfees: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"collectfees">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"collectfees">
    > => {
      return signExecuteMethod(
        WrappedOgAlfProtocol,
        this,
        "collectfees",
        params
      );
    },
    topupwalf: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"topupwalf">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"topupwalf">
    > => {
      return signExecuteMethod(WrappedOgAlfProtocol, this, "topupwalf", params);
    },
    editfee: async (
      params: WrappedOgAlfProtocolTypes.SignExecuteMethodParams<"editfee">
    ): Promise<
      WrappedOgAlfProtocolTypes.SignExecuteMethodResult<"editfee">
    > => {
      return signExecuteMethod(WrappedOgAlfProtocol, this, "editfee", params);
    },
  };

  async multicall<Calls extends WrappedOgAlfProtocolTypes.MultiCallParams>(
    calls: Calls
  ): Promise<WrappedOgAlfProtocolTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends WrappedOgAlfProtocolTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<WrappedOgAlfProtocolTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | WrappedOgAlfProtocolTypes.MultiCallParams
      | WrappedOgAlfProtocolTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      WrappedOgAlfProtocol,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
