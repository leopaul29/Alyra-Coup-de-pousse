const { mine } = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
	// instantly mine 1000 blocks
	await mine(10);
	await hre.network.provider.send("hardhat_mine", ["0x100"]);
} // mine 256 blocks
