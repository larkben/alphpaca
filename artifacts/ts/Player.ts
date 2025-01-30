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
import { default as PlayerContractJson } from "../gamefi/Player.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import { DIAOracleValue, PlayerData, TokenData, AllStructs } from "./types";

// Custom types for the contract
export namespace PlayerTypes {
  export type Fields = {
    nftIndex: bigint;
    tokenUri: HexString;
    collectionId: HexString;
    gameContract: HexString;
    nickname: HexString;
    linkedAddress: Address;
    level: [bigint, bigint, bigint];
    stats: [bigint, bigint, bigint, bigint];
    hay: HexString;
    moves: [HexString, HexString, HexString, HexString];
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
    getHealthStat: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getAttackStat: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getDefense: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    editUri: {
      params: CallContractParams<{ newUri: HexString }>;
      result: CallContractResult<null>;
    };
    editNick: {
      params: CallContractParams<{ newNick: HexString }>;
      result: CallContractResult<null>;
    };
    editLinkedAddress: {
      params: CallContractParams<{ newAddress: Address }>;
      result: CallContractResult<null>;
    };
    assignMove: {
      params: CallContractParams<{ whichMove: bigint; newMove: HexString }>;
      result: CallContractResult<null>;
    };
    upgradeSkill: {
      params: CallContractParams<{ whichSkill: bigint }>;
      result: CallContractResult<null>;
    };
    editHeldHay: {
      params: CallContractParams<{ newHay: HexString }>;
      result: CallContractResult<null>;
    };
    removeHealth: {
      params: CallContractParams<{ damage: bigint }>;
      result: CallContractResult<boolean>;
    };
    addXp: {
      params: CallContractParams<{ xp: bigint }>;
      result: CallContractResult<null>;
    };
    updatePlayerCode: {
      params: CallContractParams<{ newCode: HexString }>;
      result: CallContractResult<null>;
    };
    updatePlayerFields: {
      params: CallContractParams<{
        newCode: HexString;
        encodedImmutableFields: HexString;
        encodedMutableFields: HexString;
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
    getHealthStat: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getAttackStat: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getDefense: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    editUri: {
      params: SignExecuteContractMethodParams<{ newUri: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    editNick: {
      params: SignExecuteContractMethodParams<{ newNick: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    editLinkedAddress: {
      params: SignExecuteContractMethodParams<{ newAddress: Address }>;
      result: SignExecuteScriptTxResult;
    };
    assignMove: {
      params: SignExecuteContractMethodParams<{
        whichMove: bigint;
        newMove: HexString;
      }>;
      result: SignExecuteScriptTxResult;
    };
    upgradeSkill: {
      params: SignExecuteContractMethodParams<{ whichSkill: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    editHeldHay: {
      params: SignExecuteContractMethodParams<{ newHay: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    removeHealth: {
      params: SignExecuteContractMethodParams<{ damage: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    addXp: {
      params: SignExecuteContractMethodParams<{ xp: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    updatePlayerCode: {
      params: SignExecuteContractMethodParams<{ newCode: HexString }>;
      result: SignExecuteScriptTxResult;
    };
    updatePlayerFields: {
      params: SignExecuteContractMethodParams<{
        newCode: HexString;
        encodedImmutableFields: HexString;
        encodedMutableFields: HexString;
      }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<PlayerInstance, PlayerTypes.Fields> {
  encodeFields(fields: PlayerTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  consts = {
    ErrorCodes: {
      NotCalledFromCollection: BigInt("0"),
      InvalidSkill: BigInt("1"),
      InvalidXp: BigInt("2"),
    },
  };

  at(address: string): PlayerInstance {
    return new PlayerInstance(address);
  }

  tests = {
    getTokenUri: async (
      params: Omit<
        TestContractParamsWithoutMaps<PlayerTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getTokenUri", params, getContractByCodeHash);
    },
    getCollectionIndex: async (
      params: Omit<
        TestContractParamsWithoutMaps<PlayerTypes.Fields, never>,
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
        TestContractParamsWithoutMaps<PlayerTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getNFTIndex", params, getContractByCodeHash);
    },
    getHealthStat: async (
      params: Omit<
        TestContractParamsWithoutMaps<PlayerTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getHealthStat", params, getContractByCodeHash);
    },
    getAttackStat: async (
      params: Omit<
        TestContractParamsWithoutMaps<PlayerTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getAttackStat", params, getContractByCodeHash);
    },
    getDefense: async (
      params: Omit<
        TestContractParamsWithoutMaps<PlayerTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getDefense", params, getContractByCodeHash);
    },
    editUri: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { newUri: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "editUri", params, getContractByCodeHash);
    },
    editNick: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { newNick: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "editNick", params, getContractByCodeHash);
    },
    editLinkedAddress: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { newAddress: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "editLinkedAddress",
        params,
        getContractByCodeHash
      );
    },
    assignMove: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { whichMove: bigint; newMove: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "assignMove", params, getContractByCodeHash);
    },
    upgradeSkill: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { whichSkill: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "upgradeSkill", params, getContractByCodeHash);
    },
    editHeldHay: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { newHay: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "editHeldHay", params, getContractByCodeHash);
    },
    removeHealth: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { damage: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<boolean>> => {
      return testMethod(this, "removeHealth", params, getContractByCodeHash);
    },
    addXp: async (
      params: TestContractParamsWithoutMaps<PlayerTypes.Fields, { xp: bigint }>
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "addXp", params, getContractByCodeHash);
    },
    updatePlayerCode: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        { newCode: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "updatePlayerCode",
        params,
        getContractByCodeHash
      );
    },
    updatePlayerFields: async (
      params: TestContractParamsWithoutMaps<
        PlayerTypes.Fields,
        {
          newCode: HexString;
          encodedImmutableFields: HexString;
          encodedMutableFields: HexString;
        }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "updatePlayerFields",
        params,
        getContractByCodeHash
      );
    },
  };

  stateForTest(
    initFields: PlayerTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const Player = new Factory(
  Contract.fromJson(
    PlayerContractJson,
    "",
    "d4a2e646b9fc117314caf74cff0a3743119f629a76bdb425e73b35d1327aaa93",
    AllStructs
  )
);
registerContract(Player);

// Use this class to interact with the blockchain
export class PlayerInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<PlayerTypes.State> {
    return fetchContractState(Player, this);
  }

  view = {
    getTokenUri: async (
      params?: PlayerTypes.CallMethodParams<"getTokenUri">
    ): Promise<PlayerTypes.CallMethodResult<"getTokenUri">> => {
      return callMethod(
        Player,
        this,
        "getTokenUri",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getCollectionIndex: async (
      params?: PlayerTypes.CallMethodParams<"getCollectionIndex">
    ): Promise<PlayerTypes.CallMethodResult<"getCollectionIndex">> => {
      return callMethod(
        Player,
        this,
        "getCollectionIndex",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getNFTIndex: async (
      params?: PlayerTypes.CallMethodParams<"getNFTIndex">
    ): Promise<PlayerTypes.CallMethodResult<"getNFTIndex">> => {
      return callMethod(
        Player,
        this,
        "getNFTIndex",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getHealthStat: async (
      params?: PlayerTypes.CallMethodParams<"getHealthStat">
    ): Promise<PlayerTypes.CallMethodResult<"getHealthStat">> => {
      return callMethod(
        Player,
        this,
        "getHealthStat",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getAttackStat: async (
      params?: PlayerTypes.CallMethodParams<"getAttackStat">
    ): Promise<PlayerTypes.CallMethodResult<"getAttackStat">> => {
      return callMethod(
        Player,
        this,
        "getAttackStat",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getDefense: async (
      params?: PlayerTypes.CallMethodParams<"getDefense">
    ): Promise<PlayerTypes.CallMethodResult<"getDefense">> => {
      return callMethod(
        Player,
        this,
        "getDefense",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    editUri: async (
      params: PlayerTypes.CallMethodParams<"editUri">
    ): Promise<PlayerTypes.CallMethodResult<"editUri">> => {
      return callMethod(Player, this, "editUri", params, getContractByCodeHash);
    },
    editNick: async (
      params: PlayerTypes.CallMethodParams<"editNick">
    ): Promise<PlayerTypes.CallMethodResult<"editNick">> => {
      return callMethod(
        Player,
        this,
        "editNick",
        params,
        getContractByCodeHash
      );
    },
    editLinkedAddress: async (
      params: PlayerTypes.CallMethodParams<"editLinkedAddress">
    ): Promise<PlayerTypes.CallMethodResult<"editLinkedAddress">> => {
      return callMethod(
        Player,
        this,
        "editLinkedAddress",
        params,
        getContractByCodeHash
      );
    },
    assignMove: async (
      params: PlayerTypes.CallMethodParams<"assignMove">
    ): Promise<PlayerTypes.CallMethodResult<"assignMove">> => {
      return callMethod(
        Player,
        this,
        "assignMove",
        params,
        getContractByCodeHash
      );
    },
    upgradeSkill: async (
      params: PlayerTypes.CallMethodParams<"upgradeSkill">
    ): Promise<PlayerTypes.CallMethodResult<"upgradeSkill">> => {
      return callMethod(
        Player,
        this,
        "upgradeSkill",
        params,
        getContractByCodeHash
      );
    },
    editHeldHay: async (
      params: PlayerTypes.CallMethodParams<"editHeldHay">
    ): Promise<PlayerTypes.CallMethodResult<"editHeldHay">> => {
      return callMethod(
        Player,
        this,
        "editHeldHay",
        params,
        getContractByCodeHash
      );
    },
    removeHealth: async (
      params: PlayerTypes.CallMethodParams<"removeHealth">
    ): Promise<PlayerTypes.CallMethodResult<"removeHealth">> => {
      return callMethod(
        Player,
        this,
        "removeHealth",
        params,
        getContractByCodeHash
      );
    },
    addXp: async (
      params: PlayerTypes.CallMethodParams<"addXp">
    ): Promise<PlayerTypes.CallMethodResult<"addXp">> => {
      return callMethod(Player, this, "addXp", params, getContractByCodeHash);
    },
    updatePlayerCode: async (
      params: PlayerTypes.CallMethodParams<"updatePlayerCode">
    ): Promise<PlayerTypes.CallMethodResult<"updatePlayerCode">> => {
      return callMethod(
        Player,
        this,
        "updatePlayerCode",
        params,
        getContractByCodeHash
      );
    },
    updatePlayerFields: async (
      params: PlayerTypes.CallMethodParams<"updatePlayerFields">
    ): Promise<PlayerTypes.CallMethodResult<"updatePlayerFields">> => {
      return callMethod(
        Player,
        this,
        "updatePlayerFields",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getTokenUri: async (
      params: PlayerTypes.SignExecuteMethodParams<"getTokenUri">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"getTokenUri">> => {
      return signExecuteMethod(Player, this, "getTokenUri", params);
    },
    getCollectionIndex: async (
      params: PlayerTypes.SignExecuteMethodParams<"getCollectionIndex">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"getCollectionIndex">> => {
      return signExecuteMethod(Player, this, "getCollectionIndex", params);
    },
    getNFTIndex: async (
      params: PlayerTypes.SignExecuteMethodParams<"getNFTIndex">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"getNFTIndex">> => {
      return signExecuteMethod(Player, this, "getNFTIndex", params);
    },
    getHealthStat: async (
      params: PlayerTypes.SignExecuteMethodParams<"getHealthStat">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"getHealthStat">> => {
      return signExecuteMethod(Player, this, "getHealthStat", params);
    },
    getAttackStat: async (
      params: PlayerTypes.SignExecuteMethodParams<"getAttackStat">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"getAttackStat">> => {
      return signExecuteMethod(Player, this, "getAttackStat", params);
    },
    getDefense: async (
      params: PlayerTypes.SignExecuteMethodParams<"getDefense">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"getDefense">> => {
      return signExecuteMethod(Player, this, "getDefense", params);
    },
    editUri: async (
      params: PlayerTypes.SignExecuteMethodParams<"editUri">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"editUri">> => {
      return signExecuteMethod(Player, this, "editUri", params);
    },
    editNick: async (
      params: PlayerTypes.SignExecuteMethodParams<"editNick">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"editNick">> => {
      return signExecuteMethod(Player, this, "editNick", params);
    },
    editLinkedAddress: async (
      params: PlayerTypes.SignExecuteMethodParams<"editLinkedAddress">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"editLinkedAddress">> => {
      return signExecuteMethod(Player, this, "editLinkedAddress", params);
    },
    assignMove: async (
      params: PlayerTypes.SignExecuteMethodParams<"assignMove">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"assignMove">> => {
      return signExecuteMethod(Player, this, "assignMove", params);
    },
    upgradeSkill: async (
      params: PlayerTypes.SignExecuteMethodParams<"upgradeSkill">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"upgradeSkill">> => {
      return signExecuteMethod(Player, this, "upgradeSkill", params);
    },
    editHeldHay: async (
      params: PlayerTypes.SignExecuteMethodParams<"editHeldHay">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"editHeldHay">> => {
      return signExecuteMethod(Player, this, "editHeldHay", params);
    },
    removeHealth: async (
      params: PlayerTypes.SignExecuteMethodParams<"removeHealth">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"removeHealth">> => {
      return signExecuteMethod(Player, this, "removeHealth", params);
    },
    addXp: async (
      params: PlayerTypes.SignExecuteMethodParams<"addXp">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"addXp">> => {
      return signExecuteMethod(Player, this, "addXp", params);
    },
    updatePlayerCode: async (
      params: PlayerTypes.SignExecuteMethodParams<"updatePlayerCode">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"updatePlayerCode">> => {
      return signExecuteMethod(Player, this, "updatePlayerCode", params);
    },
    updatePlayerFields: async (
      params: PlayerTypes.SignExecuteMethodParams<"updatePlayerFields">
    ): Promise<PlayerTypes.SignExecuteMethodResult<"updatePlayerFields">> => {
      return signExecuteMethod(Player, this, "updatePlayerFields", params);
    },
  };

  async multicall<Calls extends PlayerTypes.MultiCallParams>(
    calls: Calls
  ): Promise<PlayerTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends PlayerTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<PlayerTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends PlayerTypes.MultiCallParams | PlayerTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(Player, this, callss, getContractByCodeHash);
  }
}
