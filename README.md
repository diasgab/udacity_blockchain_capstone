# Udacity Blockchain Capstone

The capstone will build upon the knowledge gained in the course in order to build a decentralized housing product.
This project creates ERC721 tokens for real estate titles and uses ZkSNARKs to verify before minting the token.
The minted tokens are then put to sale on opensea.

## Version Info

Truffle v5.3.7 (core: 5.3.7)
Solidity - 0.5.15 (solc-js)
Node v12.16.1
Web3.js v1.3.6 (used in truffle)
Web3.js v1.0.0-beta.34 (used to run mint script)
Ganache CLI v6.12.2 (ganache-core: 2.13.2)

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle) and zokrates generated contract and proofs.

To install, download or clone the repo, then:

`npm install`
`cd eth-contracts`
`truffle compile`

### Tests

Start Ganache CLI in the terminal using

`ganache-cli `

To run truffle tests:

In a second terminal window run the following commands

`cd eth-contracts`
`truffle test`

(this will run the tests in TestSquareVerifier.js, TestSolnSquareVerifier.js and TestERC721Mintable.js)


### Rinkeby Deployment info

To deploy to rinkeby:
* Make a copy of the .env.example file into .env and fill in the settings

In a terminal window run :

`truffle migrate --network rinkeby`
Then mint the tokens:
`node scripts/mint.js`

OpenSea Link : https://testnets.opensea.io/collection/villa-lobos
contract address:    0xe68561629676984110ab99C91057D56625d808eE
account address:     0xb8aecDC1236a5eE7087bd3A7c7b8fC89E571bbAa

Minted transactions:
Minted nft. Transaction: 0x3748411625372e64cc45f6cc25fb3077772bfc51c4cdfbfa4c8c4e5a16afb518
Minted nft. Transaction: 0x0cb709862b7b3e73181512b6c589ec8c486032f31fda16efa71138d8b5aeffd8
Minted nft. Transaction: 0x6295c03d754a9ce68ff77b36d2f0847c004bbcc8cf084fe4f8cccddd432c08e2
Minted nft. Transaction: 0xbd974c8318f91ec9978070fb0bcd33d83835b7fab025773f8e4a737a379e1c2e
Minted nft. Transaction: 0xe6064b32a7bc328dd9f81dbe5613d61cb9b8bc45d37802bfb27666828e5f76f3
Minted nft. Transaction: 0xa545e1f3d6ff122c38a4a41a71a3a86bcfd0631085a5972b410718ab4dfcbe9f
Minted nft. Transaction: 0xb47b475cc37d7c087664ce75edcbf1bf9d21350881803ddb48fdb9b039882b0e
Minted nft. Transaction: 0xdb62c9417ace21a29af69b7d3c174e4141fd2e3b85acfae4b2f00585e54b0e95
Minted nft. Transaction: 0x227724b0ba040cbd0e98f6fc6581a224e5fa3c88a8d0cf885d6ade924376f315
Minted nft. Transaction: 0x4e811244279aa9b26d91a237dbf34e62090c7195e1344992e2c3360b473bd098

The tokens can then be put up for sale on OpenSea Marketplace.

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)


### References

* [AJMachado's repository](https://github.com/ajmachado/Capstone-Real-Estate-Sale)
* [Udacity boilerplate](https://github.com/udacity/Blockchain-Capstone)
