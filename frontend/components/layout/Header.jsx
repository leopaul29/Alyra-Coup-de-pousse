"use client";
import { Flex, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
	return (
		<Flex justifyContent="space-between" alignItems="center" p="2rem">
			<Link href="/">Logo</Link>
			<Link href="/staking">Staking</Link>
			<Link href="/v2/contributeur">Contributeur</Link>
			<Link href="/v2/association">Association</Link>
			<Link href="/v2/adherent">Adherent</Link>
			<Link href="/v2/projects">Project List</Link>
			<Link href="/v2/profil">Profil</Link>
			<ConnectButton showBalance={false} />
		</Flex>
	);
};

export default Header;
