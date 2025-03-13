This test covers the new features of Solidity versions 0.8.24 to 0.8.28, including custom errors, Yul built-in functions, and byte array copying. All tests have passed, and the contract functions are working properly. The test project can be found at: https://github.com/JukLee0ira/solidityTesting. You can follow the instructions in the `README.md` file to run the test functions and get the test results.

### 1. BlobFeatureTest Contract

#### Test Parameters

- `testBlobBaseFeeSolidity()`
- `testBlobHashSolidity(1)`
- `testBlobBaseFeeYul()`
- `testBlobHashYul()`

#### Test Results

- `testBlobBaseFeeSolidity()`: The returned blob base fee should be non-negative.
- `testBlobHashSolidity(1)`: The returned blob hash should be a 32-byte value.
- `testBlobBaseFeeYul()`: The returned blob base fee should be non-negative.
- `testBlobHashYul()`: The returned blob hash should be a 32-byte value.

### 2. McopyTest Contract

#### Test Parameters

- `testMcopy()`

#### Test Results

- `testMcopy()`: Should return a 32-byte value `0x50`.

### 3. TransientStorageTest Contract

#### Test Parameters

- `testTload()`
- `testTstore()`

#### Test Results

- `testTload()`: Initial value should be 0.
- `testTstore()`: Should read stored value `0x1234` from storage slot 0.

### 4. ByteArrayCopyTest Contract

#### Test Parameters

- `copyWithLoop(source)`
- `copyWithMCOPY(source)`

#### Test Results

- `copyWithLoop(source)`: Should correctly copy the byte array.
- `copyWithMCOPY(source)`: Should correctly copy the byte array.

### 5. RequireWithError Contract

#### Test Parameters

- `testCustomError(_value)`
- `testStringMessage(_value)`
- `testMultiParamError(_value)`
- `testSimpleRequire(_value)`

#### Test Results

- `testCustomError(100)`: Should successfully set value to 100.
- `testCustomError(0)`: Should trigger custom error `InvalidValue`.
- `testStringMessage(5)`: Should trigger traditional string error.
- `testMultiParamError(1001)`: Should trigger multi-parameter custom error `InvalidRange`.
- `testSimpleRequire(5)`: Should trigger simple require error.

### 6. RequireWithErrorTest Contract

#### Test Parameters

- `testRequireWithError(value)`

#### Test Results

- `testRequireWithError(50)`: Should trigger custom error `InvalidValue`.
