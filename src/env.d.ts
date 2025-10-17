/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_BOTPOISON_PUBLIC_KEY: string;
	readonly BOTPOISON_SECRET_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
