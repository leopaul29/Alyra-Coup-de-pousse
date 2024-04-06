import { Grid, GridItem, Heading } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { cdpProjectAddress, cdpProjectAbi } from "@/constants/cdpProject";
import { useReadContract } from "wagmi";

const ProjectList = () => {
	const { data: projectLength } = useReadContract({
		address: cdpProjectAddress,
		abi: cdpProjectAbi,
		functionName: "projectLength",
	});
	return (
		<div>
			<Heading mb={4}>Projects</Heading>
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
