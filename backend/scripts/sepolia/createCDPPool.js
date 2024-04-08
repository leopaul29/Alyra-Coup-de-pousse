const hre = require("hardhat");
require("dotenv").config();

const CDPSTAKING_ADDRESS = process.env.SEPOLIA_CDPSTAKING || "";
const CDPTOKEN_ADDRESS = process.env.SEPOLIA_CDPTOKEN || "";

async function main() {
	const cdpStaking = await ethers.getContractAt(
		"CDPStaking",
		CDPSTAKING_ADDRESS
	);

	const cdpERC20 = await ethers.getContractAt(
		"CoupDePousseToken",
		CDPTOKEN_ADDRESS
	);

	await cdpStaking.createPool(cdpERC20, 1);
	console.log(`New pool with CoupDePousseToken deployed`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
