const hre = require("hardhat");
require("dotenv").config();

const CDPSTAKING_ADDRESS = process.env.SEPOLIA_CDPSTAKING || "";
const USDCTOKEN_ADDRESS = process.env.SEPOLIA_USDCTOKEN || "";

async function main() {
	const interaceName = "CDPStaking";
	const CONTRACT_ADDRESS = CDPSTAKING_ADDRESS;
	const cdpStaking = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	// deploy USDC token
	const usdcERC20 = await ethers.getContractAt("USDCToken", USDCTOKEN_ADDRESS);

	await cdpStaking.createPool(usdcERC20, 1);
	console.log(`New pool with USDCToken deployed`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
