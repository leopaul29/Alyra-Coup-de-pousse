import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useReadContract, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import PoolInfo from "./PoolInfo";

const Staking = () => {
	const { address } = useAccount();

	// --- poolInfo
	//
	const { data: poolLength } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "poolLength",
		account: address,
	});
	console.log("poolLength", poolLength);
	// userinfo
	// const { data: userInfo } = useReadContract({
	// 	address: cdpStakingAddress,
	// 	abi: cdpStakingAbi,
	// 	functionName: "userInfo",
	// 	account: address,
	// 	args: [address],
	// });
	// if (userInfo) {
	// 	console.log("userInfo", userInfo);
	// 	console.log("userInfo.lpToken", userInfo.lpToken);
	// 	console.log("userInfo.blockStart", userInfo.blockStart);
	// }

	// const { data: totalSupply } = useReadContract({
	// 	address: cdpStakingAddress,
	// 	abi: cdpStakingAbi,
	// 	functionName: "totalSupply",
	// 	account: address,
	// });
	// console.log("totalSupply", totalSupply);

	return (
		<div>
			<Heading>Pools</Heading>
			<Stack>
				<Box>a-{Number(poolLength)}-z</Box>
				<Box>{/* a-{Number(totalSupply)}-z */}</Box>
				<Box>
					{[...Array(poolLength)].map((e, poolIndex) => (
						<PoolInfo key={crypto.randomUUID()} poolIndex={Number(poolIndex)} />
					))}
				</Box>
			</Stack>
		</div>
	);
};

export default Staking;
