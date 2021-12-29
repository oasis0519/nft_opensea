const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const MnemonicWalletSubprovider = require("@0x/subproviders")
    .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");

const MNEMONIC = '';
const NODE_API_KEY = '';



const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
    mnemonic: MNEMONIC,
    baseDerivationPath: BASE_DERIVATION_PATH,
});
const network = "rinkeby";
const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: "https://" + network + ".infura.io/v3/" + NODE_API_KEY,
});


const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(mnemonicWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
providerEngine.start();

const seaport = new OpenSeaPort(
    providerEngine,
    {
        networkName: Network.Rinkeby,
    },
    (arg) => console.log(arg)
);


const NFT_CONTRACT_ADDRESS = '';
const OWNER_ADDRESS = '';

    async function gift(){

        //Fetching OpenSea asset
        const asset =  await seaport.api.getAsset({
            tokenAddress: NFT_CONTRACT_ADDRESS, // string
            tokenId: 2,
        });
        //Display asset name:
        console.log(asset.name);

        //Trnasfer asset to other account
        console.log("TRANSFERING FOR ASSET: "+asset.name+" STARTED");
        let res =   await seaport.transfer({
            asset: {
                tokenId: 2,
                tokenAddress: NFT_CONTRACT_ADDRESS
            },
            fromAddress: OWNER_ADDRESS, // Must own the asset
            toAddress: '',
        })
        console.log(res)
        console.log("DONE")


    }

gift();
