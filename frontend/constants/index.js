import { getAddress } from "viem";
export const usdcTokenAddress =
	getAddress(process.env.NEXT_PUBLIC_USDCTOKEN_CONTRACT_ADDRESS) || undefined;
export const cdpTokenAddress =
	getAddress(process.env.NEXT_PUBLIC_CDPTOKEN_CONTRACT_ADDRESS) || undefined;
export const scrtTokenAddress =
	getAddress(process.env.NEXT_PUBLIC_SCRTTOKEN_CONTACT_ADDRESS) || undefined;
