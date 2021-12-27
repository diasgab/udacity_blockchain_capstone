const dotenv = require("dotenv");
dotenv.config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = process.env.RINKEBY_MNEMONIC;
const web3 = require("web3");
const NODE_API_KEY = process.env.RINKEBY_INFURA_PROJECT_ID;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NUM_PIECES = 10;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NFT_CONTRACT_ADDRESS) {
  console.error(
    "Please set a mnemonic, Infura key, owner address and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
];


async function main() {
  const provider = new HDWalletProvider(
    MNEMONIC,
    `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_PROJECT_ID}`
  );

  const web3Instance = new web3(provider);

  const nftContract = new web3Instance.eth.Contract(
    NFT_ABI,
    NFT_CONTRACT_ADDRESS,
    { gasLimit: "1000000" }
  );

  // nfts issued directly to the owner.
  for (let i = 1; i <= NUM_PIECES; i++) {
    const result = await nftContract.methods
      .mint(OWNER_ADDRESS, i)
      .send({ from: OWNER_ADDRESS });

    console.log("Minted nft. Transaction: " + result.transactionHash);
  }
}

main();
