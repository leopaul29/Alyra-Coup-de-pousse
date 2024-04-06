const hre = require("hardhat");

async function main() {
	const interaceName = "CDPProject";
	const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

	const cdpProject = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	[owner, asso1, adh1, adh2, adh3] = await ethers.getSigners();
	// create 2 projects
	await cdpProject.connect(asso1).createProject("new project 1");
	await cdpProject.connect(asso1).createProject("new project 2");
	console.log(`cdpProject projects created`);
	// add 3 adherents project 0
	await cdpProject.connect(asso1).addAdherent(0, adh1);
	await cdpProject.connect(asso1).addAdherent(0, adh2);
	await cdpProject.connect(asso1).addAdherent(0, adh3);
	console.log(`cdpProject adherent add to project 0`);

	// add 1 adherents project 1
	await cdpProject.connect(asso1).addAdherent(1, adh1);
	console.log(`cdpProject adherent add to project 1`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
