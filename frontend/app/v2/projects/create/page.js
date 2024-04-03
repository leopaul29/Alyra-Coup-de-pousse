"use client";
import NotConnected from "@/components/layout/NotConnected";
import AddProject from "@/components/project/AddProject";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <AddProject /> : <NotConnected />}</>;
}
