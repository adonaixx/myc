import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { resolveConfig } from "prettier";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import prettier from "rollup-plugin-prettier";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const prettierrc = {
	parser: "typescript",
	...(await resolveConfig(pathToFileURL(resolve(process.cwd(), "./src/lib.ts")), {
		config: "./../../.prettierrc.json",
		editorconfig: true,
	})),
};

export default defineConfig([
	{
		input: "./src/lib.ts",
		output: {
			file: "./build/lazy.js",
			format: "esm",
			plugins: [prettier(prettierrc)],
		},
		plugins: [nodeResolve(), typescript()],
		external: [
			...Object.keys(pkg.dependencies ?? {}),
			...Object.keys(pkg.peerDependencies ?? {}),
			/^@myc\/.+$/,
		],
	},
	{
		input: "./src/lib.ts",
		output: {
			file: "./build/lazy.d.ts",
			format: "esm",
			plugins: [prettier(prettierrc)],
		},
		plugins: [nodeResolve(), typescript(), dts()],
		external: [
			...Object.keys(pkg.dependencies ?? {}),
			...Object.keys(pkg.peerDependencies ?? {}),
			/^@myc\/.+$/,
		],
	},
]);
