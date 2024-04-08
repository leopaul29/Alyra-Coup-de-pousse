import TransacAlert from "../../TransacAlert";
import { useState, useEffect } from "react";
import { Flex, Box, Button, Input, useToast } from "@chakra-ui/react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { isAddress, parseEther } from "viem";
import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";

const PoolWithdraw = ({ poolIndex, poolInfo, refetch, refetchBalancePool }) => {
	const [withdrawToken, setWithdrawToken] = useState("");

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
					title: "La transaction du withdraw à été lancée",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			},
			// Si erreur
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

	const setTheWithdraw = async () => {
		if (!isNaN(withdrawToken) && isAddress(poolInfo[0])) {
			writeContract({
				address: cdpStakingAddress,
				abi: cdpStakingAbi,
				functionName: "withdraw",
				args: [poolIndex, parseEther(withdrawToken?.toString())],
			});
		} else {
			toast({
				title: "L'input n'est pas un nombre ou l'adresse du token est fausse",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	useEffect(() => {
		if (isConfirmed) {
			refetch();
			refetchBalancePool();
			toast({
				title: "Votre nombre a été inscrit dans la Blockchain",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			setWithdrawToken("");
		}
		if (error) {
			toast({
				title: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}, [isConfirmed]);

	return (
		<Box mb="1rem">
			<TransacAlert
				hash={hash}
				isConfirming={isConfirming}
				isConfirmed={isConfirmed}
				error={error}
			/>
			<Flex>
				<Input
					placeholder="Amount to withdraw"
					type="number"
					value={withdrawToken}
					onChange={(e) => setWithdrawToken(e.target.value)}
				/>
				<Button disabled={setIsPending} onClick={setTheWithdraw}>
					{setIsPending ? "Confirming..." : "Withdraw"}{" "}
				</Button>
			</Flex>
		</Box>
	);
};

export default PoolWithdraw;
