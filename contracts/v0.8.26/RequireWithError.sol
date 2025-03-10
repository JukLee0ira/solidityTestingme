// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RequireWithError {
    //Testing a new overload require(bool, Error) that allows usage of require functions with custom errors. This feature is available in the via-ir pipeline only.
    // self-defined error
    error InvalidValue(uint256 value);
    error UnauthorizedAccess(address caller);
    error InvalidRange(uint256 min, uint256 max, uint256 actual);
    
    uint256 public value;
    uint256 public minValue = 10;
    uint256 public maxValue = 1000;
    
    function setValue(uint256 _value) external {
        // use new require syntax, through via-ir pipeline
        require(_value > 0, InvalidValue(_value));
        
        // 使用传统的字符串消息
        require(_value >= minValue, "Value is too small");
        
        // 使用多参数的自定义错误
        require(
            _value <= maxValue, 
            InvalidRange(minValue, maxValue, _value)
        );
        
        // 仅使用条件判断的require
        require(msg.sender != address(0));
        
        value = _value;
    }
    
    function restrictedFunction() external view {
        // another using self-defined error
        require(
            msg.sender == address(this), 
            UnauthorizedAccess(msg.sender)
        );
    }
} 