// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RequireWithError {
    
    // self-defined error
    error InvalidValue(uint256 value);
    error UnauthorizedAccess(address caller);
    error InvalidRange(uint256 min, uint256 max, uint256 actual);
    
    uint256 public value;

    //Testing a new overload require(bool, Error) that allows usage of require functions with custom errors. This feature is available in the via-ir pipeline only.
    function testCustomError(uint256 _value) external {
        require(_value > 10, InvalidValue(_value));
        value = _value;
    }
    
    // test traditional string error message
    function testStringMessage(uint256 _value) external {
        require(_value > 10, "Value is too small");
        value = _value;
    }
    
    // test multi-parameter self-defined error
    function testMultiParamError(uint256 _value) external {
        require(
            _value <= 1000,
            InvalidRange(0, 1, _value)
        );
        value = _value;
    }
    
    // test require with condition only
    function testSimpleRequire(uint256 _value) external {
        require(_value > 10);
        value = _value;
    }
} 