this repository is used to store test code, test the features of different versions of the solidity language features on xdc.

## Test features

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

## Test guide

Before starting, please ensure that your development environment meets the following requirements:

- **Node.js**: version 12.x or higher.
- **npm**: used to manage project dependencies.

### How to test

1. **Clone the repository**

   ```bash
   git clone git@github.com:JukLee0ira/solidityTesting.git
   cd solidityTesting
   ```

2. **Install dependencies**

   Use npm to install the project dependencies:

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root directory and configure it according to the following example:

   ```plaintext
   PRIVATE_KEY=your private key
   RPC_URL=your RPC URL
   ```

   **Note**: Please ensure that your private key and RPC URL are valid, and do not publicly expose your private key.

### Use Hardhat to test

1. **Compile contracts**

   Run the following command in the project root directory to compile the contracts:

   ```bash
   npx hardhat compile
   ```

2. **Run tests**

   Choose your test network and use the following command to run the tests:

   ```bash
   npx hardhat test --network <your testnet>
   ```

   now you should see the test results of each feature
