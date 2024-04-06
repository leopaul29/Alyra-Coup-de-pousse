import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import {
	Box,
	Button,
	Grid,
	GridItem,
	Heading,
	useToast,
} from "@chakra-ui/react";
import {
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import PoolCard from "./PoolCard";
import { useAccount } from "wagmi";
import { cdpTokenAbi, cpdTokenAddress } from "@/constants/cdpToken";
import { usdcTokenAbi, usdcTokenAddress } from "@/constants/uscdToken";
import { useEffect } from "react";

const PoolList = () => {
	const { address } = useAccount();
	const { data: poolLength } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "poolLength",
	});
	const { data: computeRewardPerBlock } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "computeRewardPerBlock",
		account: address,
	});
	const { data: computeCumulateReward } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "computeCumulateReward",
		account: address,
	});
	const { data: rewardsClaimable } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "rewards",
		account: address,
		args: [address],
	});
	const { data: balanceOfUserCDP, refetch } = useReadContract({
		address: cpdTokenAddress,
		abi: cdpTokenAbi,
		account: address,
		functionName: "balanceOf",
		args: [address],
	});
	const { data: balanceOfUserUSDC } = useReadContract({
		address: usdcTokenAddress,
		abi: usdcTokenAbi,
		account: address,
		functionName: "balanceOf",
		args: [address],
	});

	const toast = useToast();
	const {
		data: hash,
		error,
		isPending: setIsPending,
		writeContract,
	} = useWriteContract({
		mutation: {
			onSuccess: () => {
				toast({
					title: "La transaction du stake à été lancée",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			},
			onError: (error) => {
				toast({
					title: error.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			},
		},
	});
	const claimReward = async () => {
		if (!isNaN(Number(rewardsClaimable)) && Number(rewardsClaimable) > 0) {
			writeContract({
				address: cdpStakingAddress,
				abi: cdpStakingAbi,
				functionName: "claimReward",
				account: address,
			});
		} else {
			toast({
				title: "FAUT RENTRER UN NOMBRE !!!",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const { isLoading: isConfirmingApprove, isSuccess } =
		useWaitForTransactionReceipt({
			hash,
		});

	useEffect(() => {
		if (isSuccess) {
			refetch();
			toast({
				title: "Votre claim a été inscrit dans la Blockchain",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
		if (error) {
			toast({
				title: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}, [isSuccess]);
	return (
		<div>
			<Heading mb={4}>Pools</Heading>
			<Box>
				<Heading mb={4}>Reward</Heading>
				<Box>
					computeRewardPerBlock:{" "}
					{!isNaN(Number(computeRewardPerBlock))
						? Number(computeRewardPerBlock)
						: 0}
				</Box>
				<Box>
					computeCumulateReward:{" "}
					{!isNaN(Number(computeCumulateReward))
						? Number(computeCumulateReward)
						: 0}
				</Box>
				<Box>
					rewardsClaimable:{" "}
					{!isNaN(Number(rewardsClaimable)) ? Number(rewardsClaimable) : 0}
				</Box>
				<Button onClick={claimReward}>Claim reward</Button>
			</Box>
			<Box>
				<Heading mb={4}>User balance</Heading>
				<Box>
					balanceOfUserCDP:{" "}
					{!isNaN(Number(balanceOfUserCDP)) ? Number(balanceOfUserCDP) : 0}
				</Box>
				<Box>
					balanceOfUserUSDC:{" "}
					{!isNaN(Number(balanceOfUserUSDC)) ? Number(balanceOfUserUSDC) : 0}
				</Box>
			</Box>
			<Box>
				<Heading mb={4}>Pool list ({Number(poolLength)})</Heading>
				<Grid templateColumns="repeat(3, 1fr)" gap={6}>
					{Number(poolLength) > 0 &&
						[...Array(Number(poolLength))].map((e, poolIndex) => (
							<GridItem key={crypto.randomUUID()}>
								<PoolCard poolIndex={Number(poolIndex)} />
							</GridItem>
						))}
				</Grid>
			</Box>
		</div>
	);
};

export default PoolList;
