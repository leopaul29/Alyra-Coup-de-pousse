import { Heading, Input, Textarea, Button, Checkbox } from "@chakra-ui/react";
import React from "react";

const UpdateProject = () => {
	// en faire une modal sur la page project list
	return (
		<>
			<Heading>UpdateProject</Heading>
			<div>
				<Input placeholder="SIRET" />
				<Input placeholder="Address" />
				<Input placeholder="Project Name" />
				<Checkbox>Close project contributions</Checkbox>
				<Textarea placeholder="List of address for each adherent" />
				<Button isLoading={false} loadingText="Submitting">
					Submit
				</Button>
			</div>
		</>
	);
};

export default UpdateProject;
