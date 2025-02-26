### Tesing features of v0.8.24

- [] Testing `block.blobbasefee`: global function, retrieve the blob base fee of the current block.
- [] Testing `blobhash(uint)`: global function, retrieving versioned hashes of blobs, akin to the homonymous Yul builtin.
- [] Testing `blobbasefee()`: Yul builtin, retrieve the blob base fee of the current block.
- [] Testing `blobhash()`: Yul builtin, retrieve the versioned hashes of blobs associated with the transaction.
- [] Testing `mcopy()`: Yul builtin, cheaply copy data between memory areas.
- [] Testing `tload()`and `tstore()`: Yul builtin, load and store data from transient storage.
  <!-- - [] Testing `tstore()`: Yul builtin, store data to transient storage. -->
    <!-- Introduce global `block.blobbasefee` for retrieving the blob base fee of the current block.
    引入全局 block.blobbasefee 用于检索当前区块的 blob 基础费用。 -->
  <!-- - Introduce global function `blobhash(uint)` for retrieving versioned hashes of blobs, akin to the homonymous Yul builtin.   -->
     <!-- 引入全局函数 Blobhash（UINT），以检索类似于同义词 YUL 内置的 Blobs 版本的 HASHES。 -->
  <!-- - Yul: Introduce builtin `blobbasefee()` for retrieving the blob base fee of the current block.
     YUL：引入内置 blobbasefee（）以检索当前块的斑点基本费用。 -->
  <!-- - Yul: Introduce builtin `blobhash()` for retrieving versioned hashes of blobs associated with the transaction.
     YUL：引入内置 blobhash（）用于检索与交易相关的斑点的版本的哈希。 -->
  <!-- - Yul: Introduce builtin `mcopy()` for cheaply copying data between memory areas.
     YUL：引入内置 McOpy（），以便在内存区域之间廉价复制数据。 -->
  <!-- - Yul: Introduce builtins `tload()` and `tstore()` for transient storage access.
     YUL：介绍内置 tload（）和 tstore（），以供瞬态存储访问。 -->

#### Compiler Features   编译器功能

- [] if support the EVM version "Cancun".
- [] if support the `bytes.concat` except when string literals are passed as arguments.
- [] Test `--asm-json` output option.
- [] Testing warning feature when comparison of internal function pointers produce unexpected results.
<!-- - EVM: Support for the EVM Version "Cancun".  
   EVM：支持 EVM 版本“ Cancun”。

* SMTChecker: Support `bytes.concat` except when string literals are passed as arguments.  
   smtchecker：支持字节.concat ，除非将字符串文字作为参数传递。 -->
  <!-- * Standard JSON Interface: Add experimental support to import EVM assembly in the format used by `--asm-json`.
     标准 JSON 接口：以-ASM-JSON 使用的格式为导入 EVM 组装添加实验支持。 -->
  <!-- * TypeChecker: Comparison of internal function pointers now yields a warning, as it can produce unexpected results with the legacy pipeline enabled.
     Typechecker：内部功能指针的比较现在会发出警告，因为它可以通过启用旧管道产生意外的结果。 -->

### 测试 v0.8.25 版本

#### Compiler Features 编译器功能

- Code Generator: Use `MCOPY` instead of `MLOAD/MSTORE` loop when copying byte arrays.
  代码生成器：复制字节数组时使用 `MCOPY` 代替 `MLOAD/MSTORE` 循环。
- EVM: Set default EVM version to `cancun`.
  EVM：将默认的 EVM 版本设置为坎昆。
- Yul Analyzer: Emit transient storage warning only for the first occurrence of `tstore`.
  YUL 分析仪：仅针对 `tstore` 首次出现瞬态存储警告。

### 测试 v0.8.26 版本

Custom errors support in `require`
自定义错误支持需要
Custom errors in Solidity provide a convenient and gas-efficient way to explain to the user why an operation failed. Solidity 0.8.26 introduces a highly anticipated feature that enables the usage of errors with `require` function.
坚固性的自定义错误提供了一种方便且高效的方式，可以向用户解释操作失败的原因。 Solidity 0.8.26 引入了一个备受期待的功能，该功能可以使错误用法使用。

The `require` function in pre 0.8.26 versions provided two overloads:
PRE 0.8.26 版本中的 `require` 函数提供了两个过载：

`require(bool)` which will revert without any data (not even an error selector).
需要（bool） ，它将恢复没有任何数据（甚至是错误选择器）。
`require(bool, string)` which will revert with `Error(string)`.
需要（bool，string） ，它将以 `Error(string)` 恢复。
In this release we are introducing a new overload to support custom errors:
在此版本中，我们正在引入一个新的过载，以支持自定义错误：

`require(bool, error)` which will revert with the custom, user supplied error provided as the second argument.
需要（bool，错误） ，将用自定义，用户提供的错误作为第二个参数恢复。
Let's look at an example to understand the usage of the require function with custom errors:
让我们看一个示例，以了解使用自定义错误的需求函数的用法：

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.26;

/// Insufficient balance for transfer. Needed `required` but only
/// `available` available.
/// @param available balance available.
/// @param required requested amount to transfer.
error InsufficientBalance(uint256 available, uint256 required);

// This will only compile via IR
contract TestToken {
mapping(address => uint) balance;
function transferWithRequireError(address to, uint256 amount) public {
require(
balance[msg.sender] >= amount,
InsufficientBalance(balance[msg.sender], amount)
);
balance[msg.sender] -= amount;
balance[to] += amount;
}
// ...
}
```

Note that, just like in the previously available overloads of require, arguments are evaluated unconditionally, so take special care to make sure that they are not expressions with unexpected side-effects. For example, in `require(condition, CustomError(f()))` and `require(condition, f())`, the call to function `f()` will always be executed, regardless of whether the supplied condition is true or false.
请注意，就像在先前可用的要求中一样，参数是无条件评估的，因此请特别注意确保它们不是具有意外副作用的表达式。例如，在 `require(condition, CustomError(f()))` 和 `require(condition, f())` 中，无论提供的条件是 True 还是 Fals，函数 `f()` 的调用将始终执行。

Note that currently, using custom errors with `require` is only supported by the IR pipeline, i.e. compilation via Yul. For the legacy pipeline, please use the `if (!condition) revert CustomError();` pattern instead.
请注意，当前，使用 `require` 的自定义错误仅由红外管道（IR Pipeline）支持，即通过 YUL 进行汇编。对于传统管道，请使用 `if (!condition) revert CustomError();` 模式。

#### Language Features 语言特征

Introduce a new overload `require(bool, Error)` that allows usage of `require` functions with custom errors. This feature is available in the via-ir pipeline only.
引入一个新的过载 `require(bool, Error)` ，该过载允许使用自定义错误的 `require` 功能。此功能仅在 Via-IR 管道中可用。

#### Compiler Features 编译器功能

SMTChecker: Create balance check verification target for CHC engine.
SMTCHECKER：为 CHC 发动机创建余额检查验证目标。
Yul IR Code Generation: Cheaper code for reverting with errors of a small static encoding size.
YUL IR 代码生成：较便宜的代码，用于带有小静态编码大小的错误。
Yul Optimizer: New, faster default optimizer step sequence.
YUL 优化器：新的，更快的默认优化器步骤序列。

### 测试 v0.8.27 版本

https://soliditylang.org/blog/2024/09/04/solidity-0.8.27-release-announcement/

#### Notable Features

Legacy Support for require with Custom Errors
通过自定义错误为需要的遗产支持
Custom errors in Solidity provide a convenient and gas-efficient way to explain to the user why an operation failed. Support for using errors with the require function has been a highly anticipated feature and was finally implemented in the previous release of the compiler. The release introduced a new overload — require(bool, <error>), which reverts with the signature of the error rather than Error(string) used by the other variant.
坚固性的自定义错误提供了一种方便且高效的方式，可以向用户解释操作失败的原因。支持使用错误功能的错误已成为备受期待的功能，并最终在编译器的先前版本中实现了。该版本引入了一个新的过载 -需要（BOOL，<error>） ，该杂物恢复了错误的签名，而不是其他变体使用的错误（字符串） 。

However, using custom errors with require was only supported by the IR pipeline, i.e. compilation via Yul. With the release of 0.8.27, you can use the feature in the legacy pipeline as well.
但是，仅使用 IR Pipeline，即通过 YUL 进行汇编，使用自定义错误。随着 0.8.27 的发布，您也可以在传统管道中使用该功能。

To learn more about the feature and how to use it, check out the example from our previous release announcement.
要了解有关该功能以及如何使用该功能的更多信息，请查看我们以前的发布公告中的示例。

#### Language Features 语言特征

Accept declarations of state variables with transient data location (parser support only, no code generation yet).
接受具有瞬态数据位置的状态变量声明（仅解析器支持，尚无代码生成）。
Make require(bool, Error) available when using the legacy pipeline.
使用传统管道时，可用（布尔，错误）可用。
Yul: Parsing rules for source location comments have been relaxed: Whitespace between the location components as well as single-quoted code snippets are now allowed.
YUL：源位置评论的解析规则已放松：现在允许位置组件之间的空格以及单引号的代码片段。

#### Compiler Features 编译器功能

Commandline Interface: Add --transient-storage-layout output.
命令行接口：add - 传输存储 - layout 输出。
Commandline Interface: Allow the use of --asm-json output option in assembler mode to export EVM assembly of the contracts in JSON format.
命令行接口：允许在汇编模式下使用-ASM-JSON 输出选项，以 JSON 格式导出合同的 EVM 组装。
Commandline Interface: Do not perform IR optimization when only unoptimized IR is requested.
命令行接口：仅请求未优化的 IR 时，请勿执行 IR 优化。
Constant Optimizer: Uses PUSH0 if supported by the selected evm version.
恒定优化器：如果由选定的 EVM 版本支持，则使用 Push0 。
Error Reporting: Unimplemented features are now properly reported as errors instead of being handled as if they were bugs.
错误报告：现在未完成的功能被正确报告为错误，而不是被处理好像是错误一样。
EVM: Support for the EVM version "Prague".
EVM：支持 EVM 版本“布拉格”。
Peephole Optimizer: PUSH0, when supported, is duplicated explicitly instead of using DUP1.
Peephole Optimizer： Push0 在支持时，将明确复制而不是使用 DUP1 。
Peephole Optimizer: Remove identical code snippets that terminate the control flow if they occur one after another.
窥视孔优化器：删除相同的代码片段，该代码片段终止控制流，如果它们接一个地发生。
SMTChecker: Add CHC engine check for underflow and overflow in unary minus operation.
SMTCHECKER：添加 CHC 发动机检查一单位负操作中的底流量和溢出。
SMTChecker: Replace CVC4 as a possible BMC backend with cvc5.
SMTCHECKER：用 CVC5 替换 CVC4 作为可能的 BMC 后端。
Standard JSON Interface: Add transientStorageLayout output.
标准 JSON 接口：添加 TransientStorageLayout 输出。
Standard JSON Interface: Do not perform IR optimization when only unoptimized IR is requested.
标准 JSON 接口：仅请求未优化的 IR 时，请勿执行 IR 优化。
Yul: Drop the deprecated typed Yul dialect that was only accessible via --yul in the CLI.
YUL：丢弃仅通过 CLI 中的-YUL 访问的弃用的打字 YUL 方言。
Yul: The presence of types in untyped Yul dialects is now a parser error.
YUL：现在的 YUL 方言中存在类型现在是解析器错误。
Yul Optimizer: Caching of optimized IR to speed up optimization of contracts with bytecode dependencies.
YUL 优化器：优化 IR 的缓存以加快具有字节依赖性的合同优化。
Yul Optimizer: The optimizer now treats some previously unrecognized identical literals as identical.
YUL 优化器：优化器现在将一些以前未被认可的相同文字视为相同的。

### 测试 v0.8.28 版本

https://soliditylang.org/blog/2024/05/21/solidity-0.8.26-release-announcement/

#### Notable Features

Custom errors support in require
Custom errors in Solidity provide a convenient and gas-efficient way to explain to the user why an operation failed. Solidity 0.8.26 introduces a highly anticipated feature that enables the usage of errors with require function.

The require function in pre 0.8.26 versions provided two overloads:

require(bool) which will revert without any data (not even an error selector).
require(bool, string) which will revert with Error(string).
In this release we are introducing a new overload to support custom errors:

require(bool, error) which will revert with the custom, user supplied error provided as the second argument.
Let's look at an example to understand the usage of the require function with custom errors:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.26;

/// Insufficient balance for transfer. Needed `required` but only
/// `available` available.
/// @param available balance available.
/// @param required requested amount to transfer.
error InsufficientBalance(uint256 available, uint256 required);

// This will only compile via IR
contract TestToken {
    mapping(address => uint) balance;
    function transferWithRequireError(address to, uint256 amount) public {
        require(
            balance[msg.sender] >= amount,
            InsufficientBalance(balance[msg.sender], amount)
        );
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }
    // ...
}
```

Note that, just like in the previously available overloads of `require`, arguments are evaluated unconditionally, so take special care to make sure that they are not expressions with unexpected side-effects. For example, in `require(condition, CustomError(f()))` and `require(condition, f())`, the call to function `f()` will always be executed, regardless of whether the supplied condition is true or false.

Note that currently, using custom errors with require is only supported by the IR pipeline, i.e. compilation via Yul. For the legacy pipeline, please use the if (!condition) revert CustomError(); pattern instead.

Optimization for reverts with errors of small static encoding size
In cases with custom errors of small static encoding size, for example, an error without parameters, or parameters small enough that they could fit into scratch space, developers often resorted to performing such reverts in inline assembly in order to save on deployment gas cost.

As of this release, a check is performed at the code generation stage, and said optimization applied if possible, which means that the following case is now as optimal as the inline assembly variant:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.26;

error ForceFailure();

contract FailureForcer {
    function fail() external pure {
        revert ForceFailure();
    }
}
```

#### Language Features 语言特征

Introduce a new overload `require(bool, Error)` that allows usage of `require` functions with custom errors. This feature is available in the via-ir pipeline only.

#### Compiler Features 编译器功能

SMTChecker: Create balance check verification target for CHC engine.
Yul IR Code Generation: Cheaper code for reverting with errors of a small static encoding size.
Yul Optimizer: New, faster default optimizer step sequence.
