
const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = '';
const NODE_API_KEY = '';
const NFT_CONTRACT_ADDRESS = '';
const OWNER_ADDRESS = '';

const NFT_ABI = [
    {
        constant: false,
        inputs: [
            {
                name: "_to",
                type: "address",
            },
        ],
        name: "mintTo",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "customtknID",
        outputs: [
            {
                name: "_currentTokenId",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    }
];

module.exports = {
    mint: async  () => {
        const network = "rinkeby";
        const provider = new HDWalletProvider(
            MNEMONIC,
            "https://" + network + ".infura.io/v3/" + NODE_API_KEY
        );
        const OPTIONS = {
            defaultBlock: "latest",
            transactionConfirmationBlocks: 1,
            transactionBlockTimeout: 5
        }

        const web3Instance = new web3(provider, null, OPTIONS);

        if (NFT_CONTRACT_ADDRESS) {
            const nftContract = new web3Instance.eth.Contract(
                NFT_ABI,
                NFT_CONTRACT_ADDRESS,
                {gasLimit: "10000"}
            );
            console.log("START MINTING");
            const result = await nftContract.methods
                .mintTo(OWNER_ADDRESS)
                .send({from: OWNER_ADDRESS}).catch(e => {
                    console.log(e);
                });
            console.log("Minted creature. Transaction: " + result.transactionHash);
            return await nftContract.methods.customtknID().call().then(async (res) => {
                return web3Instance.utils.toDecimal(res);
            });

        } else {
            console.error(
                "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
            );
        }
    }

}
