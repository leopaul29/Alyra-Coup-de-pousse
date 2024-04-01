import { Heading, Stack, HStack, Progress, Link } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Project = ({ params }) => {
	const project = {
		id: 5,
		slug: "5",
		title: "title 3",
		address: "0x123",
		siret: "AZE123",
		progress: 70,
		adherents: [
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
			{
				address: "0x132",
			},
		],
	};
	// get le project avec le slug depuis event ou SM
	return (
		<>
			<Heading>Project {project.title}</Heading>
			<Stack my="4" spacing="3">
				<Skeleton h="150px" w="300px"></Skeleton>
				<SkeletonText></SkeletonText>
				<Progress hasStripe value={project.progress} />
				<HStack templateColumns="repeat(8, 1fr)" gap={6}>
					{project.adherents.map((adherent) => (
						<Link
							href={`/adherents/${adherent.address}`}
							key={adherent.address}
						>
							<SkeletonCircle />
						</Link>
					))}
				</HStack>
			</Stack>
		</>
	);
};

export default Project;
