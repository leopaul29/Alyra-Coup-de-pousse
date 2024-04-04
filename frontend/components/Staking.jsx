import { cdpStakingAbi, cdpStakingAddress } from "@/constants/cdpStaking";
import { Heading } from "@chakra-ui/react";
import { useReadContract, useAccount } from "wagmi";
import { useState, useEffect } from "react";

const Staking = () => {
	const { address } = useAccount();
	const [pool, setPool] = useState({});

	// --- poolInfo
	//
	const { data: poolLength } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "poolLength",
		account: address,
	});
	console.log("poolLength", poolLength);
	const { data: poolInfo } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "poolInfo",
		account: address,
		args: ["0"],
	});
	useEffect(() => {
		setPool(poolInfo);
		console.log("pool", pool);
		console.log("pool.token", pool.token);
		console.log("pool.weight", pool.weight);
	}, []);

	const { data: totalSupply } = useReadContract({
		address: cdpStakingAddress,
		abi: cdpStakingAbi,
		functionName: "totalSupply",
		account: address,
	});
	console.log("totalSupply", totalSupply);

	return (
		<div>
			<Heading>Pools</Heading>
			a-{Number(poolLength)}-z a-{Number(totalSupply)}-z
			{/* {poolTab.map((pool) => (
				<div>pool: {pool.token}</div>
			))} */}
		</div>
	);
};

export default Staking;
