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
import { default as AcceptLoanScriptJson } from "../loans/AcceptLoan.ral.json";
import { default as AcceptLoanTestScriptJson } from "../test/AcceptLoanTest.ral.json";
import { default as AcceptMarketTestScriptJson } from "../test/AcceptMarketTest.ral.json";
import { default as ActivateWalfProtocolScriptJson } from "../walf/ActivateWalfProtocol.ral.json";
import { default as AddFundsTestScriptJson } from "../test/AddFundsTest.ral.json";
import { default as AddPairScriptJson } from "../test/AddPair.ral.json";
import { default as AddXpScriptJson } from "../gamefi/AddXp.ral.json";
import { default as AttackScriptJson } from "../gamefi/battle/Attack.ral.json";
import { default as BidLoanTestScriptJson } from "../test/BidLoanTest.ral.json";
import { default as BuildtokenScriptJson } from "../createtoken/Buildtoken.ral.json";
import { default as CancelScriptJson } from "../gamefi/battle/Cancel.ral.json";
import { default as CancelLoanScriptJson } from "../loans/CancelLoan.ral.json";
import { default as CancelLoanTestScriptJson } from "../test/CancelLoanTest.ral.json";
import { default as CollectFeesScriptJson } from "../createtoken/CollectFees.ral.json";
import { default as CollectOgAlfFeesScriptJson } from "../walf/CollectOgAlfFees.ral.json";
import { default as CollectWangFeesScriptJson } from "../wang/CollectWangFees.ral.json";
import { default as CreateLoanScriptJson } from "../loans/CreateLoan.ral.json";
import { default as CreateLoanTestScriptJson } from "../test/CreateLoanTest.ral.json";
import { default as CreateLoaneeMarketTestScriptJson } from "../test/CreateLoaneeMarketTest.ral.json";
import { default as CreatePublicSaleCollectionSequentialScriptJson } from "../nfts/publicsale/scripts/CreatePublicSaleCollectionSequential.ral.json";
import { default as CreatePublicSaleCollectionSequentialWithRoyaltyScriptJson } from "../nfts/publicsale/scripts/CreatePublicSaleCollectionSequentialWithRoyalty.ral.json";
import { default as CreatePvpScriptJson } from "../gamefi/battle/CreatePvp.ral.json";
import { default as DestroyScriptJson } from "../scripts/Destroy.ral.json";
import { default as DestroyLoanFactoryScriptJson } from "../loans/DestroyLoanFactory.ral.json";
import { default as DestroyLoanFactoryTestScriptJson } from "../test/DestroyLoanFactoryTest.ral.json";
import { default as DestroyMarketTestScriptJson } from "../test/DestroyMarketTest.ral.json";
import { default as DestroyOgAlfProtocolScriptJson } from "../walf/DestroyOgAlfProtocol.ral.json";
import { default as DestroyWangProtocolScriptJson } from "../wang/DestroyWangProtocol.ral.json";
import { default as DestroycreatorScriptJson } from "../createtoken/Destroycreator.ral.json";
import { default as EditCollectionUriScriptJson } from "../gamefi/EditCollectionUri.ral.json";
import { default as EditInterestTestScriptJson } from "../test/EditInterestTest.ral.json";
import { default as EditLiquidateTestScriptJson } from "../test/EditLiquidateTest.ral.json";
import { default as EditLoanRateScriptJson } from "../loans/EditLoanRate.ral.json";
import { default as EditLoanRateTestScriptJson } from "../test/EditLoanRateTest.ral.json";
import { default as EditOgAlfFeesScriptJson } from "../walf/EditOgAlfFees.ral.json";
import { default as EditTimeTestScriptJson } from "../test/EditTimeTest.ral.json";
import { default as EditValidContractScriptJson } from "../gamefi/EditValidContract.ral.json";
import { default as EditWangFeesScriptJson } from "../wang/EditWangFees.ral.json";
import { default as EditfeeScriptJson } from "../scripts/Editfee.ral.json";
import { default as ForceCancelScriptJson } from "../loans/ForceCancel.ral.json";
import { default as ForceCancelTestScriptJson } from "../test/ForceCancelTest.ral.json";
import { default as ForceContractCancelScriptJson } from "../gamefi/battle/ForceContractCancel.ral.json";
import { default as ForfeitLoanScriptJson } from "../loans/ForfeitLoan.ral.json";
import { default as ForfeitLoanTestScriptJson } from "../test/ForfeitLoanTest.ral.json";
import { default as GettokenScriptJson } from "../scripts/Gettoken.ral.json";
import { default as LeaveBattleScriptJson } from "../gamefi/battle/LeaveBattle.ral.json";
import { default as LiquidationLoanTestScriptJson } from "../test/LiquidationLoanTest.ral.json";
import { default as MintAlfScriptJson } from "../walf/MintAlf.ral.json";
import { default as MintBatchSequentialScriptJson } from "../nfts/publicsale/scripts/MintBatchSequential.ral.json";
import { default as MintNextSequentialScriptJson } from "../nfts/publicsale/scripts/MintNextSequential.ral.json";
import { default as MintOgAlfScriptJson } from "../walf/MintOgAlf.ral.json";
import { default as MintPlayerScriptJson } from "../gamefi/MintPlayer.ral.json";
import { default as MintWWangScriptJson } from "../wang/MintWWang.ral.json";
import { default as MintWangScriptJson } from "../wang/MintWang.ral.json";
import { default as PayLoanScriptJson } from "../loans/PayLoan.ral.json";
import { default as PayLoanTestScriptJson } from "../test/PayLoanTest.ral.json";
import { default as RedeemLoanTestScriptJson } from "../test/RedeemLoanTest.ral.json";
import { default as RestScriptJson } from "../gamefi/Rest.ral.json";
import { default as SendoutScriptJson } from "../scripts/Sendout.ral.json";
import { default as StartScriptJson } from "../gamefi/battle/Start.ral.json";
import { default as SuperchargeScriptJson } from "../gamefi/Supercharge.ral.json";
import { default as TopupScriptJson } from "../scripts/Topup.ral.json";
import { default as TopupWangProtocolScriptJson } from "../wang/TopupWangProtocol.ral.json";
import { default as UpdateCreationFeeScriptJson } from "../createtoken/UpdateCreationFee.ral.json";
import { default as UpdateGamifyCodeScriptJson } from "../gamefi/UpdateGamifyCode.ral.json";
import { default as UpdateGamifyFieldsScriptJson } from "../gamefi/UpdateGamifyFields.ral.json";
import { default as UpdateLevelScriptJson } from "../gamefi/UpdateLevel.ral.json";
import { default as UpdateLoanFactoryCodeScriptJson } from "../loans/UpdateLoanFactoryCode.ral.json";
import { default as UpdateLoanFactoryCodeTestScriptJson } from "../test/UpdateLoanFactoryCodeTest.ral.json";
import { default as UpdateLoanFactoryFieldsScriptJson } from "../loans/UpdateLoanFactoryFields.ral.json";
import { default as UpdateLoanFactoryFieldsTestScriptJson } from "../test/UpdateLoanFactoryFieldsTest.ral.json";
import { default as UpdateNFTScriptJson } from "../gamefi/UpdateNFT.ral.json";
import { default as UpdateNFTFieldsScriptJson } from "../gamefi/UpdateNFTFields.ral.json";
import { default as UpdateTimeScriptJson } from "../test/UpdateTime.ral.json";
import { default as UpdateValueScriptJson } from "../test/UpdateValue.ral.json";
import { default as UpgradeBattleFactoryScriptJson } from "../gamefi/battle/UpgradeBattleFactory.ral.json";
import { default as UpgradeBattleFactoryFieldsScriptJson } from "../gamefi/battle/UpgradeBattleFactoryFields.ral.json";
import { default as UpgradeCollectionCodeScriptJson } from "../gamefi/UpgradeCollectionCode.ral.json";
import { default as UpgradeCollectionFieldsScriptJson } from "../gamefi/UpgradeCollectionFields.ral.json";
import { default as WithdrawFromPublicSaleCollectionSequentialScriptJson } from "../nfts/publicsale/scripts/WithdrawFromPublicSaleCollectionSequential.ral.json";
import { default as WithdrawFundsTestScriptJson } from "../test/WithdrawFundsTest.ral.json";
import { default as WithdrawLoanFactoryFeesScriptJson } from "../loans/WithdrawLoanFactoryFees.ral.json";
import { default as WithdrawLoanFactoryFeesTestScriptJson } from "../test/WithdrawLoanFactoryFeesTest.ral.json";
import { default as WithdrawlassetsScriptJson } from "../scripts/Withdrawlassets.ral.json";
import { DIAOracleValue, PlayerData, TokenData, AllStructs } from "./types";

export const AcceptLoan = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(AcceptLoanScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const AcceptLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(AcceptLoanTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const AcceptMarketTest = new ExecutableScript<{
  loanFactory: HexString;
  tokenRequested: HexString;
  tokenAmount: bigint;
  collateralToken: HexString;
  collateralAmount: bigint;
  interest: bigint;
  duration: bigint;
  loaneeMarket: HexString;
}>(
  Script.fromJson(AcceptMarketTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const ActivateWalfProtocol = new ExecutableScript<{
  contract: HexString;
}>(
  Script.fromJson(ActivateWalfProtocolScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const AddFundsTest = new ExecutableScript<{
  loanFactory: HexString;
  contractId: HexString;
  token: HexString;
  amount: bigint;
  gas: boolean;
}>(
  Script.fromJson(AddFundsTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const AddPair = new ExecutableScript<{
  oracle: HexString;
  pair: HexString;
}>(Script.fromJson(AddPairScriptJson, "", AllStructs), getContractByCodeHash);

export const AddXp = new ExecutableScript<{
  contract: HexString;
  nft: HexString;
  xp: bigint;
  paidXp: boolean;
}>(Script.fromJson(AddXpScriptJson, "", AllStructs), getContractByCodeHash);

export const Attack = new ExecutableScript<{
  market: HexString;
  nft: HexString;
}>(Script.fromJson(AttackScriptJson, "", AllStructs), getContractByCodeHash);

export const BidLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
  bidAmount: bigint;
  token: HexString;
}>(
  Script.fromJson(BidLoanTestScriptJson, "", AllStructs),
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

export const Cancel = new ExecutableScript<{
  market: HexString;
  nft: HexString;
}>(Script.fromJson(CancelScriptJson, "", AllStructs), getContractByCodeHash);

export const CancelLoan = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(CancelLoanScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const CancelLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(CancelLoanTestScriptJson, "", AllStructs),
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

export const CollectWangFees = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(CollectWangFeesScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const CreateLoan = new ExecutableScript<{
  loanFactory: HexString;
  tokenRequested: HexString;
  tokenAmount: bigint;
  collateralToken: HexString;
  collateralAmount: bigint;
  interest: bigint;
  duration: bigint;
  canLiquidate: boolean;
}>(
  Script.fromJson(CreateLoanScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const CreateLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  tokenRequested: HexString;
  tokenAmount: bigint;
  collateralToken: HexString;
  collateralAmount: bigint;
  interest: bigint;
  duration: bigint;
  canLiquidate: boolean;
}>(
  Script.fromJson(CreateLoanTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const CreateLoaneeMarketTest = new ExecutableScript<{
  loanFactory: HexString;
  token: HexString;
  tokenAmount: bigint;
  minInterest: bigint;
  maxTime: bigint;
  liquidation: boolean;
}>(
  Script.fromJson(CreateLoaneeMarketTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const CreatePublicSaleCollectionSequential = new ExecutableScript<{
  publicSaleCollectionTemplateId: HexString;
  nftMutableTemplateId: HexString;
  collectionUri: HexString;
  nftBaseUri: HexString;
  collectionOwner: Address;
  maxSupply: bigint;
  mintPrice: bigint;
  mintToken: HexString;
  maxBatchMintSize: bigint;
  totalSupply: bigint;
  ownerOnly: boolean;
}>(
  Script.fromJson(
    CreatePublicSaleCollectionSequentialScriptJson,
    "",
    AllStructs
  ),
  getContractByCodeHash
);

export const CreatePublicSaleCollectionSequentialWithRoyalty =
  new ExecutableScript<{
    publicSaleCollectionTemplateId: HexString;
    nftMutableTemplateId: HexString;
    collectionUri: HexString;
    nftBaseUri: HexString;
    collectionOwner: Address;
    maxSupply: bigint;
    mintPrice: bigint;
    mintToken: HexString;
    maxBatchMintSize: bigint;
    royaltyRate: bigint;
    totalSupply: bigint;
    ownerOnly: boolean;
  }>(
    Script.fromJson(
      CreatePublicSaleCollectionSequentialWithRoyaltyScriptJson,
      "",
      AllStructs
    ),
    getContractByCodeHash
  );

export const CreatePvp = new ExecutableScript<{
  market: HexString;
  paca: HexString;
  wagerToken: HexString;
  wager: bigint;
}>(Script.fromJson(CreatePvpScriptJson, "", AllStructs), getContractByCodeHash);

export const Destroy = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(DestroyScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const DestroyLoanFactory = new ExecutableScript<{
  loanFactory: HexString;
}>(
  Script.fromJson(DestroyLoanFactoryScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const DestroyLoanFactoryTest = new ExecutableScript<{
  loanFactory: HexString;
}>(
  Script.fromJson(DestroyLoanFactoryTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const DestroyMarketTest = new ExecutableScript<{
  loanFactory: HexString;
  contractId: HexString;
}>(
  Script.fromJson(DestroyMarketTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const DestroyOgAlfProtocol = new ExecutableScript<{
  contract: HexString;
}>(
  Script.fromJson(DestroyOgAlfProtocolScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const DestroyWangProtocol = new ExecutableScript<{
  contract: HexString;
}>(
  Script.fromJson(DestroyWangProtocolScriptJson, "", AllStructs),
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

export const EditInterestTest = new ExecutableScript<{
  loanFactory: HexString;
  contractId: HexString;
  newInterest: bigint;
}>(
  Script.fromJson(EditInterestTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditLiquidateTest = new ExecutableScript<{
  loanFactory: HexString;
  contractId: HexString;
  liquid: boolean;
}>(
  Script.fromJson(EditLiquidateTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditLoanRate = new ExecutableScript<{
  loanFactory: HexString;
  newRate: bigint;
}>(
  Script.fromJson(EditLoanRateScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditLoanRateTest = new ExecutableScript<{
  loanFactory: HexString;
  newRate: bigint;
}>(
  Script.fromJson(EditLoanRateTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditOgAlfFees = new ExecutableScript<{
  contract: HexString;
  newfee: bigint;
}>(
  Script.fromJson(EditOgAlfFeesScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditTimeTest = new ExecutableScript<{
  loanFactory: HexString;
  contractId: HexString;
  newTime: bigint;
}>(
  Script.fromJson(EditTimeTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditValidContract = new ExecutableScript<{
  gamefi: HexString;
  contract: HexString;
  remove: boolean;
}>(
  Script.fromJson(EditValidContractScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const EditWangFees = new ExecutableScript<{
  contract: HexString;
  newfee: bigint;
}>(
  Script.fromJson(EditWangFeesScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Editfee = new ExecutableScript<{
  contract: HexString;
  edit: bigint;
}>(Script.fromJson(EditfeeScriptJson, "", AllStructs), getContractByCodeHash);

export const ForceCancel = new ExecutableScript<{ loan: HexString }>(
  Script.fromJson(ForceCancelScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const ForceCancelTest = new ExecutableScript<{ loan: HexString }>(
  Script.fromJson(ForceCancelTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const ForceContractCancel = new ExecutableScript<{ pvp: HexString }>(
  Script.fromJson(ForceContractCancelScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const ForfeitLoan = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(ForfeitLoanScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const ForfeitLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(ForfeitLoanTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Gettoken = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(GettokenScriptJson, "", AllStructs), getContractByCodeHash);

export const LeaveBattle = new ExecutableScript<{
  market: HexString;
  nft: HexString;
}>(
  Script.fromJson(LeaveBattleScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const LiquidationLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(LiquidationLoanTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const MintAlf = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(MintAlfScriptJson, "", AllStructs), getContractByCodeHash);

export const MintBatchSequential = new ExecutableScript<{
  nftCollectionId: HexString;
  batchSize: bigint;
  mintPrice: bigint;
  royalty: boolean;
  token: HexString;
}>(
  Script.fromJson(MintBatchSequentialScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const MintNextSequential = new ExecutableScript<{
  nftCollectionId: HexString;
  mintPrice: bigint;
  royalty: boolean;
  token: HexString;
}>(
  Script.fromJson(MintNextSequentialScriptJson, "", AllStructs),
  getContractByCodeHash
);

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

export const MintWWang = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(MintWWangScriptJson, "", AllStructs), getContractByCodeHash);

export const MintWang = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(MintWangScriptJson, "", AllStructs), getContractByCodeHash);

export const PayLoan = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(Script.fromJson(PayLoanScriptJson, "", AllStructs), getContractByCodeHash);

export const PayLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(PayLoanTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const RedeemLoanTest = new ExecutableScript<{
  loanFactory: HexString;
  contract: HexString;
}>(
  Script.fromJson(RedeemLoanTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Rest = new ExecutableScript<{
  contract: HexString;
  nft: HexString;
  quickRest: boolean;
}>(Script.fromJson(RestScriptJson, "", AllStructs), getContractByCodeHash);

export const Sendout = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(SendoutScriptJson, "", AllStructs), getContractByCodeHash);

export const Start = new ExecutableScript<{
  market: HexString;
  nft: HexString;
  opponent: HexString;
}>(Script.fromJson(StartScriptJson, "", AllStructs), getContractByCodeHash);

export const Supercharge = new ExecutableScript<{
  contract: HexString;
  nft: HexString;
}>(
  Script.fromJson(SuperchargeScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Topup = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(Script.fromJson(TopupScriptJson, "", AllStructs), getContractByCodeHash);

export const TopupWangProtocol = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(
  Script.fromJson(TopupWangProtocolScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateCreationFee = new ExecutableScript<{
  contract: HexString;
  amount: bigint;
}>(
  Script.fromJson(UpdateCreationFeeScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateGamifyCode = new ExecutableScript<{
  contract: HexString;
  newCode: HexString;
}>(
  Script.fromJson(UpdateGamifyCodeScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateGamifyFields = new ExecutableScript<{
  contract: HexString;
  newCode: HexString;
  immFields: HexString;
  mutFields: HexString;
}>(
  Script.fromJson(UpdateGamifyFieldsScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateLevel = new ExecutableScript<{
  contract: HexString;
  nft: HexString;
  index: bigint;
}>(
  Script.fromJson(UpdateLevelScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateLoanFactoryCode = new ExecutableScript<{
  loanFactory: HexString;
  newCode: HexString;
}>(
  Script.fromJson(UpdateLoanFactoryCodeScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateLoanFactoryCodeTest = new ExecutableScript<{
  loanFactory: HexString;
  newCode: HexString;
}>(
  Script.fromJson(UpdateLoanFactoryCodeTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateLoanFactoryFields = new ExecutableScript<{
  loanFactory: HexString;
  newCode: HexString;
  immFields: HexString;
  mutFields: HexString;
}>(
  Script.fromJson(UpdateLoanFactoryFieldsScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateLoanFactoryFieldsTest = new ExecutableScript<{
  loanFactory: HexString;
  newCode: HexString;
  immFields: HexString;
  mutFields: HexString;
}>(
  Script.fromJson(UpdateLoanFactoryFieldsTestScriptJson, "", AllStructs),
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

export const UpdateTime = new ExecutableScript<{
  oracle: HexString;
  time: bigint;
}>(
  Script.fromJson(UpdateTimeScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpdateValue = new ExecutableScript<{
  oracle: HexString;
  pair: HexString;
  value: bigint;
}>(
  Script.fromJson(UpdateValueScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpgradeBattleFactory = new ExecutableScript<{
  market: HexString;
  newCode: HexString;
}>(
  Script.fromJson(UpgradeBattleFactoryScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const UpgradeBattleFactoryFields = new ExecutableScript<{
  market: HexString;
  newCode: HexString;
  immutable: HexString;
  mutable: HexString;
}>(
  Script.fromJson(UpgradeBattleFactoryFieldsScriptJson, "", AllStructs),
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

export const WithdrawFromPublicSaleCollectionSequential = new ExecutableScript<{
  to: Address;
  token: HexString;
  amount: bigint;
  nftCollectionId: HexString;
  royalty: boolean;
  nonNative: boolean;
}>(
  Script.fromJson(
    WithdrawFromPublicSaleCollectionSequentialScriptJson,
    "",
    AllStructs
  ),
  getContractByCodeHash
);

export const WithdrawFundsTest = new ExecutableScript<{
  loanFactory: HexString;
  contractId: HexString;
  token: HexString;
  amount: bigint;
}>(
  Script.fromJson(WithdrawFundsTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const WithdrawLoanFactoryFees = new ExecutableScript<{
  loanFactory: HexString;
  who: Address;
  token: HexString;
  amount: bigint;
}>(
  Script.fromJson(WithdrawLoanFactoryFeesScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const WithdrawLoanFactoryFeesTest = new ExecutableScript<{
  loanFactory: HexString;
  who: Address;
  token: HexString;
  amount: bigint;
}>(
  Script.fromJson(WithdrawLoanFactoryFeesTestScriptJson, "", AllStructs),
  getContractByCodeHash
);

export const Withdrawlassets = new ExecutableScript<{ contract: HexString }>(
  Script.fromJson(WithdrawlassetsScriptJson, "", AllStructs),
  getContractByCodeHash
);
