const hre = require("hardhat");
require("dotenv").config();

const CDPSTAKING_ADDRESS = process.env.LOCAL_CDPSTAKING || "";
const CDPTOKEN_ADDRESS = process.env.LOCAL_CDPTOKEN || "";
const SCRTTOKEN_ADDRESS = process.env.LOCAL_SCRTTOKEN || "";
const USDCTOKEN_ADDRESS = process.env.LOCAL_USDCTOKEN || "";

async function main() {
	// deploy cdpStaking token
	const cdpStaking = await ethers.getContractAt(
		"CDPStaking",
		CDPSTAKING_ADDRESS
	);

	const cdpERC20 = await ethers.getContractAt(
		"CoupDePousseToken",
		CDPTOKEN_ADDRESS
	);

	await cdpStaking.createPool(cdpERC20, 3);
	console.log(`New pool with CoupDePousseToken deployed`);

	// deploy scrtERC20 token
	const scrtERC20 = await ethers.getContractAt(
		"SecretToken",
		SCRTTOKEN_ADDRESS
	);

	await cdpStaking.createPool(scrtERC20, 10);
	console.log(`New pool with SecretToken deployed`);

	// deploy USDC token
	const usdcERC20 = await ethers.getContractAt("USDCToken", USDCTOKEN_ADDRESS);

	await cdpStaking.createPool(usdcERC20, 1);
	console.log(`New pool with USDCToken deployed`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
