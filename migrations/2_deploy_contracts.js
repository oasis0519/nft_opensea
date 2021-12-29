const MeoCardsTest = artifacts.require("MeoCardsTest");

let proxyRegistryAddress = "";

module.exports = async (deployer, network, addresses) => {
  await deployer.deploy(MeoCardsTest, proxyRegistryAddress, {gas: 5000000});
}
