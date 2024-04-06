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
			{
				internalType: "uint256",
				name: "_minAmountToRaise",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_endBlockNumber",
				type: "uint256",
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
		name: "finishProject",
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
				name: "_pid",
				type: "uint256",
			},
		],
		name: "projectAmountRaised",
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
				internalType: "uint256",
				name: "minAmountToRaise",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amountRaised",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "endBlockNumber",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "finished",
				type: "bool",
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
		name: "removeAdherent",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
