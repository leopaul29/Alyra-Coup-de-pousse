const hre = require("hardhat");

async function main() {
	// signers
	[addr1, addr2, addr3] = await ethers.getSigners();

	// USDC
	const usdcTokenName = "USDCToken";
	const USDC_CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
	const usdcToken = await ethers.getContractAt(
		usdcTokenName,
		USDC_CONTRACT_ADDRESS
	);

	//cpdTokenName
	const cpdTokenName = "CoupDePousseToken";
	const CDP_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	const cpdToken = await ethers.getContractAt(
		cpdTokenName,
		CDP_CONTRACT_ADDRESS
	);

	// secretToken
	const secretTokenName = "SecretToken";
	const SCRT_CONTRACT_ADDRESS = "0xc5a5C42992dECbae36851359345FE25997F5C42d";
	const secretToken = await ethers.getContractAt(
		secretTokenName,
		SCRT_CONTRACT_ADDRESS
	);

	// mint
	usdcToken.mint(addr1, BigInt(1000000000000000000000));
	usdcToken.mint(addr2, BigInt(1000000000000000000000));
	usdcToken.mint(addr3, BigInt(1000000000000000000000));

	cpdToken.mint(addr1, BigInt(1000000000000000000000));
	cpdToken.mint(addr2, BigInt(1000000000000000000000));
	cpdToken.mint(addr3, BigInt(1000000000000000000000));

	secretToken.mint(addr1, BigInt(1000000000000000000000));
	secretToken.mint(addr2, BigInt(1000000000000000000000));
	secretToken.mint(addr3, BigInt(1000000000000000000000));
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
