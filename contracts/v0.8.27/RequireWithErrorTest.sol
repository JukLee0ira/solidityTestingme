// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RequireWithErrorTest {
    error InvalidValue(uint256 value);
    error UnauthorizedAccess(address caller);
    //Tesing require(bool, Error) available when using the legacy pipeline
    function testRequireWithError(uint256 value) public pure {
        require(value > 100, InvalidValue(value));
    }
}