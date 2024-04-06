import {
	Heading,
	Stack,
	Link,
	Box,
	Flex,
	Grid,
	GridItem,
	Text,
} from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readContract } from "viem/actions";
import { cdpProjectAddress, cdpProjectAbi } from "@/constants/cdpProject";
import { useAccount } from "wagmi";
import { publicClient } from "@/utils/client";
import { shortenAddress } from "@/utils/utilsFunctions";

const Project = ({ projectIndex }) => {
	const { address } = useAccount();
	const [projectInfo, setProjectInfo] = useState({});
	const [projectAdherents, setProjectAdherents] = useState([]);
	const [currentBlock, setCurrentCBlock] = useState();
	const getProjectInfo = async () => {
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
								{/* <Heading mb={4} size="md">
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
								Ends in {Number(projectInfo[3]) - Number(currentBlock)} block
								(at block {Number(projectInfo[3])}) */}
							</Box>
						</Flex>
						{projectAdherents.length > 0 ? (
							<Grid templateColumns="repeat(8, 1fr)" gap={6}>
								{projectAdherents.map((adherentAddress) => (
									<GridItem key={crypto.randomUUID()}>
										<Link>
											<SkeletonCircle size={16} mb={4} />
											<Text>{shortenAddress(adherentAddress)}</Text>
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
