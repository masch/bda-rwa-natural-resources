# --- Boscora Impacta Makefile ---
# Utility for Stellar Soroban Smart Contract Development

.PHONY: all build test check fmt clean optimize

# Default target
all: build test

# Build the contract
build:
	@echo "Building contract..."
	cargo build --target wasm32-unknown-unknown --release

# Run unit tests
test:
	@echo "Running unit tests..."
	cargo test

# Run tests with output (nocapture)
test-v:
	@echo "Running unit tests (verbose)..."
	cargo test -- --nocapture

# Optimized build for deployment (minimized size)
optimize:
	@echo "Generating optimized Wasm..."
	cargo build --target wasm32-unknown-unknown --release
	@# Optional: if soroban-cli is installed, it can further optimize
	@# soroban contract optimize --wasm target/wasm32-unknown-unknown/release/boscora_impacta.wasm

# Check for compilation errors without building
check:
	@echo "Checking codebase..."
	cargo check

# Format code using rustfmt
fmt:
	@echo "Formatting code..."
	cargo fmt

# Clean build artifacts
clean:
	@echo "Cleaning project..."
	cargo clean

# Quick help
help:
	@echo "Available commands:"
	@echo "  make build    - Build the contract for Wasm"
	@echo "  make test     - Run unit tests"
	@echo "  make test-v   - Run unit tests with output"
	@echo "  make optimize - Build optimized Wasm for production"
	@echo "  make check    - Validate code without full build"
	@echo "  make fmt      - Format Rust code"
	@echo "  make clean    - Remove build artifacts"
