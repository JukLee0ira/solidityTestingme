// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract McopyTest {
    // Testing `mcopy()`: Yul builtin, copy memory from one location to another.
    function testMcopy() public pure returns (bytes32) {
        bytes32 copiedData;
        assembly {
            mstore(0x20, 0x50)  // Store 0x50 at word 1 in memory
            mcopy(0, 0x20, 0x20)  // Copies 0x50 to word 0 in memory
            copiedData := mload(0)    // Returns 32 bytes "0x50"
        }
        return copiedData;
    }
} 