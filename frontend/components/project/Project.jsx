import {
	Heading,
	Stack,
	Progress,
	Link,
	Box,
	Flex,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { cdpProjectAddress, cdpProjectAbi } from "@/constants/cdpProject";
import { useAccount } from "wagmi";
import { publicClient } from "@/utils/client";

const Project = ({ projectIndex }) => {
	const { address } = useAccount();
	const [projectInfo, setProjectInfo] = useState({});
	const [projectAdherents, setProjectAdherents] = useState([]);
	const [currentBlock, setCurrentCBlock] = useState();
	const getProjectInfo = async () => {
		console.log("projectIndex", projectIndex);
		setCurrentCBlock(await publicClient.getBlockNumber());
		if (projectIndex) {
			const projectInfo = await readContract(publicClient, {
				address: cdpProjectAddress,
				abi: cdpProjectAbi,
				functionName: "projectInfo",
				account: address,
				args: [projectIndex],
			});
			setProjectInfo(projectInfo);
			const projectAdherents = await readContract(publicClient, {
				address: cdpProjectAddress,
				abi: cdpProjectAbi,
				functionName: "projectAdherents",
				account: address,
				args: [projectIndex],
			});
			setProjectAdherents(projectAdherents);
			console.log("projectAdherents", projectAdherents);
		}
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
				<div>
					<Heading>Project: {projectInfo[0]}</Heading>
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
								<Progress
									hasStripe
									value={Number(projectInfo[2]) / Number(projectInfo[1])}
									mb="12"
								/>
								<Heading mb={4} size="md">
									Deadline (block nb{projectInfo.endBlock})
								</Heading>
								Ends at block {Number(projectInfo[3])} block in{" "}
								{Number(projectInfo[3]) - Number(currentBlock)}{" "}
							</Box>
						</Flex>
						{projectAdherents.length > 0 ? (
							<Grid templateColumns="repeat(8, 1fr)" gap={6}>
								{projectAdherents.map((adherentAddress) => (
									<GridItem key={crypto.randomUUID()}>
										<Link href={`/adherents/${adherentAddress}`}>
											<SkeletonCircle size={16} />
										</Link>
									</GridItem>
								))}
							</Grid>
						) : (
							<div>no adherents</div>
						)}
					</Stack>
				</div>
			)}
		</>
	);
};

export default Project;
