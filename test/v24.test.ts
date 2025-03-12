import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import { TransientStorageTest } from "../typechain-types";

describe("v0.8.24_BlobFeatureTest", function () {
  let blobFeatureTest: any;

  beforeEach(async function () {
    const BlobFeatureTest = await ethers.getContractFactory("BlobFeatureTest");
    blobFeatureTest = await BlobFeatureTest.deploy();
  });

  it("it should get blob base fee", async function () {
    const blobBaseFee = await blobFeatureTest.testBlobBaseFeeSolidity();
    // blob base fee should be a non-negative number
    expect(blobBaseFee).to.be.gte(0);
  });

  it("it should get blob hash", async function () {
    const blobHash = await blobFeatureTest.testBlobHashSolidity(1);
    // blob hash should be a 32-byte value
    expect(blobHash).to.match(/^0x[0-9a-f]{64}$/i);
  });

  it("it should get blob base fee with yul", async function () {
    const blobBaseFee = await blobFeatureTest.testBlobBaseFeeYul();
    // blob base fee should be a non-negative number
    expect(blobBaseFee).to.be.gte(0);
  });

  it("it should get blob hash with yul", async function () {
    const blobHash = await blobFeatureTest.testBlobHashYul();
    // blob hash should be a 32-byte value
    expect(blobHash).to.match(/^0x[0-9a-f]{64}$/i);
  });
});

describe("v0.8.24_McopyTest", function () {
  let mcopyTest: any;

  before(async function () {
    const McopyTest = await ethers.getContractFactory("McopyTest");
    mcopyTest = await McopyTest.deploy();
    await mcopyTest.deployed();
  });

  it("it should get the copied data 0x50", async function () {
    const copiedData = await mcopyTest.testMcopy();
    // should return a 32-byte value
    const expectedData = ethers.utils.hexZeroPad("0x50", 32);
    expect(copiedData).to.equal(expectedData);
  });
});

describe("v0.8.24_TransientStorageTest", function () {
  let yulFeatureTest: TransientStorageTest;

  beforeEach(async function () {
    const TransientStorageTest = await ethers.getContractFactory(
      "TransientStorageTest"
    );
    yulFeatureTest = await TransientStorageTest.deploy();
    await yulFeatureTest.deployed();
  });

  it("initial value should be 0", async function () {
    const initialStoredValue = await yulFeatureTest.testTload();
    expect(initialStoredValue).to.equal(0);
  });

  it("should store the value 0x1234 in storage slot 0", async function () {
    const storedValue = await yulFeatureTest.callStatic.testTstore();
    expect(storedValue).to.equal(0x1234);
  });
});
