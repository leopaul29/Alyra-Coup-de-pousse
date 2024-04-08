const hre = require("hardhat");
require("dotenv").config();

const CDPPROJECT_ADDRESS = process.env.LOCAL_CDPPROJECT || "";

async function main() {
	const cdpProject = await ethers.getContractAt(
		"CDPProject",
		CDPPROJECT_ADDRESS
	);
	console.log(
		`cdpProject projects Length: ${Number(await cdpProject.projectLength())}`
	);
	console.log(`cdpProject project 0: ${await cdpProject.projectInfo[0]}`);
	console.log(
		`cdpProject project adherents: ${await cdpProject.projectAdherents(0)}`
	);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
