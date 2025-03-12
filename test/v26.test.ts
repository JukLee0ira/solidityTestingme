import { expect } from "chai";
import { ethers } from "hardhat";
import { RequireWithError } from "../typechain-types";

describe("v0.8.26_RequireWithError", function () {
  let requireWithError: RequireWithError;

  before(async function () {
    const RequireWithError = await ethers.getContractFactory(
      "RequireWithError"
    );
    requireWithError = await RequireWithError.deploy();
    await requireWithError.deployed();
    console.log("requireWithError deployed to:", requireWithError.address);
  });

  it("it should success when input value > 10", async function () {
    const tx = await requireWithError.testCustomError(100);
    await tx.wait();

    const value = await requireWithError.value();
    expect(value.toNumber()).to.equal(100);
  });

  it("it should revert a custom error when input value <= 10", function () {
    expect(requireWithError.testCustomError(0))
      .to.be.revertedWithCustomError(requireWithError, "InvalidValue")
      .withArgs(0);
  });

  it("it should revert a traditional string when input value <= 10", function () {
    expect(requireWithError.testStringMessage(5)).to.be.revertedWith(
      "Value is too small"
    );
  });

  it("it should revert with InvalidRange errormulti-parameter self-defined error when input value > 1000", function () {
    expect(requireWithError.testMultiParamError(1001))
      .to.be.revertedWithCustomError(requireWithError, "InvalidRange")
      .withArgs(0, 1, 1001);
  });

  it("it should revert  when input value <= 10", function () {
    expect(requireWithError.testSimpleRequire(5, { gasLimit: 100000 })).to.be
      .revertedWithoutReason;
  });
});
