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
import { default as OldNFTPublicSaleCollectionSequentialWithRoyaltyContractJson } from "../nfts/publicsale/old_nfts/OldNFTPublicSaleCollectionSequentialWithRoyalty.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import { DIAOracleValue, PairInfo, PlayerData, AllStructs } from "./types";

// Custom types for the contract
export namespace OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes {
  export type Fields = {
    nftTemplateId: HexString;
    collectionUri: HexString;
    nftBaseUri: HexString;
    collectionOwner: Address;
    maxSupply: bigint;
    mintPrice: bigint;
    maxBatchMintSize: bigint;
    royaltyRate: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export type MintEvent = ContractEvent<{
    minter: Address;
    fromIndex: bigint;
    mintSize: bigint;
  }>;

  export interface CallMethodTable {
    getCollectionUri: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    totalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    nftByIndex: {
      params: CallContractParams<{ index: bigint }>;
      result: CallContractResult<HexString>;
    };
    validateNFT: {
      params: CallContractParams<{ nftId: HexString; nftIndex: bigint }>;
      result: CallContractResult<null>;
    };
    royaltyAmount: {
      params: CallContractParams<{ tokenId: HexString; salePrice: bigint }>;
      result: CallContractResult<bigint>;
    };
    payRoyalty: {
      params: CallContractParams<{ payer: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    withdrawRoyalty: {
      params: CallContractParams<{ to: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    mint_: {
      params: CallContractParams<{ minter: Address; index: bigint }>;
      result: CallContractResult<HexString>;
    };
    mint: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    mintBatch: {
      params: CallContractParams<{ size: bigint }>;
      result: CallContractResult<HexString>;
    };
    withdraw: {
      params: CallContractParams<{ to: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    getNFTUri: {
      params: CallContractParams<{ index: bigint }>;
      result: CallContractResult<HexString>;
    };
    getMintPrice: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
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
    getCollectionUri: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    totalSupply: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    nftByIndex: {
      params: SignExecuteContractMethodParams<{ index: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    validateNFT: {
      params: SignExecuteContractMethodParams<{
        nftId: HexString;
        nftIndex: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    royaltyAmount: {
      params: SignExecuteContractMethodParams<{
        tokenId: HexString;
        salePrice: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    payRoyalty: {
      params: SignExecuteContractMethodParams<{
        payer: Address;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    withdrawRoyalty: {
      params: SignExecuteContractMethodParams<{ to: Address; amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    mint_: {
      params: SignExecuteContractMethodParams<{
        minter: Address;
        index: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    mint: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    mintBatch: {
      params: SignExecuteContractMethodParams<{ size: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    withdraw: {
      params: SignExecuteContractMethodParams<{ to: Address; amount: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    getNFTUri: {
      params: SignExecuteContractMethodParams<{ index: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    getMintPrice: {
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
  OldNFTPublicSaleCollectionSequentialWithRoyaltyInstance,
  OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields
> {
  encodeFields(
    fields: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields
  ) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { Mint: 0 };
  consts = {
    PublicSaleErrorCodes: { IncorrectTokenIndex: BigInt("0") },
    ErrorCodes: {
      IncorrectTokenIndex: BigInt("2"),
      InvalidMintBatchSize: BigInt("3"),
      InsufficientNumOfUnminted: BigInt("4"),
      NFTNotFound: BigInt("0"),
      CollectionOwnerAllowedOnly: BigInt("1"),
      NFTNotPartOfCollection: BigInt("2"),
    },
  };

  at(address: string): OldNFTPublicSaleCollectionSequentialWithRoyaltyInstance {
    return new OldNFTPublicSaleCollectionSequentialWithRoyaltyInstance(address);
  }

  tests = {
    getCollectionUri: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(
        this,
        "getCollectionUri",
        params,
        getContractByCodeHash
      );
    },
    totalSupply: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "totalSupply", params, getContractByCodeHash);
    },
    nftByIndex: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { index: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "nftByIndex", params, getContractByCodeHash);
    },
    validateNFT: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { nftId: HexString; nftIndex: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "validateNFT", params, getContractByCodeHash);
    },
    royaltyAmount: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { tokenId: HexString; salePrice: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "royaltyAmount", params, getContractByCodeHash);
    },
    payRoyalty: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { payer: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "payRoyalty", params, getContractByCodeHash);
    },
    withdrawRoyalty: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "withdrawRoyalty", params, getContractByCodeHash);
    },
    mint_: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { minter: Address; index: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "mint_", params, getContractByCodeHash);
    },
    mint: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "mint", params, getContractByCodeHash);
    },
    mintBatch: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { size: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "mintBatch", params, getContractByCodeHash);
    },
    withdraw: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "withdraw", params, getContractByCodeHash);
    },
    getNFTUri: async (
      params: TestContractParamsWithoutMaps<
        OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
        { index: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getNFTUri", params, getContractByCodeHash);
    },
    getMintPrice: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getMintPrice", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const OldNFTPublicSaleCollectionSequentialWithRoyalty = new Factory(
  Contract.fromJson(
    OldNFTPublicSaleCollectionSequentialWithRoyaltyContractJson,
    "",
    "ad947c2c58ed952e6a4492149f6b99b3bf074ec3f0eda8781329f0ce5a9d131e",
    AllStructs
  )
);
registerContract(OldNFTPublicSaleCollectionSequentialWithRoyalty);

// Use this class to interact with the blockchain
export class OldNFTPublicSaleCollectionSequentialWithRoyaltyInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.State> {
    return fetchContractState(
      OldNFTPublicSaleCollectionSequentialWithRoyalty,
      this
    );
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeMintEvent(
    options: EventSubscribeOptions<OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.MintEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      OldNFTPublicSaleCollectionSequentialWithRoyalty.contract,
      this,
      options,
      "Mint",
      fromCount
    );
  }

  view = {
    getCollectionUri: async (
      params?: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"getCollectionUri">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"getCollectionUri">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "getCollectionUri",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    totalSupply: async (
      params?: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"totalSupply">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"totalSupply">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "totalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    nftByIndex: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"nftByIndex">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"nftByIndex">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "nftByIndex",
        params,
        getContractByCodeHash
      );
    },
    validateNFT: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"validateNFT">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"validateNFT">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "validateNFT",
        params,
        getContractByCodeHash
      );
    },
    royaltyAmount: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"royaltyAmount">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"royaltyAmount">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "royaltyAmount",
        params,
        getContractByCodeHash
      );
    },
    payRoyalty: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"payRoyalty">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"payRoyalty">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "payRoyalty",
        params,
        getContractByCodeHash
      );
    },
    withdrawRoyalty: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"withdrawRoyalty">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"withdrawRoyalty">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "withdrawRoyalty",
        params,
        getContractByCodeHash
      );
    },
    mint_: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"mint_">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"mint_">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "mint_",
        params,
        getContractByCodeHash
      );
    },
    mint: async (
      params?: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"mint">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"mint">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "mint",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    mintBatch: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"mintBatch">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"mintBatch">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "mintBatch",
        params,
        getContractByCodeHash
      );
    },
    withdraw: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"withdraw">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"withdraw">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "withdraw",
        params,
        getContractByCodeHash
      );
    },
    getNFTUri: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"getNFTUri">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"getNFTUri">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "getNFTUri",
        params,
        getContractByCodeHash
      );
    },
    getMintPrice: async (
      params?: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodParams<"getMintPrice">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.CallMethodResult<"getMintPrice">
    > => {
      return callMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "getMintPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getCollectionUri: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"getCollectionUri">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"getCollectionUri">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "getCollectionUri",
        params
      );
    },
    totalSupply: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"totalSupply">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"totalSupply">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "totalSupply",
        params
      );
    },
    nftByIndex: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"nftByIndex">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"nftByIndex">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "nftByIndex",
        params
      );
    },
    validateNFT: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"validateNFT">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"validateNFT">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "validateNFT",
        params
      );
    },
    royaltyAmount: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"royaltyAmount">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"royaltyAmount">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "royaltyAmount",
        params
      );
    },
    payRoyalty: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"payRoyalty">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"payRoyalty">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "payRoyalty",
        params
      );
    },
    withdrawRoyalty: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"withdrawRoyalty">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"withdrawRoyalty">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "withdrawRoyalty",
        params
      );
    },
    mint_: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"mint_">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"mint_">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "mint_",
        params
      );
    },
    mint: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"mint">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"mint">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "mint",
        params
      );
    },
    mintBatch: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"mintBatch">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"mintBatch">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "mintBatch",
        params
      );
    },
    withdraw: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"withdraw">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"withdraw">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "withdraw",
        params
      );
    },
    getNFTUri: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"getNFTUri">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"getNFTUri">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "getNFTUri",
        params
      );
    },
    getMintPrice: async (
      params: OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodParams<"getMintPrice">
    ): Promise<
      OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.SignExecuteMethodResult<"getMintPrice">
    > => {
      return signExecuteMethod(
        OldNFTPublicSaleCollectionSequentialWithRoyalty,
        this,
        "getMintPrice",
        params
      );
    },
  };

  async multicall<
    Calls extends OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.MultiCallParams
  >(
    calls: Calls
  ): Promise<
    OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.MultiCallResults<Calls>
  >;
  async multicall<
    Callss extends OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.MultiCallParams[]
  >(
    callss: Narrow<Callss>
  ): Promise<
    OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.MulticallReturnType<Callss>
  >;
  async multicall<
    Callss extends
      | OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.MultiCallParams
      | OldNFTPublicSaleCollectionSequentialWithRoyaltyTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      OldNFTPublicSaleCollectionSequentialWithRoyalty,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
