// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract ByteArrayCopyTest {
    // Testing Copy with Loop
    function copyWithLoop(bytes memory source) public pure returns (bytes memory) {
        bytes memory destination = new bytes(source.length);
        assembly {
            let len := mload(source)
            let src := add(source, 0x20)
            let dest := add(destination, 0x20)
            for { let i := 0 } lt(i, len) { i := add(i, 0x20) } {
                mstore(add(dest, i), mload(add(src, i)))
            }
        }
        return destination;
    }

    // Testing Copy with MCOPY
    function copyWithMCOPY(bytes memory source) public pure returns (bytes memory) {
        bytes memory destination = new bytes(source.length);
        assembly {
            let len := mload(source)
            let src := add(source, 0x20)
            let dest := add(destination, 0x20)
            mcopy(dest, src, len)
        }
        return destination;
    }
}