"use client";
import NotConnected from "@/components/layout/NotConnected";
import Project from "@/components/project/Project";

import { useAccount } from "wagmi";

export default function Page({ params }) {
	return <Project params={params} />;
}
