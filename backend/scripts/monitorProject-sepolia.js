const hre = require("hardhat");

async function main() {
	const cdpProject = await ethers.getContractAt(
		"CDPProject",
		"0x0b2A7222932729dCb4E0DFD1936791FCF3d2f5BB"
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
