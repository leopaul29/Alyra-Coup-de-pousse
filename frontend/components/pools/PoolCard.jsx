import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { Box, Button, Heading, Skeleton, Stack, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";
import { publicClient } from "@/utils/client";
import { erc20Abi } from "viem";

const PoolCard = ({ poolIndex }) => {
	const { address } = useAccount();
	const [poolInfo, setPoolInfo] = useState({});
	const [balanceOfUserToken, setBlanceOfUserToken] = useState({});
	const [balanceUserOnDapp, setBalanceUserOnDapp] = useState();
	const [name, setName] = useState();
	const [totalSupply, setTotalSupply] = useState();

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
			setTotalSupply(Number(poolInfo[1]));
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
			const erc20Name = await readContract(publicClient, {
				...ERC20Contract,
				functionName: "name",
			});
			setName(erc20Name);
			const balanceUserOnDapp = await readContract(publicClient, {
				address: cdpStakingAddress,
				abi: cdpStakingAbi,
				functionName: "userInfo",
				args: [poolIndex, address],
			});
			setBalanceUserOnDapp(Number(balanceUserOnDapp));
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
				<Skeleton w={200} h={200} />
			) : (
				<div>
					<Heading>{name}</Heading>
					<Stack>
						<Box>weight: {Number(poolInfo[2])}</Box>
						<Box>balanceOfUser: {Number(balanceOfUserToken)}</Box>
						<Box>balanceUserOnDapp: {balanceUserOnDapp}</Box>
						<Box>totalSupply: {totalSupply}</Box>
						<Link href={`/staking/${poolIndex}`}>
							<Button>Go to pool</Button>
						</Link>
					</Stack>
				</div>
			)}
		</>
	);
};

export default PoolCard;
