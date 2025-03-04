// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BlobFeatureTest {
    // 测试 block.blobbasefee
    function testBlobBaseFee() public view returns (uint256) {
        return block.blobbasefee;
    }

    // 测试 blobhash(uint)
    function testBlobHash(uint256 index) public view returns (bytes32) {
        return blobhash(index);
    }
}

contract YulFeatureTest {
    // 测试 Yul 内置函数
    function testYulFeatures() public pure returns (bytes32, uint256, bytes32) {
        bytes32 hash;
        uint256 basefee;
        bytes32 copiedData;
        
        assembly {
            // 测试 blobbasefee()
            basefee := blobbasefee()
            
            // 测试 blobhash()
            hash := blobhash(0)
            
            // 测试 mcopy()
            let ptr := mload(0x40)
            mcopy(ptr, 0x00, 32)
            copiedData := mload(ptr)
            
            // 测试 tload() 和 tstore()
            tstore(0, 0x1234)
            let storedValue := tload(0)
        }
        return (hash, basefee, copiedData);
    }
}

contract BytesConcatTest {
    // 测试 bytes.concat
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
    
    // 测试函数指针比较
    function testFunctionPointer() public pure returns (bool) {
        function() internal pure returns (uint256) f1 = foo;
        function() internal pure returns (uint256) f2 = bar;
        return f1 == f2;
    }
}