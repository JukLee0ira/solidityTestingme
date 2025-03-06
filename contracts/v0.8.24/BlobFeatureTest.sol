// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BlobFeatureTest {
	function testconnect() public view returns (uint256) {
		return block.chainid;
	}
    // Test block.blobbasefee
    function testBlobBaseFee() public view returns (uint256) {
        return block.blobbasefee;
    }

    // Test blobhash(uint)
    function testBlobHash(uint index) public view returns (bytes32) {
        return blobhash(index);
    }
} 