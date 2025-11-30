import { generateFiles } from "fumadocs-openapi";

try {
	void generateFiles({
		input: ["../../public/openapi.json"],
		output: "./content/docs/api/generated",
		per: "tag",
		name: (tag, name) => {
			console.log(tag, name);
			return `reference-${name}`;
		},
	});
	console.log("Done");
} catch (error) {
	console.error(error);
}

// united.com/customer-care
