pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

contract SolnSquareVerifier is ERC721Mintable {

    // solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address addr;
    }

    // store unique solutions submitted
    mapping(bytes32 => Solution) private solutionsSubmitted;

    // event to emit when a solution is added
    event SolutionAdded(address addr, uint256 tokenId);

    SquareVerifier public verifier;

    constructor (address verifierAddress) public {
        verifier = SquareVerifier(verifierAddress);
    }

    // add the solutions to the array and emit the event
    function addSolution(uint256 index, address account, bytes32 key) internal {
        Solution memory solution = Solution({tokenId : index, addr : account});
        solutionsSubmitted[key] = solution;

        emit SolutionAdded(account, index);
    }

    // mint new NFT only after the solution has been verified
    function mintVerified
    (
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
    public
    {
        //hash the solution to get the key
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        // make sure the solution is unique (has not been used before)
        require(solutionsSubmitted[key].addr == address(0), "Solution already used");

        // Verify the solution using SquareVerifier
        require(verifier.verifyTx(a, b, c, input), "Unable to verify: Wrong proof");

        addSolution(tokenId, to, key);

        // make sure you handle metadata as well as tokenSupply
        super.mint(to, tokenId);
    }

}


























