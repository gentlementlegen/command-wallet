import { StaticDecode, Type as T } from "@sinclair/typebox";

/**
 * This should contain the properties of the bot config
 * that are required for the plugin to function.
 *
 * The kernel will extract those and pass them to the plugin,
 * which are built into the context object from setup().
 */
export const pluginSettingsSchema = T.Object({
  registerWalletWithVerification: T.Boolean({ default: false }),
});

export type PluginSettings = StaticDecode<typeof pluginSettingsSchema>;
