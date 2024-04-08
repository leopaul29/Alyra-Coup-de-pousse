const hre = require("hardhat");
require("dotenv").config();

const CDPPROJECT_ADDRESS = process.env.LOCAL_CDPPROJECT || "";
async function main() {
	const cdpProject = await ethers.getContractAt(
		"CDPProject",
		CDPPROJECT_ADDRESS
	);

	const [owner, asso1, adh1, adh2, adh3] = await ethers.getSigners();
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
