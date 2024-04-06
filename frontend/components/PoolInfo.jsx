import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";
import { publicClient } from "@/utils/client";
import { erc20Abi } from "viem";

const PoolInfo = ({ poolIndex }) => {
	const { address } = useAccount();
	const [poolInfo, setPoolInfo] = useState({});
	const [balanceOfUserToken, setBlanceOfUserToken] = useState({});
	const [blanceOfDappToken, setBlanceOfDappToken] = useState({});
	const [name, setName] = useState("");

	const getPoolInfo = async () => {
		const poolInfo = await readContract(publicClient, {
			address: cdpStakingAddress,
			abi: cdpStakingAbi,
			functionName: "poolInfo",
			account: address,
			args: [poolIndex],
		});
		setPoolInfo(poolInfo);
		if (poolInfo) {
			const ERC20Contract = {
				address: poolInfo[0],
				abi: erc20Abi,
				account: address,
			};
			const balanceOfUser = await readContract(publicClient, {
				...ERC20Contract,
				functionName: "balanceOf",
				args: [address],
			});
			setBlanceOfUserToken(balanceOfUser);
			const balanceOfDapp = await readContract(publicClient, {
				...ERC20Contract,
				functionName: "balanceOf",
				args: [cdpStakingAddress],
			});
			setBlanceOfDappToken(balanceOfDapp);
			const erc20Name = await readContract(publicClient, {
				...ERC20Contract,
				functionName: "name",
			});
			setName(erc20Name);
		}
	};

	useEffect(() => {
		const getPoolInfoAsync = async () => {
			if (poolIndex !== "undefined") {
				await getPoolInfo();
			}
		};
		getPoolInfoAsync();
	}, []);
	return (
		<>
			{poolIndex == "undefined" ? (
				<div>loading</div>
			) : (
				<div>
					<Heading>pool {name}</Heading>
					<Stack>
						<Box>address token: {poolInfo[0]}</Box>
						<Box>weight: {Number(poolInfo[1])}</Box>
						<Box>balanceOfUser: {Number(balanceOfUserToken)}</Box>
						<Box>blanceOfDappToken: {Number(blanceOfDappToken)}</Box>
					</Stack>
				</div>
			)}
		</>
	);
};

export default PoolInfo;
