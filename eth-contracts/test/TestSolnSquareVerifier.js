var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

const getErrorObj = (obj = {}) => {
  const txHash = Object.keys(obj)[0];
  return obj[txHash];
};

contract('SolnSquareVerifier', accounts => {

  const account_one = accounts[0];

  beforeEach(async function () {
    this.contract = await SolnSquareVerifier.deployed();
  })

  it('Test if a new solution can be added', async function () {

    let to = account_one;
    let tokenId = 1;

    let a = [
      "0x03c75a8389d7b8fe9023c7eddf3da0da2f578c08711d438546d3bfaf23c21fd6",
      "0x125305bb3a2adb05410db10e6e650ecb96f4ec02b31cc0a35e6e866a32298c94"
    ];
    let b = [
      [
        "0x18651c18a887a8b09a0bead52f080055fc1bfba8fbd67ddf477a9d5ffb62b3b2",
        "0x10739ccf0a79473d18b52cc7692f7b3998307f8a95b668cb0a65e4386af7a4a5"
      ],
      [
        "0x1db862ef0d48163ceac7a76af5e6c1ee95729d29eaa48a9beb049b14c084e96e",
        "0x22e3650d0205847a762f9547da558be8b0d27c472d43794e0a425524ee78eab1"
      ]
    ];
    let c = [
      "0x1f658c711705fe911fb378177043c2419b729d118c6a98bbb800a03017453806",
      "0x08a8fb0866e0c08e163703091d3a192a8ac11bcdbcbd29a3c00899a929749c59"
    ];
    let input = [
      "0x000000000000000000000000000000000000000000000000000000000001bba1",
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ];

    const result = await this.contract.mintVerified(to, tokenId, a, b, c, input);

    assert.equal(result.logs[0].event, 'SolutionAdded', "We should have added a solution");
    assert.equal(
      result.logs[0].args.addr,
      account_one,
      "wrong property addr in SolutionAdded event"
    );

    assert.equal(
      result.logs[0].args.tokenId,
      1,
      "wrong property tokenId in SolutionAdded event"
    );
  })

  it('Test if an ERC721 token can be minted', async function () {

    let to = account_one;
    let tokenId = 1;

    let a = [
      "0x03c75a8389d7b8fe9023c7eddf3da0da2f578c08711d438546d3bfaf23c21fd6",
      "0x125305bb3a2adb05410db10e6e650ecb96f4ec02b31cc0a35e6e866a32298c94"
    ];
    let b = [
      [
        "0x18651c18a887a8b09a0bead52f080055fc1bfba8fbd67ddf477a9d5ffb62b3b2",
        "0x10739ccf0a79473d18b52cc7692f7b3998307f8a95b668cb0a65e4386af7a4a5"
      ],
      [
        "0x1db862ef0d48163ceac7a76af5e6c1ee95729d29eaa48a9beb049b14c084e96e",
        "0x22e3650d0205847a762f9547da558be8b0d27c472d43794e0a425524ee78eab1"
      ]
    ];
    let c = [
      "0x1f658c711705fe911fb378177043c2419b729d118c6a98bbb800a03017453806",
      "0x08a8fb0866e0c08e163703091d3a192a8ac11bcdbcbd29a3c00899a929749c59"
    ];
    let input = [
      "0x000000000000000000000000000000000000000000000000000000000001bba1",
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ];

    let failed = false;
    try {
      await this.contract.mintVerified(to, tokenId, a, b, c, input);
    } catch (e) {
      const {error, reason} = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, "Solution already used");
      failed = true;
    }

    // given that we used the same solution in the previous test, then if this fails means we were able to add the solution successfully
    assert.equal(failed, true, "No error thrown!");
  })
})
