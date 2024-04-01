import { Square, Flex, Link } from "@chakra-ui/react";

const Home = () => {
	return (
		<Flex gap="10" direction="row" justify="center">
			<Link href="/projects">
				<Square w="300px" h="300px" bg="#3AD34E">
					Contribute
				</Square>
			</Link>

			<Link href="/projects/create">
				<Square w="300px" h="300px" bg="#009F8E">
					Create a project
				</Square>
			</Link>
		</Flex>
	);
};

export default Home;
