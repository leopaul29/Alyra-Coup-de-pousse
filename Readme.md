# Projet final Alyra - Coup de pousse

## Team

- Elena ASSEMAN (defi)
- Nicolas BENIT (defi)
- Léo-Paul MARTIN (dev)
- Thibaut BAUDRY (dev)

## Video

Lien vidéo (durée 3 min 07 sec, vous pouvez la regarder en 1.2x, cela vous fera donc 2 min 35sec :
https://www.loom.com/share/0612121444484927a82d6c9ebe39d3eb

Lien Déploiement: https://alyra-coup-de-pousse.vercel.app/

Déployé sur sépolia :
CoupDePousseToken : 0x9904AE233cA9c6749369d80627CFf36b9F621b67
CDPStaking : 0xCE223117476cca4e04E8AA8822c69E60e60Dd5Aa
cdpProject : 0x0b2A7222932729dCb4E0DFD1936791FCF3d2f5BB

## Détails

- backend scripts
  - feed wallet
  - mine blocks
  - monitor pools and projects
- backend script dans le package.json pour run les commandes hardhat (compile, test, coverage, node, deploy)
- backend test utilisation de fixture et loadFixture partout
- frontend
  - variable d'environnement pour update les variables importante depuis vercel sans update le code
    - contract address
    - numero de block de deploiement (debut d'ecoute des events)
    - projectId de walletConnect
    - rpc url Sepolia

## Stack technique

Voici la liste de la stack utilisée pour la réalisation du projet

- Chakra-ui
- Next.JS
- RainbowKit v2
- Viem
- Wagmi
- Hardhat
- ethers
