"use client";
import PoolList from "@/components/pools/PoolList";
import NotConnected from "@/components/layout/NotConnected";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <PoolList /> : <NotConnected />}</>;
}
