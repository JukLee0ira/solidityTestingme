import { expect } from "chai";
import { ethers } from "hardhat";
import { RequireWithError } from "../typechain-types";

describe("v0.8.26_RequireWithError", function () {
  let requireWithError: RequireWithError;

  beforeEach(async function () {
    const RequireWithError = await ethers.getContractFactory(
      "RequireWithError"
    );
    requireWithError = await RequireWithError.deploy();
    await requireWithError.deployed();
  });

  it("it should success when input value is valid", async function () {
    const tx = await requireWithError.setValue(100);
    await tx.wait();

    const value = await requireWithError.value();
    expect(value.toNumber()).to.equal(100);
  });

  it("when input value is 0, it should revert with InvalidValue error", async function () {
    await expect(requireWithError.setValue(0))
      .to.be.revertedWithCustomError(requireWithError, "InvalidValue")
      .withArgs(0);
  });

  it("when input value is less than minimum, it should revert with string error", async function () {
    await expect(requireWithError.setValue(5)).to.be.revertedWith(
      "Value is too small"
    );
  });

  it("when input value is greater than maximum, it should revert with InvalidRange error", async function () {
    await expect(requireWithError.setValue(1001))
      .to.be.revertedWithCustomError(requireWithError, "InvalidRange")
      .withArgs(10, 1000, 1001);
  });

  it("when calling restricted function, it should revert with UnauthorizedAccess error", async function () {
    const [caller] = await ethers.getSigners();
    await expect(requireWithError.restrictedFunction())
      .to.be.revertedWithCustomError(requireWithError, "UnauthorizedAccess")
      .withArgs(caller.address);
  });
});
