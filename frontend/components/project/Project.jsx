import {
	Heading,
	Stack,
	HStack,
	Progress,
	Link,
	Box,
	Flex,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Project = ({ params }) => {
	const project = {
		id: 5,
		slug: "5",
		title: "title 3",
		address: "0x123",
		siret: "AZE123",
		progress: 70,
		endBlock: 80,
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
		],
	};
	// get le project avec le slug depuis event ou SM
	return (
		<>
			<Heading>Project {project.title}</Heading>

			<Stack my="4" spacing="3">
				<Flex gap="8" mb="4">
					<Skeleton h="300px" w="500px"></Skeleton>
					<Box w="50%">
						<Heading mb={4} size="md">
							Description
						</Heading>
						<SkeletonText
							noOfLines={3}
							spacing="4"
							skeletonHeight="4"
							mb="12"
						/>
						<Heading mb={4} size="md">
							Progress
						</Heading>
						<Progress hasStripe value={project.progress} mb="12" />
						<Heading mb={4} size="md">
							Deadline (block nb{project.endBlock})
						</Heading>
						<Progress hasStripe value={project.endBlock} mb="12" />
					</Box>
				</Flex>
				<Grid templateColumns="repeat(8, 1fr)" gap={6}>
					{project.adherents.map((adherent) => (
						<GridItem>
							<Link
								href={`/adherents/${adherent.address}`}
								key={adherent.address}
							>
								<SkeletonCircle size={16} />
							</Link>
						</GridItem>
					))}
				</Grid>
				{/* <Stack my="4" spacing="3">
					<Flex gap="8" mb="12">
						<SkeletonText
							noOfLines={8}
							spacing="4"
							skeletonHeight="4"
							w="50%"
						/>
						<Skeleton h="300px" w="500px"></Skeleton>
					</Flex>
					<Flex gap="8" mb="12">
						<Skeleton h="300px" w="500px"></Skeleton>
						<SkeletonText
							noOfLines={8}
							spacing="4"
							skeletonHeight="4"
							w="50%"
						/>
					</Flex>
				</Stack> */}
			</Stack>
		</>
	);
};

export default Project;
