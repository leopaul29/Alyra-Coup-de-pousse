const hre = require("hardhat");
require("dotenv").config();

const SEPOLIA_CDPPROJECT = process.env.SEPOLIA_CDPPROJECT || "";
const addrTest1 = "0xAC6eF51B2e92b1908b61B6e6A42c7Ae007e632E8";
const addrTest2 = "0x3d9b27bc94f4de2bf67f66c3bf60ee48dc31de68";

async function main() {
	const interaceName = "CDPProject";
	const CONTRACT_ADDRESS = SEPOLIA_CDPPROJECT;
	const cdpProject = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	// create 2 projects
	await cdpProject.createProject("new project 1");
	await cdpProject.createProject("new project 2");
	console.log(`cdpProject projects created`);
	// add 3 adherents project 0
	await cdpProject.addAdherent(0, addrTest1);
	await cdpProject.addAdherent(0, addrTest2);
	console.log(`cdpProject adherent add to project 0`);

	// add 1 adherents project 1
	await cdpProject.addAdherent(1, addrTest1);
	console.log(`cdpProject adherent add to project 1`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
