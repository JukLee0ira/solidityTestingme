// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract YulFeatureTest {
    // 测试 blobbasefee()
    function testBlobBaseFee() public view returns (uint256) {
        uint256 blobFee;
        assembly {
            blobFee := blobbasefee()
        }
        return blobFee;
    }

    // 测试 blobhash()
    function testBlobHash() public view returns (bytes32) {
        bytes32 hash;
        assembly {
            hash := blobhash(0)
        }
        return hash;
    }

    // 测试 mcopy()
    function testMcopy() public pure returns (bytes32) {
        bytes32 copiedData;
        assembly {
            let ptr := mload(0x40)
            mcopy(ptr, 0x00, 32)
            copiedData := mload(ptr)
        }
        return copiedData;
    }

    // 测试 tload() 和 tstore()
    function testTstore() public {
        assembly {
            tstore(0, 0x1234)
        }
    }

     function testTload() public view returns (uint256) {
        uint256 storedValue;
        assembly {
            storedValue := tload(0)
        }
        return storedValue;
    }
} 