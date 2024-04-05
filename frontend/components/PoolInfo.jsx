import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { cdpTokenAbi, cpdTokenAddress } from "@/constants/cdpToken";
import { usdcTokenAbi, usdcTokenAddress } from "@/constants/uscdToken";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { useReadContract, useAccount } from "wagmi";
import { publicClient } from "@/utils/client";

const PoolInfo = ({ poolIndex }) => {
	console.log("poolIndex:", poolIndex);
	const { address } = useAccount();
	const [poolInfo, setPoolInfo] = useState({});
	// const [balanceOfUserToken, setBlanceOfUserToken] = useState({});

	const getPoolInfo = async () => {
		console.log("poolInfo readcontract");
		const poolInfo = await readContract(publicClient, {
			address: cdpStakingAddress,
			abi: cdpStakingAbi,
			functionName: "poolInfo",
			account: address,
			args: [poolIndex],
		});
		setPoolInfo(poolInfo);
		let balanceOfUserToken;
		if (poolInfo) {
			console.log("pool", poolInfo);
			console.log("pool.token", poolInfo[0]);
			console.log("pool.weight", poolInfo[1]);

			// let contractAddress, contractAbi;
			// if (poolInfo[0] === usdcTokenAddress) {
			// 	contractAddress = usdcTokenAddress;
			// 	contractAbi = usdcTokenAbi;
			// }
			// if (poolIndex[0] === cpdTokenAddress) {
			// 	contractAddress = cpdTokenAddress;
			// 	contractAbi = cdpTokenAbi;
			// }
			// if (contractAddress !== "") {
			// 	// const { data: balanceOfUser } = useReadContract({
			// 	// 	address: contractAddress,
			// 	// 	abi: contractAbi,
			// 	// 	functionName: "balanceOf",
			// 	// 	account: address,
			// 	// 	args: [address],
			// 	// });
			// 	const balanceOf = await readContract(client, {
			// 		abi: contractAbi,
			// 		address: contractAddress,
			// 		functionName: "balanceOf",
			// 	});
			// 	setBlanceOfUserToken(balanceOfUser);
			// }
		}
	};

	useEffect(() => {
		console.log("useeffect");

		const getAllPoolInfo = async () => {
			console.log("getAllPoolInfo");

			if (poolIndex !== "undefined") {
				await getPoolInfo();
			}
		};
		getAllPoolInfo();
	}, []);
	return (
		<div>
			<Heading>pool: {poolIndex}</Heading>
			<Stack>
				{poolInfo && (
					<>
						<Box>address token: {poolInfo[0]}</Box>
						<Box>weight: {Number(poolInfo[1])}</Box>
						{/* <Box>balanceOfUser: {Number(balanceOfUserToken)}</Box> */}
					</>
				)}
			</Stack>
		</div>
	);
};

export default PoolInfo;
