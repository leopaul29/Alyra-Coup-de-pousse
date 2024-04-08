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

	// deploy USDC token
	const usdcERC20 = await ethers.deployContract("USDCToken");
	await usdcERC20.waitForDeployment();
	console.log(`USDCToken contract deployed to ${usdcERC20.target}`);

	// deploy project DAPP
	const cdpProject = await ethers.deployContract("CDPProject");
	await cdpProject.waitForDeployment();
	console.log(`cdpProject contract deployed to ${cdpProject.target}`);

	await cdpStaking.setCDPProjectAddress(cdpProject.target);

	// deploy SCRT token
	const scrtERC20 = await ethers.deployContract("SecretToken");
	await scrtERC20.waitForDeployment();
	console.log(`USDCToken contract deployed to ${scrtERC20.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
