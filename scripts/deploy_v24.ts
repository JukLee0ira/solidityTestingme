import { ethers } from "hardhat";

async function main() {
  const BlobFeatureTest = await ethers.getContractFactory(
    "contracts/v0.8.24/BlobFeatureTest.sol"
  );

  const blobFeatureTest = await BlobFeatureTest.deploy();
  await blobFeatureTest.deployed();

  console.log(`BlobFeatureTest deployed to ${blobFeatureTest.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
