const hre = require("hardhat");

async function main() {
	const cdpStaking = await ethers.getContractAt(
		"CDPStaking",
		"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
	);
	console.log(`cdpStaking poolInfo length: ${Number(cdpStaking.poolLength())}`);
	console.log(`cdpStaking total supply: ${cdpStaking.totalSupply}`);
	console.log(`cdpStaking pool 0: ${cdpStaking.poolInfo[0]?.weight}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
