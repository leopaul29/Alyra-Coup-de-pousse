"use client";
import NotConnected from "@/components/layout/NotConnected";
import Profil from "@/components/Profil";

import { useAccount } from "wagmi";

export default function Page() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Profil /> : <NotConnected />}</>;
}
