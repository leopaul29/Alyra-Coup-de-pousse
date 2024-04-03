"use client";
import Adherent from "@/components/adherent/Adherent";
import NotConnected from "@/components/layout/NotConnected";

import { useAccount } from "wagmi";

export default function Page({ params }) {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Adherent params={params} /> : <NotConnected />}</>;
}
