var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];
  const account_three = accounts[2];

  describe('match erc721 spec', function () {
    beforeEach(async function () {
      this.contract = await ERC721Mintable.new({from: account_one});

      // mint multiple tokens
      await this.contract.mint(account_two, 1, {from: account_one});
      await this.contract.mint(account_three, 2, {from: account_one});
    })

    it('should return total supply', async function () {
      let total = await this.contract.totalSupply.call();
      assert.equal(total.toNumber(), 2);
    })

    it('should get token balance', async function () {
      let balance = await this.contract.balanceOf.call(account_two);
      assert.equal(balance.toNumber(), 1, 'Wrong token balance for account_two')
    })

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it('should return token uri', async function () {
      let tokenURI = await this.contract.tokenURI.call(1, {from: account_one});
      assert.equal(
        tokenURI,
        'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1',
      )
    })

    it('should transfer token from one owner to another', async function () {
      await this.contract.transferOwnership(account_three, {from: account_one});

      let isOwner = await this.contract.isOwner({from: account_three});
      assert.equal(isOwner, true, "Owner should be account three");
    })
  });

  describe('have ownership properties', function () {
    beforeEach(async function () {
      this.contract = await ERC721Mintable.new({from: account_one});
    })

    it('should fail when minting when address is not contract owner', async function () {

      let failed = false;
      try {

        await this.contract.mint(account_two, 1, {from: account_three});
      } catch (e) {
        failed = true;
      }

      assert.equal(failed, true, "Minting address is NOT correct")
    })

    it('should return contract owner', async function () {
      let isOwner = await this.contract.isOwner({from: account_one});
      assert.equal(isOwner, true, "Owner should be account one");
    })
  });
})