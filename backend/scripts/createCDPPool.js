const hre = require("hardhat");

async function main() {
	const interaceName = "CDPStaking";
	const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
	const cdpStaking = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	// deploy USDC token
	const cdpERC20 = await ethers.getContractAt(
		"CoupDePousseToken",
		"0x5FbDB2315678afecb367f032d93F642f64180aa3"
	);

	await cdpStaking.createPool(cdpERC20, 1);
	console.log(`New pool with CoupDePousseToken deployed`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
