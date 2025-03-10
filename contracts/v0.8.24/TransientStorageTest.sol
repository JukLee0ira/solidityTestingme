// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TransientStorageTest {

    // Testing `tstore()`: Yul builtin, store a value in memory.
    function testTstore() public returns (uint256) {
        assembly {
            tstore(0, 0x1234)
            //read value in same transaction
            let value := tload(0)
            //save in store
            mstore(0x40, value)
            return(0x40, 32)
        }
    }
    // Testing `tload()`: Yul builtin, load a value from memory.
     function testTload() public view returns (uint256) {
        uint256 storedValue;
        assembly {
            storedValue := tload(0)
        }
        return storedValue;
    }

} 
