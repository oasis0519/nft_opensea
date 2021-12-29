require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = '';
const NODE_API_KEY = '';
const NODE_API_KEY_MAIN = '';


module.exports = {
  networks: {
   development: {
      provider: () =>
          new HDWalletProvider({
            mnemonic: {
              phrase: MNEMONIC
            },
            providerOrUrl: "https://rinkeby.infura.io/v3/" + NODE_API_KEY,
      }),
      gas: 5000000,
      network_id: "*",
    },
    /*
    production: {
      provider: () =>
          new HDWalletProvider({
            mnemonic: {
              phrase: MNEMONIC
            },
            providerOrUrl: "https://mainnet.infura.io/v3/" + NODE_API_KEY_MAIN,
          }),
      gas: 5000000,
      network_id: "*",
    },*/
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.5.0",
      settings: {
        evmVersion: 'constantinople',
      }
    }
  }
}
