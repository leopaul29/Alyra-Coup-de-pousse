"use client";
import Association from "@/components/Association";
import NotConnected from "@/components/layout/NotConnected";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Association /> : <NotConnected />}</>;
}
