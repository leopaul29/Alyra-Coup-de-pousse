"use client";
import Contributeur from "@/components/Contributeur";
import NotConnected from "@/components/NotConnected";

import { useAccount } from "wagmi";

export default function Home() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Contributeur /> : <NotConnected />}</>;
}
