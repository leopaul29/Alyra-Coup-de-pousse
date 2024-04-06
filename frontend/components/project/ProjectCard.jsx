import {
	Heading,
	Link,
	Stack,
	Flex,
	Text,
	Divider,
	Progress,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const ProjectCard = ({ project }) => {
	return (
		<Card maxW="sm">
			<CardBody>
				<Stack mt="6" spacing="3">
					<Skeleton h="150px" w="300px"></Skeleton>
					<Heading size="md">{project.title}</Heading>
					<SkeletonText></SkeletonText>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<Stack spacing="3" w="100%">
					<Progress hasStripe value={project.progress} />
					<Flex justify="space-between">
						<Text color="blue.600" fontSize="2xl">
							Ends in X block
						</Text>
						<Link href={`/v2/projects/${project.slug}`}>
							<Button>See</Button>
						</Link>
					</Flex>
				</Stack>
			</CardFooter>
		</Card>
	);
};

export default ProjectCard;
