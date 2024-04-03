"use client";
import NotConnected from "@/components/layout/NotConnected";
import ProjectList from "@/components/project/ProjectList";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <ProjectList /> : <NotConnected />}</>;
}
