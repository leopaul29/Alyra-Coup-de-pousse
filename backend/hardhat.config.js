require("@nomicfoundation/hardhat-toolbox");

require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
	solidity: "0.8.24",
	defaultNetwork: "hardhat",
	networks: {
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
		sepolia: {
			url: SEPOLIA_RPC_URL,
			chainId: 11155111,
			accounts: [`0x${PRIVATE_KEY}`],
		},
	},
	etherscan: {
		apiKey: {
			sepolia: ETHERSCAN_API_KEY,
		},
	},
};