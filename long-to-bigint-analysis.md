## Background

The `long` npm package provides support for 64-bit integers in JavaScript, which was necessary before BigInt was standardized. Node.js has supported native BigInt since v10.4.0 (2018), and it's now part of the ECMAScript 2020 standard. The Azure SDK for JS currently uses the `long` package (v5.3.1) in multiple packages.

## Current Usage

The following packages depend on the `long` package:

1. **@azure/service-bus** (v5.3.1) - Service Bus client
2. **@azure/web-pubsub-client-protobuf** (v5.3.1) - Web PubSub protobuf protocol

### Service Bus Usage

**Primary use cases:**
- **Sequence numbers**: 64-bit unique message identifiers
- **Scheduled message tracking**: Long values for message scheduling
- **Lock tokens**: Byte array conversion for message locks
- **Time conversions**: Converting .NET ticks to JavaScript Date

**Key files:**
- `src/core/managementClient.ts`: `Long.ZERO`, `Long.fromNumber()`, `Long.fromBytesBE()`
- `src/serviceBusMessage.ts`: Sequence number handling with `Long`
- `src/util/utils.ts`: Date conversion using `Long` arithmetic
- `src/models.ts`: Public API types expose `Long`

**Public API impact:**
```typescript
// These interfaces expose Long in the public API
interface ServiceBusReceivedMessage {
  readonly sequenceNumber?: Long;  // 64-bit message identifier
}

interface PeekMessagesOptions {
  fromSequenceNumber?: Long;  // Start peeking from this sequence
}
```

### Web PubSub Protobuf Usage

**Primary use cases:**
- **Protocol buffer int64 types**: Generated code uses `Long` for protobuf int64/uint64
- **Sequence IDs and Ack IDs**: Message sequencing and acknowledgment

**Key files:**
- `src/generated/clientProto.d.ts`: Auto-generated protobuf types with `Long`
- `src/webPubSubProtobufProtocolBase.ts`: Helper to convert `Long | number` to `number`

**Generation:**
- Uses `protobufjs` (v7.4.0) and `protobufjs-cli` (v1.1.3)
- Generated with `pbjs` and `pbts` commands
- Currently generates `Long` types for int64 fields

## Compatibility Analysis

### ✅ BigInt Native Support

Native BigInt **supports** all identified use cases:

| Operation | Long.js | BigInt Equivalent |
|-----------|---------|-------------------|
| Zero constant | `Long.ZERO` | `0n` |
| From number | `Long.fromNumber(n)` | `BigInt(n)` |
| From bytes (BE) | `Long.fromBytesBE(buf)` | Custom helper function |
| To number | `long.toNumber()` | `Number(bigint)` |
| Subtraction | `long.sub(x)` | `bigint - BigInt(x)` |
| Division | `long.div(x)` | `bigint / BigInt(x)` |
| Comparison | `long.equals(x)` | `bigint === BigInt(x)` |

### ⚠️ Breaking Changes

1. **Type changes - MAJOR**
   - `Long` object → `bigint` primitive
   - **Impact**: Breaking change for public APIs
   - **Affected**: `ServiceBusReceivedMessage.sequenceNumber`, `PeekMessagesOptions.fromSequenceNumber`

2. **JSON serialization - CRITICAL**
   - BigInt doesn't serialize to JSON directly
   - Throws `TypeError: Do not know how to serialize a BigInt`
   - **Impact**: Any code serializing messages to JSON will break
   - **Workaround**: Convert to string or number before serialization

3. **Protobuf generation**
   - `protobufjs` uses `Long` by default for int64 types
   - Can be configured to use BigInt with options
   - **Impact**: Requires regenerating protobuf code

4. **TypeScript type checking**
   - `Long` is a class type, `bigint` is a primitive type
   - Type guards like `value instanceof Long` won't work
   - Need `typeof value === 'bigint'` instead

### 📦 Protobuf BigInt Support

`protobufjs` v7+ supports BigInt for int64 fields with configuration:

```bash
# Generate with BigInt instead of Long
pbjs --force-long ... # Uses Long (default)
pbjs --force-number ... # Uses number (may lose precision)
# No built-in BigInt option yet, but can post-process
```

Current workaround: The generated code would need custom post-processing to replace `Long` with `bigint`, or wait for protobufjs to add native BigInt support.

## Migration Path

### Option 1: Wait for Node.js v22 as Minimum (RECOMMENDED)

**Timeline**: When Node.js v18 LTS ends (April 2025)

**Approach**:
1. Keep `long` package for now
2. When minimum Node.js version becomes v18+, evaluate migration
3. This allows ecosystem tools (protobufjs) to mature BigInt support

**Pros**:
- No breaking changes in near term
- Ecosystem will have better BigInt support
- More time to plan public API changes

**Cons**:
- Maintains dependency on external package
- Delays benefits of native BigInt

### Option 2: Add BigInt Support Alongside Long (COMPLEX)

**Approach**:
1. Accept both `Long | bigint` in public APIs
2. Internal conversion layer
3. Gradual deprecation of `Long` types

**Example**:
```typescript
interface ServiceBusReceivedMessage {
  readonly sequenceNumber?: Long | bigint;
}

// Internal helper
function toBigInt(value: Long | bigint | number): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') return BigInt(value);
  return BigInt(value.toString()); // Long
}
```

**Pros**:
- Backward compatible
- Gradual migration path
- Can deprecate Long over time

**Cons**:
- Complex implementation
- Maintenance burden of supporting both
- Still requires major version for full removal

### Option 3: Breaking Change to BigInt (NOT RECOMMENDED NOW)

**Approach**:
1. Replace all `Long` types with `bigint`
2. Provide migration guide
3. Release as major version

**Pros**:
- Clean, native solution
- Removes dependency
- Simpler codebase

**Cons**:
- **Breaking change** for all consumers
- JSON serialization issues need documentation
- Protobuf generation challenges
- Ecosystem may not be ready

## Impact Assessment

### @azure/service-bus

**Public API Breaking Changes:**
- `ServiceBusReceivedMessage.sequenceNumber: Long → bigint`
- `ServiceBusMessage.sequenceNumber: Long → bigint`
- `PeekMessagesOptions.fromSequenceNumber: Long → bigint`
- `scheduleMessages()` return type: `Long[] → bigint[]`

**Consumer Impact:**
```typescript
// Current code
import Long from 'long';
const seqNum: Long = message.sequenceNumber;
const options = { fromSequenceNumber: Long.fromNumber(100) };

// After migration
const seqNum: bigint = message.sequenceNumber;
const options = { fromSequenceNumber: 100n };

// JSON serialization breaks
JSON.stringify(message); // ❌ TypeError
JSON.stringify({ ...message, sequenceNumber: Number(message.sequenceNumber) }); // ✅
```

### @azure/web-pubsub-client-protobuf

**Impact:**
- Generated protobuf code uses `Long`
- Need to regenerate with BigInt support or post-process
- Internal usage only (not exposed in public API as prominently)

**Complexity:**
- Protobufjs ecosystem support for BigInt is still evolving
- May need custom code generation or transformation

## Benefits of Migration

1. **Reduced dependencies**: Remove ~50KB external package
2. **Better performance**: Native primitive vs object wrapper
3. **Improved security**: Fewer dependencies to audit
4. **Future-proof**: Aligned with JavaScript standard
5. **Simpler code**: Operators vs method calls
6. **TypeScript alignment**: Better type inference with primitives

## Considerations

1. **Minimum Node.js version**: Already at v18+ for Azure SDK
2. **JSON serialization**: Need clear documentation on handling
3. **Protobuf tooling**: May need custom solutions
4. **Breaking changes**: Requires major version bump
5. **Migration guide**: Comprehensive documentation needed
6. **Test coverage**: Extensive testing of 64-bit edge cases
7. **Consumer migration**: May affect many users

## Recommendation

**DO NOT MIGRATE NOW** - Maintain current `long` package usage

**Reasons:**
1. **Breaking changes too significant**: Public API changes affect all consumers
2. **Protobuf tooling not ready**: No native BigInt generation support
3. **JSON serialization complexity**: Will cause issues for users
4. **Limited immediate benefit**: Node.js v18+ already supported, native BigInt works but breaking changes aren't worth it
5. **Ecosystem maturity**: Wait for protobufjs and other tools to mature

**Future consideration:**
- Revisit when:
  - Protobufjs has native BigInt generation support
  - Planning a major version bump anyway for other breaking changes
  - Significant consumer demand for BigInt support
  - JSON serialization story is clearer (e.g., JSON.stringify replacer patterns)

## Testing Requirements (If Migrating)

- [ ] Verify sequence number operations at 64-bit boundaries
- [ ] Test byte array conversion accuracy
- [ ] Validate date/time conversion precision
- [ ] Confirm scheduled message handling
- [ ] Test JSON serialization workarounds
- [ ] Validate protobuf int64 handling
- [ ] Cross-platform testing (Windows, Linux, macOS)
- [ ] Performance benchmarks (BigInt vs Long)
- [ ] Backward compatibility scenarios

## Related

- BigInt specification: https://tc39.es/ecma262/#sec-bigint-objects
- Node.js BigInt support: https://nodejs.org/api/esm.html#esm_no_require_exports_or_module_exports
- Protobufjs: https://github.com/protobufjs/protobuf.js
- Long.js: https://github.com/dcodeIO/long.js
