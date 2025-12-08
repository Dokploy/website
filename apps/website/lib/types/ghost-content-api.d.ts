declare module "@tryghost/content-api" {
	interface GhostContentAPIOptions {
		url: string;
		key: string;
		version: string;
	}

	interface BrowseOptions {
		limit?: string | number;
		page?: number;
		order?: string;
		filter?: string;
		include?: string | string[];
		fields?: string | string[];
		formats?: string | string[];
	}

	interface ReadOptions {
		id?: string;
		slug?: string;
		include?: string | string[];
		fields?: string | string[];
		formats?: string | string[];
	}

	interface ApiObject {
		browse<T>(options?: BrowseOptions): Promise<T[]>;
		read<T>(options: ReadOptions): Promise<T>;
	}

	interface GhostAPI {
		posts: ApiObject;
		tags: ApiObject;
		authors: ApiObject;
		pages: ApiObject;
		settings: {
			browse<T>(): Promise<T>;
		};
	}

	function GhostContentAPI(options: GhostContentAPIOptions): GhostAPI;

	export default GhostContentAPI;
}
