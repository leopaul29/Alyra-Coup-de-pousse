import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { cdpProjectAddress, cdpProjectAbi } from "@/constants/cdpProject";
import { useReadContract } from "wagmi";
import { cdpTokenAbi, cpdTokenAddress } from "@/constants/cdpToken";

const ProjectList = () => {
	const { data: projectLength } = useReadContract({
		address: cdpProjectAddress,
		abi: cdpProjectAbi,
		functionName: "projectLength",
	});

	const { data: balanceOfProjectCDP } = useReadContract({
		address: cpdTokenAddress,
		abi: cdpTokenAbi,
		functionName: "balanceOf",
		args: [cdpProjectAddress],
	});
	return (
		<div>
			<Heading mb={4}>Projects</Heading>
			{!isNaN(Number(balanceOfProjectCDP)) && (
				<Box>Reward shared:{Number(balanceOfProjectCDP)}</Box>
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
