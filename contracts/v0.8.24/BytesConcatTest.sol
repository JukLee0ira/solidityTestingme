// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BytesConcatTest {
    // Test bytes.concat
    function testBytesConcat(bytes memory a, bytes memory b) public pure returns (bytes memory) {
        return bytes.concat(a, b);
    }
} 