"use client";
import Header from "./Header";
import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
	return (
		<Flex direction="column" minH="100vh" justifyContent="center">
			<Header />
			<Flex
				grow="1"
				p="2rem"
				direction="column"
				m="auto"
				mx="100px"
				minW="100vh"
			>
				{children}
			</Flex>
			<Footer />
		</Flex>
	);
};

export default Layout;
