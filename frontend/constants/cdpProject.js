import { getAddress } from "viem";
export const cdpProjectAddress =
	getAddress(process.env.NEXT_PUBLIC_CDPPROJECT_CONTRACT_ADDRESS) || undefined;
export const cdpProjectAbi = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_adherent",
				type: "address",
			},
		],
		name: "addAdherent",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_title",
				type: "string",
			},
		],
		name: "createProject",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256",
			},
		],
		name: "projectAdherents",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "projectInfo",
		outputs: [
			{
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "projectLength",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
