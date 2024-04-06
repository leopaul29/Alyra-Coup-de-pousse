import { Alert, AlertIcon, Flex } from "@chakra-ui/react";

const TransacAlert = ({ hash, isConfirming, isConfirmed, error }) => {
	return (
		<Flex direction="column">
			{hash && (
				<Alert status="info" mt="1rem" mb="1rem">
					<AlertIcon />
					Transaction Hash: {hash}
				</Alert>
			)}
			{isConfirming && (
				<Alert status="info" mt="1rem" mb="1rem">
					<AlertIcon />
					Waiting for confirmation...
				</Alert>
			)}
			{isConfirmed && (
				<Alert status="success" mt="1rem" mb="1rem">
					<AlertIcon />
					Transaction confirmed.
				</Alert>
			)}
			{error && (
				<Alert status="error" mt="1rem" mb="1rem">
					<AlertIcon />
					Error: {error.shortMessage || error.message}
				</Alert>
			)}
		</Flex>
	);
};

export default TransacAlert;
