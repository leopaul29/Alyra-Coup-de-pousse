const hre = require("hardhat");

async function main() {
	// deploy CDP token
	const cdpERC20 = await ethers.deployContract("CoupDePousseToken");
	await cdpERC20.waitForDeployment();
	console.log(`CoupDePousseToken contract deployed to ${cdpERC20.target}`);

	// deploy Staking DAPP with reward CDP token
	const cdpStaking = await ethers.deployContract("CDPStaking", [
		cdpERC20.target,
	]);
	await cdpStaking.waitForDeployment();
	console.log(`CDPStaking contract deployed to ${cdpStaking.target}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
