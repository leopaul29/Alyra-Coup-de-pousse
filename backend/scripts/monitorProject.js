const hre = require("hardhat");

async function main() {
	const cdpProject = await ethers.getContractAt(
		"CDPProject",
		"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
	);
	console.log(
		`cdpProject projects Length: ${Number(await cdpProject.projectLength())}`
	);
	console.log(`cdpProject project 0: ${await cdpProject.projectInfo[0]}`);
	console.log(
		`cdpProject project adherents: ${await cdpProject.projectAdherents(0)}`
	);
	console.log(
		`cdpProject project Amount Raised: ${await cdpProject.projectAmountRaised(
			0
		)}`
	);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
