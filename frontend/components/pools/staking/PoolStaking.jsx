import { Box, Heading, Stack } from "@chakra-ui/react";
import PoolDeposit from "./PoolDeposit";
import PoolWithdraw from "./PoolWithdraw";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { publicClient } from "@/utils/client";
import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { useAccount } from "wagmi";
import { erc20Abi, formatEther, isAddress } from "viem";
import { getAmountFormated } from "@/utils/utilsFunctions";

const PoolStaking = ({ poolIndex }) => {
	const { address } = useAccount();
	const [poolInfo, setPoolInfo] = useState({});
	const [balanceUser, setBalanceUser] = useState();
	const [balanceUserOnDapp, setBalanceUserOnDapp] = useState();
	const [name, setName] = useState();
	const [totalSupply, setTotalSupply] = useState();

	const refetchBalancePool = async () => {
		const poolInfo = await readContract(publicClient, {
			address: cdpStakingAddress,
			abi: cdpStakingAbi,
			functionName: "poolInfo",
			args: [poolIndex],
		});
		setPoolInfo(poolInfo);
		if (poolInfo) {
			setTotalSupply(Number(poolInfo[1]));
		}
	};

	const getPoolInfo = async () => {
		const poolInfo = await readContract(publicClient, {
			address: cdpStakingAddress,
			abi: cdpStakingAbi,
			functionName: "poolInfo",
			args: [poolIndex],
		});
		setPoolInfo(poolInfo);
		if (poolInfo) {
			setTotalSupply(Number(poolInfo[1]));
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
			const balanceUserOnDapp = await readContract(publicClient, {
				address: cdpStakingAddress,
				abi: cdpStakingAbi,
				functionName: "userInfo",
				args: [poolIndex, address],
			});
			setBalanceUserOnDapp(balanceUserOnDapp);
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
					<Heading mb={4}>Pool: {name}</Heading>
					<Stack>
						<Box>balanceUser: {getAmountFormated(balanceUser)}</Box>
						<Box>balanceUserOnDapp: {getAmountFormated(balanceUserOnDapp)}</Box>
						<Box>totalSupply: {getAmountFormated(totalSupply)}</Box>
						<PoolDeposit
							poolIndex={poolIndex}
							poolInfo={poolInfo}
							refetch={refetch}
						/>
						<PoolWithdraw
							poolIndex={poolIndex}
							poolInfo={poolInfo}
							refetch={refetch}
							refetchBalancePool={refetchBalancePool}
						/>
					</Stack>
				</div>
			)}
		</>
	);
};

export default PoolStaking;
