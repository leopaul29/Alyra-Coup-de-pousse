import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { useReadContract, useAccount } from "wagmi";
import PoolInfo from "./PoolInfo";

const Staking = () => {
	const { address } = useAccount();

	const { data: poolLength } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "poolLength",
		account: address,
	});

	return (
		<div>
			<Heading>Pools</Heading>
			<Grid templateColumns="repeat(3, 1fr)" gap={6}>
				{poolLength &&
					[...Array(Number(poolLength))].map((e, poolIndex) => (
						<GridItem key={crypto.randomUUID()}>
							<PoolInfo poolIndex={Number(poolIndex)} />
						</GridItem>
					))}
			</Grid>
		</div>
	);
};

export default Staking;
