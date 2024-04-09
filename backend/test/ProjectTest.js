const {
	loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CdpProject", function () {
	async function deployFixture() {
		const [owner, asso1, adh1, adh2, adh3] = await ethers.getSigners();

		// deploy
		const CdpProject = await ethers.getContractFactory("CDPProject");
		const cdpProject = await CdpProject.deploy();

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

		return { cdpProject, owner, asso1, adh1, adh2, adh3 };
	}

	describe("Deployment", function () {
		it("Should have 2 projects", async function () {
			const { cdpProject } = await loadFixture(deployFixture);

			expect(await cdpProject.projectLength()).to.equal(2);
		});
		it("Should have 2 projects", async function () {
			const { cdpProject } = await loadFixture(deployFixture);

			expect(await cdpProject.projectLength()).to.equal(2);
		});
	});
	describe("Project 1", function () {
		it("Should have 3 adherent", async function () {
			const { cdpProject } = await loadFixture(deployFixture);

			expect((await cdpProject.projectAdherents(0)).length).to.equal(3);
		});
	});
	describe("Create adherent to project 2", function () {
		it("Should have 1 more adherent", async function () {
			const { cdpProject, asso1 } = await loadFixture(deployFixture);

			expect(await cdpProject.projectLength()).to.equal(2);
			await cdpProject.connect(asso1).createProject("new project 3");
			expect(await cdpProject.projectLength()).to.equal(3);
		});
	});
	describe("add adherent project", function () {
		it("Should have 1 more project", async function () {
			const { cdpProject, asso1, adh2 } = await loadFixture(deployFixture);

			expect((await cdpProject.projectAdherents(1)).length).to.equal(1);
			await cdpProject.connect(asso1).addAdherent(1, adh2);
			expect((await cdpProject.projectAdherents(1)).length).to.equal(2);
		});
	});
});
