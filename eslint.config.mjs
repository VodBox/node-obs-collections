import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		extends: compat.extends(
			"eslint:recommended",
			"plugin:prettier/recommended",
		),
	},
	{
		files: ["**/*.ts"],
		extends: compat.extends(
			"plugin:@typescript-eslint/eslint-recommended",
			"plugin:@typescript-eslint/recommended",
		),
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-duplicate-enum-values": "off",
		},
	},
]);
