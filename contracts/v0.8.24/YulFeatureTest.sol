// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract YulFeatureTest {
    // Test Yul features
    function testYulFeatures() public pure returns (bytes32, uint256, bytes32) {
        bytes32 hash;
        uint256 blobFee;
        bytes32 copiedData;
        
        assembly {
            // Test blobbasefee()
            blobFee := blobbasefee()
            
            // Test blobhash()
            hash := blobhash(0)
            
            // Test mcopy()
            let ptr := mload(0x40)
            mcopy(ptr, 0x00, 32)
            copiedData := mload(ptr)
            
            // Test tload() and tstore()
            tstore(0, 0x1234)
            let storedValue := tload(0)
        }
        return (hash, blobFee, copiedData);
    }
} 