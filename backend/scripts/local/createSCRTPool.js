const hre = require("hardhat");
require("dotenv").config();

const CDPSTAKING_ADDRESS = process.env.LOCAL_CDPSTAKING || "";
const SCRTTOKEN_ADDRESS = process.env.LOCAL_SCRTTOKEN || "";

async function main() {
	const cdpStaking = await ethers.getContractAt(
		"CDPStaking",
		CDPSTAKING_ADDRESS
	);

	// deploy USDC token
	const scrtERC20 = await ethers.getContractAt(
		"SecretToken",
		SCRTTOKEN_ADDRESS
	);

	await cdpStaking.createPool(scrtERC20, 10);
	console.log(`New pool with SecretToken deployed`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
