import { publicClient } from "@/utils/client";
import { Heading, Link, Stack, Flex, Divider } from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { cdpProjectAddress, cdpProjectAbi } from "@/constants/cdpProject";
import { useAccount } from "wagmi";

const ProjectCard = ({ projectIndex }) => {
	const { address } = useAccount();
	const [projectInfo, setProjectInfo] = useState({});
	const [currentBlock, setCurrentCBlock] = useState();
	const getProjectInfo = async () => {
		setCurrentCBlock(await publicClient.getBlockNumber());
		const projectInfo = await readContract(publicClient, {
			address: cdpProjectAddress,
			abi: cdpProjectAbi,
			functionName: "projectInfo",
			account: address,
			args: [projectIndex],
		});
		setProjectInfo(projectInfo);
	};
	useEffect(() => {
		const getProjectInfoAsync = async () => {
			if (projectIndex !== "undefined") {
				await getProjectInfo();
			}
		};
		getProjectInfoAsync();
	}, []);
	return (
		<>
			{projectIndex == "undefined" ? (
				<Skeleton w={200} h={200} />
			) : (
				<Card maxW="sm">
					<CardBody>
						<Stack mt="6" spacing="3">
							<Skeleton h="150px" w="300px"></Skeleton>
							<Heading size="md">{projectInfo[0]}</Heading>
							<SkeletonText></SkeletonText>
						</Stack>
					</CardBody>
					<Divider />
					<CardFooter>
						<Stack spacing="3" w="100%">
							{/* <Progress
								hasStripe
								value={Number(projectInfo[2]) / Number(projectInfo[1])}
							/> */}
							<Flex justify="space-between">
								{/* <Text color="blue.600" fontSize="2xl">
									Ends at block {Number(projectInfo[3])} block in{" "}
									{Number(projectInfo[3]) - Number(currentBlock)}
								</Text> */}
								<Link href={`/projects/${projectIndex}`}>
									<Button>See</Button>
								</Link>
							</Flex>
						</Stack>
					</CardFooter>
				</Card>
			)}
		</>
	);
};

export default ProjectCard;
