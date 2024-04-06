import TransacAlert from "../../TransacAlert";
import { useState, useEffect } from "react";
import { Flex, Box, Button, Input, useToast } from "@chakra-ui/react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { erc20Abi, getAddress, isAddress } from "viem";
import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";

const PoolWithdraw = ({ poolIndex, poolInfo, refetch }) => {
	const [withdrawETH, setWithdrawETH] = useState("");

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
		if (!isNaN(withdrawETH) && isAddress(poolInfo[0])) {
			writeContract({
				address: cdpStakingAddress,
				abi: cdpStakingAbi,
				functionName: "withdraw",
				args: [poolIndex, withdrawETH],
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

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	useEffect(() => {
		if (isConfirmed) {
			refetch();
			toast({
				title: "Votre nombre a été inscrit dans la Blockchain",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			setWithdrawETH("");
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
			<Flex>
				<Input
					placeholder="Amount in ETH"
					type="number"
					value={withdrawETH}
					onChange={(e) => setWithdrawETH(e.target.value)}
				/>
				<Button disabled={setIsPending} onClick={setTheWithdraw}>
					{setIsPending ? "Confirming..." : "Withdraw"}{" "}
				</Button>
			</Flex>
		</Box>
	);
};

export default PoolWithdraw;
