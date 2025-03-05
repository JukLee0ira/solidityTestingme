// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BlobFeatureTest {
    // Test block.blobbasefee
    function testBlobBaseFee() public view returns (uint256) {
        return block.blobbasefee;
    }


    // Test blobhash(uint)
    function testBlobHash(uint256 index) public view returns (bytes32) {
        return blobhash(index);
    }
}

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

contract BytesConcatTest {
    // Test bytes.concat
    function testBytesConcat(bytes memory a, bytes memory b) public pure returns (bytes memory) {
        return bytes.concat(a, b);
    }
}

contract FunctionPointerTest {
    function foo() public pure returns (uint256) {
        return 1;
    }
    
    function bar() public pure returns (uint256) {
        return 2;
    }
    
    // Test function pointer comparison
    function testFunctionPointer() public pure returns (bool) {
        function() internal pure returns (uint256) f1 = foo;
        function() internal pure returns (uint256) f2 = bar;
        return f1 == f2;
    }
}