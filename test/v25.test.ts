import { expect } from "chai";
import { ethers } from "hardhat";

describe("v0.8.25_ByteArrayCopyTest", function () {
  it("should copy byte arrays correctly using loop", async function () {
    const ByteArrayCopyTest = await ethers.getContractFactory(
      "ByteArrayCopyTest"
    );
    const byteArrayCopyTest = await ByteArrayCopyTest.deploy();
    await byteArrayCopyTest.deployed();

    const source = ethers.utils.formatBytes32String("Hello, World!");
    const result = await byteArrayCopyTest.copyWithLoop(source);
    expect(result).to.equal(source);
  });

  it("should copy byte arrays correctly using MCOPY", async function () {
    const ByteArrayCopyTest = await ethers.getContractFactory(
      "ByteArrayCopyTest"
    );
    const byteArrayCopyTest = await ByteArrayCopyTest.deploy();
    await byteArrayCopyTest.deployed();

    const source = ethers.utils.formatBytes32String("Hello, World!");
    const result = await byteArrayCopyTest.copyWithMCOPY(source);
    expect(result).to.equal(source);
  });
});
