const hre = require("hardhat");

async function main() {
	const interaceName = "CDPProject";
	const CONTRACT_ADDRESS = "0x0b2A7222932729dCb4E0DFD1936791FCF3d2f5BB";

	const cdpProject = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	// create 2 projects
	await cdpProject.createProject("new project 1");
	await cdpProject.createProject("new project 2");
	console.log(`cdpProject projects created`);
	// add 3 adherents project 0
	await cdpProject.addAdherent(0, "0xAC6eF51B2e92b1908b61B6e6A42c7Ae007e632E8");
	await cdpProject.addAdherent(0, "0x3d9b27bc94f4de2bf67f66c3bf60ee48dc31de68");
	console.log(`cdpProject adherent add to project 0`);

	// add 1 adherents project 1
	await cdpProject.addAdherent(1, "0xAC6eF51B2e92b1908b61B6e6A42c7Ae007e632E8");
	console.log(`cdpProject adherent add to project 1`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
