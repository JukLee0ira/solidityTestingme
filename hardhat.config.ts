import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // ... existing networks ...
    devnet: {
      url: "https://devnetstats.hashlabs.apothem.network/devnet:8545",
    },
  },
};

export default config;
