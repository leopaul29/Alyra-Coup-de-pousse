"use client";
import Staking from "@/components/Staking";
import NotConnected from "@/components/layout/NotConnected";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Staking /> : <NotConnected />}</>;
}
