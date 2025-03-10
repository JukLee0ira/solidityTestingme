this repository is used to store test code, test the features of different versions of the solidity language features on xdc.

### Testing features of v0.8.24

- [x] Testing `block.blobbasefee`: global function, retrieve the blob base fee of the current block.

* [x] Testing `blobhash(uint)`: global function, retrieving versioned hashes of blobs, akin to the homonymous Yul builtin.
* [x] Testing `blobbasefee()`: Yul builtin, retrieve the blob base fee of the current block.
* [x] Testing `blobhash()`: Yul builtin, retrieve the versioned hashes of blobs associated with the transaction.
* [x] Testing `mcopy()`: Yul builtin, cheaply copy data between memory areas.
* [x] Testing `tload()`and `tstore()`: Yul builtin, load and store data from transient storage.

### Testing features of v0.8.25

- [x] Code Generator: Use `MCOPY` instead of `MLOAD/MSTORE` loop when copying byte arrays.
- [x] EVM: Set default EVM version to `cancun`.
- [x] Yul Analyzer: Emit transient storage warning only for the first occurrence of `tstore`.

### Testing features of v0.8.26

- [x] Introduce a new overload `require(bool, Error)` that allows usage of `require` functions with custom errors. This feature is available in the via-ir pipeline only.

### Testing features of v0.8.27

- [x] Make require(bool, Error) available when using the legacy pipeline.
- [x] Yul: Parsing rules for source location comments have been relaxed: Whitespace between the location components as well as single-quoted code snippets are now allowed.

### Testing features of v0.8.28

- [x] if support transient storage state variables of value types.
