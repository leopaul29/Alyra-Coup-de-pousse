"use client";
import { Flex, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
	return (
		<Flex justifyContent="space-between" alignItems="center" p="2rem">
			<Link href="/">Logo</Link>
			<Link href="/contributeur">Contributeur</Link>
			<Link href="/association">Association</Link>
			<Link href="/adherent">Adherent</Link>
			<Link href="/projects">Project List</Link>
			<Link href="/profil">Profil</Link>
			<ConnectButton showBalance={false} />
		</Flex>
	);
};

export default Header;
