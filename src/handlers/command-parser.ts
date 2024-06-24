import { Command, InvalidArgumentError } from "commander";
import packageJson from "../../package.json";
import { Context } from "../types";
import { registerWallet } from "./query-wallet";

export class CommandParser {
  readonly _program;

  constructor(context: Context) {
    const program = new Command();
    program
      .command("/wallet")
      .usage("<wallet>")
      .argument("<wallet>", "Wallet address to query, e.g. 0x000000000000000000000000000000000000000", this._parseWalletAddress)
      .action((wallet) => registerWallet(context, wallet))
      .helpCommand(false)
      .exitOverride()
      .version(packageJson.version);
    program.configureOutput({
      writeOut(str: string) {
        context.logger.info(str);
      },
      writeErr(str: string) {
        context.logger.error(str);
      },
      getErrHelpWidth(): number {
        return 0;
      },
      getOutHelpWidth(): number {
        return 0;
      },
    });
    program.exitOverride();
    this._program = program;
  }

  parse(args: string[]) {
    return this._program.parseAsync(args, { from: "user" });
  }

  helpInformation() {
    return this._program.helpInformation();
  }

  _parseWalletAddress(value: string) {
    if (!value.length || value.length < 2) {
      throw new InvalidArgumentError("Wallet address should be at least 2 characters long.");
    }
    return value;
  }
}
