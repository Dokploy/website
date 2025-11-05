import en from "../locales/en.json";

type Messages = typeof en;

function getByPath(obj: any, path: string): any {
	return path
		.split(".")
		.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function useTranslations(namespace?: keyof Messages | string) {
	return (key: string, params?: Record<string, any>) => {
		const fullKey = namespace ? `${namespace}.${key}` : key;
		let value = getByPath(en as any, fullKey);
		if (typeof value === "string" && params) {
			for (const [k, v] of Object.entries(params)) {
				value = value.replaceAll(`{${k}}`, String(v));
			}
		}
		return value ?? fullKey;
	};
}
