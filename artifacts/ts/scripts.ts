/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  ExecutableScript,
  ExecuteScriptParams,
  ExecuteScriptResult,
  Script,
  SignerProvider,
  HexString,
} from "@alephium/web3";
import { getContractByCodeHash } from "./contracts";
import { default as ActivateWalfProtocolScriptJson } from "../walf/ActivateWalfProtocol.ral.json";
import { default as BuildtokenScriptJson } from "../createtoken/Buildtoken.ral.json";
import { default as CollectFeesScriptJson } from "../createtoken/CollectFees.ral.json";
import { default as CollectOgAlfFeesScriptJson } from "../walf/CollectOgAlfFees.ral.json";
import { default as DestroyScriptJson } from "../scripts/Destroy.ral.json";
import { default as DestroyOgAlfProtocolScriptJson } from "../walf/DestroyOgAlfProtocol.ral.json";
import { default as DestroycreatorScriptJson } from "../createtoken/Destroycreator.ral.json";
import { default as EditCollectionUriScriptJson } from "../gamefi/EditCollectionUri.ral.json";
import { default as EditOgAlfFeesScriptJson } from "../walf/EditOgAlfFees.ral.json";
import { default as EditfeeScriptJson } from "../scripts/Editfee.ral.json";
import { default as GettokenScriptJson } from "../scripts/Gettoken.ral.json";
import { default as MintAlfScriptJson } from "../walf/MintAlf.ral.json";
import { default as MintOgAlfScriptJson } from "../walf/MintOgAlf.ral.json";
import { default as MintPlayerScriptJson } from "../gamefi/MintPlayer.ral.json";
import { default as SendoutScriptJson } from "../scripts/Sendout.ral.json";
import { default as TopupScriptJson } from "../scripts/Topup.ral.json";
import { default as UpdateCreationFeeScriptJson } from "../createtoken/UpdateCreationFee.ral.json";
import { default as UpdateNFTScriptJson } from "../gamefi/UpdateNFT.ral.json";
import { default as UpdateNFTFieldsScriptJson } from "../gamefi/UpdateNFTFields.ral.json";
import { default as UpgradeCollectionCodeScriptJson } from "../gamefi/UpgradeCollectionCode.ral.json";
import { default as UpgradeCollectionFieldsScriptJson } from "../gamefi/UpgradeCollectionFields.ral.json";
import { default as WithdrawlassetsScriptJson } from "../scripts/Withdrawlassets.ral.json";
import { MoveReturn, AllStructs } from "./types";

export const ActivateWalfProtocol = new ExecutableScript<{
  contract: HexString;
}>(
  Script.fromJson(ActivateWalfProtocolScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Buildtoken = new ExecutableScript<{
  contract: HexString;
  symbol: HexString;
  name: HexString;
  decimals: bigint;
  tokenTotal: bigint;
}>(
  Script.fromJson(BuildtokenScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const CollectFees = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(CollectFeesScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const CollectOgAlfFees = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(CollectOgAlfFeesScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Destroy = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(DestroyScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const DestroyOgAlfProtocol = new ExecutableScript<{
  contract: HexString;
}>(
  Script.fromJson(DestroyOgAlfProtocolScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Destroycreator = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(DestroycreatorScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditCollectionUri = new ExecutableScript<{
  collection: HexString;
  newCollectionUri: HexString;
}>(
  Script.fromJson(EditCollectionUriScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditOgAlfFees = new ExecutableScript<{
  contract: HexString;
  newfee: bigint;
}>(
  Script.fromJson(EditOgAlfFeesScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Editfee = new ExecutableScript<{
  contract: HexString;
  edit: bigint;
}>(Script.fromJson(EditfeeScriptJson, "", AllStructs), getContractByCodeHash);

export const Gettoken = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(GettokenScriptJson, "", AllStructs), getContractByCodeHash);

export const MintAlf = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(MintAlfScriptJson, "", AllStructs), getContractByCodeHash);

export const MintOgAlf = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(MintOgAlfScriptJson, "", AllStructs), getContractByCodeHash);

export const MintPlayer = new ExecutableScript<{
  collection: HexString;
  tokenSelected: HexString;
}>(
  Script.fromJson(MintPlayerScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Sendout = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(SendoutScriptJson, "", AllStructs), getContractByCodeHash);

export const Topup = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(TopupScriptJson, "", AllStructs), getContractByCodeHash);

export const UpdateCreationFee = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(
  Script.fromJson(UpdateCreationFeeScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateNFT = new ExecutableScript<{
  collection: HexString;
  nft: HexString;
}>(Script.fromJson(UpdateNFTScriptJson, "", AllStructs), getContractByCodeHash);

export const UpdateNFTFields = new ExecutableScript<{
  collection: HexString;
  nft: HexString;
}>(
  Script.fromJson(UpdateNFTFieldsScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpgradeCollectionCode = new ExecutableScript<{
  collection: HexString;
  newCode: HexString;
}>(
  Script.fromJson(UpgradeCollectionCodeScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpgradeCollectionFields = new ExecutableScript<{
  collection: HexString;
  newCode: HexString;
  newImmFieldsEncoded: HexString;
  newMutFieldsEncoded: HexString;
}>(
  Script.fromJson(UpgradeCollectionFieldsScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Withdrawlassets = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(WithdrawlassetsScriptJson, "", AllStructs),
  getContractByCodeHash
);
