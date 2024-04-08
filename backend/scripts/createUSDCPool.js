const hre = require("hardhat");

async function main() {
	const interaceName = "CDPStaking";
	const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
	const cdpStaking = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	// deploy USDC token
	const usdcERC20 = await ethers.getContractAt(
		"USDCToken",
		"0xc5a5C42992dECbae36851359345FE25997F5C42d"
	);

	await cdpStaking.createPool(usdcERC20, 1);
	console.log(`New pool with USDCToken deployed`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
