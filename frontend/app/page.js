"use client";
import Home from "@/components/layout/Home";
import NotConnected from "@/components/layout/NotConnected";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Home /> : <NotConnected />}</>;
}
