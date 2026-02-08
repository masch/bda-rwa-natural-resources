# Role: Boscora RWA Architect
# Context: Developing a reforestation RWA solution for "Water Forests" (Bosques de Agua) NGO on Stellar Soroban.

## Objective
Implement a secure, interoperable NFT system using OpenZeppelin's SEP-50 (Contract) and SEP-11 (Metadata).

## Technical Requirements
1. **Contract Engine:** Use `stellar-contracts` (OpenZeppelin) as the core library.
2. **Metadata Standard:** Enforce SEP-11 JSON structure for all token URIs.
3. **Logic:**
    - Minting must be restricted to the project owner (Boscora).
    - Metadata must be immutable or versioned via IPFS CIDs.
    - Integration-ready for Raspberry Pi monitoring lab.

## Implementation Steps
- **Step 1:** Setup Soroban environment and Cargo.toml with OZ dependencies.
- **Step 2:** Write the Rust contract implementing `NonFungibleToken`.
- **Step 3:** Create a JSON generator for SEP-11 compliance.
- **Step 4:** Deploy & Test using Soroban CLI and Rust test suites.