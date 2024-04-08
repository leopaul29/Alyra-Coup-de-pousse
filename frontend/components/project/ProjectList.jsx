import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { cdpProjectAddress, cdpProjectAbi } from "@/constants/cdpProject";
import { useReadContract } from "wagmi";
import { cdpTokenAddress } from "@/constants";
import { erc20Abi } from "viem";
import { getAmountFormated } from "@/utils/utilsFunctions";

const ProjectList = () => {
	const { data: projectLength } = useReadContract({
		address: cdpProjectAddress,
		abi: cdpProjectAbi,
		functionName: "projectLength",
	});

	const { data: balanceOfProjectCDP } = useReadContract({
		address: cdpTokenAddress,
		abi: erc20Abi,
		functionName: "balanceOf",
		args: [cdpProjectAddress],
	});
	const projectLengthNb = isNaN(Number(projectLength))
		? 0
		: Number(projectLength);
	return (
		<div>
			<Heading mb={4}>Projects count:{projectLengthNb}</Heading>
			{!isNaN(Number(balanceOfProjectCDP)) && (
				<Box>Reward shared:{getAmountFormated(balanceOfProjectCDP)}</Box>
			)}
			<Grid templateColumns="repeat(3, 1fr)" gap={6}>
				{projectLength &&
					[...Array(Number(projectLength))].map((e, projectIndex) => (
						<GridItem key={crypto.randomUUID()}>
							<ProjectCard projectIndex={Number(projectIndex)} />
						</GridItem>
					))}
			</Grid>
		</div>
	);
};

export default ProjectList;
