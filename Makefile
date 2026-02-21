.PHONY: dapp dapp_install contracts help

dapp:
	bun run --cwd dapp dev

dapp_install:
	bun install --cwd ./dapp

contracts:
	