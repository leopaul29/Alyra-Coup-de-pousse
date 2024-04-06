"use client";
import PoolStaking from "@/components/pools/staking/PoolStaking";
import NotConnected from "@/components/layout/NotConnected";

import { useAccount } from "wagmi";

export default function Page({ params }) {
	const { isConnected } = useAccount();

	return (
		<>
			{isConnected ? <PoolStaking poolIndex={params.id} /> : <NotConnected />}
		</>
	);
}
