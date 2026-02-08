# Boscora Impacta: Reforestation NFT Contract

Boscora Impacta is a Stellar Soroban smart contract designed to represent reforestation parcels as Non-Fungible Tokens (NFTs). It follows the **SEP-50** Non-Fungible Token standard and incorporates **SEP-11** compliant metadata for detailed parcel monitoring.

## 🌟 Key Features

- **SEP-50 Compliant**: Full compatibility with Stellar wallets and explorers.
- **SEP-11 Metadata**: Includes rich attributes like plant species, humidity, and temperature via IPFS links.
- **Real-World Impact**: Each NFT is tied to physical geographical coordinates (`latitude`, `longitude`).
- **Secure Control**: Built on **OpenZeppelin Stellar Contracts (v0.6.0)**, ensuring audited patterns for ownership and access control.
- **Admin-Only Minting**: Secure minting process restricted to the designated project administrator.

## 🛠 Technical Stack

- **Framework**: [Soroban SDK v25.0.2](https://soroban.stellar.org/)
- **Libraries**: 
    - `stellar-tokens`: OpenZeppelin NFT implementations.
    - `stellar-access`: Secure ownership management.
    - `stellar-macros`: Attribute macros for access control (`#[only_owner]`).
- **Development Environment**: Rust, Makefile-driven workflow.

## 🚀 Getting Started

### Prerequisites

- Rust & Cargo
- [Stellar CLI](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup#install-the-stellar-cli)

### Build & Test

Use the provided `Makefile` for common tasks:

```bash
# Run unit tests
make test

# Build the WASM binary
make build

# Optimize build for deployment
make optimize
```

## 🏗 Implementation Details

### Data Structures

- **GeoCoordinates**: Stores the precise location of the reforestation parcel.
- **BoscoraMetadata**: A template for SEP-11 compliant metadata including name, description, image, and custom attributes.

### Core Functions

| Function | Access | Description |
| --- | --- | --- |
| `__constructor` | Public | Initializes the project admin and collection metadata. |
| `mint` | Admin | Creates a new parcel NFT with a unique ID and coordinates. |
| `set_metadata_uri`| Admin | Updates the IPFS CID for a parcel (useful for telemetry updates). |
| `geo_coordinates` | Public | Retrieves the physical coordinates for a given token ID. |
| `owner_of` | Public | Standard SEP-50 ownership check. |
| `token_uri` | Public | Retrieves the IPFS link for a parcel's metadata. |

## 📄 License

This project is licensed under the MIT License.
