import { DUST_AMOUNT, addressFromContractId, contractIdFromAddress, hexToString, stringToHex } from '@alephium/web3'
import { 
  Topup, 
  Sendout, 
  Destroy, 
  Buildtoken, 
  Gettoken, 
  Editfee, 
  Destroycreator, 
  CollectFees, 
  UpdateCreationFee, 
  MintAlf, 
  MintOgAlf, 
  CollectOgAlfFees, 
  EditOgAlfFees, 
  DestroyOgAlfProtocol, 
  ActivateWalfProtocol,
  MintWWang,
  MintWang,
  CollectWangFees,
  EditWangFees,
  TopupWangProtocol,
  DestroyWangProtocol
} from '../../artifacts/ts/scripts';
import * as web3 from '@alephium/web3'

// Token Creation Tool
export const BuildToken = async (
  signerProvider,
  symbol,
  name,
  decimals,
  supply
) => {
  return await Buildtoken.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900",
      symbol: web3.stringToHex(symbol),
      name: web3.stringToHex(name),
      decimals: BigInt(decimals),
      tokenTotal: BigInt(supply)
    },
    attoAlphAmount: DUST_AMOUNT + web3.ONE_ALPH,
    tokens: [{id: web3.ALPH_TOKEN_ID, amount: 10000000000000000000n}]
  })
}

// Destroy Token Creation Tool
export const DestroyTokenCreator = async (
  signerProvider
) => {
  return await Destroycreator.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900"
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// Collect Token Creator Fees
export const CollectCreatorFees = async (
  signerProvider
) => {
  return await CollectFees.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900"
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// Token Creator Fee Edit
export const EditCreatorFees = async (
  signerProvider,
  amount
) => {
  return await UpdateCreationFee.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900",
      amount: BigInt(amount),
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// mint wrapped alf
export const ServiceMintWrappedAlf = async (
  signerProvider,
  amount
) => {
  return await MintAlf.execute(signerProvider, {
    initialFields: {
      contract: "8a8fe3c9b1e5e8ac47363a79c0afe21b3152f6bad0e8b23de73ad0e4f434c600",
      amount: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: "c0c0af7a481e3e50c50e418bf8ff6923dc4d878ac3744474e8c708a8adccfb00", amount: BigInt(amount)}, {id: web3.ALPH_TOKEN_ID, amount: 1000000000000000000n}]
  })
}

// mint wrapped alf -- contract needs to be deployed then it can be edited
export const ServiceMintOgAlf = async (
  signerProvider,
  amount
) => {
  return await MintOgAlf.execute(signerProvider, {
    initialFields: {
      contract: "8a8fe3c9b1e5e8ac47363a79c0afe21b3152f6bad0e8b23de73ad0e4f434c600",
      amount: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: "e8b7cc961cb7689649234d9e7890e134c5a6619759ea0212d6457b06cbed9c00", amount: BigInt(amount)}, {id: web3.ALPH_TOKEN_ID, amount: 1000000000000000000n}]
  })
}

export const ServiceCollectOgAlfFees = async (
  signerProvider
) => {
  return await CollectOgAlfFees.execute(signerProvider, {
    initialFields: {
      contract: "8a8fe3c9b1e5e8ac47363a79c0afe21b3152f6bad0e8b23de73ad0e4f434c600"
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

export const ServiceEditFees = async (
  signerProvider,
  amount
) => {
  return await EditOgAlfFees.execute(signerProvider, {
    initialFields: {
      contract: "8a8fe3c9b1e5e8ac47363a79c0afe21b3152f6bad0e8b23de73ad0e4f434c600",
      newfee: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

export const ServiceTopupWalf = async (
  signerProvider
) => {
  return await ActivateWalfProtocol.execute(signerProvider, {
    initialFields: {
      contract: "8a8fe3c9b1e5e8ac47363a79c0afe21b3152f6bad0e8b23de73ad0e4f434c600"
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: "e8b7cc961cb7689649234d9e7890e134c5a6619759ea0212d6457b06cbed9c00", amount: BigInt(99000000000000000000) }]
  })
}

export const ServiceDestroyWrappedAlfProtocol = async (
  signerProvider
) => {
  return await DestroyOgAlfProtocol.execute(signerProvider, {
    initialFields: {
      contract: "8a8fe3c9b1e5e8ac47363a79c0afe21b3152f6bad0e8b23de73ad0e4f434c600"
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// wang wrapper

const wrapper = "4264d30873a297c93fbc0a2b0286f8df7a16991c2618f42c34e5fc075f252300"

// mint wrapped wang
export const ServiceMintWrappedWang = async (
  signerProvider,
  amount
) => {
  return await MintWWang.execute(signerProvider, {
    initialFields: {
      contract: wrapper,
      amount: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: "c1aeea313e36454f35beaf40130c9219faa40ba645aff93e16429146039f8202", amount: BigInt(amount)}, {id: web3.ALPH_TOKEN_ID, amount: 100000000000000000n }]
  })
}

// mint wrapped wang
export const ServiceMintWang = async (
  signerProvider,
  amount
) => {
  return await MintWang.execute(signerProvider, {
    initialFields: {
      contract: wrapper,
      amount: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: "05fceaf3d6f0e5e3ebce239f6c5503d42f9595ee4dcb1c8f21965f089e4b9600", amount: BigInt(amount)}, {id: web3.ALPH_TOKEN_ID, amount: 1000000000000000000n}]
  })
}

export const ServiceCollectWangFees = async (
  signerProvider
) => {
  return await CollectWangFees.execute(signerProvider, {
    initialFields: {
      contract: wrapper
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

export const ServiceEditWangFees = async (
  signerProvider,
  amount
) => {
  return await EditWangFees.execute(signerProvider, {
    initialFields: {
      contract: wrapper,
      newfee: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

export const ServiceTopupWang = async (
  signerProvider,
  amount
) => {
  return await TopupWangProtocol.execute(signerProvider, {
    initialFields: {
      contract: wrapper,
      amount: amount
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: "e8b7cc961cb7689649234d9e7890e134c5a6619759ea0212d6457b06cbed9c00", amount: BigInt(amount) }]
  })
}

export const ServiceDestroyWangProtocol = async (
  signerProvider
) => {
  return await DestroyWangProtocol.execute(signerProvider, {
    initialFields: {
      contract: wrapper
    },
    attoAlphAmount: DUST_AMOUNT
  })
}