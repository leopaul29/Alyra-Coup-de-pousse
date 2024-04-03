// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
	// const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	// const unlockTime = currentTimestampInSeconds + 60;

	// const lockedAmount = hre.ethers.parseEther("0.001");

	// const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
	//   value: lockedAmount,
	// });

	// await lock.waitForDeployment();

	// console.log(
	//   `Lock with ${ethers.formatEther(
	//     lockedAmount
	//   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
	// );

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

	// const [owner] = await ethers.getSigners();
	await cdpStaking.createPool(usdcERC20, 1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
