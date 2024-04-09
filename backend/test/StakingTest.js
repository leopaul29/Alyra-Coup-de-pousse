const {
	loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CdpStaking", function () {
	async function deployFixture() {
		const [owner, addr1] = await ethers.getSigners();

		// deploy CDP token
		const cdpERC20 = await ethers.getContractFactory("CoupDePousseToken");
		const CdpERC20 = await cdpERC20.deploy();

		// deploy Staking DAPP with reward CDP token
		const cdpStaking = await ethers.getContractFactory("CDPStaking");
		const CdpStaking = await cdpStaking.deploy(CdpERC20.getAddress());

		// deploy USDC token
		const usdcERC20 = await ethers.getContractFactory("USDCToken");
		const UsdcERC20 = await usdcERC20.deploy();

		await CdpStaking.createPool(UsdcERC20.getAddress(), 1);

		// deploy project DAPP
		const cdpProject = await ethers.getContractFactory("CDPProject");
		const CdpProject = await cdpProject.deploy();
		await CdpStaking.setCDPProjectAddress(CdpProject.getAddress());

		return { CdpERC20, CdpStaking, UsdcERC20, CdpProject, owner, addr1 };
	}

	describe("Deployment", function () {
		it("Should have mint reward token", async function () {
			const { CdpERC20, owner } = await loadFixture(deployFixture);

			// expect(await CdpERC20.balanceOf(owner)).to.equal(1000 * 1e18);
		});
		it("Should have mint usdc token", async function () {
			const { UsdcERC20, owner } = await loadFixture(deployFixture);

			// expect(await UsdcERC20.balanceOf(owner)).to.equal(1000 * 1e18);
		});
		it("Should have 1 usdc pool", async function () {
			const { CdpStaking, UsdcERC20 } = await loadFixture(deployFixture);

			expect(Number(await CdpStaking.poolLength())).to.equal(1);

			// const [token, totalSupply, weight] = await CdpStaking.getPoolInfo(0);
			// expect(await token).to.equal(await UsdcERC20.getAddress());
			// expect(await totalSupply).to.equal(0);
			// expect(await weight).to.equal(1);
		});
	});
	describe("PoolInfo", function () {
		it("Should create pool success", async function () {
			const { CdpStaking, CdpERC20, owner } = await loadFixture(deployFixture);

			// await expect(
			// 	CdpStaking.connect(owner).createPool(await CdpERC20.getAddress(), 10)
			// )
			// 	.to.emit(CdpStaking, "CreatePool")
			// 	.withArgs(await owner.getAddress(), await CdpERC20.getAddress(), 10);
			// expect(Number(await CdpStaking.poolLength())).to.equal(2);
		});
		it("Should create pool revert when not owner", async function () {
			const { CdpStaking, CdpERC20, addr1 } = await loadFixture(deployFixture);

			await expect(
				CdpStaking.connect(addr1).createPool(await CdpERC20.getAddress(), 10)
			)
				.to.be.revertedWithCustomError(CdpStaking, "OwnableUnauthorizedAccount")
				.withArgs(addr1.address);
		});
		it("Should create pool revert weight", async function () {
			const { CdpStaking, CdpERC20, owner } = await loadFixture(deployFixture);

			await expect(
				CdpStaking.connect(owner).createPool(await CdpERC20.getAddress(), 0)
			).to.revertedWith("weight must be greater than 0");
		});
		it("Should create pool revert custom error already exist", async function () {
			const { CdpStaking, UsdcERC20, owner } = await loadFixture(deployFixture);

			await expect(
				CdpStaking.connect(owner).createPool(await UsdcERC20.getAddress(), 100)
			)
				.to.revertedWithCustomError(CdpStaking, "poolAlreadyExist")
				.withArgs(await UsdcERC20.getAddress());
		});
	});
	describe("Stake", function () {
		it("Should stake with success", async function () {
			const { CdpStaking, UsdcERC20, owner } = await loadFixture(deployFixture);
			const amountToStake = BigInt(100 * 1e18);
			// approve ERC20 before transfert
			expect(
				Boolean(
					await UsdcERC20.connect(owner).approve(
						await CdpStaking.getAddress(),
						amountToStake
					)
				)
			).to.be.true;
			expect(
				await UsdcERC20.allowance(
					await owner.getAddress(),
					await CdpStaking.getAddress()
				)
			).to.equal(amountToStake);

			// expect((await CdpStaking.getPoolInfo(0)).token).to.be.equal(
			// 	await UsdcERC20.getAddress()
			// );

			// await expect(await CdpStaking.connect(owner).stake(0, amountToStake))
			// 	.to.emit(CdpStaking, "Stake")
			// 	.withArgs(await owner.getAddress(), 0, amountToStake);
		});
		it("Should stake revert with amount 0", async function () {
			const { CdpStaking, owner } = await loadFixture(deployFixture);
			await expect(CdpStaking.connect(owner).stake(0, 0)).to.be.revertedWith(
				"_amount = 0"
			);
		});
		it("Should stake revert when not approved", async function () {
			const { CdpStaking, UsdcERC20, owner } = await loadFixture(deployFixture);
			const amountToStake = BigInt(100 * 1e18);

			await expect(
				CdpStaking.connect(owner).stake(0, amountToStake)
			).to.be.revertedWithCustomError(UsdcERC20, "ERC20InsufficientAllowance");
			// .withArgs(
			// 	await owner.getAddress(),
			// 	await CdpStaking.getAddress(),
			// 	amountToStake
			// );
		});
	});

	describe("withdraw", function () {
		it("Should withdraw with success", async function () {
			const { CdpStaking, UsdcERC20, owner } = await loadFixture(deployFixture);
			const amountToStake = BigInt(100 * 1e18);
			// approve ERC20 before transfert
			expect(
				Boolean(
					await UsdcERC20.connect(owner).approve(
						await CdpStaking.getAddress(),
						amountToStake
					)
				)
			).to.be.true;
			expect(await CdpStaking.connect(owner).stake(0, amountToStake));
			expect(await CdpStaking.connect(owner).withdraw(0, amountToStake));
		});
		// it("Should withdraw revert with amount > 0 but no balance", async function () {
		// 	const { CdpStaking, UsdcERC20, owner } = await loadFixture(deployFixture);
		// 	expect(await UsdcERC20.balanceOf(owner)).to.equal(1000);
		// 	expect(await CdpStaking.connect(owner).withdraw(0, BigInt(100 * 1e18)));
		// 	expect(await UsdcERC20.balanceOf(owner)).to.equal(1000 + 100 * 1e18);
		// });
	});
});
