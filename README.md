this repository is used to store test code, test the features of different versions of the solidity compiler and language features on xdc.

### Testing features of v0.8.24

#### Language Features

- [] Testing `block.blobbasefee`: global function, retrieve the blob base fee of the current block.
- [] Testing `blobhash(uint)`: global function, retrieving versioned hashes of blobs, akin to the homonymous Yul builtin.
- [] Testing `blobbasefee()`: Yul builtin, retrieve the blob base fee of the current block.
- [] Testing `blobhash()`: Yul builtin, retrieve the versioned hashes of blobs associated with the transaction.
- [] Testing `mcopy()`: Yul builtin, cheaply copy data between memory areas.
- [] Testing `tload()`and `tstore()`: Yul builtin, load and store data from transient storage.

#### Compiler Features  

- [] if support the EVM version "Cancun".
- [] if support the `bytes.concat` except when string literals are passed as arguments.
- [] Test `--asm-json` output option.
- [] Testing warning feature when comparison of internal function pointers produce unexpected results.

### Testing features of v0.8.25

### Testing features of v0.8.27

### Testing features of v0.8.28
