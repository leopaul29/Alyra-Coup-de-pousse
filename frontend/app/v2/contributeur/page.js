"use client";
import Contributeur from "@/components/contributeur/Contributeur";
import NotConnected from "@/components/layout/NotConnected";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Contributeur /> : <NotConnected />}</>;
}
