import { ALPH_TOKEN_ID, DUST_AMOUNT, ONE_ALPH, web3 } from "@alephium/web3"
import { MintPlayer } from "../../artifacts/ts"

// Token Creation Tool
export const MintPlayerService = async (
    signerProvider,
    nftId
  ) => {
    return await MintPlayer.execute(signerProvider, {
      initialFields: {
        collection: "69aa088239e6f6cbe376a98fff39a1cc1271c80003fa58b11b1d09edc86e9100",
        tokenSelected: nftId
      },
      attoAlphAmount: DUST_AMOUNT,
      tokens: [{id: ALPH_TOKEN_ID, amount: 100000000000000000n}, {id: nftId, amount: 1n}]
    })
}