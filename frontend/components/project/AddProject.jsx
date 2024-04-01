import { Heading, Input, Textarea, Button, Flex } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
const AddProject = () => {
	return (
		<>
			<Heading mb={4}>AddProject</Heading>
			<Flex direction="column" maxW="600px" gap="12px">
				<FormControl isRequired>
					<FormLabel>Project Name</FormLabel>
					<Input type="text" placeholder="My new project" />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>SIRET</FormLabel>
					<Input type="text" placeholder="SIRET number" />
					<FormHelperText>check siret format.</FormHelperText>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Wallet Address</FormLabel>
					<Input type="text" placeholder="0x..." />
				</FormControl>
				<FormControl>
					<FormLabel>Nb block to last</FormLabel>
					<NumberInput max={200000} min={200}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<FormHelperText>min:200 - max:2 000 000.</FormHelperText>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>List of address for each adherent</FormLabel>
					<FormHelperText>Separate addres with coma.</FormHelperText>
					<Textarea placeholder="0x...,0x...,0x..." />
				</FormControl>
				<Button isLoading={false} loadingText="Submitting">
					Submit
				</Button>
			</Flex>
		</>
	);
};

export default AddProject;
