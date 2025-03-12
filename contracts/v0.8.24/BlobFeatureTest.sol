// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BlobFeatureTest {
    
    // Testing `block.blobbasefee`: global function, retrieve the blob base fee of the current block.
    function testBlobBaseFeeSolidity() external view returns (uint256 blobBaseFee) {
        blobBaseFee = block.blobbasefee;
        return blobBaseFee;
    }

    // Testing `blobhash(uint)`: global function, retrieve the blob hash of the current block.
    function testBlobHashSolidity(uint256 index) public view returns (bytes32) {
       return blobhash(index);
    }

    // Testing `blobbasefee()`: Yul builtin, retrieve the blob base fee of the current block.
    function testBlobBaseFeeYul() public view returns (uint256) {
        uint256 blobBaseFee;
        assembly {
            blobBaseFee  := blobbasefee()
        }
        return blobBaseFee ;
    }

    // Testing `blobhash()`: Yul builtin, retrieve the versioned hashes of blobs associated with the transaction.
    function testBlobHashYul() public view returns (bytes32) {
        bytes32 hash;
        assembly {
            hash := blobhash(0)
        }
        return hash;
    }
} 