// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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