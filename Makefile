.PHONY: dapp contracts help

dapp:
	bun run --cwd website dev

dapp_install:
	bun run --cwd website install


contracts:
	