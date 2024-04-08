import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Grid,
	GridItem,
	Heading,
	Stack,
	useToast,
} from "@chakra-ui/react";
import {
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import PoolCard from "./PoolCard";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { erc20Abi } from "viem";
import { getAmountFormated } from "@/utils/utilsFunctions";
import {
	cdpTokenAddress,
	scrtTokenAddress,
	usdcTokenAddress,
} from "@/constants";

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
		address: cdpTokenAddress,
		abi: erc20Abi,
		account: address,
		functionName: "balanceOf",
		args: [address],
	});
	const { data: balanceOfUserUSDC } = useReadContract({
		address: usdcTokenAddress,
		abi: erc20Abi,
		account: address,
		functionName: "balanceOf",
		args: [address],
	});
	const { data: balanceOfUserSCRT } = useReadContract({
		address: scrtTokenAddress,
		abi: erc20Abi,
		account: address,
		functionName: "balanceOf",
		args: [address],
	});
	balanceOfUserCDP;

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
				title: "Il n'y a pas de reward à récupérer pour le moment",
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
		<>
			<Flex justify="space-between" mb={4}>
				<Card>
					<CardHeader>
						<Heading mb={4} size="lg">
							Reward
						</Heading>
					</CardHeader>
					<CardBody>
						<Stack>
							<Box>
								computeRewardPerBlock:{" "}
								{Number(getAmountFormated(computeRewardPerBlock))}
							</Box>
							<Box>
								rewardsClaimable:{" "}
								{Number(getAmountFormated(computeCumulateReward)) +
									Number(getAmountFormated(rewardsClaimable))}
							</Box>
							<Button onClick={claimReward}>Claim reward</Button>
						</Stack>
					</CardBody>
				</Card>
				<Card>
					<CardHeader>
						<Heading mb={4} size="lg">
							User balance
						</Heading>
					</CardHeader>
					<CardBody>
						<Stack>
							<Box>balanceOfUserCDP:{getAmountFormated(balanceOfUserCDP)}</Box>
							<Box>
								balanceOfUserUSDC: {getAmountFormated(balanceOfUserUSDC)}
							</Box>
							<Box>
								balanceOfUserSCRT: {getAmountFormated(balanceOfUserSCRT)}
							</Box>
						</Stack>
					</CardBody>
				</Card>
			</Flex>
			<Box>
				<Heading mb={4}>Pool list ({Number(poolLength)})</Heading>
				{Number(poolLength) > 0 && (
					<Grid templateColumns="repeat(3, 1fr)" gap={6}>
						{[...Array(Number(poolLength))].map((e, poolIndex) => (
							<GridItem key={crypto.randomUUID()}>
								<PoolCard poolIndex={Number(poolIndex)} />
							</GridItem>
						))}
					</Grid>
				)}
			</Box>
		</>
	);
};

export default PoolList;
