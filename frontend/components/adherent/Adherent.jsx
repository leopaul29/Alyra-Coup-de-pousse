import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ProjectCard from "../project/ProjectCard";

const Adherent = ({ params }) => {
	const adherent = {
		projects: [
			{
				id: 5,
				slug: "5",
				title: "title 3",
				address: "0x123",
				siret: "AZE123",
				progress: 70,
			},
			{
				id: 6,
				slug: "6",
				title: "title 2",
				address: "0x123",
				siret: "AZE123",
				progress: 100,
			},
			{
				id: 7,
				slug: "7",
				title: "title 3",
				address: "0x123",
				siret: "AZE123",
				progress: 100,
			},
		],
	};
	return (
		<>
			<Heading>Adherent {params.slug}</Heading>
			<Text>Reward status per project (table ?)</Text>
			<Grid templateColumns="repeat(4, 1fr)" gap={6}>
				{adherent.projects.map((project) => (
					<GridItem key={project.id}>
						<ProjectCard project={project} />
					</GridItem>
				))}
			</Grid>
		</>
	);
};

export default Adherent;
