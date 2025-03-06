import { ethers } from "hardhat";

async function main() {
  // 部署BlobFeatureTest
  const BlobFeatureTest = await ethers.getContractFactory("BlobFeatureTest");
  const blobFeatureTest = await BlobFeatureTest.deploy();
  await blobFeatureTest.deployed();
  console.log(`BlobFeatureTest deployed to ${blobFeatureTest.address}`);

  // 部署BytesConcatTest
  const BytesConcatTest = await ethers.getContractFactory(
    "contracts/v0.8.24/BytesConcatTest"
  );
  const bytesConcatTest = await BytesConcatTest.deploy();
  await bytesConcatTest.deployed();
  console.log(`BytesConcatTest deployed to ${bytesConcatTest.address}`);

  // 部署FunctionPointerTest
  const FunctionPointerTest = await ethers.getContractFactory(
    "contracts/v0.8.24/FunctionPointerTest"
  );
  const functionPointerTest = await FunctionPointerTest.deploy();
  await functionPointerTest.deployed();
  console.log(`FunctionPointerTest deployed to ${functionPointerTest.address}`);

  // 部署YulFeatureTest
  const YulFeatureTest = await ethers.getContractFactory(
    "contracts/v0.8.24/YulFeatureTest"
  );
  const yulFeatureTest = await YulFeatureTest.deploy();
  await yulFeatureTest.deployed();
  console.log(`YulFeatureTest deployed to ${yulFeatureTest.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
