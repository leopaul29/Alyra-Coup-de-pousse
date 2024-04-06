import { Box, Heading, Stack } from "@chakra-ui/react";
import PoolDeposit from "./PoolDeposit";
import PoolWithdraw from "./PoolWithdraw";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { publicClient } from "@/utils/client";
import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { useAccount } from "wagmi";
import { erc20Abi, isAddress } from "viem";

const PoolStaking = ({ poolIndex }) => {
	const { address } = useAccount();
	const [poolInfo, setPoolInfo] = useState({});
	const [balanceUser, setBalanceUser] = useState();
	const [balanceUserOnDapp, setBalanceUserOnDapp] = useState();
	const [name, setName] = useState();
	const [reward, setReward] = useState();

	const getPoolInfo = async () => {
		const poolInfo = await readContract(publicClient, {
			address: cdpStakingAddress,
			abi: cdpStakingAbi,
			functionName: "poolInfo",
			args: [poolIndex],
		});
		setPoolInfo(poolInfo);
		if (poolInfo) {
			const erc20Name = await readContract(publicClient, {
				address: poolInfo[0],
				abi: erc20Abi,
				functionName: "name",
			});
			setName(erc20Name);
		}
	};

	const refetchBalanceUser = async () => {
		if (isAddress(poolInfo[0])) {
			const balanceOf = await readContract(publicClient, {
				address: poolInfo[0],
				abi: erc20Abi,
				functionName: "balanceOf",
				args: [address],
			});
			setBalanceUser(balanceOf);
		}
	};
	const refetchUserOnBalanceDapp = async () => {
		if (isAddress(poolInfo[0])) {
			const userInfo = await readContract(publicClient, {
				address: cdpStakingAddress,
				abi: cdpStakingAbi,
				functionName: "userInfo",
				args: [poolIndex, address],
			});
			setBalanceUserOnDapp(userInfo[0]);
			setReward(userInfo[2] ? userInfo[2] : 0);
		}
	};
	const refetch = () => {
		refetchBalanceUser();
		refetchUserOnBalanceDapp();
	};
	useEffect(() => {
		refetch();
	}, [poolInfo]);

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
					<Heading>Pool: {name}</Heading>
					<Stack>
						<Box>balanceUser: {Number(balanceUser)}</Box>
						<Box>balanceUserOnDapp: {Number(balanceUserOnDapp)}</Box>
						<Box>reward: {Number(reward)}</Box>
						<PoolDeposit
							poolIndex={poolIndex}
							poolInfo={poolInfo}
							refetch={refetch}
						/>
						<PoolWithdraw
							poolIndex={poolIndex}
							poolInfo={poolInfo}
							refetch={refetch}
						/>
					</Stack>
				</div>
			)}
		</>
	);
};

export default PoolStaking;
