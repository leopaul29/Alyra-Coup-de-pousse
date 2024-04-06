import { Heading, Link } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { cdpProjectAddress, cdpProjectAbi } from "@/constants/cdpProject";
import { useReadContract } from "wagmi";

const ProjectList = () => {
	// const projects = [
	// 	{
	// 		id: 1,
	// 		slug: "1",
	// 		title: "title 1",
	// 		address: "0x123",
	// 		siret: "AZE123",
	// 		progress: 10,
	// 	},
	// 	{
	// 		id: 2,
	// 		slug: "2",
	// 		title: "title 2",
	// 		address: "0x123",
	// 		siret: "AZE123",
	// 		progress: 50,
	// 	},
	// 	{
	// 		id: 3,
	// 		slug: "3",
	// 		title: "title 3",
	// 		address: "0x123",
	// 		siret: "AZE123",
	// 		progress: 40,
	// 	},
	// 	{
	// 		id: 4,
	// 		slug: "4",
	// 		title: "title 2",
	// 		address: "0x123",
	// 		siret: "AZE123",
	// 		progress: 30,
	// 	},
	// 	{
	// 		id: 5,
	// 		slug: "5",
	// 		title: "title 3",
	// 		address: "0x123",
	// 		siret: "AZE123",
	// 		progress: 70,
	// 	},
	// 	{
	// 		id: 6,
	// 		slug: "6",
	// 		title: "title 2",
	// 		address: "0x123",
	// 		siret: "AZE123",
	// 		progress: 100,
	// 	},
	// 	{
	// 		id: 7,
	// 		slug: "7",
	// 		title: "title 3",
	// 		address: "0x123",
	// 		siret: "AZE123",
	// 		progress: 100,
	// 	},
	// ];
	const { data: projectLength } = useReadContract({
		address: cdpProjectAddress,
		abi: cdpProjectAbi,
		functionName: "projectLength",
	});
	return (
		<>
			<Heading mb={4}>Projects</Heading>
			<Grid templateColumns="repeat(3, 1fr)" gap={6}>
				{projectLength &&
					[...Array(Number(projectLength))].map((e, projectIndex) => (
						<GridItem key={crypto.randomUUID()}>
							<ProjectCard projectIndex={projectIndex} />
						</GridItem>
					))}
			</Grid>
		</>
	);
};

export default ProjectList;
