import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";TODO: need to rm
import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";

describe("BlobFeatureTest", function () {
  // 部署合约的fixture
  async function deployBlobFeatureTestFixture() {
    const BlobFeatureTest = await ethers.getContractFactory(
      "/v0.8.24/BlobFeatureTest"
    );
    const blobFeatureTest = await BlobFeatureTest.deploy();
    return { blobFeatureTest };
  }

  describe("基础功能测试", function () {
    it("应该能够获取chainId", async function () {
      const { blobFeatureTest } = await loadFixture(
        deployBlobFeatureTestFixture
      );
      const chainId = await blobFeatureTest.testconnect();
      expect(chainId).to.not.equal(0);
      // 如果在Hardhat网络上测试，chainId应该是31337 TODO:need to rm
      expect(chainId).to.equal(31337);
    });

    it("应该能够获取blob基础费用", async function () {
      const { blobFeatureTest } = await loadFixture(
        deployBlobFeatureTestFixture
      );
      const blobBaseFee = await blobFeatureTest.testBlobBaseFee();
      // blob基础费用应该是一个非负数
      expect(blobBaseFee).to.be.gte(0);
    });

    it("应该能够获取blob哈希", async function () {
      const { blobFeatureTest } = await loadFixture(
        deployBlobFeatureTestFixture
      );
      // 测试索引0的blob哈希
      const blobHash = await blobFeatureTest.testBlobHash(0);
      // blob哈希应该是一个32字节的值
      expect(blobHash).to.match(/^0x[0-9a-f]{64}$/i);
    });

    it("当索引无效时应该回滚blob哈希获取", async function () {
      const { blobFeatureTest } = await loadFixture(
        deployBlobFeatureTestFixture
      );
      // 测试一个很大的索引值，应该会失败
      await expect(
        blobFeatureTest.testBlobHash(999999999)
      ).to.be.revertedWithoutReason();
    });
  });
});
