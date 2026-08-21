declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"ai/agency.md": {
	id: "ai/agency.md";
  slug: "ai/agency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/agent-browser.md": {
	id: "ai/agent-browser.md";
  slug: "ai/agent-browser";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/agent.md": {
	id: "ai/agent.md";
  slug: "ai/agent";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/agentmemory.md": {
	id: "ai/agentmemory.md";
  slug: "ai/agentmemory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/agents-cli.md": {
	id: "ai/agents-cli.md";
  slug: "ai/agents-cli";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/ai-website-cloner-template.md": {
	id: "ai/ai-website-cloner-template.md";
  slug: "ai/ai-website-cloner-template";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/ai-youtube-shorts-generator.md": {
	id: "ai/ai-youtube-shorts-generator.md";
  slug: "ai/ai-youtube-shorts-generator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/ai.md": {
	id: "ai/ai.md";
  slug: "ai/ai";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/andrej-karpathy-skills.md": {
	id: "ai/andrej-karpathy-skills.md";
  slug: "ai/andrej-karpathy-skills";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/awesome-cli-coding-agents.md": {
	id: "ai/awesome-cli-coding-agents.md";
  slug: "ai/awesome-cli-coding-agents";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/awesome-freellm-apis.md": {
	id: "ai/awesome-freellm-apis.md";
  slug: "ai/awesome-freellm-apis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/book-to-skill.md": {
	id: "ai/book-to-skill.md";
  slug: "ai/book-to-skill";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/cloudflare-computer.md": {
	id: "ai/cloudflare-computer.md";
  slug: "ai/cloudflare-computer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/colibri.md": {
	id: "ai/colibri.md";
  slug: "ai/colibri";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/comfyui.md": {
	id: "ai/comfyui.md";
  slug: "ai/comfyui";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/dify.md": {
	id: "ai/dify.md";
  slug: "ai/dify";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/google-opal.md": {
	id: "ai/google-opal.md";
  slug: "ai/google-opal";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/google-pameli.md": {
	id: "ai/google-pameli.md";
  slug: "ai/google-pameli";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/google-stitch.md": {
	id: "ai/google-stitch.md";
  slug: "ai/google-stitch";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/handy.md": {
	id: "ai/handy.md";
  slug: "ai/handy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/heygem-ai.md": {
	id: "ai/heygem-ai.md";
  slug: "ai/heygem-ai";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/hyperframes.md": {
	id: "ai/hyperframes.md";
  slug: "ai/hyperframes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/ian-xiaohei-illustrations.md": {
	id: "ai/ian-xiaohei-illustrations.md";
  slug: "ai/ian-xiaohei-illustrations";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/ifixai.md": {
	id: "ai/ifixai.md";
  slug: "ai/ifixai";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/invio.md": {
	id: "ai/invio.md";
  slug: "ai/invio";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/kiro.md": {
	id: "ai/kiro.md";
  slug: "ai/kiro";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/kirocrew.md": {
	id: "ai/kirocrew.md";
  slug: "ai/kirocrew";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/lobehub.md": {
	id: "ai/lobehub.md";
  slug: "ai/lobehub";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/maxkb.md": {
	id: "ai/maxkb.md";
  slug: "ai/maxkb";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/moonshine.md": {
	id: "ai/moonshine.md";
  slug: "ai/moonshine";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/omniparser.md": {
	id: "ai/omniparser.md";
  slug: "ai/omniparser";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/omniroute.md": {
	id: "ai/omniroute.md";
  slug: "ai/omniroute";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/omnivoice.md": {
	id: "ai/omnivoice.md";
  slug: "ai/omnivoice";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/openalice.md": {
	id: "ai/openalice.md";
  slug: "ai/openalice";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/openhuman.md": {
	id: "ai/openhuman.md";
  slug: "ai/openhuman";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/rag-vs-cag-vs-kag-vs-mag.md": {
	id: "ai/rag-vs-cag-vs-kag-vs-mag.md";
  slug: "ai/rag-vs-cag-vs-kag-vs-mag";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/surfsense.md": {
	id: "ai/surfsense.md";
  slug: "ai/surfsense";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/turbo-fieldfare.md": {
	id: "ai/turbo-fieldfare.md";
  slug: "ai/turbo-fieldfare";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/vuza.md": {
	id: "ai/vuza.md";
  slug: "ai/vuza";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/wigolo.md": {
	id: "ai/wigolo.md";
  slug: "ai/wigolo";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/youtube-automation-agent.md": {
	id: "ai/youtube-automation-agent.md";
  slug: "ai/youtube-automation-agent";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/youtube-for-ai-agents.md": {
	id: "ai/youtube-for-ai-agents.md";
  slug: "ai/youtube-for-ai-agents";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"android/assembling process.md": {
	id: "android/assembling process.md";
  slug: "android/assembling-process";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"cat/food.md": {
	id: "cat/food.md";
  slug: "cat/food";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"crm/suitecrm.md": {
	id: "crm/suitecrm.md";
  slug: "crm/suitecrm";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"crm/twenty.md": {
	id: "crm/twenty.md";
  slug: "crm/twenty";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"getting-started/faq.md": {
	id: "getting-started/faq.md";
  slug: "getting-started/faq";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"getting-started/index.md": {
	id: "getting-started/index.md";
  slug: "getting-started";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"getting-started/install.md": {
	id: "getting-started/install.md";
  slug: "getting-started/install";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"github/repos.md": {
	id: "github/repos.md";
  slug: "github/repos";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"google/ask-advisor.md": {
	id: "google/ask-advisor.md";
  slug: "google/ask-advisor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"google/flow.md": {
	id: "google/flow.md";
  slug: "google/flow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"google/jules.md": {
	id: "google/jules.md";
  slug: "google/jules";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"google/merchant-ucp.md": {
	id: "google/merchant-ucp.md";
  slug: "google/merchant-ucp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"google/mixboard.md": {
	id: "google/mixboard.md";
  slug: "google/mixboard";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"google/shopping-cart.md": {
	id: "google/shopping-cart.md";
  slug: "google/shopping-cart";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"google/whisk.md": {
	id: "google/whisk.md";
  slug: "google/whisk";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"guides/advanced.md": {
	id: "guides/advanced.md";
  slug: "guides/advanced";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"guides/index.md": {
	id: "guides/index.md";
  slug: "guides";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/appflowy.md": {
	id: "tools/appflowy.md";
  slug: "tools/appflowy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/carbon.md": {
	id: "tools/carbon.md";
  slug: "tools/carbon";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/chatwoot.md": {
	id: "tools/chatwoot.md";
  slug: "tools/chatwoot";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/clay.md": {
	id: "tools/clay.md";
  slug: "tools/clay";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/databasement.md": {
	id: "tools/databasement.md";
  slug: "tools/databasement";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/devdocs.md": {
	id: "tools/devdocs.md";
  slug: "tools/devdocs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/excalidraw.md": {
	id: "tools/excalidraw.md";
  slug: "tools/excalidraw";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/explainshell.md": {
	id: "tools/explainshell.md";
  slug: "tools/explainshell";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/handwrite.md": {
	id: "tools/handwrite.md";
  slug: "tools/handwrite";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/infisical.md": {
	id: "tools/infisical.md";
  slug: "tools/infisical";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/learn-git-branching.md": {
	id: "tools/learn-git-branching.md";
  slug: "tools/learn-git-branching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/mysigmail.md": {
	id: "tools/mysigmail.md";
  slug: "tools/mysigmail";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/ntfy-android.md": {
	id: "tools/ntfy-android.md";
  slug: "tools/ntfy-android";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/ntfy.md": {
	id: "tools/ntfy.md";
  slug: "tools/ntfy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/openship.md": {
	id: "tools/openship.md";
  slug: "tools/openship";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/paymenter.md": {
	id: "tools/paymenter.md";
  slug: "tools/paymenter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/pinchtab.md": {
	id: "tools/pinchtab.md";
  slug: "tools/pinchtab";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/regexr.md": {
	id: "tools/regexr.md";
  slug: "tools/regexr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/sherlock.md": {
	id: "tools/sherlock.md";
  slug: "tools/sherlock";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/sidescreen.md": {
	id: "tools/sidescreen.md";
  slug: "tools/sidescreen";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/text-to-handwriting.md": {
	id: "tools/text-to-handwriting.md";
  slug: "tools/text-to-handwriting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/turbovec.md": {
	id: "tools/turbovec.md";
  slug: "tools/turbovec";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/visualgo.md": {
	id: "tools/visualgo.md";
  slug: "tools/visualgo";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/witr.md": {
	id: "tools/witr.md";
  slug: "tools/witr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/anime-js.md": {
	id: "webdev/anime-js.md";
  slug: "webdev/anime-js";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/emilkowalski-skills.md": {
	id: "webdev/emilkowalski-skills.md";
  slug: "webdev/emilkowalski-skills";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/gsap.md": {
	id: "webdev/gsap.md";
  slug: "webdev/gsap";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/hoppscotch.md": {
	id: "webdev/hoppscotch.md";
  slug: "webdev/hoppscotch";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/impeccable.md": {
	id: "webdev/impeccable.md";
  slug: "webdev/impeccable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/json-crack.md": {
	id: "webdev/json-crack.md";
  slug: "webdev/json-crack";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/lenis.md": {
	id: "webdev/lenis.md";
  slug: "webdev/lenis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/mapcn.md": {
	id: "webdev/mapcn.md";
  slug: "webdev/mapcn";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/react-bits.md": {
	id: "webdev/react-bits.md";
  slug: "webdev/react-bits";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/shadcn-ui.md": {
	id: "webdev/shadcn-ui.md";
  slug: "webdev/shadcn-ui";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/shadergradient.md": {
	id: "webdev/shadergradient.md";
  slug: "webdev/shadergradient";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/taste-skill.md": {
	id: "webdev/taste-skill.md";
  slug: "webdev/taste-skill";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/transform-tools.md": {
	id: "webdev/transform-tools.md";
  slug: "webdev/transform-tools";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/transitions-dev.md": {
	id: "webdev/transitions-dev.md";
  slug: "webdev/transitions-dev";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/uiverse.md": {
	id: "webdev/uiverse.md";
  slug: "webdev/uiverse";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/vanta.md": {
	id: "webdev/vanta.md";
  slug: "webdev/vanta";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
