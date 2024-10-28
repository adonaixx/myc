import { exec } from "node:child_process";
import { createRequire } from "node:module";
import { promisify } from "node:util";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const { author } = pkg;

function getCurrentScopeFromPkg() {
	const scopedRegExp = /^@(?<scope>.+)\/.*$/;
	const scope = scopedRegExp.exec(pkg?.name ?? "not named :(")?.groups?.["scope"];

	return scope ?? pkg.name;
}

function getManyTemplates(path) {
	return {
		templateFiles: `./templates/${path}/*.hbs`,
		base: `./templates/${path}`,
	};
}

const execAsync = promisify(exec);

export default function (/** @type {import("plop").NodePlopAPI} */ plop) {
	plop.setWelcomeMessage("What are you needing to generate now?");

	plop.setActionType("prettify", async (answers, { directory }, plop) => {
		await execAsync(`prettier -uw ${plop.renderString(directory, answers)}/**/*`);
		return "Prettified files in " + plop.renderString(directory, answers);
	});

	plop.setActionType("install", async (answers, { pkg }, plop) => {
		await execAsync("pnpm i");
		return (
			"Installed packages" +
			(pkg ? ` for ${plop.renderString(pkg, answers)}.` : ".")
		);
	});

	plop.setHelper("or", (left, right) => left || right);

	plop.setGenerator("Mono-repository Drop", {
		async prompts(inquirer) {
			const scope = getCurrentScopeFromPkg();
			let isCurrentScope = false;

			if (scope) {
				await inquirer
					.prompt({
						type: "confirm",
						name: "currentScope",
						message: `Should your mono-repository package be generated under current scope (${scope})?`,
					})
					.then(({ currentScope }) => {
						isCurrentScope = currentScope;
					});
			}

			return inquirer.prompt(
				[
					isCurrentScope || {
						type: "input",
						askAnswered: true,
						name: "scope",
						message: "In wich scope should your package be generated?",
						default: scope,
						validate(answer) {
							return (
								answer.trim().length > 0 ||
								"Scope name must not be empty or just whitespaces"
							);
						},
					},
					{
						type: "input",
						name: "dropName",
						message: "How will your drop be named?",
						validate(answer) {
							return (
								answer.trim().length > 0 ||
								"Drop name must not be empty or just whitespaces"
							);
						},
					},
					{
						type: "checkbox",
						name: "features",
						message: "Wich feature(s) do you want your drop to have?",
						choices: ["Library", "Types", "Binary"],
						filter(features) {
							return {
								binary: features.includes("Binary"),
								library: features.includes("Library"),
								types:
									features.includes("Types") ||
									features.includes("Library"),
							};
						},
					},
				].filter((question) => typeof question === "object"),
				{ scope, author }
			);
		},
		actions({ features }) {
			return [
				{
					type: "addMany",
					...getManyTemplates("mono-repository-drop"),
					destination: "./packages/{{pascalCase dropName}}",
				},
				features.binary && {
					type: "add",
					templateFile: "./templates/mono-repository-drop/src/main.ts.hbs",
					path: "./packages/{{pascalCase dropName}}/src/main.ts",
				},
				features.library && {
					type: "add",
					templateFile: "./templates/mono-repository-drop/src/lib.ts.hbs",
					path: "./packages/{{pascalCase dropName}}/src/lib.ts",
				},
				{
					type: "install",
					pkg: "@{{scope}}/{{kebabCase dropName}}",
				},
				{
					type: "prettify",
					directory: "./packages/{{pascalCase dropName}}",
				},
			].filter((question) => typeof question === "object");
		},
	});

	plop.setGenerator("Mono-repository File", {
		async prompts(inquirer) {
			const scope = getCurrentScopeFromPkg();
			let isCurrentScope = false;

			if (scope) {
				await inquirer
					.prompt({
						type: "confirm",
						name: "currentScope",
						message: `Should your mono-repository package be generated under current scope (${scope})?`,
					})
					.then(({ currentScope }) => {
						isCurrentScope = currentScope;
					});
			}

			return inquirer.prompt(
				[
					isCurrentScope || {
						type: "input",
						askAnswered: true,
						name: "scope",
						message: "In wich scope should your package be generated?",
						default: scope,
						validate(answer) {
							return (
								answer.trim().length > 0 ||
								"Scope name must not be empty or just whitespaces"
							);
						},
					},
					{
						type: "input",
						name: "fileName",
						message: "What will be the name of the file without extension?",
						validate(answer) {
							return (
								answer.trim().length > 0 ||
								"File name must not be empty or just whitespaces"
							);
						},
					},
					{
						type: "input",
						name: "ext",
						message:
							"In wich language will your file be written? (like .json)",
						validate(ext) {
							return (
								/^\..+$/.test(ext) ||
								'Extension must include the "." at the beggining'
							);
						},
						default: ".json",
					},
				].filter((question) => typeof question === "object"),
				{ scope, author }
			);
		},
		actions: [
			{
				type: "add",
				templateFile: "./templates/mono-repository-file/dummy.hbs",
				path: "./packages/{{pascalCase fileName}}/{{fileName}}{{ext}}",
			},
			{
				type: "add",
				templateFile: "./templates/mono-repository-file/package.json.hbs",
				path: "./packages/{{pascalCase fileName}}/package.json",
			},
			{
				type: "prettify",
				directory: "./packages/{{pascalCase fileName}}",
			},
		],
	});
}
