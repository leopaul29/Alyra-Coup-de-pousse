const hre = require("hardhat");
require("dotenv").config();

const CDPTOKEN_ADDRESS = process.env.SEPOLIA_CDPTOKEN || "";
const USDCTOKEN_ADDRESS = process.env.SEPOLIA_USDCTOKEN || "";
const SCRTTOKEN_ADDRESS = process.env.SEPOLIA_SCRTTOKEN || "";

async function main() {
	// signers
	[addr1, addr2, addr3] = await ethers.getSigners();

	// USDC
	const usdcTokenName = "USDCToken";
	const usdcToken = await ethers.getContractAt(
		usdcTokenName,
		USDCTOKEN_ADDRESS
	);

	//cpdTokenName
	const cpdTokenName = "CoupDePousseToken";
	const cpdToken = await ethers.getContractAt(cpdTokenName, CDPTOKEN_ADDRESS);

	// secretToken
	const secretTokenName = "SecretToken";
	const secretToken = await ethers.getContractAt(
		secretTokenName,
		SCRTTOKEN_ADDRESS
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
