import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { useAccount } from "wagmi";
import TransacAlert from "../../TransacAlert";
import { useState, useEffect } from "react";
import { Flex, Box, Button, Input, useToast } from "@chakra-ui/react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { erc20Abi, getAddress, isAddress } from "viem";

const PoolDeposit = ({ poolIndex, poolInfo, refetch }) => {
	const { address } = useAccount();

	const [depositETH, setDepositETH] = useState("");

	const toast = useToast();

	const {
		data: hashApprove,
		error,
		isPending: setIsPending,
		writeContract: writeContractApprove,
	} = useWriteContract({
		mutation: {
			onSuccess: () => {
				toast({
					title: "La transaction du approval à été lancée",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				stakeToken();
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

	const {
		data: hashstake,
		errorstake,
		isPending: setIsPendingstake,
		writeContract: writeContractStake,
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
	const stakeToken = async () => {
		if (!isNaN(depositETH)) {
			writeContractStake({
				address: cdpStakingAddress,
				abi: cdpStakingAbi,
				functionName: "stake",
				args: [poolIndex, depositETH],
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
	const setTheDepositETH = async () => {
		if (!isNaN(depositETH) && isAddress(poolInfo[0])) {
			writeContractApprove({
				address: getAddress(poolInfo[0]),
				abi: erc20Abi,
				functionName: "approve",
				args: [cdpStakingAddress, depositETH],
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

	const { isLoading: isConfirmingApprove, isSuccess: isConfirmedApprove } =
		useWaitForTransactionReceipt({
			hash: hashApprove,
		});

	useEffect(() => {
		if (isConfirmedApprove) {
			toast({
				title: "Votre approve a été inscrit dans la Blockchain",
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
	}, [isConfirmedApprove]);

	const { isLoading: isConfirmingStake, isSuccess: isConfirmedStake } =
		useWaitForTransactionReceipt({
			hash: hashstake,
		});

	useEffect(() => {
		if (isConfirmedStake) {
			refetch();
			toast({
				title: "Votre stake a été inscrit dans la Blockchain",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			setDepositETH("");
		}
		if (error) {
			toast({
				title: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}, [isConfirmedStake]);

	return (
		<Box mb="1rem">
			<TransacAlert
				hash={hashstake}
				isConfirming={isConfirmingStake}
				isConfirmed={isConfirmedStake}
				error={error}
			/>
			<Flex>
				<Input
					placeholder="Amount in ETH"
					type="number"
					value={depositETH}
					onChange={(e) => setDepositETH(e.target.value)}
				/>
				<Button disabled={setIsPending} onClick={setTheDepositETH}>
					{setIsPending ? "Confirming..." : "Stake"}{" "}
				</Button>
			</Flex>
		</Box>
	);
};

export default PoolDeposit;
