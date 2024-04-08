"use client";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { hardhat } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { sepolia } from "@/utils/sepolia";

const WALLETCONNECT_PROJECTID =
	process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID || "";

const config = getDefaultConfig({
	appName: "Alyra-Projet-Final",
	projectId: WALLETCONNECT_PROJECTID,
	chains: [sepolia],
	ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowKitAndChakraProvider = ({ children }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<ChakraProvider>{children}</ChakraProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default RainbowKitAndChakraProvider;
