import { createRequire } from "node:module";

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
		templateFiles: `./templates/${path}/**/*.hbs`,
		base: `./templates/${path}`,
	};
}

export default function (/** @type {import("plop").NodePlopAPI} */ plop) {
	plop.setWelcomeMessage("What are you needing to generate now?");

	plop.setGenerator("Mono-repository File", {
		async prompts(inquirer) {
			const scope = getCurrentScopeFromPkg();
			let isCurrentScope = false;

			if (scope) {
				await inquirer
					.prompt({
						type: "list",
						name: "currentScope",
						message: `Should your mono-repository package be generated under current scope (${scope})?`,
						choices: ["Yes", "No"],
						filter(choice) {
							return choice === "Yes";
						},
					})
					.then(({ currentScope }) => {
						isCurrentScope = currentScope;
					});
			}

			/** @type {import("inquirer").DistinctQuestion[]} */
			const questions = [
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
					message: "In wich language will your file be written? (like .json)",
					validate(ext) {
						return (
							/^\..+$/.test(ext) ||
							'Extension must include the "." at the beggining'
						);
					},
				},
			];

			if (!isCurrentScope) {
				questions.unshift({
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
				});
			}

			return inquirer.prompt(questions, { scope, author });
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
		],
	});

	plop.setGenerator("Mono-repository Drop", {
		async prompts(inquirer) {
			const scope = getCurrentScopeFromPkg();
			let isCurrentScope = false;

			if (scope) {
				await inquirer
					.prompt({
						type: "list",
						name: "currentScope",
						message: `Should your mono-repository package be generated under current scope (${scope})?`,
						choices: ["Yes", "No"],
						filter(choice) {
							return choice === "Yes";
						},
					})
					.then(({ currentScope }) => {
						isCurrentScope = currentScope;
					});
			}

			/** @type {import("inquirer").DistinctQuestion[]} */
			const questions = [
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
			];

			if (!isCurrentScope) {
				questions.unshift({
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
				});
			}

			return inquirer.prompt(questions, { scope, author });
		},
		actions: [
			{
				type: "addMany",
				...getManyTemplates("mono-repository-drop"),
				destination: "./packages/{{pascalCase dropName}}",
			},
		],
	});
}
