var SquareVerifier = artifacts.require('SquareVerifier');

contract('SquareVerifier', accounts => {

  beforeEach(async function () {
    this.contract = await SquareVerifier.deployed();
  })

  it('Test verification with correct proof', async function () {
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

    let result = await this.contract.verifyTx.call(a, b, c, input);
    assert.equal(result, true, "Verification should pass, proof is incorrect");
  })

  it('Test verification with incorrect proof', async function () {
    let a = [
      "0x107b65f52715e31ee4e29b8fe25063d96d2008604c944497180bf846816dc1d2", // let's change only one value of the proof
      "0x032bf30e1c8ad03cbde7bac915d492cc8803f05f2c8dcc2236fd0b19e40632d3"
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

    let result = await this.contract.verifyTx.call(a, b, c, input);
    assert.equal(result, false, "Verification should have failed!");
  })
})
