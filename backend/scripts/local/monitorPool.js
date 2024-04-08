const hre = require("hardhat");
require("dotenv").config();

const CDPSTAKING_ADDRESS = process.env.LOCAL_CDPSTAKING || "";

async function main() {
	const cdpStaking = await ethers.getContractAt(
		"CDPStaking",
		CDPSTAKING_ADDRESS
	);
	console.log(`cdpStaking poolInfo length: ${Number(cdpStaking.poolLength())}`);
	console.log(`cdpStaking total supply: ${cdpStaking.totalSupply}`);
	console.log(`cdpStaking pool 0: ${cdpStaking.poolInfo[0]?.weight}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
