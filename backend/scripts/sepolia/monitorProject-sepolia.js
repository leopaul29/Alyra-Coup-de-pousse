const hre = require("hardhat");
require("dotenv").config();

const SEPOLIA_CDPPROJECT = process.env.SEPOLIA_CDPPROJECT || "";
async function main() {
	const cdpProject = await ethers.getContractAt(
		"CDPProject",
		SEPOLIA_CDPPROJECT
	);
	console.log(
		`cdpProject projects Length: ${Number(await cdpProject.projectLength())}`
	);
	console.log(`cdpProject project 0: ${await cdpProject.projectInfo()}`);
	console.log(
		`cdpProject project adherents: ${await cdpProject.projectAdherents(0)}`
	);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
