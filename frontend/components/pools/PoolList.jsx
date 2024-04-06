import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { useReadContract } from "wagmi";
import PoolCard from "./PoolCard";

const PoolList = () => {
	const { data: poolLength } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "poolLength",
	});

	return (
		<div>
			<Heading mb={4}>Pools</Heading>
			<Grid templateColumns="repeat(3, 1fr)" gap={6}>
				{poolLength &&
					[...Array(Number(poolLength))].map((e, poolIndex) => (
						<GridItem key={crypto.randomUUID()}>
							<PoolCard poolIndex={Number(poolIndex)} />
						</GridItem>
					))}
			</Grid>
		</div>
	);
};

export default PoolList;
