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
"ai/airi.md": {
	id: "ai/airi.md";
  slug: "ai/airi";
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
"ai/anthropic-skills.md": {
	id: "ai/anthropic-skills.md";
  slug: "ai/anthropic-skills";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/archify.md": {
	id: "ai/archify.md";
  slug: "ai/archify";
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
"ai/awesome-llm-apps.md": {
	id: "ai/awesome-llm-apps.md";
  slug: "ai/awesome-llm-apps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/awesome-mcp-servers.md": {
	id: "ai/awesome-mcp-servers.md";
  slug: "ai/awesome-mcp-servers";
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
"ai/claude-plugins-official.md": {
	id: "ai/claude-plugins-official.md";
  slug: "ai/claude-plugins-official";
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
"ai/cursor-plugins.md": {
	id: "ai/cursor-plugins.md";
  slug: "ai/cursor-plugins";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/deer-flow.md": {
	id: "ai/deer-flow.md";
  slug: "ai/deer-flow";
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
"ai/dspy.md": {
	id: "ai/dspy.md";
  slug: "ai/dspy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ai/gitnexus.md": {
	id: "ai/gitnexus.md";
  slug: "ai/gitnexus";
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
"ai/langflow.md": {
	id: "ai/langflow.md";
  slug: "ai/langflow";
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
"ai/ollama.md": {
	id: "ai/ollama.md";
  slug: "ai/ollama";
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
"ai/open-design.md": {
	id: "ai/open-design.md";
  slug: "ai/open-design";
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
"ai/openhands.md": {
	id: "ai/openhands.md";
  slug: "ai/openhands";
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
"ai/openmontage.md": {
	id: "ai/openmontage.md";
  slug: "ai/openmontage";
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
"ai/scientific-agent-skills.md": {
	id: "ai/scientific-agent-skills.md";
  slug: "ai/scientific-agent-skills";
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
"books/my-agent-bible.md": {
	id: "books/my-agent-bible.md";
  slug: "books/my-agent-bible";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"books/the-agentic-factory.md": {
	id: "books/the-agentic-factory.md";
  slug: "books/the-agentic-factory";
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
"software-engineer/01-fundamental-engineering-principles/abstraction.md": {
	id: "software-engineer/01-fundamental-engineering-principles/abstraction.md";
  slug: "software-engineer/01-fundamental-engineering-principles/abstraction";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/async.md": {
	id: "software-engineer/01-fundamental-engineering-principles/async.md";
  slug: "software-engineer/01-fundamental-engineering-principles/async";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/availability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/availability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/availability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/complexity.md": {
	id: "software-engineer/01-fundamental-engineering-principles/complexity.md";
  slug: "software-engineer/01-fundamental-engineering-principles/complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/composition-over-inheritance.md": {
	id: "software-engineer/01-fundamental-engineering-principles/composition-over-inheritance.md";
  slug: "software-engineer/01-fundamental-engineering-principles/composition-over-inheritance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/consistency.md": {
	id: "software-engineer/01-fundamental-engineering-principles/consistency.md";
  slug: "software-engineer/01-fundamental-engineering-principles/consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/convention-over-configuration.md": {
	id: "software-engineer/01-fundamental-engineering-principles/convention-over-configuration.md";
  slug: "software-engineer/01-fundamental-engineering-principles/convention-over-configuration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/core-principles.md": {
	id: "software-engineer/01-fundamental-engineering-principles/core-principles.md";
  slug: "software-engineer/01-fundamental-engineering-principles/core-principles";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/cost.md": {
	id: "software-engineer/01-fundamental-engineering-principles/cost.md";
  slug: "software-engineer/01-fundamental-engineering-principles/cost";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/default-deny.md": {
	id: "software-engineer/01-fundamental-engineering-principles/default-deny.md";
  slug: "software-engineer/01-fundamental-engineering-principles/default-deny";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/determinism.md": {
	id: "software-engineer/01-fundamental-engineering-principles/determinism.md";
  slug: "software-engineer/01-fundamental-engineering-principles/determinism";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/development-velocity.md": {
	id: "software-engineer/01-fundamental-engineering-principles/development-velocity.md";
  slug: "software-engineer/01-fundamental-engineering-principles/development-velocity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/dry-don-t-repeat-yourself.md": {
	id: "software-engineer/01-fundamental-engineering-principles/dry-don-t-repeat-yourself.md";
  slug: "software-engineer/01-fundamental-engineering-principles/dry-don-t-repeat-yourself";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/dry.md": {
	id: "software-engineer/01-fundamental-engineering-principles/dry.md";
  slug: "software-engineer/01-fundamental-engineering-principles/dry";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/encapsulate-what-varies.md": {
	id: "software-engineer/01-fundamental-engineering-principles/encapsulate-what-varies.md";
  slug: "software-engineer/01-fundamental-engineering-principles/encapsulate-what-varies";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/engineering-trade-offs.md": {
	id: "software-engineer/01-fundamental-engineering-principles/engineering-trade-offs.md";
  slug: "software-engineer/01-fundamental-engineering-principles/engineering-trade-offs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/evolvability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/evolvability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/evolvability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/explicit-over-implicit.md": {
	id: "software-engineer/01-fundamental-engineering-principles/explicit-over-implicit.md";
  slug: "software-engineer/01-fundamental-engineering-principles/explicit-over-implicit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/fail-fast.md": {
	id: "software-engineer/01-fundamental-engineering-principles/fail-fast.md";
  slug: "software-engineer/01-fundamental-engineering-principles/fail-fast";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/fail-safe.md": {
	id: "software-engineer/01-fundamental-engineering-principles/fail-safe.md";
  slug: "software-engineer/01-fundamental-engineering-principles/fail-safe";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/favor-immutability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/favor-immutability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/favor-immutability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/flexibility.md": {
	id: "software-engineer/01-fundamental-engineering-principles/flexibility.md";
  slug: "software-engineer/01-fundamental-engineering-principles/flexibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/idempotency.md": {
	id: "software-engineer/01-fundamental-engineering-principles/idempotency.md";
  slug: "software-engineer/01-fundamental-engineering-principles/idempotency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/information-hiding.md": {
	id: "software-engineer/01-fundamental-engineering-principles/information-hiding.md";
  slug: "software-engineer/01-fundamental-engineering-principles/information-hiding";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/kiss-keep-it-simple-stupid.md": {
	id: "software-engineer/01-fundamental-engineering-principles/kiss-keep-it-simple-stupid.md";
  slug: "software-engineer/01-fundamental-engineering-principles/kiss-keep-it-simple-stupid";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/latency.md": {
	id: "software-engineer/01-fundamental-engineering-principles/latency.md";
  slug: "software-engineer/01-fundamental-engineering-principles/latency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/law-of-demeter.md": {
	id: "software-engineer/01-fundamental-engineering-principles/law-of-demeter.md";
  slug: "software-engineer/01-fundamental-engineering-principles/law-of-demeter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/least-privilege.md": {
	id: "software-engineer/01-fundamental-engineering-principles/least-privilege.md";
  slug: "software-engineer/01-fundamental-engineering-principles/least-privilege";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/locality-of-behavior.md": {
	id: "software-engineer/01-fundamental-engineering-principles/locality-of-behavior.md";
  slug: "software-engineer/01-fundamental-engineering-principles/locality-of-behavior";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/maintainability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/maintainability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/maintainability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/maximize-cohesion.md": {
	id: "software-engineer/01-fundamental-engineering-principles/maximize-cohesion.md";
  slug: "software-engineer/01-fundamental-engineering-principles/maximize-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/minimize-coupling.md": {
	id: "software-engineer/01-fundamental-engineering-principles/minimize-coupling.md";
  slug: "software-engineer/01-fundamental-engineering-principles/minimize-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/normalization.md": {
	id: "software-engineer/01-fundamental-engineering-principles/normalization.md";
  slug: "software-engineer/01-fundamental-engineering-principles/normalization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/observability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/observability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/observability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/operability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/operability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/operability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/performance.md": {
	id: "software-engineer/01-fundamental-engineering-principles/performance.md";
  slug: "software-engineer/01-fundamental-engineering-principles/performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/premature-abstraction.md": {
	id: "software-engineer/01-fundamental-engineering-principles/premature-abstraction.md";
  slug: "software-engineer/01-fundamental-engineering-principles/premature-abstraction";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/principle-of-least-astonishment.md": {
	id: "software-engineer/01-fundamental-engineering-principles/principle-of-least-astonishment.md";
  slug: "software-engineer/01-fundamental-engineering-principles/principle-of-least-astonishment";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/principle-of-least-knowledge.md": {
	id: "software-engineer/01-fundamental-engineering-principles/principle-of-least-knowledge.md";
  slug: "software-engineer/01-fundamental-engineering-principles/principle-of-least-knowledge";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/program-to-an-interface.md": {
	id: "software-engineer/01-fundamental-engineering-principles/program-to-an-interface.md";
  slug: "software-engineer/01-fundamental-engineering-principles/program-to-an-interface";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/read-performance.md": {
	id: "software-engineer/01-fundamental-engineering-principles/read-performance.md";
  slug: "software-engineer/01-fundamental-engineering-principles/read-performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/reliability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/reliability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/reliability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/reversibility.md": {
	id: "software-engineer/01-fundamental-engineering-principles/reversibility.md";
  slug: "software-engineer/01-fundamental-engineering-principles/reversibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/secure-by-default.md": {
	id: "software-engineer/01-fundamental-engineering-principles/secure-by-default.md";
  slug: "software-engineer/01-fundamental-engineering-principles/secure-by-default";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/separation-of-concerns.md": {
	id: "software-engineer/01-fundamental-engineering-principles/separation-of-concerns.md";
  slug: "software-engineer/01-fundamental-engineering-principles/separation-of-concerns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/simplicity.md": {
	id: "software-engineer/01-fundamental-engineering-principles/simplicity.md";
  slug: "software-engineer/01-fundamental-engineering-principles/simplicity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/single-source-of-truth.md": {
	id: "software-engineer/01-fundamental-engineering-principles/single-source-of-truth.md";
  slug: "software-engineer/01-fundamental-engineering-principles/single-source-of-truth";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/solid.md": {
	id: "software-engineer/01-fundamental-engineering-principles/solid.md";
  slug: "software-engineer/01-fundamental-engineering-principles/solid";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/strong-typing.md": {
	id: "software-engineer/01-fundamental-engineering-principles/strong-typing.md";
  slug: "software-engineer/01-fundamental-engineering-principles/strong-typing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/sync.md": {
	id: "software-engineer/01-fundamental-engineering-principles/sync.md";
  slug: "software-engineer/01-fundamental-engineering-principles/sync";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/testability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/testability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/testability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/throughput.md": {
	id: "software-engineer/01-fundamental-engineering-principles/throughput.md";
  slug: "software-engineer/01-fundamental-engineering-principles/throughput";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/traceability.md": {
	id: "software-engineer/01-fundamental-engineering-principles/traceability.md";
  slug: "software-engineer/01-fundamental-engineering-principles/traceability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/01-fundamental-engineering-principles/yagni-you-aren-t-gonna-need-it.md": {
	id: "software-engineer/01-fundamental-engineering-principles/yagni-you-aren-t-gonna-need-it.md";
  slug: "software-engineer/01-fundamental-engineering-principles/yagni-you-aren-t-gonna-need-it";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/02-solid/dependency-inversion-principle.md": {
	id: "software-engineer/02-solid/dependency-inversion-principle.md";
  slug: "software-engineer/02-solid/dependency-inversion-principle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/02-solid/interface-segregation-principle.md": {
	id: "software-engineer/02-solid/interface-segregation-principle.md";
  slug: "software-engineer/02-solid/interface-segregation-principle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/02-solid/liskov-substitution-principle.md": {
	id: "software-engineer/02-solid/liskov-substitution-principle.md";
  slug: "software-engineer/02-solid/liskov-substitution-principle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/02-solid/open-closed-principle.md": {
	id: "software-engineer/02-solid/open-closed-principle.md";
  slug: "software-engineer/02-solid/open-closed-principle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/02-solid/single-responsibility-principle.md": {
	id: "software-engineer/02-solid/single-responsibility-principle.md";
  slug: "software-engineer/02-solid/single-responsibility-principle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/coincidental-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/coincidental-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/coincidental-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/common-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/common-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/common-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/communicational-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/communicational-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/communicational-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/content-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/content-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/content-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/control-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/control-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/control-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/coupling.md": {
	id: "software-engineer/03-coupling-cohesion/coupling.md";
  slug: "software-engineer/03-coupling-cohesion/coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/data-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/data-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/data-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/external-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/external-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/external-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/functional-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/functional-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/functional-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/healthy-architecture.md": {
	id: "software-engineer/03-coupling-cohesion/healthy-architecture.md";
  slug: "software-engineer/03-coupling-cohesion/healthy-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/high-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/high-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/high-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/logical-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/logical-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/logical-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/loose-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/loose-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/loose-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/low-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/low-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/low-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/procedural-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/procedural-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/procedural-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/sequential-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/sequential-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/sequential-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/temporal-cohesion.md": {
	id: "software-engineer/03-coupling-cohesion/temporal-cohesion.md";
  slug: "software-engineer/03-coupling-cohesion/temporal-cohesion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/temporal-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/temporal-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/temporal-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/03-coupling-cohesion/tight-coupling.md": {
	id: "software-engineer/03-coupling-cohesion/tight-coupling.md";
  slug: "software-engineer/03-coupling-cohesion/tight-coupling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/actor-model.md": {
	id: "software-engineer/04-architectural-styles/actor-model.md";
  slug: "software-engineer/04-architectural-styles/actor-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/cell-based-architecture.md": {
	id: "software-engineer/04-architectural-styles/cell-based-architecture.md";
  slug: "software-engineer/04-architectural-styles/cell-based-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/clean-architecture.md": {
	id: "software-engineer/04-architectural-styles/clean-architecture.md";
  slug: "software-engineer/04-architectural-styles/clean-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/client-server.md": {
	id: "software-engineer/04-architectural-styles/client-server.md";
  slug: "software-engineer/04-architectural-styles/client-server";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/command-based-architecture.md": {
	id: "software-engineer/04-architectural-styles/command-based-architecture.md";
  slug: "software-engineer/04-architectural-styles/command-based-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/component-based-architecture.md": {
	id: "software-engineer/04-architectural-styles/component-based-architecture.md";
  slug: "software-engineer/04-architectural-styles/component-based-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/cqrs.md": {
	id: "software-engineer/04-architectural-styles/cqrs.md";
  slug: "software-engineer/04-architectural-styles/cqrs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/data-centric-architecture.md": {
	id: "software-engineer/04-architectural-styles/data-centric-architecture.md";
  slug: "software-engineer/04-architectural-styles/data-centric-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/distributed-monolith.md": {
	id: "software-engineer/04-architectural-styles/distributed-monolith.md";
  slug: "software-engineer/04-architectural-styles/distributed-monolith";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/event-driven-architecture.md": {
	id: "software-engineer/04-architectural-styles/event-driven-architecture.md";
  slug: "software-engineer/04-architectural-styles/event-driven-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/event-sourced-architecture.md": {
	id: "software-engineer/04-architectural-styles/event-sourced-architecture.md";
  slug: "software-engineer/04-architectural-styles/event-sourced-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/feature-based-architecture.md": {
	id: "software-engineer/04-architectural-styles/feature-based-architecture.md";
  slug: "software-engineer/04-architectural-styles/feature-based-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/hexagonal-architecture.md": {
	id: "software-engineer/04-architectural-styles/hexagonal-architecture.md";
  slug: "software-engineer/04-architectural-styles/hexagonal-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/layered-architecture.md": {
	id: "software-engineer/04-architectural-styles/layered-architecture.md";
  slug: "software-engineer/04-architectural-styles/layered-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/message-oriented-architecture.md": {
	id: "software-engineer/04-architectural-styles/message-oriented-architecture.md";
  slug: "software-engineer/04-architectural-styles/message-oriented-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/microkernel-architecture.md": {
	id: "software-engineer/04-architectural-styles/microkernel-architecture.md";
  slug: "software-engineer/04-architectural-styles/microkernel-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/microservices.md": {
	id: "software-engineer/04-architectural-styles/microservices.md";
  slug: "software-engineer/04-architectural-styles/microservices";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/modular-monolith.md": {
	id: "software-engineer/04-architectural-styles/modular-monolith.md";
  slug: "software-engineer/04-architectural-styles/modular-monolith";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/monolith.md": {
	id: "software-engineer/04-architectural-styles/monolith.md";
  slug: "software-engineer/04-architectural-styles/monolith";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/n-tier-architecture.md": {
	id: "software-engineer/04-architectural-styles/n-tier-architecture.md";
  slug: "software-engineer/04-architectural-styles/n-tier-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/onion-architecture.md": {
	id: "software-engineer/04-architectural-styles/onion-architecture.md";
  slug: "software-engineer/04-architectural-styles/onion-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/peer-to-peer.md": {
	id: "software-engineer/04-architectural-styles/peer-to-peer.md";
  slug: "software-engineer/04-architectural-styles/peer-to-peer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/pipe-and-filter.md": {
	id: "software-engineer/04-architectural-styles/pipe-and-filter.md";
  slug: "software-engineer/04-architectural-styles/pipe-and-filter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/plugin-architecture.md": {
	id: "software-engineer/04-architectural-styles/plugin-architecture.md";
  slug: "software-engineer/04-architectural-styles/plugin-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/ports-and-adapters.md": {
	id: "software-engineer/04-architectural-styles/ports-and-adapters.md";
  slug: "software-engineer/04-architectural-styles/ports-and-adapters";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/reactive-architecture.md": {
	id: "software-engineer/04-architectural-styles/reactive-architecture.md";
  slug: "software-engineer/04-architectural-styles/reactive-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/serverless.md": {
	id: "software-engineer/04-architectural-styles/serverless.md";
  slug: "software-engineer/04-architectural-styles/serverless";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/service-based-architecture.md": {
	id: "software-engineer/04-architectural-styles/service-based-architecture.md";
  slug: "software-engineer/04-architectural-styles/service-based-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/soa.md": {
	id: "software-engineer/04-architectural-styles/soa.md";
  slug: "software-engineer/04-architectural-styles/soa";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/space-based-architecture.md": {
	id: "software-engineer/04-architectural-styles/space-based-architecture.md";
  slug: "software-engineer/04-architectural-styles/space-based-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/04-architectural-styles/vertical-slice-architecture.md": {
	id: "software-engineer/04-architectural-styles/vertical-slice-architecture.md";
  slug: "software-engineer/04-architectural-styles/vertical-slice-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/aggregator.md": {
	id: "software-engineer/05-architectural-patterns/aggregator.md";
  slug: "software-engineer/05-architectural-patterns/aggregator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/ambassador.md": {
	id: "software-engineer/05-architectural-patterns/ambassador.md";
  slug: "software-engineer/05-architectural-patterns/ambassador";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/api-gateway.md": {
	id: "software-engineer/05-architectural-patterns/api-gateway.md";
  slug: "software-engineer/05-architectural-patterns/api-gateway";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/application.md": {
	id: "software-engineer/05-architectural-patterns/application.md";
  slug: "software-engineer/05-architectural-patterns/application";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/backend-for-frontend.md": {
	id: "software-engineer/05-architectural-patterns/backend-for-frontend.md";
  slug: "software-engineer/05-architectural-patterns/backend-for-frontend";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/bulkhead.md": {
	id: "software-engineer/05-architectural-patterns/bulkhead.md";
  slug: "software-engineer/05-architectural-patterns/bulkhead";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/chained-services.md": {
	id: "software-engineer/05-architectural-patterns/chained-services.md";
  slug: "software-engineer/05-architectural-patterns/chained-services";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/circuit-breaker.md": {
	id: "software-engineer/05-architectural-patterns/circuit-breaker.md";
  slug: "software-engineer/05-architectural-patterns/circuit-breaker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/command.md": {
	id: "software-engineer/05-architectural-patterns/command.md";
  slug: "software-engineer/05-architectural-patterns/command";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/database-per-service.md": {
	id: "software-engineer/05-architectural-patterns/database-per-service.md";
  slug: "software-engineer/05-architectural-patterns/database-per-service";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/dependency-rule.md": {
	id: "software-engineer/05-architectural-patterns/dependency-rule.md";
  slug: "software-engineer/05-architectural-patterns/dependency-rule";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/distributed-transaction.md": {
	id: "software-engineer/05-architectural-patterns/distributed-transaction.md";
  slug: "software-engineer/05-architectural-patterns/distributed-transaction";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/domain.md": {
	id: "software-engineer/05-architectural-patterns/domain.md";
  slug: "software-engineer/05-architectural-patterns/domain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/entities.md": {
	id: "software-engineer/05-architectural-patterns/entities.md";
  slug: "software-engineer/05-architectural-patterns/entities";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/event-carried-state-transfer.md": {
	id: "software-engineer/05-architectural-patterns/event-carried-state-transfer.md";
  slug: "software-engineer/05-architectural-patterns/event-carried-state-transfer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/event-collaboration.md": {
	id: "software-engineer/05-architectural-patterns/event-collaboration.md";
  slug: "software-engineer/05-architectural-patterns/event-collaboration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/event-notification.md": {
	id: "software-engineer/05-architectural-patterns/event-notification.md";
  slug: "software-engineer/05-architectural-patterns/event-notification";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/event-store.md": {
	id: "software-engineer/05-architectural-patterns/event-store.md";
  slug: "software-engineer/05-architectural-patterns/event-store";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/event-streaming.md": {
	id: "software-engineer/05-architectural-patterns/event-streaming.md";
  slug: "software-engineer/05-architectural-patterns/event-streaming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/event.md": {
	id: "software-engineer/05-architectural-patterns/event.md";
  slug: "software-engineer/05-architectural-patterns/event";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/external-world.md": {
	id: "software-engineer/05-architectural-patterns/external-world.md";
  slug: "software-engineer/05-architectural-patterns/external-world";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/frameworks-drivers.md": {
	id: "software-engineer/05-architectural-patterns/frameworks-drivers.md";
  slug: "software-engineer/05-architectural-patterns/frameworks-drivers";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/inbox.md": {
	id: "software-engineer/05-architectural-patterns/inbox.md";
  slug: "software-engineer/05-architectural-patterns/inbox";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/infrastructure.md": {
	id: "software-engineer/05-architectural-patterns/infrastructure.md";
  slug: "software-engineer/05-architectural-patterns/infrastructure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/interface-adapters.md": {
	id: "software-engineer/05-architectural-patterns/interface-adapters.md";
  slug: "software-engineer/05-architectural-patterns/interface-adapters";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/outbox.md": {
	id: "software-engineer/05-architectural-patterns/outbox.md";
  slug: "software-engineer/05-architectural-patterns/outbox";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/ports-adapters.md": {
	id: "software-engineer/05-architectural-patterns/ports-adapters.md";
  slug: "software-engineer/05-architectural-patterns/ports-adapters";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/presentation.md": {
	id: "software-engineer/05-architectural-patterns/presentation.md";
  slug: "software-engineer/05-architectural-patterns/presentation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/retry.md": {
	id: "software-engineer/05-architectural-patterns/retry.md";
  slug: "software-engineer/05-architectural-patterns/retry";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/saga.md": {
	id: "software-engineer/05-architectural-patterns/saga.md";
  slug: "software-engineer/05-architectural-patterns/saga";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/service-discovery.md": {
	id: "software-engineer/05-architectural-patterns/service-discovery.md";
  slug: "software-engineer/05-architectural-patterns/service-discovery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/service-mesh.md": {
	id: "software-engineer/05-architectural-patterns/service-mesh.md";
  slug: "software-engineer/05-architectural-patterns/service-mesh";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/shared-database.md": {
	id: "software-engineer/05-architectural-patterns/shared-database.md";
  slug: "software-engineer/05-architectural-patterns/shared-database";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/sidecar.md": {
	id: "software-engineer/05-architectural-patterns/sidecar.md";
  slug: "software-engineer/05-architectural-patterns/sidecar";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/state.md": {
	id: "software-engineer/05-architectural-patterns/state.md";
  slug: "software-engineer/05-architectural-patterns/state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/strangler-fig.md": {
	id: "software-engineer/05-architectural-patterns/strangler-fig.md";
  slug: "software-engineer/05-architectural-patterns/strangler-fig";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/timeout.md": {
	id: "software-engineer/05-architectural-patterns/timeout.md";
  slug: "software-engineer/05-architectural-patterns/timeout";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/05-architectural-patterns/use-cases.md": {
	id: "software-engineer/05-architectural-patterns/use-cases.md";
  slug: "software-engineer/05-architectural-patterns/use-cases";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/abstract-factory.md": {
	id: "software-engineer/06-classical-gof-design-patterns/abstract-factory.md";
  slug: "software-engineer/06-classical-gof-design-patterns/abstract-factory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/adapter.md": {
	id: "software-engineer/06-classical-gof-design-patterns/adapter.md";
  slug: "software-engineer/06-classical-gof-design-patterns/adapter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/bridge.md": {
	id: "software-engineer/06-classical-gof-design-patterns/bridge.md";
  slug: "software-engineer/06-classical-gof-design-patterns/bridge";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/builder.md": {
	id: "software-engineer/06-classical-gof-design-patterns/builder.md";
  slug: "software-engineer/06-classical-gof-design-patterns/builder";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/chain-of-responsibility.md": {
	id: "software-engineer/06-classical-gof-design-patterns/chain-of-responsibility.md";
  slug: "software-engineer/06-classical-gof-design-patterns/chain-of-responsibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/command.md": {
	id: "software-engineer/06-classical-gof-design-patterns/command.md";
  slug: "software-engineer/06-classical-gof-design-patterns/command";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/composite.md": {
	id: "software-engineer/06-classical-gof-design-patterns/composite.md";
  slug: "software-engineer/06-classical-gof-design-patterns/composite";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/decorator.md": {
	id: "software-engineer/06-classical-gof-design-patterns/decorator.md";
  slug: "software-engineer/06-classical-gof-design-patterns/decorator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/facade.md": {
	id: "software-engineer/06-classical-gof-design-patterns/facade.md";
  slug: "software-engineer/06-classical-gof-design-patterns/facade";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/factory-method.md": {
	id: "software-engineer/06-classical-gof-design-patterns/factory-method.md";
  slug: "software-engineer/06-classical-gof-design-patterns/factory-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/flyweight.md": {
	id: "software-engineer/06-classical-gof-design-patterns/flyweight.md";
  slug: "software-engineer/06-classical-gof-design-patterns/flyweight";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/interpreter.md": {
	id: "software-engineer/06-classical-gof-design-patterns/interpreter.md";
  slug: "software-engineer/06-classical-gof-design-patterns/interpreter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/iterator.md": {
	id: "software-engineer/06-classical-gof-design-patterns/iterator.md";
  slug: "software-engineer/06-classical-gof-design-patterns/iterator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/mediator.md": {
	id: "software-engineer/06-classical-gof-design-patterns/mediator.md";
  slug: "software-engineer/06-classical-gof-design-patterns/mediator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/memento.md": {
	id: "software-engineer/06-classical-gof-design-patterns/memento.md";
  slug: "software-engineer/06-classical-gof-design-patterns/memento";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/observer.md": {
	id: "software-engineer/06-classical-gof-design-patterns/observer.md";
  slug: "software-engineer/06-classical-gof-design-patterns/observer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/prototype.md": {
	id: "software-engineer/06-classical-gof-design-patterns/prototype.md";
  slug: "software-engineer/06-classical-gof-design-patterns/prototype";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/proxy.md": {
	id: "software-engineer/06-classical-gof-design-patterns/proxy.md";
  slug: "software-engineer/06-classical-gof-design-patterns/proxy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/singleton.md": {
	id: "software-engineer/06-classical-gof-design-patterns/singleton.md";
  slug: "software-engineer/06-classical-gof-design-patterns/singleton";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/state.md": {
	id: "software-engineer/06-classical-gof-design-patterns/state.md";
  slug: "software-engineer/06-classical-gof-design-patterns/state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/strategy.md": {
	id: "software-engineer/06-classical-gof-design-patterns/strategy.md";
  slug: "software-engineer/06-classical-gof-design-patterns/strategy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/template-method.md": {
	id: "software-engineer/06-classical-gof-design-patterns/template-method.md";
  slug: "software-engineer/06-classical-gof-design-patterns/template-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/06-classical-gof-design-patterns/visitor.md": {
	id: "software-engineer/06-classical-gof-design-patterns/visitor.md";
  slug: "software-engineer/06-classical-gof-design-patterns/visitor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/active-record.md": {
	id: "software-engineer/07-other-important-design-patterns/active-record.md";
  slug: "software-engineer/07-other-important-design-patterns/active-record";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/aggregator.md": {
	id: "software-engineer/07-other-important-design-patterns/aggregator.md";
  slug: "software-engineer/07-other-important-design-patterns/aggregator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/application-controller.md": {
	id: "software-engineer/07-other-important-design-patterns/application-controller.md";
  slug: "software-engineer/07-other-important-design-patterns/application-controller";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/claim-check.md": {
	id: "software-engineer/07-other-important-design-patterns/claim-check.md";
  slug: "software-engineer/07-other-important-design-patterns/claim-check";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/competing-consumers.md": {
	id: "software-engineer/07-other-important-design-patterns/competing-consumers.md";
  slug: "software-engineer/07-other-important-design-patterns/competing-consumers";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/data-mapper.md": {
	id: "software-engineer/07-other-important-design-patterns/data-mapper.md";
  slug: "software-engineer/07-other-important-design-patterns/data-mapper";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/data-transfer-object.md": {
	id: "software-engineer/07-other-important-design-patterns/data-transfer-object.md";
  slug: "software-engineer/07-other-important-design-patterns/data-transfer-object";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/dead-letter-channel.md": {
	id: "software-engineer/07-other-important-design-patterns/dead-letter-channel.md";
  slug: "software-engineer/07-other-important-design-patterns/dead-letter-channel";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/domain-model.md": {
	id: "software-engineer/07-other-important-design-patterns/domain-model.md";
  slug: "software-engineer/07-other-important-design-patterns/domain-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/dto.md": {
	id: "software-engineer/07-other-important-design-patterns/dto.md";
  slug: "software-engineer/07-other-important-design-patterns/dto";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/enterprise-patterns.md": {
	id: "software-engineer/07-other-important-design-patterns/enterprise-patterns.md";
  slug: "software-engineer/07-other-important-design-patterns/enterprise-patterns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/front-controller.md": {
	id: "software-engineer/07-other-important-design-patterns/front-controller.md";
  slug: "software-engineer/07-other-important-design-patterns/front-controller";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/gateway.md": {
	id: "software-engineer/07-other-important-design-patterns/gateway.md";
  slug: "software-engineer/07-other-important-design-patterns/gateway";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/guaranteed-delivery.md": {
	id: "software-engineer/07-other-important-design-patterns/guaranteed-delivery.md";
  slug: "software-engineer/07-other-important-design-patterns/guaranteed-delivery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/idempotent-receiver.md": {
	id: "software-engineer/07-other-important-design-patterns/idempotent-receiver.md";
  slug: "software-engineer/07-other-important-design-patterns/idempotent-receiver";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/identity-map.md": {
	id: "software-engineer/07-other-important-design-patterns/identity-map.md";
  slug: "software-engineer/07-other-important-design-patterns/identity-map";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/integration-patterns.md": {
	id: "software-engineer/07-other-important-design-patterns/integration-patterns.md";
  slug: "software-engineer/07-other-important-design-patterns/integration-patterns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/lazy-load.md": {
	id: "software-engineer/07-other-important-design-patterns/lazy-load.md";
  slug: "software-engineer/07-other-important-design-patterns/lazy-load";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/message-channel.md": {
	id: "software-engineer/07-other-important-design-patterns/message-channel.md";
  slug: "software-engineer/07-other-important-design-patterns/message-channel";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/message-endpoint.md": {
	id: "software-engineer/07-other-important-design-patterns/message-endpoint.md";
  slug: "software-engineer/07-other-important-design-patterns/message-endpoint";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/message-filter.md": {
	id: "software-engineer/07-other-important-design-patterns/message-filter.md";
  slug: "software-engineer/07-other-important-design-patterns/message-filter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/message-router.md": {
	id: "software-engineer/07-other-important-design-patterns/message-router.md";
  slug: "software-engineer/07-other-important-design-patterns/message-router";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/message-translator.md": {
	id: "software-engineer/07-other-important-design-patterns/message-translator.md";
  slug: "software-engineer/07-other-important-design-patterns/message-translator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/polling-consumer.md": {
	id: "software-engineer/07-other-important-design-patterns/polling-consumer.md";
  slug: "software-engineer/07-other-important-design-patterns/polling-consumer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/repository.md": {
	id: "software-engineer/07-other-important-design-patterns/repository.md";
  slug: "software-engineer/07-other-important-design-patterns/repository";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/resequencer.md": {
	id: "software-engineer/07-other-important-design-patterns/resequencer.md";
  slug: "software-engineer/07-other-important-design-patterns/resequencer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/service-layer.md": {
	id: "software-engineer/07-other-important-design-patterns/service-layer.md";
  slug: "software-engineer/07-other-important-design-patterns/service-layer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/specification.md": {
	id: "software-engineer/07-other-important-design-patterns/specification.md";
  slug: "software-engineer/07-other-important-design-patterns/specification";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/splitter.md": {
	id: "software-engineer/07-other-important-design-patterns/splitter.md";
  slug: "software-engineer/07-other-important-design-patterns/splitter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/transaction-script.md": {
	id: "software-engineer/07-other-important-design-patterns/transaction-script.md";
  slug: "software-engineer/07-other-important-design-patterns/transaction-script";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/unit-of-work.md": {
	id: "software-engineer/07-other-important-design-patterns/unit-of-work.md";
  slug: "software-engineer/07-other-important-design-patterns/unit-of-work";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/07-other-important-design-patterns/value-object.md": {
	id: "software-engineer/07-other-important-design-patterns/value-object.md";
  slug: "software-engineer/07-other-important-design-patterns/value-object";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/aggregate-root.md": {
	id: "software-engineer/08-domain-driven-design/aggregate-root.md";
  slug: "software-engineer/08-domain-driven-design/aggregate-root";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/aggregate.md": {
	id: "software-engineer/08-domain-driven-design/aggregate.md";
  slug: "software-engineer/08-domain-driven-design/aggregate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/anti-corruption-layer.md": {
	id: "software-engineer/08-domain-driven-design/anti-corruption-layer.md";
  slug: "software-engineer/08-domain-driven-design/anti-corruption-layer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/application-service.md": {
	id: "software-engineer/08-domain-driven-design/application-service.md";
  slug: "software-engineer/08-domain-driven-design/application-service";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/bounded-context.md": {
	id: "software-engineer/08-domain-driven-design/bounded-context.md";
  slug: "software-engineer/08-domain-driven-design/bounded-context";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/conformist.md": {
	id: "software-engineer/08-domain-driven-design/conformist.md";
  slug: "software-engineer/08-domain-driven-design/conformist";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/context-map.md": {
	id: "software-engineer/08-domain-driven-design/context-map.md";
  slug: "software-engineer/08-domain-driven-design/context-map";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/core-domain.md": {
	id: "software-engineer/08-domain-driven-design/core-domain.md";
  slug: "software-engineer/08-domain-driven-design/core-domain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/customer-supplier.md": {
	id: "software-engineer/08-domain-driven-design/customer-supplier.md";
  slug: "software-engineer/08-domain-driven-design/customer-supplier";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/domain-event.md": {
	id: "software-engineer/08-domain-driven-design/domain-event.md";
  slug: "software-engineer/08-domain-driven-design/domain-event";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/domain-service.md": {
	id: "software-engineer/08-domain-driven-design/domain-service.md";
  slug: "software-engineer/08-domain-driven-design/domain-service";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/domain.md": {
	id: "software-engineer/08-domain-driven-design/domain.md";
  slug: "software-engineer/08-domain-driven-design/domain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/entity.md": {
	id: "software-engineer/08-domain-driven-design/entity.md";
  slug: "software-engineer/08-domain-driven-design/entity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/factory.md": {
	id: "software-engineer/08-domain-driven-design/factory.md";
  slug: "software-engineer/08-domain-driven-design/factory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/generic-subdomain.md": {
	id: "software-engineer/08-domain-driven-design/generic-subdomain.md";
  slug: "software-engineer/08-domain-driven-design/generic-subdomain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/integration-event.md": {
	id: "software-engineer/08-domain-driven-design/integration-event.md";
  slug: "software-engineer/08-domain-driven-design/integration-event";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/open-host-service.md": {
	id: "software-engineer/08-domain-driven-design/open-host-service.md";
  slug: "software-engineer/08-domain-driven-design/open-host-service";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/published-language.md": {
	id: "software-engineer/08-domain-driven-design/published-language.md";
  slug: "software-engineer/08-domain-driven-design/published-language";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/repository.md": {
	id: "software-engineer/08-domain-driven-design/repository.md";
  slug: "software-engineer/08-domain-driven-design/repository";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/shared-kernel.md": {
	id: "software-engineer/08-domain-driven-design/shared-kernel.md";
  slug: "software-engineer/08-domain-driven-design/shared-kernel";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/subdomain.md": {
	id: "software-engineer/08-domain-driven-design/subdomain.md";
  slug: "software-engineer/08-domain-driven-design/subdomain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/supporting-subdomain.md": {
	id: "software-engineer/08-domain-driven-design/supporting-subdomain.md";
  slug: "software-engineer/08-domain-driven-design/supporting-subdomain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/ubiquitous-language.md": {
	id: "software-engineer/08-domain-driven-design/ubiquitous-language.md";
  slug: "software-engineer/08-domain-driven-design/ubiquitous-language";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/08-domain-driven-design/value-object.md": {
	id: "software-engineer/08-domain-driven-design/value-object.md";
  slug: "software-engineer/08-domain-driven-design/value-object";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/bad.md": {
	id: "software-engineer/09-dependency-injection/bad.md";
  slug: "software-engineer/09-dependency-injection/bad";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/better.md": {
	id: "software-engineer/09-dependency-injection/better.md";
  slug: "software-engineer/09-dependency-injection/better";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/business-logic.md": {
	id: "software-engineer/09-dependency-injection/business-logic.md";
  slug: "software-engineer/09-dependency-injection/business-logic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/circular-dependencies.md": {
	id: "software-engineer/09-dependency-injection/circular-dependencies.md";
  slug: "software-engineer/09-dependency-injection/circular-dependencies";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/composition-root.md": {
	id: "software-engineer/09-dependency-injection/composition-root.md";
  slug: "software-engineer/09-dependency-injection/composition-root";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/concrete-database.md": {
	id: "software-engineer/09-dependency-injection/concrete-database.md";
  slug: "software-engineer/09-dependency-injection/concrete-database";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/constructor-injection.md": {
	id: "software-engineer/09-dependency-injection/constructor-injection.md";
  slug: "software-engineer/09-dependency-injection/constructor-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/database-implementation.md": {
	id: "software-engineer/09-dependency-injection/database-implementation.md";
  slug: "software-engineer/09-dependency-injection/database-implementation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/dependency-graph.md": {
	id: "software-engineer/09-dependency-injection/dependency-graph.md";
  slug: "software-engineer/09-dependency-injection/dependency-graph";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/dependency-injection-container.md": {
	id: "software-engineer/09-dependency-injection/dependency-injection-container.md";
  slug: "software-engineer/09-dependency-injection/dependency-injection-container";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/dependency-inversion.md": {
	id: "software-engineer/09-dependency-injection/dependency-inversion.md";
  slug: "software-engineer/09-dependency-injection/dependency-inversion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/di-concepts.md": {
	id: "software-engineer/09-dependency-injection/di-concepts.md";
  slug: "software-engineer/09-dependency-injection/di-concepts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/injection-types.md": {
	id: "software-engineer/09-dependency-injection/injection-types.md";
  slug: "software-engineer/09-dependency-injection/injection-types";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/interface-injection.md": {
	id: "software-engineer/09-dependency-injection/interface-injection.md";
  slug: "software-engineer/09-dependency-injection/interface-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/interface.md": {
	id: "software-engineer/09-dependency-injection/interface.md";
  slug: "software-engineer/09-dependency-injection/interface";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/ioc-inversion-of-control.md": {
	id: "software-engineer/09-dependency-injection/ioc-inversion-of-control.md";
  slug: "software-engineer/09-dependency-injection/ioc-inversion-of-control";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/lifetime-management.md": {
	id: "software-engineer/09-dependency-injection/lifetime-management.md";
  slug: "software-engineer/09-dependency-injection/lifetime-management";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/method-injection.md": {
	id: "software-engineer/09-dependency-injection/method-injection.md";
  slug: "software-engineer/09-dependency-injection/method-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/parameter-injection.md": {
	id: "software-engineer/09-dependency-injection/parameter-injection.md";
  slug: "software-engineer/09-dependency-injection/parameter-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/property-injection.md": {
	id: "software-engineer/09-dependency-injection/property-injection.md";
  slug: "software-engineer/09-dependency-injection/property-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/scoped-lifetime.md": {
	id: "software-engineer/09-dependency-injection/scoped-lifetime.md";
  slug: "software-engineer/09-dependency-injection/scoped-lifetime";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/service-locator.md": {
	id: "software-engineer/09-dependency-injection/service-locator.md";
  slug: "software-engineer/09-dependency-injection/service-locator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/setter-injection.md": {
	id: "software-engineer/09-dependency-injection/setter-injection.md";
  slug: "software-engineer/09-dependency-injection/setter-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/singleton-lifetime.md": {
	id: "software-engineer/09-dependency-injection/singleton-lifetime.md";
  slug: "software-engineer/09-dependency-injection/singleton-lifetime";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/09-dependency-injection/transient-lifetime.md": {
	id: "software-engineer/09-dependency-injection/transient-lifetime.md";
  slug: "software-engineer/09-dependency-injection/transient-lifetime";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/amqp.md": {
	id: "software-engineer/10-api-design/amqp.md";
  slug: "software-engineer/10-api-design/amqp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/graphql.md": {
	id: "software-engineer/10-api-design/graphql.md";
  slug: "software-engineer/10-api-design/graphql";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/grpc.md": {
	id: "software-engineer/10-api-design/grpc.md";
  slug: "software-engineer/10-api-design/grpc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/json-rpc.md": {
	id: "software-engineer/10-api-design/json-rpc.md";
  slug: "software-engineer/10-api-design/json-rpc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/mqtt.md": {
	id: "software-engineer/10-api-design/mqtt.md";
  slug: "software-engineer/10-api-design/mqtt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/rest.md": {
	id: "software-engineer/10-api-design/rest.md";
  slug: "software-engineer/10-api-design/rest";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/soap.md": {
	id: "software-engineer/10-api-design/soap.md";
  slug: "software-engineer/10-api-design/soap";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/sse.md": {
	id: "software-engineer/10-api-design/sse.md";
  slug: "software-engineer/10-api-design/sse";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/webhooks.md": {
	id: "software-engineer/10-api-design/webhooks.md";
  slug: "software-engineer/10-api-design/webhooks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/websocket.md": {
	id: "software-engineer/10-api-design/websocket.md";
  slug: "software-engineer/10-api-design/websocket";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/10-api-design/xml-rpc.md": {
	id: "software-engineer/10-api-design/xml-rpc.md";
  slug: "software-engineer/10-api-design/xml-rpc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/duration.md": {
	id: "software-engineer/100-reliability-frameworks/duration.md";
  slug: "software-engineer/100-reliability-frameworks/duration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/four-golden-signals.md": {
	id: "software-engineer/100-reliability-frameworks/four-golden-signals.md";
  slug: "software-engineer/100-reliability-frameworks/four-golden-signals";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/rate.md": {
	id: "software-engineer/100-reliability-frameworks/rate.md";
  slug: "software-engineer/100-reliability-frameworks/rate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/red.md": {
	id: "software-engineer/100-reliability-frameworks/red.md";
  slug: "software-engineer/100-reliability-frameworks/red";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/saturation.md": {
	id: "software-engineer/100-reliability-frameworks/saturation.md";
  slug: "software-engineer/100-reliability-frameworks/saturation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/sre.md": {
	id: "software-engineer/100-reliability-frameworks/sre.md";
  slug: "software-engineer/100-reliability-frameworks/sre";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/traffic.md": {
	id: "software-engineer/100-reliability-frameworks/traffic.md";
  slug: "software-engineer/100-reliability-frameworks/traffic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/use.md": {
	id: "software-engineer/100-reliability-frameworks/use.md";
  slug: "software-engineer/100-reliability-frameworks/use";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/100-reliability-frameworks/utilization.md": {
	id: "software-engineer/100-reliability-frameworks/utilization.md";
  slug: "software-engineer/100-reliability-frameworks/utilization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/cia-triad.md": {
	id: "software-engineer/101-security-frameworks/cia-triad.md";
  slug: "software-engineer/101-security-frameworks/cia-triad";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/confidentiality.md": {
	id: "software-engineer/101-security-frameworks/confidentiality.md";
  slug: "software-engineer/101-security-frameworks/confidentiality";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/denial-of-service.md": {
	id: "software-engineer/101-security-frameworks/denial-of-service.md";
  slug: "software-engineer/101-security-frameworks/denial-of-service";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/elevation-of-privilege.md": {
	id: "software-engineer/101-security-frameworks/elevation-of-privilege.md";
  slug: "software-engineer/101-security-frameworks/elevation-of-privilege";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/information-disclosure.md": {
	id: "software-engineer/101-security-frameworks/information-disclosure.md";
  slug: "software-engineer/101-security-frameworks/information-disclosure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/integrity.md": {
	id: "software-engineer/101-security-frameworks/integrity.md";
  slug: "software-engineer/101-security-frameworks/integrity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/repudiation.md": {
	id: "software-engineer/101-security-frameworks/repudiation.md";
  slug: "software-engineer/101-security-frameworks/repudiation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/secure-sdlc.md": {
	id: "software-engineer/101-security-frameworks/secure-sdlc.md";
  slug: "software-engineer/101-security-frameworks/secure-sdlc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/spoofing.md": {
	id: "software-engineer/101-security-frameworks/spoofing.md";
  slug: "software-engineer/101-security-frameworks/spoofing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/101-security-frameworks/tampering.md": {
	id: "software-engineer/101-security-frameworks/tampering.md";
  slug: "software-engineer/101-security-frameworks/tampering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/benchmarking.md": {
	id: "software-engineer/102-performance-thinking/benchmarking.md";
  slug: "software-engineer/102-performance-thinking/benchmarking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/bottleneck-analysis.md": {
	id: "software-engineer/102-performance-thinking/bottleneck-analysis.md";
  slug: "software-engineer/102-performance-thinking/bottleneck-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/capacity-testing.md": {
	id: "software-engineer/102-performance-thinking/capacity-testing.md";
  slug: "software-engineer/102-performance-thinking/capacity-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/flame-graphs.md": {
	id: "software-engineer/102-performance-thinking/flame-graphs.md";
  slug: "software-engineer/102-performance-thinking/flame-graphs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/load-testing.md": {
	id: "software-engineer/102-performance-thinking/load-testing.md";
  slug: "software-engineer/102-performance-thinking/load-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/queueing-theory.md": {
	id: "software-engineer/102-performance-thinking/queueing-theory.md";
  slug: "software-engineer/102-performance-thinking/queueing-theory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/soak-testing.md": {
	id: "software-engineer/102-performance-thinking/soak-testing.md";
  slug: "software-engineer/102-performance-thinking/soak-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/spike-testing.md": {
	id: "software-engineer/102-performance-thinking/spike-testing.md";
  slug: "software-engineer/102-performance-thinking/spike-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/102-performance-thinking/stress-testing.md": {
	id: "software-engineer/102-performance-thinking/stress-testing.md";
  slug: "software-engineer/102-performance-thinking/stress-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/103-distributed-system-theory/availability-vs-consistency.md": {
	id: "software-engineer/103-distributed-system-theory/availability-vs-consistency.md";
  slug: "software-engineer/103-distributed-system-theory/availability-vs-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/103-distributed-system-theory/brewer-s-cap-theorem.md": {
	id: "software-engineer/103-distributed-system-theory/brewer-s-cap-theorem.md";
  slug: "software-engineer/103-distributed-system-theory/brewer-s-cap-theorem";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/103-distributed-system-theory/cap.md": {
	id: "software-engineer/103-distributed-system-theory/cap.md";
  slug: "software-engineer/103-distributed-system-theory/cap";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/103-distributed-system-theory/lamport-logical-clocks.md": {
	id: "software-engineer/103-distributed-system-theory/lamport-logical-clocks.md";
  slug: "software-engineer/103-distributed-system-theory/lamport-logical-clocks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/103-distributed-system-theory/latency-vs-consistency.md": {
	id: "software-engineer/103-distributed-system-theory/latency-vs-consistency.md";
  slug: "software-engineer/103-distributed-system-theory/latency-vs-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/4nf.md": {
	id: "software-engineer/104-database-theory/4nf.md";
  slug: "software-engineer/104-database-theory/4nf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/5nf.md": {
	id: "software-engineer/104-database-theory/5nf.md";
  slug: "software-engineer/104-database-theory/5nf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/acid.md": {
	id: "software-engineer/104-database-theory/acid.md";
  slug: "software-engineer/104-database-theory/acid";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/base.md": {
	id: "software-engineer/104-database-theory/base.md";
  slug: "software-engineer/104-database-theory/base";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/mvcc.md": {
	id: "software-engineer/104-database-theory/mvcc.md";
  slug: "software-engineer/104-database-theory/mvcc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/normal-forms.md": {
	id: "software-engineer/104-database-theory/normal-forms.md";
  slug: "software-engineer/104-database-theory/normal-forms";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/pessimistic-concurrency.md": {
	id: "software-engineer/104-database-theory/pessimistic-concurrency.md";
  slug: "software-engineer/104-database-theory/pessimistic-concurrency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/104-database-theory/transaction-isolation.md": {
	id: "software-engineer/104-database-theory/transaction-isolation.md";
  slug: "software-engineer/104-database-theory/transaction-isolation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/agile.md": {
	id: "software-engineer/105-software-development-methodologies/agile.md";
  slug: "software-engineer/105-software-development-methodologies/agile";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/devops.md": {
	id: "software-engineer/105-software-development-methodologies/devops.md";
  slug: "software-engineer/105-software-development-methodologies/devops";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/devsecops.md": {
	id: "software-engineer/105-software-development-methodologies/devsecops.md";
  slug: "software-engineer/105-software-development-methodologies/devsecops";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/extreme-programming.md": {
	id: "software-engineer/105-software-development-methodologies/extreme-programming.md";
  slug: "software-engineer/105-software-development-methodologies/extreme-programming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/incremental.md": {
	id: "software-engineer/105-software-development-methodologies/incremental.md";
  slug: "software-engineer/105-software-development-methodologies/incremental";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/iterative.md": {
	id: "software-engineer/105-software-development-methodologies/iterative.md";
  slug: "software-engineer/105-software-development-methodologies/iterative";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/prototype-model.md": {
	id: "software-engineer/105-software-development-methodologies/prototype-model.md";
  slug: "software-engineer/105-software-development-methodologies/prototype-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/rad.md": {
	id: "software-engineer/105-software-development-methodologies/rad.md";
  slug: "software-engineer/105-software-development-methodologies/rad";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/spiral.md": {
	id: "software-engineer/105-software-development-methodologies/spiral.md";
  slug: "software-engineer/105-software-development-methodologies/spiral";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/v-model.md": {
	id: "software-engineer/105-software-development-methodologies/v-model.md";
  slug: "software-engineer/105-software-development-methodologies/v-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/105-software-development-methodologies/waterfall.md": {
	id: "software-engineer/105-software-development-methodologies/waterfall.md";
  slug: "software-engineer/105-software-development-methodologies/waterfall";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/critical-path-method.md": {
	id: "software-engineer/106-project-management/critical-path-method.md";
  slug: "software-engineer/106-project-management/critical-path-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/dependency-mapping.md": {
	id: "software-engineer/106-project-management/dependency-mapping.md";
  slug: "software-engineer/106-project-management/dependency-mapping";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/gantt.md": {
	id: "software-engineer/106-project-management/gantt.md";
  slug: "software-engineer/106-project-management/gantt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/issues.md": {
	id: "software-engineer/106-project-management/issues.md";
  slug: "software-engineer/106-project-management/issues";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/milestones.md": {
	id: "software-engineer/106-project-management/milestones.md";
  slug: "software-engineer/106-project-management/milestones";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/raid-log.md": {
	id: "software-engineer/106-project-management/raid-log.md";
  slug: "software-engineer/106-project-management/raid-log";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/raid.md": {
	id: "software-engineer/106-project-management/raid.md";
  slug: "software-engineer/106-project-management/raid";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/risk-register.md": {
	id: "software-engineer/106-project-management/risk-register.md";
  slug: "software-engineer/106-project-management/risk-register";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/risks.md": {
	id: "software-engineer/106-project-management/risks.md";
  slug: "software-engineer/106-project-management/risks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/stakeholder-mapping.md": {
	id: "software-engineer/106-project-management/stakeholder-mapping.md";
  slug: "software-engineer/106-project-management/stakeholder-mapping";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/106-project-management/wbs.md": {
	id: "software-engineer/106-project-management/wbs.md";
  slug: "software-engineer/106-project-management/wbs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/brd.md": {
	id: "software-engineer/107-engineering-design-documents/brd.md";
  slug: "software-engineer/107-engineering-design-documents/brd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/design-review.md": {
	id: "software-engineer/107-engineering-design-documents/design-review.md";
  slug: "software-engineer/107-engineering-design-documents/design-review";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/frd.md": {
	id: "software-engineer/107-engineering-design-documents/frd.md";
  slug: "software-engineer/107-engineering-design-documents/frd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/hld.md": {
	id: "software-engineer/107-engineering-design-documents/hld.md";
  slug: "software-engineer/107-engineering-design-documents/hld";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/lld.md": {
	id: "software-engineer/107-engineering-design-documents/lld.md";
  slug: "software-engineer/107-engineering-design-documents/lld";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/postmortem.md": {
	id: "software-engineer/107-engineering-design-documents/postmortem.md";
  slug: "software-engineer/107-engineering-design-documents/postmortem";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/prd.md": {
	id: "software-engineer/107-engineering-design-documents/prd.md";
  slug: "software-engineer/107-engineering-design-documents/prd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/test-plan.md": {
	id: "software-engineer/107-engineering-design-documents/test-plan.md";
  slug: "software-engineer/107-engineering-design-documents/test-plan";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/107-engineering-design-documents/trd.md": {
	id: "software-engineer/107-engineering-design-documents/trd.md";
  slug: "software-engineer/107-engineering-design-documents/trd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/108-architecture-decision-frameworks/architecture-fitness-functions.md": {
	id: "software-engineer/108-architecture-decision-frameworks/architecture-fitness-functions.md";
  slug: "software-engineer/108-architecture-decision-frameworks/architecture-fitness-functions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/108-architecture-decision-frameworks/atam.md": {
	id: "software-engineer/108-architecture-decision-frameworks/atam.md";
  slug: "software-engineer/108-architecture-decision-frameworks/atam";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/agent-patterns.md": {
	id: "software-engineer/109-ai-agent-engineering/agent-patterns.md";
  slug: "software-engineer/109-ai-agent-engineering/agent-patterns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/agent-reliability.md": {
	id: "software-engineer/109-ai-agent-engineering/agent-reliability.md";
  slug: "software-engineer/109-ai-agent-engineering/agent-reliability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/budget-limits.md": {
	id: "software-engineer/109-ai-agent-engineering/budget-limits.md";
  slug: "software-engineer/109-ai-agent-engineering/budget-limits";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/context-compression.md": {
	id: "software-engineer/109-ai-agent-engineering/context-compression.md";
  slug: "software-engineer/109-ai-agent-engineering/context-compression";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/critic.md": {
	id: "software-engineer/109-ai-agent-engineering/critic.md";
  slug: "software-engineer/109-ai-agent-engineering/critic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/deterministic-components.md": {
	id: "software-engineer/109-ai-agent-engineering/deterministic-components.md";
  slug: "software-engineer/109-ai-agent-engineering/deterministic-components";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/evaluator.md": {
	id: "software-engineer/109-ai-agent-engineering/evaluator.md";
  slug: "software-engineer/109-ai-agent-engineering/evaluator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/executor.md": {
	id: "software-engineer/109-ai-agent-engineering/executor.md";
  slug: "software-engineer/109-ai-agent-engineering/executor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/fallback-models.md": {
	id: "software-engineer/109-ai-agent-engineering/fallback-models.md";
  slug: "software-engineer/109-ai-agent-engineering/fallback-models";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/llm-patterns.md": {
	id: "software-engineer/109-ai-agent-engineering/llm-patterns.md";
  slug: "software-engineer/109-ai-agent-engineering/llm-patterns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/max-iterations.md": {
	id: "software-engineer/109-ai-agent-engineering/max-iterations.md";
  slug: "software-engineer/109-ai-agent-engineering/max-iterations";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/parallelization.md": {
	id: "software-engineer/109-ai-agent-engineering/parallelization.md";
  slug: "software-engineer/109-ai-agent-engineering/parallelization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/planner.md": {
	id: "software-engineer/109-ai-agent-engineering/planner.md";
  slug: "software-engineer/109-ai-agent-engineering/planner";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/prompt-chaining.md": {
	id: "software-engineer/109-ai-agent-engineering/prompt-chaining.md";
  slug: "software-engineer/109-ai-agent-engineering/prompt-chaining";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/replay.md": {
	id: "software-engineer/109-ai-agent-engineering/replay.md";
  slug: "software-engineer/109-ai-agent-engineering/replay";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/retrieval.md": {
	id: "software-engineer/109-ai-agent-engineering/retrieval.md";
  slug: "software-engineer/109-ai-agent-engineering/retrieval";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/routing.md": {
	id: "software-engineer/109-ai-agent-engineering/routing.md";
  slug: "software-engineer/109-ai-agent-engineering/routing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/structured-output.md": {
	id: "software-engineer/109-ai-agent-engineering/structured-output.md";
  slug: "software-engineer/109-ai-agent-engineering/structured-output";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/109-ai-agent-engineering/tool-permissions.md": {
	id: "software-engineer/109-ai-agent-engineering/tool-permissions.md";
  slug: "software-engineer/109-ai-agent-engineering/tool-permissions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/cacheability.md": {
	id: "software-engineer/11-rest-principles/cacheability.md";
  slug: "software-engineer/11-rest-principles/cacheability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/content-negotiation.md": {
	id: "software-engineer/11-rest-principles/content-negotiation.md";
  slug: "software-engineer/11-rest-principles/content-negotiation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/delete.md": {
	id: "software-engineer/11-rest-principles/delete.md";
  slug: "software-engineer/11-rest-principles/delete";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/get.md": {
	id: "software-engineer/11-rest-principles/get.md";
  slug: "software-engineer/11-rest-principles/get";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/hateoas.md": {
	id: "software-engineer/11-rest-principles/hateoas.md";
  slug: "software-engineer/11-rest-principles/hateoas";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/head.md": {
	id: "software-engineer/11-rest-principles/head.md";
  slug: "software-engineer/11-rest-principles/head";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/http-semantics.md": {
	id: "software-engineer/11-rest-principles/http-semantics.md";
  slug: "software-engineer/11-rest-principles/http-semantics";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/idempotency.md": {
	id: "software-engineer/11-rest-principles/idempotency.md";
  slug: "software-engineer/11-rest-principles/idempotency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/options.md": {
	id: "software-engineer/11-rest-principles/options.md";
  slug: "software-engineer/11-rest-principles/options";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/patch.md": {
	id: "software-engineer/11-rest-principles/patch.md";
  slug: "software-engineer/11-rest-principles/patch";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/post.md": {
	id: "software-engineer/11-rest-principles/post.md";
  slug: "software-engineer/11-rest-principles/post";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/put.md": {
	id: "software-engineer/11-rest-principles/put.md";
  slug: "software-engineer/11-rest-principles/put";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/representations.md": {
	id: "software-engineer/11-rest-principles/representations.md";
  slug: "software-engineer/11-rest-principles/representations";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/resources.md": {
	id: "software-engineer/11-rest-principles/resources.md";
  slug: "software-engineer/11-rest-principles/resources";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/statelessness.md": {
	id: "software-engineer/11-rest-principles/statelessness.md";
  slug: "software-engineer/11-rest-principles/statelessness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/11-rest-principles/uniform-interface.md": {
	id: "software-engineer/11-rest-principles/uniform-interface.md";
  slug: "software-engineer/11-rest-principles/uniform-interface";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/110-ai-evaluation/cost-per-task.md": {
	id: "software-engineer/110-ai-evaluation/cost-per-task.md";
  slug: "software-engineer/110-ai-evaluation/cost-per-task";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/110-ai-evaluation/evaluation-harnesses.md": {
	id: "software-engineer/110-ai-evaluation/evaluation-harnesses.md";
  slug: "software-engineer/110-ai-evaluation/evaluation-harnesses";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/110-ai-evaluation/hallucination-rate.md": {
	id: "software-engineer/110-ai-evaluation/hallucination-rate.md";
  slug: "software-engineer/110-ai-evaluation/hallucination-rate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/110-ai-evaluation/latency-per-task.md": {
	id: "software-engineer/110-ai-evaluation/latency-per-task.md";
  slug: "software-engineer/110-ai-evaluation/latency-per-task";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/110-ai-evaluation/regression-suites.md": {
	id: "software-engineer/110-ai-evaluation/regression-suites.md";
  slug: "software-engineer/110-ai-evaluation/regression-suites";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/110-ai-evaluation/structured-output-correctness.md": {
	id: "software-engineer/110-ai-evaluation/structured-output-correctness.md";
  slug: "software-engineer/110-ai-evaluation/structured-output-correctness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/110-ai-evaluation/tool-call-correctness.md": {
	id: "software-engineer/110-ai-evaluation/tool-call-correctness.md";
  slug: "software-engineer/110-ai-evaluation/tool-call-correctness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/big-ball-of-mud.md": {
	id: "software-engineer/111-anti-patterns/big-ball-of-mud.md";
  slug: "software-engineer/111-anti-patterns/big-ball-of-mud";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/big-bang-deployment.md": {
	id: "software-engineer/111-anti-patterns/big-bang-deployment.md";
  slug: "software-engineer/111-anti-patterns/big-bang-deployment";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/big-bang-rewrite.md": {
	id: "software-engineer/111-anti-patterns/big-bang-rewrite.md";
  slug: "software-engineer/111-anti-patterns/big-bang-rewrite";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/cargo-cult-programming.md": {
	id: "software-engineer/111-anti-patterns/cargo-cult-programming.md";
  slug: "software-engineer/111-anti-patterns/cargo-cult-programming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/chatty-api.md": {
	id: "software-engineer/111-anti-patterns/chatty-api.md";
  slug: "software-engineer/111-anti-patterns/chatty-api";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/circular-dependency.md": {
	id: "software-engineer/111-anti-patterns/circular-dependency.md";
  slug: "software-engineer/111-anti-patterns/circular-dependency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/copy-paste-programming.md": {
	id: "software-engineer/111-anti-patterns/copy-paste-programming.md";
  slug: "software-engineer/111-anti-patterns/copy-paste-programming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/death-by-a-thousand-microservices.md": {
	id: "software-engineer/111-anti-patterns/death-by-a-thousand-microservices.md";
  slug: "software-engineer/111-anti-patterns/death-by-a-thousand-microservices";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/distributed-shared-state.md": {
	id: "software-engineer/111-anti-patterns/distributed-shared-state.md";
  slug: "software-engineer/111-anti-patterns/distributed-shared-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/exception-swallowing.md": {
	id: "software-engineer/111-anti-patterns/exception-swallowing.md";
  slug: "software-engineer/111-anti-patterns/exception-swallowing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/flag-explosion.md": {
	id: "software-engineer/111-anti-patterns/flag-explosion.md";
  slug: "software-engineer/111-anti-patterns/flag-explosion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/god-class.md": {
	id: "software-engineer/111-anti-patterns/god-class.md";
  slug: "software-engineer/111-anti-patterns/god-class";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/golden-hammer.md": {
	id: "software-engineer/111-anti-patterns/golden-hammer.md";
  slug: "software-engineer/111-anti-patterns/golden-hammer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/lava-flow.md": {
	id: "software-engineer/111-anti-patterns/lava-flow.md";
  slug: "software-engineer/111-anti-patterns/lava-flow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/log-spam.md": {
	id: "software-engineer/111-anti-patterns/log-spam.md";
  slug: "software-engineer/111-anti-patterns/log-spam";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/overengineering.md": {
	id: "software-engineer/111-anti-patterns/overengineering.md";
  slug: "software-engineer/111-anti-patterns/overengineering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/premature-optimization.md": {
	id: "software-engineer/111-anti-patterns/premature-optimization.md";
  slug: "software-engineer/111-anti-patterns/premature-optimization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/retry-storm.md": {
	id: "software-engineer/111-anti-patterns/retry-storm.md";
  slug: "software-engineer/111-anti-patterns/retry-storm";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/singleton-abuse.md": {
	id: "software-engineer/111-anti-patterns/singleton-abuse.md";
  slug: "software-engineer/111-anti-patterns/singleton-abuse";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/spaghetti-code.md": {
	id: "software-engineer/111-anti-patterns/spaghetti-code.md";
  slug: "software-engineer/111-anti-patterns/spaghetti-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/underengineering.md": {
	id: "software-engineer/111-anti-patterns/underengineering.md";
  slug: "software-engineer/111-anti-patterns/underengineering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/111-anti-patterns/vendor-lock-in.md": {
	id: "software-engineer/111-anti-patterns/vendor-lock-in.md";
  slug: "software-engineer/111-anti-patterns/vendor-lock-in";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/anchoring-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/anchoring-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/anchoring-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/authority-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/authority-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/authority-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/availability-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/availability-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/availability-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/availability-heuristic.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/availability-heuristic.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/availability-heuristic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/confirmation-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/confirmation-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/confirmation-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/dunning-kruger-effect.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/dunning-kruger-effect.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/dunning-kruger-effect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/fundamental-attribution-error.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/fundamental-attribution-error.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/fundamental-attribution-error";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/groupthink.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/groupthink.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/groupthink";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/hindsight-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/hindsight-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/hindsight-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/loss-aversion.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/loss-aversion.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/loss-aversion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/optimism-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/optimism-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/optimism-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/outcome-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/outcome-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/outcome-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/planning-fallacy.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/planning-fallacy.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/planning-fallacy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/recency-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/recency-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/recency-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/selection-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/selection-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/selection-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/status-quo-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/status-quo-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/status-quo-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/sunk-cost-fallacy.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/sunk-cost-fallacy.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/sunk-cost-fallacy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/survivorship-bias.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/survivorship-bias.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/survivorship-bias";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/112-cognitive-biases-engineers-should-know/we-ve-always-done-it-this-way.md": {
	id: "software-engineer/112-cognitive-biases-engineers-should-know/we-ve-always-done-it-this-way.md";
  slug: "software-engineer/112-cognitive-biases-engineers-should-know/we-ve-always-done-it-this-way";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/bottlenecks.md": {
	id: "software-engineer/113-system-thinking/bottlenecks.md";
  slug: "software-engineer/113-system-thinking/bottlenecks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/complex-adaptive-systems.md": {
	id: "software-engineer/113-system-thinking/complex-adaptive-systems.md";
  slug: "software-engineer/113-system-thinking/complex-adaptive-systems";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/emergent-behavior.md": {
	id: "software-engineer/113-system-thinking/emergent-behavior.md";
  slug: "software-engineer/113-system-thinking/emergent-behavior";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/feedback-loops.md": {
	id: "software-engineer/113-system-thinking/feedback-loops.md";
  slug: "software-engineer/113-system-thinking/feedback-loops";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/first-order-thinking.md": {
	id: "software-engineer/113-system-thinking/first-order-thinking.md";
  slug: "software-engineer/113-system-thinking/first-order-thinking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/leverage-points.md": {
	id: "software-engineer/113-system-thinking/leverage-points.md";
  slug: "software-engineer/113-system-thinking/leverage-points";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/local-vs-global-optimization.md": {
	id: "software-engineer/113-system-thinking/local-vs-global-optimization.md";
  slug: "software-engineer/113-system-thinking/local-vs-global-optimization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/negative-feedback.md": {
	id: "software-engineer/113-system-thinking/negative-feedback.md";
  slug: "software-engineer/113-system-thinking/negative-feedback";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/positive-feedback.md": {
	id: "software-engineer/113-system-thinking/positive-feedback.md";
  slug: "software-engineer/113-system-thinking/positive-feedback";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/second-order-thinking.md": {
	id: "software-engineer/113-system-thinking/second-order-thinking.md";
  slug: "software-engineer/113-system-thinking/second-order-thinking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/systems-thinking.md": {
	id: "software-engineer/113-system-thinking/systems-thinking.md";
  slug: "software-engineer/113-system-thinking/systems-thinking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/113-system-thinking/unintended-consequences.md": {
	id: "software-engineer/113-system-thinking/unintended-consequences.md";
  slug: "software-engineer/113-system-thinking/unintended-consequences";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/114-laws-principles-heuristics/campbell-s-law.md": {
	id: "software-engineer/114-laws-principles-heuristics/campbell-s-law.md";
  slug: "software-engineer/114-laws-principles-heuristics/campbell-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/114-laws-principles-heuristics/goodhart-s-law.md": {
	id: "software-engineer/114-laws-principles-heuristics/goodhart-s-law.md";
  slug: "software-engineer/114-laws-principles-heuristics/goodhart-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/114-laws-principles-heuristics/second-system-effect.md": {
	id: "software-engineer/114-laws-principles-heuristics/second-system-effect.md";
  slug: "software-engineer/114-laws-principles-heuristics/second-system-effect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/114-laws-principles-heuristics/worse-is-better.md": {
	id: "software-engineer/114-laws-principles-heuristics/worse-is-better.md";
  slug: "software-engineer/114-laws-principles-heuristics/worse-is-better";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/data-api-dependency.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/data-api-dependency.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/data-api-dependency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/deploy.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/deploy.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/deploy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/design.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/design.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/design";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/failure-mode-analysis.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/failure-mode-analysis.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/failure-mode-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/give-me-software-architecture-and-design-patterns.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/give-me-software-architecture-and-design-patterns.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/give-me-software-architecture-and-design-patterns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/give-me-the-complete-vocabulary-frameworks-patterns-principles-theories-heuristi.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/give-me-the-complete-vocabulary-frameworks-patterns-principles-theories-heuristi.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/give-me-the-complete-vocabulary-frameworks-patterns-principles-theories-heuristi";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/operate.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/operate.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/operate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/performance-check.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/performance-check.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/performance-check";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/refactor.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/refactor.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/refactor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/requirements-context-constraints.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/requirements-context-constraints.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/requirements-context-constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/security-check.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/security-check.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/security-check";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/see-problem-recognize-pattern-choose-framework-apply-evaluate-trade-offs.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/see-problem-recognize-pattern-choose-framework-apply-evaluate-trade-offs.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/see-problem-recognize-pattern-choose-framework-apply-evaluate-trade-offs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/star-par-car.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/star-par-car.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/star-par-car";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/test.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/test.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/test";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/trade-offs.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/trade-offs.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/trade-offs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/what-alternatives.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/what-alternatives.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/what-alternatives";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/what-decision.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/what-decision.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/what-decision";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/what-evidence.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/what-evidence.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/what-evidence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/115-the-engineer-s-universal-checklist/what-trade-offs.md": {
	id: "software-engineer/115-the-engineer-s-universal-checklist/what-trade-offs.md";
  slug: "software-engineer/115-the-engineer-s-universal-checklist/what-trade-offs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/code-user-not-found.md": {
	id: "software-engineer/12-api-contract-best-practices/code-user-not-found.md";
  slug: "software-engineer/12-api-contract-best-practices/code-user-not-found";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/constraints.md": {
	id: "software-engineer/12-api-contract-best-practices/constraints.md";
  slug: "software-engineer/12-api-contract-best-practices/constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/correlation-ids.md": {
	id: "software-engineer/12-api-contract-best-practices/correlation-ids.md";
  slug: "software-engineer/12-api-contract-best-practices/correlation-ids";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/defaults.md": {
	id: "software-engineer/12-api-contract-best-practices/defaults.md";
  slug: "software-engineer/12-api-contract-best-practices/defaults";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/details.md": {
	id: "software-engineer/12-api-contract-best-practices/details.md";
  slug: "software-engineer/12-api-contract-best-practices/details";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/enumerations.md": {
	id: "software-engineer/12-api-contract-best-practices/enumerations.md";
  slug: "software-engineer/12-api-contract-best-practices/enumerations";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/error-codes.md": {
	id: "software-engineer/12-api-contract-best-practices/error-codes.md";
  slug: "software-engineer/12-api-contract-best-practices/error-codes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/error-contract.md": {
	id: "software-engineer/12-api-contract-best-practices/error-contract.md";
  slug: "software-engineer/12-api-contract-best-practices/error-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/errors.md": {
	id: "software-engineer/12-api-contract-best-practices/errors.md";
  slug: "software-engineer/12-api-contract-best-practices/errors";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/filtering.md": {
	id: "software-engineer/12-api-contract-best-practices/filtering.md";
  slug: "software-engineer/12-api-contract-best-practices/filtering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/links.md": {
	id: "software-engineer/12-api-contract-best-practices/links.md";
  slug: "software-engineer/12-api-contract-best-practices/links";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/message-user-does-not-exist.md": {
	id: "software-engineer/12-api-contract-best-practices/message-user-does-not-exist.md";
  slug: "software-engineer/12-api-contract-best-practices/message-user-does-not-exist";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/metadata.md": {
	id: "software-engineer/12-api-contract-best-practices/metadata.md";
  slug: "software-engineer/12-api-contract-best-practices/metadata";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/nullability.md": {
	id: "software-engineer/12-api-contract-best-practices/nullability.md";
  slug: "software-engineer/12-api-contract-best-practices/nullability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/optional-fields.md": {
	id: "software-engineer/12-api-contract-best-practices/optional-fields.md";
  slug: "software-engineer/12-api-contract-best-practices/optional-fields";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/pagination.md": {
	id: "software-engineer/12-api-contract-best-practices/pagination.md";
  slug: "software-engineer/12-api-contract-best-practices/pagination";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/problem-details-rfc-9457.md": {
	id: "software-engineer/12-api-contract-best-practices/problem-details-rfc-9457.md";
  slug: "software-engineer/12-api-contract-best-practices/problem-details-rfc-9457";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/request-contract.md": {
	id: "software-engineer/12-api-contract-best-practices/request-contract.md";
  slug: "software-engineer/12-api-contract-best-practices/request-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/request-ids.md": {
	id: "software-engineer/12-api-contract-best-practices/request-ids.md";
  slug: "software-engineer/12-api-contract-best-practices/request-ids";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/required-fields.md": {
	id: "software-engineer/12-api-contract-best-practices/required-fields.md";
  slug: "software-engineer/12-api-contract-best-practices/required-fields";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/response-contract.md": {
	id: "software-engineer/12-api-contract-best-practices/response-contract.md";
  slug: "software-engineer/12-api-contract-best-practices/response-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/schema.md": {
	id: "software-engineer/12-api-contract-best-practices/schema.md";
  slug: "software-engineer/12-api-contract-best-practices/schema";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/searching.md": {
	id: "software-engineer/12-api-contract-best-practices/searching.md";
  slug: "software-engineer/12-api-contract-best-practices/searching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/sorting.md": {
	id: "software-engineer/12-api-contract-best-practices/sorting.md";
  slug: "software-engineer/12-api-contract-best-practices/sorting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/status-code.md": {
	id: "software-engineer/12-api-contract-best-practices/status-code.md";
  slug: "software-engineer/12-api-contract-best-practices/status-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/trace-id.md": {
	id: "software-engineer/12-api-contract-best-practices/trace-id.md";
  slug: "software-engineer/12-api-contract-best-practices/trace-id";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/trace-ids.md": {
	id: "software-engineer/12-api-contract-best-practices/trace-ids.md";
  slug: "software-engineer/12-api-contract-best-practices/trace-ids";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/types.md": {
	id: "software-engineer/12-api-contract-best-practices/types.md";
  slug: "software-engineer/12-api-contract-best-practices/types";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/validation.md": {
	id: "software-engineer/12-api-contract-best-practices/validation.md";
  slug: "software-engineer/12-api-contract-best-practices/validation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/12-api-contract-best-practices/versioning.md": {
	id: "software-engineer/12-api-contract-best-practices/versioning.md";
  slug: "software-engineer/12-api-contract-best-practices/versioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/backward-compatibility.md": {
	id: "software-engineer/13-api-versioning/backward-compatibility.md";
  slug: "software-engineer/13-api-versioning/backward-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/consumer-driven-contracts.md": {
	id: "software-engineer/13-api-versioning/consumer-driven-contracts.md";
  slug: "software-engineer/13-api-versioning/consumer-driven-contracts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/content-negotiation.md": {
	id: "software-engineer/13-api-versioning/content-negotiation.md";
  slug: "software-engineer/13-api-versioning/content-negotiation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/deprecation-strategy.md": {
	id: "software-engineer/13-api-versioning/deprecation-strategy.md";
  slug: "software-engineer/13-api-versioning/deprecation-strategy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/forward-compatibility.md": {
	id: "software-engineer/13-api-versioning/forward-compatibility.md";
  slug: "software-engineer/13-api-versioning/forward-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/header-versioning.md": {
	id: "software-engineer/13-api-versioning/header-versioning.md";
  slug: "software-engineer/13-api-versioning/header-versioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/query-parameter-versioning.md": {
	id: "software-engineer/13-api-versioning/query-parameter-versioning.md";
  slug: "software-engineer/13-api-versioning/query-parameter-versioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/semantic-versioning.md": {
	id: "software-engineer/13-api-versioning/semantic-versioning.md";
  slug: "software-engineer/13-api-versioning/semantic-versioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/13-api-versioning/uri-versioning.md": {
	id: "software-engineer/13-api-versioning/uri-versioning.md";
  slug: "software-engineer/13-api-versioning/uri-versioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/abac.md": {
	id: "software-engineer/14-api-security/abac.md";
  slug: "software-engineer/14-api-security/abac";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/acl.md": {
	id: "software-engineer/14-api-security/acl.md";
  slug: "software-engineer/14-api-security/acl";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/api-keys.md": {
	id: "software-engineer/14-api-security/api-keys.md";
  slug: "software-engineer/14-api-security/api-keys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/authentication.md": {
	id: "software-engineer/14-api-security/authentication.md";
  slug: "software-engineer/14-api-security/authentication";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/authorization.md": {
	id: "software-engineer/14-api-security/authorization.md";
  slug: "software-engineer/14-api-security/authorization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/cors.md": {
	id: "software-engineer/14-api-security/cors.md";
  slug: "software-engineer/14-api-security/cors";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/csrf.md": {
	id: "software-engineer/14-api-security/csrf.md";
  slug: "software-engineer/14-api-security/csrf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/hmac.md": {
	id: "software-engineer/14-api-security/hmac.md";
  slug: "software-engineer/14-api-security/hmac";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/jwt.md": {
	id: "software-engineer/14-api-security/jwt.md";
  slug: "software-engineer/14-api-security/jwt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/mtls.md": {
	id: "software-engineer/14-api-security/mtls.md";
  slug: "software-engineer/14-api-security/mtls";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/oauth-2-0.md": {
	id: "software-engineer/14-api-security/oauth-2-0.md";
  slug: "software-engineer/14-api-security/oauth-2-0";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/openid-connect.md": {
	id: "software-engineer/14-api-security/openid-connect.md";
  slug: "software-engineer/14-api-security/openid-connect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/pbac.md": {
	id: "software-engineer/14-api-security/pbac.md";
  slug: "software-engineer/14-api-security/pbac";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/rate-limiting.md": {
	id: "software-engineer/14-api-security/rate-limiting.md";
  slug: "software-engineer/14-api-security/rate-limiting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/rbac.md": {
	id: "software-engineer/14-api-security/rbac.md";
  slug: "software-engineer/14-api-security/rbac";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/replay-protection.md": {
	id: "software-engineer/14-api-security/replay-protection.md";
  slug: "software-engineer/14-api-security/replay-protection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/14-api-security/scopes.md": {
	id: "software-engineer/14-api-security/scopes.md";
  slug: "software-engineer/14-api-security/scopes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/1nf.md": {
	id: "software-engineer/15-database-design/1nf.md";
  slug: "software-engineer/15-database-design/1nf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/2nf.md": {
	id: "software-engineer/15-database-design/2nf.md";
  slug: "software-engineer/15-database-design/2nf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/3nf.md": {
	id: "software-engineer/15-database-design/3nf.md";
  slug: "software-engineer/15-database-design/3nf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/atomicity.md": {
	id: "software-engineer/15-database-design/atomicity.md";
  slug: "software-engineer/15-database-design/atomicity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/bcnf.md": {
	id: "software-engineer/15-database-design/bcnf.md";
  slug: "software-engineer/15-database-design/bcnf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/candidate-keys.md": {
	id: "software-engineer/15-database-design/candidate-keys.md";
  slug: "software-engineer/15-database-design/candidate-keys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/composite-keys.md": {
	id: "software-engineer/15-database-design/composite-keys.md";
  slug: "software-engineer/15-database-design/composite-keys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/consistency.md": {
	id: "software-engineer/15-database-design/consistency.md";
  slug: "software-engineer/15-database-design/consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/constraints.md": {
	id: "software-engineer/15-database-design/constraints.md";
  slug: "software-engineer/15-database-design/constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/denormalization.md": {
	id: "software-engineer/15-database-design/denormalization.md";
  slug: "software-engineer/15-database-design/denormalization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/dirty-read.md": {
	id: "software-engineer/15-database-design/dirty-read.md";
  slug: "software-engineer/15-database-design/dirty-read";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/durability.md": {
	id: "software-engineer/15-database-design/durability.md";
  slug: "software-engineer/15-database-design/durability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/foreign-keys.md": {
	id: "software-engineer/15-database-design/foreign-keys.md";
  slug: "software-engineer/15-database-design/foreign-keys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/indexes.md": {
	id: "software-engineer/15-database-design/indexes.md";
  slug: "software-engineer/15-database-design/indexes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/isolation.md": {
	id: "software-engineer/15-database-design/isolation.md";
  slug: "software-engineer/15-database-design/isolation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/lost-update.md": {
	id: "software-engineer/15-database-design/lost-update.md";
  slug: "software-engineer/15-database-design/lost-update";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/materialized-views.md": {
	id: "software-engineer/15-database-design/materialized-views.md";
  slug: "software-engineer/15-database-design/materialized-views";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/non-repeatable-read.md": {
	id: "software-engineer/15-database-design/non-repeatable-read.md";
  slug: "software-engineer/15-database-design/non-repeatable-read";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/normalization.md": {
	id: "software-engineer/15-database-design/normalization.md";
  slug: "software-engineer/15-database-design/normalization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/phantom-read.md": {
	id: "software-engineer/15-database-design/phantom-read.md";
  slug: "software-engineer/15-database-design/phantom-read";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/primary-keys.md": {
	id: "software-engineer/15-database-design/primary-keys.md";
  slug: "software-engineer/15-database-design/primary-keys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/read-committed.md": {
	id: "software-engineer/15-database-design/read-committed.md";
  slug: "software-engineer/15-database-design/read-committed";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/read-uncommitted.md": {
	id: "software-engineer/15-database-design/read-uncommitted.md";
  slug: "software-engineer/15-database-design/read-uncommitted";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/relational.md": {
	id: "software-engineer/15-database-design/relational.md";
  slug: "software-engineer/15-database-design/relational";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/repeatable-read.md": {
	id: "software-engineer/15-database-design/repeatable-read.md";
  slug: "software-engineer/15-database-design/repeatable-read";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/serializable.md": {
	id: "software-engineer/15-database-design/serializable.md";
  slug: "software-engineer/15-database-design/serializable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/snapshot-isolation.md": {
	id: "software-engineer/15-database-design/snapshot-isolation.md";
  slug: "software-engineer/15-database-design/snapshot-isolation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/transactions.md": {
	id: "software-engineer/15-database-design/transactions.md";
  slug: "software-engineer/15-database-design/transactions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/views.md": {
	id: "software-engineer/15-database-design/views.md";
  slug: "software-engineer/15-database-design/views";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/15-database-design/write-skew.md": {
	id: "software-engineer/15-database-design/write-skew.md";
  slug: "software-engineer/15-database-design/write-skew";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/cqrs.md": {
	id: "software-engineer/16-database-patterns/cqrs.md";
  slug: "software-engineer/16-database-patterns/cqrs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/database-per-service.md": {
	id: "software-engineer/16-database-patterns/database-per-service.md";
  slug: "software-engineer/16-database-patterns/database-per-service";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/federation.md": {
	id: "software-engineer/16-database-patterns/federation.md";
  slug: "software-engineer/16-database-patterns/federation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/materialized-view.md": {
	id: "software-engineer/16-database-patterns/materialized-view.md";
  slug: "software-engineer/16-database-patterns/materialized-view";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/partitioning.md": {
	id: "software-engineer/16-database-patterns/partitioning.md";
  slug: "software-engineer/16-database-patterns/partitioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/polyglot-persistence.md": {
	id: "software-engineer/16-database-patterns/polyglot-persistence.md";
  slug: "software-engineer/16-database-patterns/polyglot-persistence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/read-replica.md": {
	id: "software-engineer/16-database-patterns/read-replica.md";
  slug: "software-engineer/16-database-patterns/read-replica";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/read-through.md": {
	id: "software-engineer/16-database-patterns/read-through.md";
  slug: "software-engineer/16-database-patterns/read-through";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/repository.md": {
	id: "software-engineer/16-database-patterns/repository.md";
  slug: "software-engineer/16-database-patterns/repository";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/sharding.md": {
	id: "software-engineer/16-database-patterns/sharding.md";
  slug: "software-engineer/16-database-patterns/sharding";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/shared-database.md": {
	id: "software-engineer/16-database-patterns/shared-database.md";
  slug: "software-engineer/16-database-patterns/shared-database";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/unit-of-work.md": {
	id: "software-engineer/16-database-patterns/unit-of-work.md";
  slug: "software-engineer/16-database-patterns/unit-of-work";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/write-behind.md": {
	id: "software-engineer/16-database-patterns/write-behind.md";
  slug: "software-engineer/16-database-patterns/write-behind";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/16-database-patterns/write-through.md": {
	id: "software-engineer/16-database-patterns/write-through.md";
  slug: "software-engineer/16-database-patterns/write-through";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/availability.md": {
	id: "software-engineer/17-distributed-systems/availability.md";
  slug: "software-engineer/17-distributed-systems/availability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/cap-theorem.md": {
	id: "software-engineer/17-distributed-systems/cap-theorem.md";
  slug: "software-engineer/17-distributed-systems/cap-theorem";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/clock-synchronization.md": {
	id: "software-engineer/17-distributed-systems/clock-synchronization.md";
  slug: "software-engineer/17-distributed-systems/clock-synchronization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/consensus.md": {
	id: "software-engineer/17-distributed-systems/consensus.md";
  slug: "software-engineer/17-distributed-systems/consensus";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/consistency.md": {
	id: "software-engineer/17-distributed-systems/consistency.md";
  slug: "software-engineer/17-distributed-systems/consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/fallacies-of-distributed-computing.md": {
	id: "software-engineer/17-distributed-systems/fallacies-of-distributed-computing.md";
  slug: "software-engineer/17-distributed-systems/fallacies-of-distributed-computing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/flp-impossibility.md": {
	id: "software-engineer/17-distributed-systems/flp-impossibility.md";
  slug: "software-engineer/17-distributed-systems/flp-impossibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/lamport-clocks.md": {
	id: "software-engineer/17-distributed-systems/lamport-clocks.md";
  slug: "software-engineer/17-distributed-systems/lamport-clocks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/leader-election.md": {
	id: "software-engineer/17-distributed-systems/leader-election.md";
  slug: "software-engineer/17-distributed-systems/leader-election";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/logical-clocks.md": {
	id: "software-engineer/17-distributed-systems/logical-clocks.md";
  slug: "software-engineer/17-distributed-systems/logical-clocks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/network-partitions.md": {
	id: "software-engineer/17-distributed-systems/network-partitions.md";
  slug: "software-engineer/17-distributed-systems/network-partitions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/pacelc.md": {
	id: "software-engineer/17-distributed-systems/pacelc.md";
  slug: "software-engineer/17-distributed-systems/pacelc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/partial-failure.md": {
	id: "software-engineer/17-distributed-systems/partial-failure.md";
  slug: "software-engineer/17-distributed-systems/partial-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/partition-tolerance.md": {
	id: "software-engineer/17-distributed-systems/partition-tolerance.md";
  slug: "software-engineer/17-distributed-systems/partition-tolerance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/quorum.md": {
	id: "software-engineer/17-distributed-systems/quorum.md";
  slug: "software-engineer/17-distributed-systems/quorum";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/replication.md": {
	id: "software-engineer/17-distributed-systems/replication.md";
  slug: "software-engineer/17-distributed-systems/replication";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/17-distributed-systems/vector-clocks.md": {
	id: "software-engineer/17-distributed-systems/vector-clocks.md";
  slug: "software-engineer/17-distributed-systems/vector-clocks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/causal-consistency.md": {
	id: "software-engineer/18-consistency-models/causal-consistency.md";
  slug: "software-engineer/18-consistency-models/causal-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/eventual-consistency.md": {
	id: "software-engineer/18-consistency-models/eventual-consistency.md";
  slug: "software-engineer/18-consistency-models/eventual-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/linearizability.md": {
	id: "software-engineer/18-consistency-models/linearizability.md";
  slug: "software-engineer/18-consistency-models/linearizability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/monotonic-reads.md": {
	id: "software-engineer/18-consistency-models/monotonic-reads.md";
  slug: "software-engineer/18-consistency-models/monotonic-reads";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/monotonic-writes.md": {
	id: "software-engineer/18-consistency-models/monotonic-writes.md";
  slug: "software-engineer/18-consistency-models/monotonic-writes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/read-after-write-consistency.md": {
	id: "software-engineer/18-consistency-models/read-after-write-consistency.md";
  slug: "software-engineer/18-consistency-models/read-after-write-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/sequential-consistency.md": {
	id: "software-engineer/18-consistency-models/sequential-consistency.md";
  slug: "software-engineer/18-consistency-models/sequential-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/session-consistency.md": {
	id: "software-engineer/18-consistency-models/session-consistency.md";
  slug: "software-engineer/18-consistency-models/session-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/18-consistency-models/strong-consistency.md": {
	id: "software-engineer/18-consistency-models/strong-consistency.md";
  slug: "software-engineer/18-consistency-models/strong-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/19-distributed-consensus/byzantine-fault-tolerance.md": {
	id: "software-engineer/19-distributed-consensus/byzantine-fault-tolerance.md";
  slug: "software-engineer/19-distributed-consensus/byzantine-fault-tolerance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/19-distributed-consensus/leader-election.md": {
	id: "software-engineer/19-distributed-consensus/leader-election.md";
  slug: "software-engineer/19-distributed-consensus/leader-election";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/19-distributed-consensus/multi-paxos.md": {
	id: "software-engineer/19-distributed-consensus/multi-paxos.md";
  slug: "software-engineer/19-distributed-consensus/multi-paxos";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/19-distributed-consensus/paxos.md": {
	id: "software-engineer/19-distributed-consensus/paxos.md";
  slug: "software-engineer/19-distributed-consensus/paxos";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/19-distributed-consensus/pbft.md": {
	id: "software-engineer/19-distributed-consensus/pbft.md";
  slug: "software-engineer/19-distributed-consensus/pbft";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/19-distributed-consensus/quorum-systems.md": {
	id: "software-engineer/19-distributed-consensus/quorum-systems.md";
  slug: "software-engineer/19-distributed-consensus/quorum-systems";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/19-distributed-consensus/raft.md": {
	id: "software-engineer/19-distributed-consensus/raft.md";
  slug: "software-engineer/19-distributed-consensus/raft";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/choreography.md": {
	id: "software-engineer/20-distributed-transactions/choreography.md";
  slug: "software-engineer/20-distributed-transactions/choreography";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/compensation.md": {
	id: "software-engineer/20-distributed-transactions/compensation.md";
  slug: "software-engineer/20-distributed-transactions/compensation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/idempotent-consumers.md": {
	id: "software-engineer/20-distributed-transactions/idempotent-consumers.md";
  slug: "software-engineer/20-distributed-transactions/idempotent-consumers";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/inbox-pattern.md": {
	id: "software-engineer/20-distributed-transactions/inbox-pattern.md";
  slug: "software-engineer/20-distributed-transactions/inbox-pattern";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/orchestration.md": {
	id: "software-engineer/20-distributed-transactions/orchestration.md";
  slug: "software-engineer/20-distributed-transactions/orchestration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/saga.md": {
	id: "software-engineer/20-distributed-transactions/saga.md";
  slug: "software-engineer/20-distributed-transactions/saga";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/three-phase-commit.md": {
	id: "software-engineer/20-distributed-transactions/three-phase-commit.md";
  slug: "software-engineer/20-distributed-transactions/three-phase-commit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/transactional-outbox.md": {
	id: "software-engineer/20-distributed-transactions/transactional-outbox.md";
  slug: "software-engineer/20-distributed-transactions/transactional-outbox";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/20-distributed-transactions/two-phase-commit.md": {
	id: "software-engineer/20-distributed-transactions/two-phase-commit.md";
  slug: "software-engineer/20-distributed-transactions/two-phase-commit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/acknowledgement.md": {
	id: "software-engineer/21-messaging/acknowledgement.md";
  slug: "software-engineer/21-messaging/acknowledgement";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/at-least-once.md": {
	id: "software-engineer/21-messaging/at-least-once.md";
  slug: "software-engineer/21-messaging/at-least-once";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/at-most-once.md": {
	id: "software-engineer/21-messaging/at-most-once.md";
  slug: "software-engineer/21-messaging/at-most-once";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/broker.md": {
	id: "software-engineer/21-messaging/broker.md";
  slug: "software-engineer/21-messaging/broker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/consumer-group.md": {
	id: "software-engineer/21-messaging/consumer-group.md";
  slug: "software-engineer/21-messaging/consumer-group";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/consumer.md": {
	id: "software-engineer/21-messaging/consumer.md";
  slug: "software-engineer/21-messaging/consumer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/dead-letter-queue.md": {
	id: "software-engineer/21-messaging/dead-letter-queue.md";
  slug: "software-engineer/21-messaging/dead-letter-queue";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/delivery-semantics.md": {
	id: "software-engineer/21-messaging/delivery-semantics.md";
  slug: "software-engineer/21-messaging/delivery-semantics";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/exactly-once.md": {
	id: "software-engineer/21-messaging/exactly-once.md";
  slug: "software-engineer/21-messaging/exactly-once";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/offset.md": {
	id: "software-engineer/21-messaging/offset.md";
  slug: "software-engineer/21-messaging/offset";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/ordering.md": {
	id: "software-engineer/21-messaging/ordering.md";
  slug: "software-engineer/21-messaging/ordering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/partition.md": {
	id: "software-engineer/21-messaging/partition.md";
  slug: "software-engineer/21-messaging/partition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/poison-message.md": {
	id: "software-engineer/21-messaging/poison-message.md";
  slug: "software-engineer/21-messaging/poison-message";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/producer.md": {
	id: "software-engineer/21-messaging/producer.md";
  slug: "software-engineer/21-messaging/producer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/pub-sub.md": {
	id: "software-engineer/21-messaging/pub-sub.md";
  slug: "software-engineer/21-messaging/pub-sub";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/queue.md": {
	id: "software-engineer/21-messaging/queue.md";
  slug: "software-engineer/21-messaging/queue";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/retry.md": {
	id: "software-engineer/21-messaging/retry.md";
  slug: "software-engineer/21-messaging/retry";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/21-messaging/topic.md": {
	id: "software-engineer/21-messaging/topic.md";
  slug: "software-engineer/21-messaging/topic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/cache-aside.md": {
	id: "software-engineer/22-caching/cache-aside.md";
  slug: "software-engineer/22-caching/cache-aside";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/cache-avalanche.md": {
	id: "software-engineer/22-caching/cache-avalanche.md";
  slug: "software-engineer/22-caching/cache-avalanche";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/cache-penetration.md": {
	id: "software-engineer/22-caching/cache-penetration.md";
  slug: "software-engineer/22-caching/cache-penetration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/cache-stampede.md": {
	id: "software-engineer/22-caching/cache-stampede.md";
  slug: "software-engineer/22-caching/cache-stampede";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/invalidation.md": {
	id: "software-engineer/22-caching/invalidation.md";
  slug: "software-engineer/22-caching/invalidation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/read-through.md": {
	id: "software-engineer/22-caching/read-through.md";
  slug: "software-engineer/22-caching/read-through";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/refresh-ahead.md": {
	id: "software-engineer/22-caching/refresh-ahead.md";
  slug: "software-engineer/22-caching/refresh-ahead";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/stale-data.md": {
	id: "software-engineer/22-caching/stale-data.md";
  slug: "software-engineer/22-caching/stale-data";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/there-are-only-two-hard-things-in-computer-science-cache-invalidation-and-naming.md": {
	id: "software-engineer/22-caching/there-are-only-two-hard-things-in-computer-science-cache-invalidation-and-naming.md";
  slug: "software-engineer/22-caching/there-are-only-two-hard-things-in-computer-science-cache-invalidation-and-naming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/thundering-herd.md": {
	id: "software-engineer/22-caching/thundering-herd.md";
  slug: "software-engineer/22-caching/thundering-herd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/write-behind.md": {
	id: "software-engineer/22-caching/write-behind.md";
  slug: "software-engineer/22-caching/write-behind";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/22-caching/write-through.md": {
	id: "software-engineer/22-caching/write-through.md";
  slug: "software-engineer/22-caching/write-through";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/actor-model.md": {
	id: "software-engineer/23-concurrency/actor-model.md";
  slug: "software-engineer/23-concurrency/actor-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/async.md": {
	id: "software-engineer/23-concurrency/async.md";
  slug: "software-engineer/23-concurrency/async";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/atomic-operation.md": {
	id: "software-engineer/23-concurrency/atomic-operation.md";
  slug: "software-engineer/23-concurrency/atomic-operation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/cas.md": {
	id: "software-engineer/23-concurrency/cas.md";
  slug: "software-engineer/23-concurrency/cas";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/concurrency.md": {
	id: "software-engineer/23-concurrency/concurrency.md";
  slug: "software-engineer/23-concurrency/concurrency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/coroutine.md": {
	id: "software-engineer/23-concurrency/coroutine.md";
  slug: "software-engineer/23-concurrency/coroutine";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/csp.md": {
	id: "software-engineer/23-concurrency/csp.md";
  slug: "software-engineer/23-concurrency/csp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/deadlock.md": {
	id: "software-engineer/23-concurrency/deadlock.md";
  slug: "software-engineer/23-concurrency/deadlock";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/immutability.md": {
	id: "software-engineer/23-concurrency/immutability.md";
  slug: "software-engineer/23-concurrency/immutability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/livelock.md": {
	id: "software-engineer/23-concurrency/livelock.md";
  slug: "software-engineer/23-concurrency/livelock";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/lock.md": {
	id: "software-engineer/23-concurrency/lock.md";
  slug: "software-engineer/23-concurrency/lock";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/monitor.md": {
	id: "software-engineer/23-concurrency/monitor.md";
  slug: "software-engineer/23-concurrency/monitor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/mutex.md": {
	id: "software-engineer/23-concurrency/mutex.md";
  slug: "software-engineer/23-concurrency/mutex";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/parallelism.md": {
	id: "software-engineer/23-concurrency/parallelism.md";
  slug: "software-engineer/23-concurrency/parallelism";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/process.md": {
	id: "software-engineer/23-concurrency/process.md";
  slug: "software-engineer/23-concurrency/process";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/race-condition.md": {
	id: "software-engineer/23-concurrency/race-condition.md";
  slug: "software-engineer/23-concurrency/race-condition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/read-write-lock.md": {
	id: "software-engineer/23-concurrency/read-write-lock.md";
  slug: "software-engineer/23-concurrency/read-write-lock";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/semaphore.md": {
	id: "software-engineer/23-concurrency/semaphore.md";
  slug: "software-engineer/23-concurrency/semaphore";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/starvation.md": {
	id: "software-engineer/23-concurrency/starvation.md";
  slug: "software-engineer/23-concurrency/starvation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/thread-safety.md": {
	id: "software-engineer/23-concurrency/thread-safety.md";
  slug: "software-engineer/23-concurrency/thread-safety";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/23-concurrency/thread.md": {
	id: "software-engineer/23-concurrency/thread.md";
  slug: "software-engineer/23-concurrency/thread";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/amdahl-s-law.md": {
	id: "software-engineer/24-performance-engineering/amdahl-s-law.md";
  slug: "software-engineer/24-performance-engineering/amdahl-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/amortized-complexity.md": {
	id: "software-engineer/24-performance-engineering/amortized-complexity.md";
  slug: "software-engineer/24-performance-engineering/amortized-complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/at-what-scale.md": {
	id: "software-engineer/24-performance-engineering/at-what-scale.md";
  slug: "software-engineer/24-performance-engineering/at-what-scale";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/big-o.md": {
	id: "software-engineer/24-performance-engineering/big-o.md";
  slug: "software-engineer/24-performance-engineering/big-o";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/big-omega.md": {
	id: "software-engineer/24-performance-engineering/big-omega.md";
  slug: "software-engineer/24-performance-engineering/big-omega";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/big-theta.md": {
	id: "software-engineer/24-performance-engineering/big-theta.md";
  slug: "software-engineer/24-performance-engineering/big-theta";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/cache-hit-rate.md": {
	id: "software-engineer/24-performance-engineering/cache-hit-rate.md";
  slug: "software-engineer/24-performance-engineering/cache-hit-rate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/compared-to-what.md": {
	id: "software-engineer/24-performance-engineering/compared-to-what.md";
  slug: "software-engineer/24-performance-engineering/compared-to-what";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/cpu.md": {
	id: "software-engineer/24-performance-engineering/cpu.md";
  slug: "software-engineer/24-performance-engineering/cpu";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/disk-i-o.md": {
	id: "software-engineer/24-performance-engineering/disk-i-o.md";
  slug: "software-engineer/24-performance-engineering/disk-i-o";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/gc.md": {
	id: "software-engineer/24-performance-engineering/gc.md";
  slug: "software-engineer/24-performance-engineering/gc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/latency.md": {
	id: "software-engineer/24-performance-engineering/latency.md";
  slug: "software-engineer/24-performance-engineering/latency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/little-s-law.md": {
	id: "software-engineer/24-performance-engineering/little-s-law.md";
  slug: "software-engineer/24-performance-engineering/little-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/lock-contention.md": {
	id: "software-engineer/24-performance-engineering/lock-contention.md";
  slug: "software-engineer/24-performance-engineering/lock-contention";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/memory.md": {
	id: "software-engineer/24-performance-engineering/memory.md";
  slug: "software-engineer/24-performance-engineering/memory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/network-i-o.md": {
	id: "software-engineer/24-performance-engineering/network-i-o.md";
  slug: "software-engineer/24-performance-engineering/network-i-o";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/p50.md": {
	id: "software-engineer/24-performance-engineering/p50.md";
  slug: "software-engineer/24-performance-engineering/p50";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/p90.md": {
	id: "software-engineer/24-performance-engineering/p90.md";
  slug: "software-engineer/24-performance-engineering/p90";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/p95.md": {
	id: "software-engineer/24-performance-engineering/p95.md";
  slug: "software-engineer/24-performance-engineering/p95";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/p99-9.md": {
	id: "software-engineer/24-performance-engineering/p99-9.md";
  slug: "software-engineer/24-performance-engineering/p99-9";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/p99.md": {
	id: "software-engineer/24-performance-engineering/p99.md";
  slug: "software-engineer/24-performance-engineering/p99";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/qps.md": {
	id: "software-engineer/24-performance-engineering/qps.md";
  slug: "software-engineer/24-performance-engineering/qps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/space-complexity.md": {
	id: "software-engineer/24-performance-engineering/space-complexity.md";
  slug: "software-engineer/24-performance-engineering/space-complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/this-is-slow.md": {
	id: "software-engineer/24-performance-engineering/this-is-slow.md";
  slug: "software-engineer/24-performance-engineering/this-is-slow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/throughput.md": {
	id: "software-engineer/24-performance-engineering/throughput.md";
  slug: "software-engineer/24-performance-engineering/throughput";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/time-complexity.md": {
	id: "software-engineer/24-performance-engineering/time-complexity.md";
  slug: "software-engineer/24-performance-engineering/time-complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/tps.md": {
	id: "software-engineer/24-performance-engineering/tps.md";
  slug: "software-engineer/24-performance-engineering/tps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/under-what-workload.md": {
	id: "software-engineer/24-performance-engineering/under-what-workload.md";
  slug: "software-engineer/24-performance-engineering/under-what-workload";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/where.md": {
	id: "software-engineer/24-performance-engineering/where.md";
  slug: "software-engineer/24-performance-engineering/where";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/24-performance-engineering/why.md": {
	id: "software-engineer/24-performance-engineering/why.md";
  slug: "software-engineer/24-performance-engineering/why";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/availability.md": {
	id: "software-engineer/25-reliability-engineering/availability.md";
  slug: "software-engineer/25-reliability-engineering/availability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/backpressure.md": {
	id: "software-engineer/25-reliability-engineering/backpressure.md";
  slug: "software-engineer/25-reliability-engineering/backpressure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/bulkhead.md": {
	id: "software-engineer/25-reliability-engineering/bulkhead.md";
  slug: "software-engineer/25-reliability-engineering/bulkhead";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/circuit-breaker.md": {
	id: "software-engineer/25-reliability-engineering/circuit-breaker.md";
  slug: "software-engineer/25-reliability-engineering/circuit-breaker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/disaster-recovery.md": {
	id: "software-engineer/25-reliability-engineering/disaster-recovery.md";
  slug: "software-engineer/25-reliability-engineering/disaster-recovery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/durability.md": {
	id: "software-engineer/25-reliability-engineering/durability.md";
  slug: "software-engineer/25-reliability-engineering/durability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/error-budget.md": {
	id: "software-engineer/25-reliability-engineering/error-budget.md";
  slug: "software-engineer/25-reliability-engineering/error-budget";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/exponential-backoff.md": {
	id: "software-engineer/25-reliability-engineering/exponential-backoff.md";
  slug: "software-engineer/25-reliability-engineering/exponential-backoff";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/failover.md": {
	id: "software-engineer/25-reliability-engineering/failover.md";
  slug: "software-engineer/25-reliability-engineering/failover";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/fault-tolerance.md": {
	id: "software-engineer/25-reliability-engineering/fault-tolerance.md";
  slug: "software-engineer/25-reliability-engineering/fault-tolerance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/graceful-degradation.md": {
	id: "software-engineer/25-reliability-engineering/graceful-degradation.md";
  slug: "software-engineer/25-reliability-engineering/graceful-degradation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/health-checks.md": {
	id: "software-engineer/25-reliability-engineering/health-checks.md";
  slug: "software-engineer/25-reliability-engineering/health-checks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/jitter.md": {
	id: "software-engineer/25-reliability-engineering/jitter.md";
  slug: "software-engineer/25-reliability-engineering/jitter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/load-shedding.md": {
	id: "software-engineer/25-reliability-engineering/load-shedding.md";
  slug: "software-engineer/25-reliability-engineering/load-shedding";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/rate-limiter.md": {
	id: "software-engineer/25-reliability-engineering/rate-limiter.md";
  slug: "software-engineer/25-reliability-engineering/rate-limiter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/reliability.md": {
	id: "software-engineer/25-reliability-engineering/reliability.md";
  slug: "software-engineer/25-reliability-engineering/reliability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/resilience.md": {
	id: "software-engineer/25-reliability-engineering/resilience.md";
  slug: "software-engineer/25-reliability-engineering/resilience";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/retry.md": {
	id: "software-engineer/25-reliability-engineering/retry.md";
  slug: "software-engineer/25-reliability-engineering/retry";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/sla.md": {
	id: "software-engineer/25-reliability-engineering/sla.md";
  slug: "software-engineer/25-reliability-engineering/sla";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/sli.md": {
	id: "software-engineer/25-reliability-engineering/sli.md";
  slug: "software-engineer/25-reliability-engineering/sli";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/slo.md": {
	id: "software-engineer/25-reliability-engineering/slo.md";
  slug: "software-engineer/25-reliability-engineering/slo";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/25-reliability-engineering/timeout.md": {
	id: "software-engineer/25-reliability-engineering/timeout.md";
  slug: "software-engineer/25-reliability-engineering/timeout";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/decorrelated-jitter.md": {
	id: "software-engineer/26-retry-design/decorrelated-jitter.md";
  slug: "software-engineer/26-retry-design/decorrelated-jitter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/equal-jitter.md": {
	id: "software-engineer/26-retry-design/equal-jitter.md";
  slug: "software-engineer/26-retry-design/equal-jitter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/exponential-backoff.md": {
	id: "software-engineer/26-retry-design/exponential-backoff.md";
  slug: "software-engineer/26-retry-design/exponential-backoff";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/full-jitter.md": {
	id: "software-engineer/26-retry-design/full-jitter.md";
  slug: "software-engineer/26-retry-design/full-jitter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/idempotency-keys.md": {
	id: "software-engineer/26-retry-design/idempotency-keys.md";
  slug: "software-engineer/26-retry-design/idempotency-keys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/maximum-attempts.md": {
	id: "software-engineer/26-retry-design/maximum-attempts.md";
  slug: "software-engineer/26-retry-design/maximum-attempts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/non-retryable-errors.md": {
	id: "software-engineer/26-retry-design/non-retryable-errors.md";
  slug: "software-engineer/26-retry-design/non-retryable-errors";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/retry-budgets.md": {
	id: "software-engineer/26-retry-design/retry-budgets.md";
  slug: "software-engineer/26-retry-design/retry-budgets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/26-retry-design/retryable-errors.md": {
	id: "software-engineer/26-retry-design/retryable-errors.md";
  slug: "software-engineer/26-retry-design/retryable-errors";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/compensation.md": {
	id: "software-engineer/27-error-handling/compensation.md";
  slug: "software-engineer/27-error-handling/compensation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/dead-letter-handling.md": {
	id: "software-engineer/27-error-handling/dead-letter-handling.md";
  slug: "software-engineer/27-error-handling/dead-letter-handling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/either-types.md": {
	id: "software-engineer/27-error-handling/either-types.md";
  slug: "software-engineer/27-error-handling/either-types";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/error-boundaries.md": {
	id: "software-engineer/27-error-handling/error-boundaries.md";
  slug: "software-engineer/27-error-handling/error-boundaries";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/error-propagation.md": {
	id: "software-engineer/27-error-handling/error-propagation.md";
  slug: "software-engineer/27-error-handling/error-propagation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/error-translation.md": {
	id: "software-engineer/27-error-handling/error-translation.md";
  slug: "software-engineer/27-error-handling/error-translation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/error-values.md": {
	id: "software-engineer/27-error-handling/error-values.md";
  slug: "software-engineer/27-error-handling/error-values";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/exceptions.md": {
	id: "software-engineer/27-error-handling/exceptions.md";
  slug: "software-engineer/27-error-handling/exceptions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/fail-fast.md": {
	id: "software-engineer/27-error-handling/fail-fast.md";
  slug: "software-engineer/27-error-handling/fail-fast";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/graceful-degradation.md": {
	id: "software-engineer/27-error-handling/graceful-degradation.md";
  slug: "software-engineer/27-error-handling/graceful-degradation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/recovery.md": {
	id: "software-engineer/27-error-handling/recovery.md";
  slug: "software-engineer/27-error-handling/recovery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/result-types.md": {
	id: "software-engineer/27-error-handling/result-types.md";
  slug: "software-engineer/27-error-handling/result-types";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/27-error-handling/who-owns-recovery.md": {
	id: "software-engineer/27-error-handling/who-owns-recovery.md";
  slug: "software-engineer/27-error-handling/who-owns-recovery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/assertions.md": {
	id: "software-engineer/28-debugging/assertions.md";
  slug: "software-engineer/28-debugging/assertions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/binary-search.md": {
	id: "software-engineer/28-debugging/binary-search.md";
  slug: "software-engineer/28-debugging/binary-search";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/breakpoints.md": {
	id: "software-engineer/28-debugging/breakpoints.md";
  slug: "software-engineer/28-debugging/breakpoints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/core-dumps.md": {
	id: "software-engineer/28-debugging/core-dumps.md";
  slug: "software-engineer/28-debugging/core-dumps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/differential-debugging.md": {
	id: "software-engineer/28-debugging/differential-debugging.md";
  slug: "software-engineer/28-debugging/differential-debugging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/divide-and-conquer.md": {
	id: "software-engineer/28-debugging/divide-and-conquer.md";
  slug: "software-engineer/28-debugging/divide-and-conquer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/fault-injection.md": {
	id: "software-engineer/28-debugging/fault-injection.md";
  slug: "software-engineer/28-debugging/fault-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/fix.md": {
	id: "software-engineer/28-debugging/fix.md";
  slug: "software-engineer/28-debugging/fix";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/heap-dumps.md": {
	id: "software-engineer/28-debugging/heap-dumps.md";
  slug: "software-engineer/28-debugging/heap-dumps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/hypothesize.md": {
	id: "software-engineer/28-debugging/hypothesize.md";
  slug: "software-engineer/28-debugging/hypothesize";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/instrument.md": {
	id: "software-engineer/28-debugging/instrument.md";
  slug: "software-engineer/28-debugging/instrument";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/localize.md": {
	id: "software-engineer/28-debugging/localize.md";
  slug: "software-engineer/28-debugging/localize";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/logging.md": {
	id: "software-engineer/28-debugging/logging.md";
  slug: "software-engineer/28-debugging/logging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/minimal-reproduction.md": {
	id: "software-engineer/28-debugging/minimal-reproduction.md";
  slug: "software-engineer/28-debugging/minimal-reproduction";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/observe.md": {
	id: "software-engineer/28-debugging/observe.md";
  slug: "software-engineer/28-debugging/observe";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/profiling.md": {
	id: "software-engineer/28-debugging/profiling.md";
  slug: "software-engineer/28-debugging/profiling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/regression-test.md": {
	id: "software-engineer/28-debugging/regression-test.md";
  slug: "software-engineer/28-debugging/regression-test";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/reproduce.md": {
	id: "software-engineer/28-debugging/reproduce.md";
  slug: "software-engineer/28-debugging/reproduce";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/scientific-debugging.md": {
	id: "software-engineer/28-debugging/scientific-debugging.md";
  slug: "software-engineer/28-debugging/scientific-debugging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/stack-traces.md": {
	id: "software-engineer/28-debugging/stack-traces.md";
  slug: "software-engineer/28-debugging/stack-traces";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/test-hypothesis.md": {
	id: "software-engineer/28-debugging/test-hypothesis.md";
  slug: "software-engineer/28-debugging/test-hypothesis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/thread-dumps.md": {
	id: "software-engineer/28-debugging/thread-dumps.md";
  slug: "software-engineer/28-debugging/thread-dumps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/tracing.md": {
	id: "software-engineer/28-debugging/tracing.md";
  slug: "software-engineer/28-debugging/tracing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/verify.md": {
	id: "software-engineer/28-debugging/verify.md";
  slug: "software-engineer/28-debugging/verify";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/28-debugging/watchpoints.md": {
	id: "software-engineer/28-debugging/watchpoints.md";
  slug: "software-engineer/28-debugging/watchpoints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/can-i-reproduce-it.md": {
	id: "software-engineer/29-debugging-questions/can-i-reproduce-it.md";
  slug: "software-engineer/29-debugging-questions/can-i-reproduce-it";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/does-it-happen-only-in-production.md": {
	id: "software-engineer/29-debugging-questions/does-it-happen-only-in-production.md";
  slug: "software-engineer/29-debugging-questions/does-it-happen-only-in-production";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/does-it-happen-under-load.md": {
	id: "software-engineer/29-debugging-questions/does-it-happen-under-load.md";
  slug: "software-engineer/29-debugging-questions/does-it-happen-under-load";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/is-it-deterministic.md": {
	id: "software-engineer/29-debugging-questions/is-it-deterministic.md";
  slug: "software-engineer/29-debugging-questions/is-it-deterministic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/what-assumptions-am-i-making.md": {
	id: "software-engineer/29-debugging-questions/what-assumptions-am-i-making.md";
  slug: "software-engineer/29-debugging-questions/what-assumptions-am-i-making";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/what-changed.md": {
	id: "software-engineer/29-debugging-questions/what-changed.md";
  slug: "software-engineer/29-debugging-questions/what-changed";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/what-evidence-supports-my-hypothesis.md": {
	id: "software-engineer/29-debugging-questions/what-evidence-supports-my-hypothesis.md";
  slug: "software-engineer/29-debugging-questions/what-evidence-supports-my-hypothesis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/what-evidence-would-disprove-it.md": {
	id: "software-engineer/29-debugging-questions/what-evidence-would-disprove-it.md";
  slug: "software-engineer/29-debugging-questions/what-evidence-would-disprove-it";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/what-exactly-failed.md": {
	id: "software-engineer/29-debugging-questions/what-exactly-failed.md";
  slug: "software-engineer/29-debugging-questions/what-exactly-failed";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/what-is-the-smallest-reproduction.md": {
	id: "software-engineer/29-debugging-questions/what-is-the-smallest-reproduction.md";
  slug: "software-engineer/29-debugging-questions/what-is-the-smallest-reproduction";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/29-debugging-questions/where-did-it-first-become-incorrect.md": {
	id: "software-engineer/29-debugging-questions/where-did-it-first-become-incorrect.md";
  slug: "software-engineer/29-debugging-questions/where-did-it-first-become-incorrect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/acceptance.md": {
	id: "software-engineer/30-testing/acceptance.md";
  slug: "software-engineer/30-testing/acceptance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/compatibility-testing.md": {
	id: "software-engineer/30-testing/compatibility-testing.md";
  slug: "software-engineer/30-testing/compatibility-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/component.md": {
	id: "software-engineer/30-testing/component.md";
  slug: "software-engineer/30-testing/component";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/contract.md": {
	id: "software-engineer/30-testing/contract.md";
  slug: "software-engineer/30-testing/contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/end-to-end.md": {
	id: "software-engineer/30-testing/end-to-end.md";
  slug: "software-engineer/30-testing/end-to-end";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/exploratory-testing.md": {
	id: "software-engineer/30-testing/exploratory-testing.md";
  slug: "software-engineer/30-testing/exploratory-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/functional-testing.md": {
	id: "software-engineer/30-testing/functional-testing.md";
  slug: "software-engineer/30-testing/functional-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/installation-testing.md": {
	id: "software-engineer/30-testing/installation-testing.md";
  slug: "software-engineer/30-testing/installation-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/integration.md": {
	id: "software-engineer/30-testing/integration.md";
  slug: "software-engineer/30-testing/integration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/non-functional-testing.md": {
	id: "software-engineer/30-testing/non-functional-testing.md";
  slug: "software-engineer/30-testing/non-functional-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/performance-testing.md": {
	id: "software-engineer/30-testing/performance-testing.md";
  slug: "software-engineer/30-testing/performance-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/recovery-testing.md": {
	id: "software-engineer/30-testing/recovery-testing.md";
  slug: "software-engineer/30-testing/recovery-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/regression-testing.md": {
	id: "software-engineer/30-testing/regression-testing.md";
  slug: "software-engineer/30-testing/regression-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/reliability-testing.md": {
	id: "software-engineer/30-testing/reliability-testing.md";
  slug: "software-engineer/30-testing/reliability-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/sanity-testing.md": {
	id: "software-engineer/30-testing/sanity-testing.md";
  slug: "software-engineer/30-testing/sanity-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/security-testing.md": {
	id: "software-engineer/30-testing/security-testing.md";
  slug: "software-engineer/30-testing/security-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/smoke-testing.md": {
	id: "software-engineer/30-testing/smoke-testing.md";
  slug: "software-engineer/30-testing/smoke-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/system.md": {
	id: "software-engineer/30-testing/system.md";
  slug: "software-engineer/30-testing/system";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/unit.md": {
	id: "software-engineer/30-testing/unit.md";
  slug: "software-engineer/30-testing/unit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/30-testing/usability-testing.md": {
	id: "software-engineer/30-testing/usability-testing.md";
  slug: "software-engineer/30-testing/usability-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/31-testing-pyramid/e2e.md": {
	id: "software-engineer/31-testing-pyramid/e2e.md";
  slug: "software-engineer/31-testing-pyramid/e2e";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/31-testing-pyramid/integration.md": {
	id: "software-engineer/31-testing-pyramid/integration.md";
  slug: "software-engineer/31-testing-pyramid/integration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/31-testing-pyramid/testing-diamond.md": {
	id: "software-engineer/31-testing-pyramid/testing-diamond.md";
  slug: "software-engineer/31-testing-pyramid/testing-diamond";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/31-testing-pyramid/testing-honeycomb.md": {
	id: "software-engineer/31-testing-pyramid/testing-honeycomb.md";
  slug: "software-engineer/31-testing-pyramid/testing-honeycomb";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/31-testing-pyramid/testing-trophy.md": {
	id: "software-engineer/31-testing-pyramid/testing-trophy.md";
  slug: "software-engineer/31-testing-pyramid/testing-trophy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/31-testing-pyramid/unit.md": {
	id: "software-engineer/31-testing-pyramid/unit.md";
  slug: "software-engineer/31-testing-pyramid/unit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/boundary-value-analysis.md": {
	id: "software-engineer/32-test-design-techniques/boundary-value-analysis.md";
  slug: "software-engineer/32-test-design-techniques/boundary-value-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/cause-effect-graphing.md": {
	id: "software-engineer/32-test-design-techniques/cause-effect-graphing.md";
  slug: "software-engineer/32-test-design-techniques/cause-effect-graphing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/combinatorial-testing.md": {
	id: "software-engineer/32-test-design-techniques/combinatorial-testing.md";
  slug: "software-engineer/32-test-design-techniques/combinatorial-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/decision-tables.md": {
	id: "software-engineer/32-test-design-techniques/decision-tables.md";
  slug: "software-engineer/32-test-design-techniques/decision-tables";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/equivalence-partitioning.md": {
	id: "software-engineer/32-test-design-techniques/equivalence-partitioning.md";
  slug: "software-engineer/32-test-design-techniques/equivalence-partitioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/error-guessing.md": {
	id: "software-engineer/32-test-design-techniques/error-guessing.md";
  slug: "software-engineer/32-test-design-techniques/error-guessing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/pairwise-testing.md": {
	id: "software-engineer/32-test-design-techniques/pairwise-testing.md";
  slug: "software-engineer/32-test-design-techniques/pairwise-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/risk-based-testing.md": {
	id: "software-engineer/32-test-design-techniques/risk-based-testing.md";
  slug: "software-engineer/32-test-design-techniques/risk-based-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/32-test-design-techniques/state-transition-testing.md": {
	id: "software-engineer/32-test-design-techniques/state-transition-testing.md";
  slug: "software-engineer/32-test-design-techniques/state-transition-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/approval-testing.md": {
	id: "software-engineer/33-advanced-testing/approval-testing.md";
  slug: "software-engineer/33-advanced-testing/approval-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/chaos-testing.md": {
	id: "software-engineer/33-advanced-testing/chaos-testing.md";
  slug: "software-engineer/33-advanced-testing/chaos-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/conformance-testing.md": {
	id: "software-engineer/33-advanced-testing/conformance-testing.md";
  slug: "software-engineer/33-advanced-testing/conformance-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/consumer-driven-contract-testing.md": {
	id: "software-engineer/33-advanced-testing/consumer-driven-contract-testing.md";
  slug: "software-engineer/33-advanced-testing/consumer-driven-contract-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/contract-testing.md": {
	id: "software-engineer/33-advanced-testing/contract-testing.md";
  slug: "software-engineer/33-advanced-testing/contract-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/differential-testing.md": {
	id: "software-engineer/33-advanced-testing/differential-testing.md";
  slug: "software-engineer/33-advanced-testing/differential-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/fuzz-testing.md": {
	id: "software-engineer/33-advanced-testing/fuzz-testing.md";
  slug: "software-engineer/33-advanced-testing/fuzz-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/golden-master-testing.md": {
	id: "software-engineer/33-advanced-testing/golden-master-testing.md";
  slug: "software-engineer/33-advanced-testing/golden-master-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/metamorphic-testing.md": {
	id: "software-engineer/33-advanced-testing/metamorphic-testing.md";
  slug: "software-engineer/33-advanced-testing/metamorphic-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/model-based-testing.md": {
	id: "software-engineer/33-advanced-testing/model-based-testing.md";
  slug: "software-engineer/33-advanced-testing/model-based-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/mutation-testing.md": {
	id: "software-engineer/33-advanced-testing/mutation-testing.md";
  slug: "software-engineer/33-advanced-testing/mutation-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/property-based-testing.md": {
	id: "software-engineer/33-advanced-testing/property-based-testing.md";
  slug: "software-engineer/33-advanced-testing/property-based-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/33-advanced-testing/snapshot-testing.md": {
	id: "software-engineer/33-advanced-testing/snapshot-testing.md";
  slug: "software-engineer/33-advanced-testing/snapshot-testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/34-test-doubles/dummy.md": {
	id: "software-engineer/34-test-doubles/dummy.md";
  slug: "software-engineer/34-test-doubles/dummy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/34-test-doubles/fake.md": {
	id: "software-engineer/34-test-doubles/fake.md";
  slug: "software-engineer/34-test-doubles/fake";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/34-test-doubles/mock.md": {
	id: "software-engineer/34-test-doubles/mock.md";
  slug: "software-engineer/34-test-doubles/mock";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/34-test-doubles/mocking-implementation-details-can-make-tests-lie.md": {
	id: "software-engineer/34-test-doubles/mocking-implementation-details-can-make-tests-lie.md";
  slug: "software-engineer/34-test-doubles/mocking-implementation-details-can-make-tests-lie";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/34-test-doubles/spy.md": {
	id: "software-engineer/34-test-doubles/spy.md";
  slug: "software-engineer/34-test-doubles/spy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/34-test-doubles/stub.md": {
	id: "software-engineer/34-test-doubles/stub.md";
  slug: "software-engineer/34-test-doubles/stub";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/arrange-act-assert.md": {
	id: "software-engineer/35-testing-principles/arrange-act-assert.md";
  slug: "software-engineer/35-testing-principles/arrange-act-assert";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/avoid-excessive-mocking.md": {
	id: "software-engineer/35-testing-principles/avoid-excessive-mocking.md";
  slug: "software-engineer/35-testing-principles/avoid-excessive-mocking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/avoid-test-interdependence.md": {
	id: "software-engineer/35-testing-principles/avoid-test-interdependence.md";
  slug: "software-engineer/35-testing-principles/avoid-test-interdependence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/deterministic-tests.md": {
	id: "software-engineer/35-testing-principles/deterministic-tests.md";
  slug: "software-engineer/35-testing-principles/deterministic-tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/fast-tests.md": {
	id: "software-engineer/35-testing-principles/fast-tests.md";
  slug: "software-engineer/35-testing-principles/fast-tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/first.md": {
	id: "software-engineer/35-testing-principles/first.md";
  slug: "software-engineer/35-testing-principles/first";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/given-when-then.md": {
	id: "software-engineer/35-testing-principles/given-when-then.md";
  slug: "software-engineer/35-testing-principles/given-when-then";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/independent-tests.md": {
	id: "software-engineer/35-testing-principles/independent-tests.md";
  slug: "software-engineer/35-testing-principles/independent-tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/isolated-tests.md": {
	id: "software-engineer/35-testing-principles/isolated-tests.md";
  slug: "software-engineer/35-testing-principles/isolated-tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/repeatable-tests.md": {
	id: "software-engineer/35-testing-principles/repeatable-tests.md";
  slug: "software-engineer/35-testing-principles/repeatable-tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/test-behavior-not-implementation.md": {
	id: "software-engineer/35-testing-principles/test-behavior-not-implementation.md";
  slug: "software-engineer/35-testing-principles/test-behavior-not-implementation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/test-boundaries.md": {
	id: "software-engineer/35-testing-principles/test-boundaries.md";
  slug: "software-engineer/35-testing-principles/test-boundaries";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/test-concurrency-where-relevant.md": {
	id: "software-engineer/35-testing-principles/test-concurrency-where-relevant.md";
  slug: "software-engineer/35-testing-principles/test-concurrency-where-relevant";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/35-testing-principles/test-failure-paths.md": {
	id: "software-engineer/35-testing-principles/test-failure-paths.md";
  slug: "software-engineer/35-testing-principles/test-failure-paths";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/attack-trees.md": {
	id: "software-engineer/36-security-engineering/attack-trees.md";
  slug: "software-engineer/36-security-engineering/attack-trees";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/authentication-failures.md": {
	id: "software-engineer/36-security-engineering/authentication-failures.md";
  slug: "software-engineer/36-security-engineering/authentication-failures";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/broken-access-control.md": {
	id: "software-engineer/36-security-engineering/broken-access-control.md";
  slug: "software-engineer/36-security-engineering/broken-access-control";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/command-injection.md": {
	id: "software-engineer/36-security-engineering/command-injection.md";
  slug: "software-engineer/36-security-engineering/command-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/cryptographic-failures.md": {
	id: "software-engineer/36-security-engineering/cryptographic-failures.md";
  slug: "software-engineer/36-security-engineering/cryptographic-failures";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/csrf.md": {
	id: "software-engineer/36-security-engineering/csrf.md";
  slug: "software-engineer/36-security-engineering/csrf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/defense-in-depth.md": {
	id: "software-engineer/36-security-engineering/defense-in-depth.md";
  slug: "software-engineer/36-security-engineering/defense-in-depth";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/dread.md": {
	id: "software-engineer/36-security-engineering/dread.md";
  slug: "software-engineer/36-security-engineering/dread";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/encryption-at-rest.md": {
	id: "software-engineer/36-security-engineering/encryption-at-rest.md";
  slug: "software-engineer/36-security-engineering/encryption-at-rest";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/encryption-in-transit.md": {
	id: "software-engineer/36-security-engineering/encryption-in-transit.md";
  slug: "software-engineer/36-security-engineering/encryption-in-transit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/injection.md": {
	id: "software-engineer/36-security-engineering/injection.md";
  slug: "software-engineer/36-security-engineering/injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/key-rotation.md": {
	id: "software-engineer/36-security-engineering/key-rotation.md";
  slug: "software-engineer/36-security-engineering/key-rotation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/least-privilege.md": {
	id: "software-engineer/36-security-engineering/least-privilege.md";
  slug: "software-engineer/36-security-engineering/least-privilege";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/logging-failures.md": {
	id: "software-engineer/36-security-engineering/logging-failures.md";
  slug: "software-engineer/36-security-engineering/logging-failures";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/owasp.md": {
	id: "software-engineer/36-security-engineering/owasp.md";
  slug: "software-engineer/36-security-engineering/owasp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/path-traversal.md": {
	id: "software-engineer/36-security-engineering/path-traversal.md";
  slug: "software-engineer/36-security-engineering/path-traversal";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/secrets-management.md": {
	id: "software-engineer/36-security-engineering/secrets-management.md";
  slug: "software-engineer/36-security-engineering/secrets-management";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/secure-defaults.md": {
	id: "software-engineer/36-security-engineering/secure-defaults.md";
  slug: "software-engineer/36-security-engineering/secure-defaults";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/security-misconfiguration.md": {
	id: "software-engineer/36-security-engineering/security-misconfiguration.md";
  slug: "software-engineer/36-security-engineering/security-misconfiguration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/sql-injection.md": {
	id: "software-engineer/36-security-engineering/sql-injection.md";
  slug: "software-engineer/36-security-engineering/sql-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/ssrf.md": {
	id: "software-engineer/36-security-engineering/ssrf.md";
  slug: "software-engineer/36-security-engineering/ssrf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/stride.md": {
	id: "software-engineer/36-security-engineering/stride.md";
  slug: "software-engineer/36-security-engineering/stride";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/threat-modeling.md": {
	id: "software-engineer/36-security-engineering/threat-modeling.md";
  slug: "software-engineer/36-security-engineering/threat-modeling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/vulnerable-components.md": {
	id: "software-engineer/36-security-engineering/vulnerable-components.md";
  slug: "software-engineer/36-security-engineering/vulnerable-components";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/xss.md": {
	id: "software-engineer/36-security-engineering/xss.md";
  slug: "software-engineer/36-security-engineering/xss";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/36-security-engineering/zero-trust.md": {
	id: "software-engineer/36-security-engineering/zero-trust.md";
  slug: "software-engineer/36-security-engineering/zero-trust";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/37-threat-modeling/how-could-it-happen.md": {
	id: "software-engineer/37-threat-modeling/how-could-it-happen.md";
  slug: "software-engineer/37-threat-modeling/how-could-it-happen";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/37-threat-modeling/what-are-we-protecting.md": {
	id: "software-engineer/37-threat-modeling/what-are-we-protecting.md";
  slug: "software-engineer/37-threat-modeling/what-are-we-protecting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/37-threat-modeling/what-can-go-wrong.md": {
	id: "software-engineer/37-threat-modeling/what-can-go-wrong.md";
  slug: "software-engineer/37-threat-modeling/what-can-go-wrong";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/37-threat-modeling/what-controls-detect-it.md": {
	id: "software-engineer/37-threat-modeling/what-controls-detect-it.md";
  slug: "software-engineer/37-threat-modeling/what-controls-detect-it";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/37-threat-modeling/what-controls-prevent-it.md": {
	id: "software-engineer/37-threat-modeling/what-controls-prevent-it.md";
  slug: "software-engineer/37-threat-modeling/what-controls-prevent-it";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/37-threat-modeling/what-happens-if-prevention-fails.md": {
	id: "software-engineer/37-threat-modeling/what-happens-if-prevention-fails.md";
  slug: "software-engineer/37-threat-modeling/what-happens-if-prevention-fails";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/37-threat-modeling/who-are-we-protecting-it-from.md": {
	id: "software-engineer/37-threat-modeling/who-are-we-protecting-it-from.md";
  slug: "software-engineer/37-threat-modeling/who-are-we-protecting-it-from";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/cardinality.md": {
	id: "software-engineer/38-observability/cardinality.md";
  slug: "software-engineer/38-observability/cardinality";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/continuous-profiling.md": {
	id: "software-engineer/38-observability/continuous-profiling.md";
  slug: "software-engineer/38-observability/continuous-profiling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/correlation-ids.md": {
	id: "software-engineer/38-observability/correlation-ids.md";
  slug: "software-engineer/38-observability/correlation-ids";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/distributed-tracing.md": {
	id: "software-engineer/38-observability/distributed-tracing.md";
  slug: "software-engineer/38-observability/distributed-tracing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/events.md": {
	id: "software-engineer/38-observability/events.md";
  slug: "software-engineer/38-observability/events";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/logs.md": {
	id: "software-engineer/38-observability/logs.md";
  slug: "software-engineer/38-observability/logs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/metrics.md": {
	id: "software-engineer/38-observability/metrics.md";
  slug: "software-engineer/38-observability/metrics";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/profiles.md": {
	id: "software-engineer/38-observability/profiles.md";
  slug: "software-engineer/38-observability/profiles";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/sampling.md": {
	id: "software-engineer/38-observability/sampling.md";
  slug: "software-engineer/38-observability/sampling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/span-ids.md": {
	id: "software-engineer/38-observability/span-ids.md";
  slug: "software-engineer/38-observability/span-ids";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/structured-logging.md": {
	id: "software-engineer/38-observability/structured-logging.md";
  slug: "software-engineer/38-observability/structured-logging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/trace-ids.md": {
	id: "software-engineer/38-observability/trace-ids.md";
  slug: "software-engineer/38-observability/trace-ids";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/38-observability/traces.md": {
	id: "software-engineer/38-observability/traces.md";
  slug: "software-engineer/38-observability/traces";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/correlation.md": {
	id: "software-engineer/39-logging/correlation.md";
  slug: "software-engineer/39-logging/correlation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/error-code.md": {
	id: "software-engineer/39-logging/error-code.md";
  slug: "software-engineer/39-logging/error-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/event-payment-failed.md": {
	id: "software-engineer/39-logging/event-payment-failed.md";
  slug: "software-engineer/39-logging/event-payment-failed";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/excessive-pii.md": {
	id: "software-engineer/39-logging/excessive-pii.md";
  slug: "software-engineer/39-logging/excessive-pii";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/impact.md": {
	id: "software-engineer/39-logging/impact.md";
  slug: "software-engineer/39-logging/impact";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/level-error.md": {
	id: "software-engineer/39-logging/level-error.md";
  slug: "software-engineer/39-logging/level-error";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/passwords.md": {
	id: "software-engineer/39-logging/passwords.md";
  slug: "software-engineer/39-logging/passwords";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/secrets.md": {
	id: "software-engineer/39-logging/secrets.md";
  slug: "software-engineer/39-logging/secrets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/service-payments.md": {
	id: "software-engineer/39-logging/service-payments.md";
  slug: "software-engineer/39-logging/service-payments";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/timestamp.md": {
	id: "software-engineer/39-logging/timestamp.md";
  slug: "software-engineer/39-logging/timestamp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/tokens.md": {
	id: "software-engineer/39-logging/tokens.md";
  slug: "software-engineer/39-logging/tokens";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/trace-id.md": {
	id: "software-engineer/39-logging/trace-id.md";
  slug: "software-engineer/39-logging/trace-id";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/unstructured-noise.md": {
	id: "software-engineer/39-logging/unstructured-noise.md";
  slug: "software-engineer/39-logging/unstructured-noise";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/what-happened.md": {
	id: "software-engineer/39-logging/what-happened.md";
  slug: "software-engineer/39-logging/what-happened";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/when.md": {
	id: "software-engineer/39-logging/when.md";
  slug: "software-engineer/39-logging/when";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/where.md": {
	id: "software-engineer/39-logging/where.md";
  slug: "software-engineer/39-logging/where";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/who.md": {
	id: "software-engineer/39-logging/who.md";
  slug: "software-engineer/39-logging/who";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/39-logging/why.md": {
	id: "software-engineer/39-logging/why.md";
  slug: "software-engineer/39-logging/why";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/artifact-repositories.md": {
	id: "software-engineer/40-ci-cd/artifact-repositories.md";
  slug: "software-engineer/40-ci-cd/artifact-repositories";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/blue-green.md": {
	id: "software-engineer/40-ci-cd/blue-green.md";
  slug: "software-engineer/40-ci-cd/blue-green";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/build-automation.md": {
	id: "software-engineer/40-ci-cd/build-automation.md";
  slug: "software-engineer/40-ci-cd/build-automation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/canary.md": {
	id: "software-engineer/40-ci-cd/canary.md";
  slug: "software-engineer/40-ci-cd/canary";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/continuous-delivery.md": {
	id: "software-engineer/40-ci-cd/continuous-delivery.md";
  slug: "software-engineer/40-ci-cd/continuous-delivery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/continuous-deployment.md": {
	id: "software-engineer/40-ci-cd/continuous-deployment.md";
  slug: "software-engineer/40-ci-cd/continuous-deployment";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/continuous-integration.md": {
	id: "software-engineer/40-ci-cd/continuous-integration.md";
  slug: "software-engineer/40-ci-cd/continuous-integration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/deployment-strategies.md": {
	id: "software-engineer/40-ci-cd/deployment-strategies.md";
  slug: "software-engineer/40-ci-cd/deployment-strategies";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/feature-flags.md": {
	id: "software-engineer/40-ci-cd/feature-flags.md";
  slug: "software-engineer/40-ci-cd/feature-flags";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/pipeline-gates.md": {
	id: "software-engineer/40-ci-cd/pipeline-gates.md";
  slug: "software-engineer/40-ci-cd/pipeline-gates";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/quality-gates.md": {
	id: "software-engineer/40-ci-cd/quality-gates.md";
  slug: "software-engineer/40-ci-cd/quality-gates";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/recreate.md": {
	id: "software-engineer/40-ci-cd/recreate.md";
  slug: "software-engineer/40-ci-cd/recreate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/rolling.md": {
	id: "software-engineer/40-ci-cd/rolling.md";
  slug: "software-engineer/40-ci-cd/rolling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/40-ci-cd/shadow.md": {
	id: "software-engineer/40-ci-cd/shadow.md";
  slug: "software-engineer/40-ci-cd/shadow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/alerting.md": {
	id: "software-engineer/41-devops/alerting.md";
  slug: "software-engineer/41-devops/alerting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/configuration-as-code.md": {
	id: "software-engineer/41-devops/configuration-as-code.md";
  slug: "software-engineer/41-devops/configuration-as-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/containers.md": {
	id: "software-engineer/41-devops/containers.md";
  slug: "software-engineer/41-devops/containers";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/gitops.md": {
	id: "software-engineer/41-devops/gitops.md";
  slug: "software-engineer/41-devops/gitops";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/immutable-infrastructure.md": {
	id: "software-engineer/41-devops/immutable-infrastructure.md";
  slug: "software-engineer/41-devops/immutable-infrastructure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/incident-management.md": {
	id: "software-engineer/41-devops/incident-management.md";
  slug: "software-engineer/41-devops/incident-management";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/infrastructure-as-code.md": {
	id: "software-engineer/41-devops/infrastructure-as-code.md";
  slug: "software-engineer/41-devops/infrastructure-as-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/kubernetes.md": {
	id: "software-engineer/41-devops/kubernetes.md";
  slug: "software-engineer/41-devops/kubernetes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/monitoring.md": {
	id: "software-engineer/41-devops/monitoring.md";
  slug: "software-engineer/41-devops/monitoring";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/secrets-management.md": {
	id: "software-engineer/41-devops/secrets-management.md";
  slug: "software-engineer/41-devops/secrets-management";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/41-devops/service-mesh.md": {
	id: "software-engineer/41-devops/service-mesh.md";
  slug: "software-engineer/41-devops/service-mesh";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/bisect.md": {
	id: "software-engineer/42-git/bisect.md";
  slug: "software-engineer/42-git/bisect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/branch.md": {
	id: "software-engineer/42-git/branch.md";
  slug: "software-engineer/42-git/branch";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/cherry-pick.md": {
	id: "software-engineer/42-git/cherry-pick.md";
  slug: "software-engineer/42-git/cherry-pick";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/commit.md": {
	id: "software-engineer/42-git/commit.md";
  slug: "software-engineer/42-git/commit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/conventional-commits.md": {
	id: "software-engineer/42-git/conventional-commits.md";
  slug: "software-engineer/42-git/conventional-commits";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/gitflow.md": {
	id: "software-engineer/42-git/gitflow.md";
  slug: "software-engineer/42-git/gitflow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/merge.md": {
	id: "software-engineer/42-git/merge.md";
  slug: "software-engineer/42-git/merge";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/rebase.md": {
	id: "software-engineer/42-git/rebase.md";
  slug: "software-engineer/42-git/rebase";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/release.md": {
	id: "software-engineer/42-git/release.md";
  slug: "software-engineer/42-git/release";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/reset.md": {
	id: "software-engineer/42-git/reset.md";
  slug: "software-engineer/42-git/reset";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/revert.md": {
	id: "software-engineer/42-git/revert.md";
  slug: "software-engineer/42-git/revert";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/stash.md": {
	id: "software-engineer/42-git/stash.md";
  slug: "software-engineer/42-git/stash";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/tag.md": {
	id: "software-engineer/42-git/tag.md";
  slug: "software-engineer/42-git/tag";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/42-git/trunk-based-development.md": {
	id: "software-engineer/42-git/trunk-based-development.md";
  slug: "software-engineer/42-git/trunk-based-development";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/accidental-complexity.md": {
	id: "software-engineer/43-refactoring/accidental-complexity.md";
  slug: "software-engineer/43-refactoring/accidental-complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/code-smell.md": {
	id: "software-engineer/43-refactoring/code-smell.md";
  slug: "software-engineer/43-refactoring/code-smell";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/consolidate-conditional-expression.md": {
	id: "software-engineer/43-refactoring/consolidate-conditional-expression.md";
  slug: "software-engineer/43-refactoring/consolidate-conditional-expression";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/decompose-conditional.md": {
	id: "software-engineer/43-refactoring/decompose-conditional.md";
  slug: "software-engineer/43-refactoring/decompose-conditional";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/encapsulate-field.md": {
	id: "software-engineer/43-refactoring/encapsulate-field.md";
  slug: "software-engineer/43-refactoring/encapsulate-field";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/essential-complexity.md": {
	id: "software-engineer/43-refactoring/essential-complexity.md";
  slug: "software-engineer/43-refactoring/essential-complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/extract-class.md": {
	id: "software-engineer/43-refactoring/extract-class.md";
  slug: "software-engineer/43-refactoring/extract-class";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/extract-method.md": {
	id: "software-engineer/43-refactoring/extract-method.md";
  slug: "software-engineer/43-refactoring/extract-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/inline-method.md": {
	id: "software-engineer/43-refactoring/inline-method.md";
  slug: "software-engineer/43-refactoring/inline-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/introduce-parameter-object.md": {
	id: "software-engineer/43-refactoring/introduce-parameter-object.md";
  slug: "software-engineer/43-refactoring/introduce-parameter-object";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/move-method.md": {
	id: "software-engineer/43-refactoring/move-method.md";
  slug: "software-engineer/43-refactoring/move-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/rename.md": {
	id: "software-engineer/43-refactoring/rename.md";
  slug: "software-engineer/43-refactoring/rename";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/replace-conditional-with-polymorphism.md": {
	id: "software-engineer/43-refactoring/replace-conditional-with-polymorphism.md";
  slug: "software-engineer/43-refactoring/replace-conditional-with-polymorphism";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/replace-magic-number.md": {
	id: "software-engineer/43-refactoring/replace-magic-number.md";
  slug: "software-engineer/43-refactoring/replace-magic-number";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/43-refactoring/technical-debt.md": {
	id: "software-engineer/43-refactoring/technical-debt.md";
  slug: "software-engineer/43-refactoring/technical-debt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/circular-dependencies.md": {
	id: "software-engineer/44-code-smells/circular-dependencies.md";
  slug: "software-engineer/44-code-smells/circular-dependencies";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/data-clumps.md": {
	id: "software-engineer/44-code-smells/data-clumps.md";
  slug: "software-engineer/44-code-smells/data-clumps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/dead-code.md": {
	id: "software-engineer/44-code-smells/dead-code.md";
  slug: "software-engineer/44-code-smells/dead-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/divergent-change.md": {
	id: "software-engineer/44-code-smells/divergent-change.md";
  slug: "software-engineer/44-code-smells/divergent-change";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/duplicate-code.md": {
	id: "software-engineer/44-code-smells/duplicate-code.md";
  slug: "software-engineer/44-code-smells/duplicate-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/feature-envy.md": {
	id: "software-engineer/44-code-smells/feature-envy.md";
  slug: "software-engineer/44-code-smells/feature-envy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/god-function.md": {
	id: "software-engineer/44-code-smells/god-function.md";
  slug: "software-engineer/44-code-smells/god-function";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/god-object.md": {
	id: "software-engineer/44-code-smells/god-object.md";
  slug: "software-engineer/44-code-smells/god-object";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/inappropriate-intimacy.md": {
	id: "software-engineer/44-code-smells/inappropriate-intimacy.md";
  slug: "software-engineer/44-code-smells/inappropriate-intimacy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/large-class.md": {
	id: "software-engineer/44-code-smells/large-class.md";
  slug: "software-engineer/44-code-smells/large-class";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/long-method.md": {
	id: "software-engineer/44-code-smells/long-method.md";
  slug: "software-engineer/44-code-smells/long-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/long-parameter-list.md": {
	id: "software-engineer/44-code-smells/long-parameter-list.md";
  slug: "software-engineer/44-code-smells/long-parameter-list";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/message-chains.md": {
	id: "software-engineer/44-code-smells/message-chains.md";
  slug: "software-engineer/44-code-smells/message-chains";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/primitive-obsession.md": {
	id: "software-engineer/44-code-smells/primitive-obsession.md";
  slug: "software-engineer/44-code-smells/primitive-obsession";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/shotgun-surgery.md": {
	id: "software-engineer/44-code-smells/shotgun-surgery.md";
  slug: "software-engineer/44-code-smells/shotgun-surgery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/44-code-smells/speculative-generality.md": {
	id: "software-engineer/44-code-smells/speculative-generality.md";
  slug: "software-engineer/44-code-smells/speculative-generality";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/acceptance-criteria.md": {
	id: "software-engineer/45-requirements-engineering/acceptance-criteria.md";
  slug: "software-engineer/45-requirements-engineering/acceptance-criteria";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/ambiguity.md": {
	id: "software-engineer/45-requirements-engineering/ambiguity.md";
  slug: "software-engineer/45-requirements-engineering/ambiguity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/assumptions.md": {
	id: "software-engineer/45-requirements-engineering/assumptions.md";
  slug: "software-engineer/45-requirements-engineering/assumptions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/constraints.md": {
	id: "software-engineer/45-requirements-engineering/constraints.md";
  slug: "software-engineer/45-requirements-engineering/constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/event-storming.md": {
	id: "software-engineer/45-requirements-engineering/event-storming.md";
  slug: "software-engineer/45-requirements-engineering/event-storming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/example-mapping.md": {
	id: "software-engineer/45-requirements-engineering/example-mapping.md";
  slug: "software-engineer/45-requirements-engineering/example-mapping";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/functional-requirements.md": {
	id: "software-engineer/45-requirements-engineering/functional-requirements.md";
  slug: "software-engineer/45-requirements-engineering/functional-requirements";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/impact-mapping.md": {
	id: "software-engineer/45-requirements-engineering/impact-mapping.md";
  slug: "software-engineer/45-requirements-engineering/impact-mapping";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/invest.md": {
	id: "software-engineer/45-requirements-engineering/invest.md";
  slug: "software-engineer/45-requirements-engineering/invest";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/moscow.md": {
	id: "software-engineer/45-requirements-engineering/moscow.md";
  slug: "software-engineer/45-requirements-engineering/moscow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/non-functional-requirements.md": {
	id: "software-engineer/45-requirements-engineering/non-functional-requirements.md";
  slug: "software-engineer/45-requirements-engineering/non-functional-requirements";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/prioritization.md": {
	id: "software-engineer/45-requirements-engineering/prioritization.md";
  slug: "software-engineer/45-requirements-engineering/prioritization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/quality-attributes.md": {
	id: "software-engineer/45-requirements-engineering/quality-attributes.md";
  slug: "software-engineer/45-requirements-engineering/quality-attributes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/requirements-traceability.md": {
	id: "software-engineer/45-requirements-engineering/requirements-traceability.md";
  slug: "software-engineer/45-requirements-engineering/requirements-traceability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/stakeholders.md": {
	id: "software-engineer/45-requirements-engineering/stakeholders.md";
  slug: "software-engineer/45-requirements-engineering/stakeholders";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/use-cases.md": {
	id: "software-engineer/45-requirements-engineering/use-cases.md";
  slug: "software-engineer/45-requirements-engineering/use-cases";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/45-requirements-engineering/user-stories.md": {
	id: "software-engineer/45-requirements-engineering/user-stories.md";
  slug: "software-engineer/45-requirements-engineering/user-stories";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/function-points.md": {
	id: "software-engineer/46-software-estimation/function-points.md";
  slug: "software-engineer/46-software-estimation/function-points";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/monte-carlo-forecasting.md": {
	id: "software-engineer/46-software-estimation/monte-carlo-forecasting.md";
  slug: "software-engineer/46-software-estimation/monte-carlo-forecasting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/pert.md": {
	id: "software-engineer/46-software-estimation/pert.md";
  slug: "software-engineer/46-software-estimation/pert";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/planning-poker.md": {
	id: "software-engineer/46-software-estimation/planning-poker.md";
  slug: "software-engineer/46-software-estimation/planning-poker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/story-points.md": {
	id: "software-engineer/46-software-estimation/story-points.md";
  slug: "software-engineer/46-software-estimation/story-points";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/t-shirt-sizing.md": {
	id: "software-engineer/46-software-estimation/t-shirt-sizing.md";
  slug: "software-engineer/46-software-estimation/t-shirt-sizing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/three-point-estimation.md": {
	id: "software-engineer/46-software-estimation/three-point-estimation.md";
  slug: "software-engineer/46-software-estimation/three-point-estimation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/throughput.md": {
	id: "software-engineer/46-software-estimation/throughput.md";
  slug: "software-engineer/46-software-estimation/throughput";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/use-case-points.md": {
	id: "software-engineer/46-software-estimation/use-case-points.md";
  slug: "software-engineer/46-software-estimation/use-case-points";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/46-software-estimation/velocity.md": {
	id: "software-engineer/46-software-estimation/velocity.md";
  slug: "software-engineer/46-software-estimation/velocity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/collective-ownership.md": {
	id: "software-engineer/47-agile/collective-ownership.md";
  slug: "software-engineer/47-agile/collective-ownership";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/continuous-integration.md": {
	id: "software-engineer/47-agile/continuous-integration.md";
  slug: "software-engineer/47-agile/continuous-integration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/crystal.md": {
	id: "software-engineer/47-agile/crystal.md";
  slug: "software-engineer/47-agile/crystal";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/kanban.md": {
	id: "software-engineer/47-agile/kanban.md";
  slug: "software-engineer/47-agile/kanban";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/lean.md": {
	id: "software-engineer/47-agile/lean.md";
  slug: "software-engineer/47-agile/lean";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/pair-programming.md": {
	id: "software-engineer/47-agile/pair-programming.md";
  slug: "software-engineer/47-agile/pair-programming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/refactoring.md": {
	id: "software-engineer/47-agile/refactoring.md";
  slug: "software-engineer/47-agile/refactoring";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/safe.md": {
	id: "software-engineer/47-agile/safe.md";
  slug: "software-engineer/47-agile/safe";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/scrum.md": {
	id: "software-engineer/47-agile/scrum.md";
  slug: "software-engineer/47-agile/scrum";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/shape-up.md": {
	id: "software-engineer/47-agile/shape-up.md";
  slug: "software-engineer/47-agile/shape-up";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/simple-design.md": {
	id: "software-engineer/47-agile/simple-design.md";
  slug: "software-engineer/47-agile/simple-design";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/tdd.md": {
	id: "software-engineer/47-agile/tdd.md";
  slug: "software-engineer/47-agile/tdd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/47-agile/xp.md": {
	id: "software-engineer/47-agile/xp.md";
  slug: "software-engineer/47-agile/xp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/avoid-boolean-blindness.md": {
	id: "software-engineer/48-clean-code/avoid-boolean-blindness.md";
  slug: "software-engineer/48-clean-code/avoid-boolean-blindness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/avoid-deep-nesting.md": {
	id: "software-engineer/48-clean-code/avoid-deep-nesting.md";
  slug: "software-engineer/48-clean-code/avoid-deep-nesting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/avoid-magic-numbers.md": {
	id: "software-engineer/48-clean-code/avoid-magic-numbers.md";
  slug: "software-engineer/48-clean-code/avoid-magic-numbers";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/changeable.md": {
	id: "software-engineer/48-clean-code/changeable.md";
  slug: "software-engineer/48-clean-code/changeable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/cohesive.md": {
	id: "software-engineer/48-clean-code/cohesive.md";
  slug: "software-engineer/48-clean-code/cohesive";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/explicit-error-handling.md": {
	id: "software-engineer/48-clean-code/explicit-error-handling.md";
  slug: "software-engineer/48-clean-code/explicit-error-handling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/explicit.md": {
	id: "software-engineer/48-clean-code/explicit.md";
  slug: "software-engineer/48-clean-code/explicit";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/local-reasoning.md": {
	id: "software-engineer/48-clean-code/local-reasoning.md";
  slug: "software-engineer/48-clean-code/local-reasoning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/meaningful-names.md": {
	id: "software-engineer/48-clean-code/meaningful-names.md";
  slug: "software-engineer/48-clean-code/meaningful-names";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/minimal-comments.md": {
	id: "software-engineer/48-clean-code/minimal-comments.md";
  slug: "software-engineer/48-clean-code/minimal-comments";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/predictable.md": {
	id: "software-engineer/48-clean-code/predictable.md";
  slug: "software-engineer/48-clean-code/predictable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/readable.md": {
	id: "software-engineer/48-clean-code/readable.md";
  slug: "software-engineer/48-clean-code/readable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/single-responsibility.md": {
	id: "software-engineer/48-clean-code/single-responsibility.md";
  slug: "software-engineer/48-clean-code/single-responsibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/small-functions.md": {
	id: "software-engineer/48-clean-code/small-functions.md";
  slug: "software-engineer/48-clean-code/small-functions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/small.md": {
	id: "software-engineer/48-clean-code/small.md";
  slug: "software-engineer/48-clean-code/small";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/48-clean-code/testable.md": {
	id: "software-engineer/48-clean-code/testable.md";
  slug: "software-engineer/48-clean-code/testable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/api-contract.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/api-contract.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/api-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/database-contract.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/database-contract.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/database-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/domain-contract.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/domain-contract.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/domain-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/external-service-contract.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/external-service-contract.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/external-service-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/how-is-compatibility-maintained.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/how-is-compatibility-maintained.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/how-is-compatibility-maintained";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/ui-contract.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/ui-contract.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/ui-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/user.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/user.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/user";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/what-can-change.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/what-can-change.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/what-can-change";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/what-can-fail.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/what-can-fail.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/what-can-fail";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/what-comes-in.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/what-comes-in.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/what-comes-in";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/what-goes-out.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/what-goes-out.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/what-goes-out";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/what-is-guaranteed.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/what-is-guaranteed.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/what-is-guaranteed";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/49-api-database-code-the-contract-triad/who-owns-validation.md": {
	id: "software-engineer/49-api-database-code-the-contract-triad/who-owns-validation.md";
  slug: "software-engineer/49-api-database-code-the-contract-triad/who-owns-validation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/derived-state.md": {
	id: "software-engineer/50-state-management/derived-state.md";
  slug: "software-engineer/50-state-management/derived-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/distributed-state.md": {
	id: "software-engineer/50-state-management/distributed-state.md";
  slug: "software-engineer/50-state-management/distributed-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/ephemeral-state.md": {
	id: "software-engineer/50-state-management/ephemeral-state.md";
  slug: "software-engineer/50-state-management/ephemeral-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/event-sourcing.md": {
	id: "software-engineer/50-state-management/event-sourcing.md";
  slug: "software-engineer/50-state-management/event-sourcing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/finite-state-machines.md": {
	id: "software-engineer/50-state-management/finite-state-machines.md";
  slug: "software-engineer/50-state-management/finite-state-machines";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/local-state.md": {
	id: "software-engineer/50-state-management/local-state.md";
  slug: "software-engineer/50-state-management/local-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/persistent-state.md": {
	id: "software-engineer/50-state-management/persistent-state.md";
  slug: "software-engineer/50-state-management/persistent-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/reactive-state.md": {
	id: "software-engineer/50-state-management/reactive-state.md";
  slug: "software-engineer/50-state-management/reactive-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/redux-style-architectures.md": {
	id: "software-engineer/50-state-management/redux-style-architectures.md";
  slug: "software-engineer/50-state-management/redux-style-architectures";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/shared-state.md": {
	id: "software-engineer/50-state-management/shared-state.md";
  slug: "software-engineer/50-state-management/shared-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/state-machines.md": {
	id: "software-engineer/50-state-management/state-machines.md";
  slug: "software-engineer/50-state-management/state-machines";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/50-state-management/statecharts.md": {
	id: "software-engineer/50-state-management/statecharts.md";
  slug: "software-engineer/50-state-management/statecharts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/accessibility.md": {
	id: "software-engineer/51-frontend-engineering/accessibility.md";
  slug: "software-engineer/51-frontend-engineering/accessibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/browser-caching.md": {
	id: "software-engineer/51-frontend-engineering/browser-caching.md";
  slug: "software-engineer/51-frontend-engineering/browser-caching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/code-splitting.md": {
	id: "software-engineer/51-frontend-engineering/code-splitting.md";
  slug: "software-engineer/51-frontend-engineering/code-splitting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/component-architecture.md": {
	id: "software-engineer/51-frontend-engineering/component-architecture.md";
  slug: "software-engineer/51-frontend-engineering/component-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/csr.md": {
	id: "software-engineer/51-frontend-engineering/csr.md";
  slug: "software-engineer/51-frontend-engineering/csr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/hydration.md": {
	id: "software-engineer/51-frontend-engineering/hydration.md";
  slug: "software-engineer/51-frontend-engineering/hydration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/isr.md": {
	id: "software-engineer/51-frontend-engineering/isr.md";
  slug: "software-engineer/51-frontend-engineering/isr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/lazy-loading.md": {
	id: "software-engineer/51-frontend-engineering/lazy-loading.md";
  slug: "software-engineer/51-frontend-engineering/lazy-loading";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/progressive-enhancement.md": {
	id: "software-engineer/51-frontend-engineering/progressive-enhancement.md";
  slug: "software-engineer/51-frontend-engineering/progressive-enhancement";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/rendering.md": {
	id: "software-engineer/51-frontend-engineering/rendering.md";
  slug: "software-engineer/51-frontend-engineering/rendering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/responsive-design.md": {
	id: "software-engineer/51-frontend-engineering/responsive-design.md";
  slug: "software-engineer/51-frontend-engineering/responsive-design";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/ssg.md": {
	id: "software-engineer/51-frontend-engineering/ssg.md";
  slug: "software-engineer/51-frontend-engineering/ssg";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/ssr.md": {
	id: "software-engineer/51-frontend-engineering/ssr.md";
  slug: "software-engineer/51-frontend-engineering/ssr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/state-management.md": {
	id: "software-engineer/51-frontend-engineering/state-management.md";
  slug: "software-engineer/51-frontend-engineering/state-management";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/tree-shaking.md": {
	id: "software-engineer/51-frontend-engineering/tree-shaking.md";
  slug: "software-engineer/51-frontend-engineering/tree-shaking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/51-frontend-engineering/web-performance.md": {
	id: "software-engineer/51-frontend-engineering/web-performance.md";
  slug: "software-engineer/51-frontend-engineering/web-performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/app-version-compatibility.md": {
	id: "software-engineer/52-mobile-engineering/app-version-compatibility.md";
  slug: "software-engineer/52-mobile-engineering/app-version-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/background-execution.md": {
	id: "software-engineer/52-mobile-engineering/background-execution.md";
  slug: "software-engineer/52-mobile-engineering/background-execution";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/battery-constraints.md": {
	id: "software-engineer/52-mobile-engineering/battery-constraints.md";
  slug: "software-engineer/52-mobile-engineering/battery-constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/deep-links.md": {
	id: "software-engineer/52-mobile-engineering/deep-links.md";
  slug: "software-engineer/52-mobile-engineering/deep-links";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/lifecycle.md": {
	id: "software-engineer/52-mobile-engineering/lifecycle.md";
  slug: "software-engineer/52-mobile-engineering/lifecycle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/local-persistence.md": {
	id: "software-engineer/52-mobile-engineering/local-persistence.md";
  slug: "software-engineer/52-mobile-engineering/local-persistence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/network-unreliability.md": {
	id: "software-engineer/52-mobile-engineering/network-unreliability.md";
  slug: "software-engineer/52-mobile-engineering/network-unreliability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/offline-first.md": {
	id: "software-engineer/52-mobile-engineering/offline-first.md";
  slug: "software-engineer/52-mobile-engineering/offline-first";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/permissions.md": {
	id: "software-engineer/52-mobile-engineering/permissions.md";
  slug: "software-engineer/52-mobile-engineering/permissions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/push-notifications.md": {
	id: "software-engineer/52-mobile-engineering/push-notifications.md";
  slug: "software-engineer/52-mobile-engineering/push-notifications";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/secure-storage.md": {
	id: "software-engineer/52-mobile-engineering/secure-storage.md";
  slug: "software-engineer/52-mobile-engineering/secure-storage";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/52-mobile-engineering/synchronization.md": {
	id: "software-engineer/52-mobile-engineering/synchronization.md";
  slug: "software-engineer/52-mobile-engineering/synchronization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/accessibility.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/accessibility.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/accessibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/availability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/availability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/availability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/deployability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/deployability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/deployability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/extensibility.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/extensibility.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/extensibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/interoperability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/interoperability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/interoperability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/maintainability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/maintainability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/maintainability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/observability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/observability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/observability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/operability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/operability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/operability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/performance.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/performance.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/portability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/portability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/portability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/recoverability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/recoverability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/recoverability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/reliability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/reliability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/reliability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/scalability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/scalability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/scalability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/security.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/security.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/security";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/testability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/testability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/testability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/53-software-architecture-quality-attributes/usability.md": {
	id: "software-engineer/53-software-architecture-quality-attributes/usability.md";
  slug: "software-engineer/53-software-architecture-quality-attributes/usability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/adr.md": {
	id: "software-engineer/54-architecture-decision-making/adr.md";
  slug: "software-engineer/54-architecture-decision-making/adr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/alternatives.md": {
	id: "software-engineer/54-architecture-decision-making/alternatives.md";
  slug: "software-engineer/54-architecture-decision-making/alternatives";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/architecture-runway.md": {
	id: "software-engineer/54-architecture-decision-making/architecture-runway.md";
  slug: "software-engineer/54-architecture-decision-making/architecture-runway";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/architecture-trade-off-analysis.md": {
	id: "software-engineer/54-architecture-decision-making/architecture-trade-off-analysis.md";
  slug: "software-engineer/54-architecture-decision-making/architecture-trade-off-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/consequences.md": {
	id: "software-engineer/54-architecture-decision-making/consequences.md";
  slug: "software-engineer/54-architecture-decision-making/consequences";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/context.md": {
	id: "software-engineer/54-architecture-decision-making/context.md";
  slug: "software-engineer/54-architecture-decision-making/context";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/decision.md": {
	id: "software-engineer/54-architecture-decision-making/decision.md";
  slug: "software-engineer/54-architecture-decision-making/decision";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/evolutionary-architecture.md": {
	id: "software-engineer/54-architecture-decision-making/evolutionary-architecture.md";
  slug: "software-engineer/54-architecture-decision-making/evolutionary-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/fitness-functions.md": {
	id: "software-engineer/54-architecture-decision-making/fitness-functions.md";
  slug: "software-engineer/54-architecture-decision-making/fitness-functions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/54-architecture-decision-making/technical-constraints.md": {
	id: "software-engineer/54-architecture-decision-making/technical-constraints.md";
  slug: "software-engineer/54-architecture-decision-making/technical-constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/apis.md": {
	id: "software-engineer/55-system-design/apis.md";
  slug: "software-engineer/55-system-design/apis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/architecture.md": {
	id: "software-engineer/55-system-design/architecture.md";
  slug: "software-engineer/55-system-design/architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/caching.md": {
	id: "software-engineer/55-system-design/caching.md";
  slug: "software-engineer/55-system-design/caching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/communication.md": {
	id: "software-engineer/55-system-design/communication.md";
  slug: "software-engineer/55-system-design/communication";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/consistency.md": {
	id: "software-engineer/55-system-design/consistency.md";
  slug: "software-engineer/55-system-design/consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/constraints.md": {
	id: "software-engineer/55-system-design/constraints.md";
  slug: "software-engineer/55-system-design/constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/cost.md": {
	id: "software-engineer/55-system-design/cost.md";
  slug: "software-engineer/55-system-design/cost";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/data-model.md": {
	id: "software-engineer/55-system-design/data-model.md";
  slug: "software-engineer/55-system-design/data-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/deployment.md": {
	id: "software-engineer/55-system-design/deployment.md";
  slug: "software-engineer/55-system-design/deployment";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/failure-modes.md": {
	id: "software-engineer/55-system-design/failure-modes.md";
  slug: "software-engineer/55-system-design/failure-modes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/observability.md": {
	id: "software-engineer/55-system-design/observability.md";
  slug: "software-engineer/55-system-design/observability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/requirements.md": {
	id: "software-engineer/55-system-design/requirements.md";
  slug: "software-engineer/55-system-design/requirements";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/scale.md": {
	id: "software-engineer/55-system-design/scale.md";
  slug: "software-engineer/55-system-design/scale";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/55-system-design/security.md": {
	id: "software-engineer/55-system-design/security.md";
  slug: "software-engineer/55-system-design/security";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/blast-radius.md": {
	id: "software-engineer/56-failure-mode-thinking/blast-radius.md";
  slug: "software-engineer/56-failure-mode-thinking/blast-radius";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/cascading-failure.md": {
	id: "software-engineer/56-failure-mode-thinking/cascading-failure.md";
  slug: "software-engineer/56-failure-mode-thinking/cascading-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/failure-domains.md": {
	id: "software-engineer/56-failure-mode-thinking/failure-domains.md";
  slug: "software-engineer/56-failure-mode-thinking/failure-domains";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/fault-tree-analysis.md": {
	id: "software-engineer/56-failure-mode-thinking/fault-tree-analysis.md";
  slug: "software-engineer/56-failure-mode-thinking/fault-tree-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/fmea.md": {
	id: "software-engineer/56-failure-mode-thinking/fmea.md";
  slug: "software-engineer/56-failure-mode-thinking/fmea";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/how-detectable.md": {
	id: "software-engineer/56-failure-mode-thinking/how-detectable.md";
  slug: "software-engineer/56-failure-mode-thinking/how-detectable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/how-likely.md": {
	id: "software-engineer/56-failure-mode-thinking/how-likely.md";
  slug: "software-engineer/56-failure-mode-thinking/how-likely";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/how-severe.md": {
	id: "software-engineer/56-failure-mode-thinking/how-severe.md";
  slug: "software-engineer/56-failure-mode-thinking/how-severe";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/single-point-of-failure.md": {
	id: "software-engineer/56-failure-mode-thinking/single-point-of-failure.md";
  slug: "software-engineer/56-failure-mode-thinking/single-point-of-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/what-can-fail.md": {
	id: "software-engineer/56-failure-mode-thinking/what-can-fail.md";
  slug: "software-engineer/56-failure-mode-thinking/what-can-fail";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/what-happens-next.md": {
	id: "software-engineer/56-failure-mode-thinking/what-happens-next.md";
  slug: "software-engineer/56-failure-mode-thinking/what-happens-next";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/56-failure-mode-thinking/why.md": {
	id: "software-engineer/56-failure-mode-thinking/why.md";
  slug: "software-engineer/56-failure-mode-thinking/why";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/cpu-exhaustion.md": {
	id: "software-engineer/57-chaos-engineering/cpu-exhaustion.md";
  slug: "software-engineer/57-chaos-engineering/cpu-exhaustion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/dependency-failure.md": {
	id: "software-engineer/57-chaos-engineering/dependency-failure.md";
  slug: "software-engineer/57-chaos-engineering/dependency-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/disk-failure.md": {
	id: "software-engineer/57-chaos-engineering/disk-failure.md";
  slug: "software-engineer/57-chaos-engineering/disk-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/don-t-wait-for-production-to-teach-you-how-your-system-fails.md": {
	id: "software-engineer/57-chaos-engineering/don-t-wait-for-production-to-teach-you-how-your-system-fails.md";
  slug: "software-engineer/57-chaos-engineering/don-t-wait-for-production-to-teach-you-how-your-system-fails";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/failure-injection.md": {
	id: "software-engineer/57-chaos-engineering/failure-injection.md";
  slug: "software-engineer/57-chaos-engineering/failure-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/instance-termination.md": {
	id: "software-engineer/57-chaos-engineering/instance-termination.md";
  slug: "software-engineer/57-chaos-engineering/instance-termination";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/latency-injection.md": {
	id: "software-engineer/57-chaos-engineering/latency-injection.md";
  slug: "software-engineer/57-chaos-engineering/latency-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/memory-pressure.md": {
	id: "software-engineer/57-chaos-engineering/memory-pressure.md";
  slug: "software-engineer/57-chaos-engineering/memory-pressure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/57-chaos-engineering/network-partition.md": {
	id: "software-engineer/57-chaos-engineering/network-partition.md";
  slug: "software-engineer/57-chaos-engineering/network-partition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/autoscaling.md": {
	id: "software-engineer/58-cloud-architecture/autoscaling.md";
  slug: "software-engineer/58-cloud-architecture/autoscaling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/availability-zone.md": {
	id: "software-engineer/58-cloud-architecture/availability-zone.md";
  slug: "software-engineer/58-cloud-architecture/availability-zone";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/block-storage.md": {
	id: "software-engineer/58-cloud-architecture/block-storage.md";
  slug: "software-engineer/58-cloud-architecture/block-storage";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/cdn.md": {
	id: "software-engineer/58-cloud-architecture/cdn.md";
  slug: "software-engineer/58-cloud-architecture/cdn";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/disaster-recovery.md": {
	id: "software-engineer/58-cloud-architecture/disaster-recovery.md";
  slug: "software-engineer/58-cloud-architecture/disaster-recovery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/ephemeral-instances.md": {
	id: "software-engineer/58-cloud-architecture/ephemeral-instances.md";
  slug: "software-engineer/58-cloud-architecture/ephemeral-instances";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/horizontal-scaling.md": {
	id: "software-engineer/58-cloud-architecture/horizontal-scaling.md";
  slug: "software-engineer/58-cloud-architecture/horizontal-scaling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/iam.md": {
	id: "software-engineer/58-cloud-architecture/iam.md";
  slug: "software-engineer/58-cloud-architecture/iam";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/infrastructure-as-code.md": {
	id: "software-engineer/58-cloud-architecture/infrastructure-as-code.md";
  slug: "software-engineer/58-cloud-architecture/infrastructure-as-code";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/kms.md": {
	id: "software-engineer/58-cloud-architecture/kms.md";
  slug: "software-engineer/58-cloud-architecture/kms";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/load-balancer.md": {
	id: "software-engineer/58-cloud-architecture/load-balancer.md";
  slug: "software-engineer/58-cloud-architecture/load-balancer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/managed-database.md": {
	id: "software-engineer/58-cloud-architecture/managed-database.md";
  slug: "software-engineer/58-cloud-architecture/managed-database";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/multi-az.md": {
	id: "software-engineer/58-cloud-architecture/multi-az.md";
  slug: "software-engineer/58-cloud-architecture/multi-az";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/object-storage.md": {
	id: "software-engineer/58-cloud-architecture/object-storage.md";
  slug: "software-engineer/58-cloud-architecture/object-storage";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/pub-sub.md": {
	id: "software-engineer/58-cloud-architecture/pub-sub.md";
  slug: "software-engineer/58-cloud-architecture/pub-sub";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/queue.md": {
	id: "software-engineer/58-cloud-architecture/queue.md";
  slug: "software-engineer/58-cloud-architecture/queue";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/region.md": {
	id: "software-engineer/58-cloud-architecture/region.md";
  slug: "software-engineer/58-cloud-architecture/region";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/secrets.md": {
	id: "software-engineer/58-cloud-architecture/secrets.md";
  slug: "software-engineer/58-cloud-architecture/secrets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/serverless.md": {
	id: "software-engineer/58-cloud-architecture/serverless.md";
  slug: "software-engineer/58-cloud-architecture/serverless";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/stateless-services.md": {
	id: "software-engineer/58-cloud-architecture/stateless-services.md";
  slug: "software-engineer/58-cloud-architecture/stateless-services";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/subnet.md": {
	id: "software-engineer/58-cloud-architecture/subnet.md";
  slug: "software-engineer/58-cloud-architecture/subnet";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/58-cloud-architecture/vpc.md": {
	id: "software-engineer/58-cloud-architecture/vpc.md";
  slug: "software-engineer/58-cloud-architecture/vpc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/active-active.md": {
	id: "software-engineer/59-disaster-recovery/active-active.md";
  slug: "software-engineer/59-disaster-recovery/active-active";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/active-passive.md": {
	id: "software-engineer/59-disaster-recovery/active-passive.md";
  slug: "software-engineer/59-disaster-recovery/active-passive";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/backup.md": {
	id: "software-engineer/59-disaster-recovery/backup.md";
  slug: "software-engineer/59-disaster-recovery/backup";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/business-continuity-plan.md": {
	id: "software-engineer/59-disaster-recovery/business-continuity-plan.md";
  slug: "software-engineer/59-disaster-recovery/business-continuity-plan";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/cold-standby.md": {
	id: "software-engineer/59-disaster-recovery/cold-standby.md";
  slug: "software-engineer/59-disaster-recovery/cold-standby";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/disaster-recovery-plan.md": {
	id: "software-engineer/59-disaster-recovery/disaster-recovery-plan.md";
  slug: "software-engineer/59-disaster-recovery/disaster-recovery-plan";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/hot-standby.md": {
	id: "software-engineer/59-disaster-recovery/hot-standby.md";
  slug: "software-engineer/59-disaster-recovery/hot-standby";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/replication.md": {
	id: "software-engineer/59-disaster-recovery/replication.md";
  slug: "software-engineer/59-disaster-recovery/replication";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/restore.md": {
	id: "software-engineer/59-disaster-recovery/restore.md";
  slug: "software-engineer/59-disaster-recovery/restore";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/rpo.md": {
	id: "software-engineer/59-disaster-recovery/rpo.md";
  slug: "software-engineer/59-disaster-recovery/rpo";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/rto.md": {
	id: "software-engineer/59-disaster-recovery/rto.md";
  slug: "software-engineer/59-disaster-recovery/rto";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/59-disaster-recovery/warm-standby.md": {
	id: "software-engineer/59-disaster-recovery/warm-standby.md";
  slug: "software-engineer/59-disaster-recovery/warm-standby";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/a.md": {
	id: "software-engineer/60-computer-science-foundations/a.md";
  slug: "software-engineer/60-computer-science-foundations/a";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/algorithms.md": {
	id: "software-engineer/60-computer-science-foundations/algorithms.md";
  slug: "software-engineer/60-computer-science-foundations/algorithms";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/array.md": {
	id: "software-engineer/60-computer-science-foundations/array.md";
  slug: "software-engineer/60-computer-science-foundations/array";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/backtracking.md": {
	id: "software-engineer/60-computer-science-foundations/backtracking.md";
  slug: "software-engineer/60-computer-science-foundations/backtracking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/bfs.md": {
	id: "software-engineer/60-computer-science-foundations/bfs.md";
  slug: "software-engineer/60-computer-science-foundations/bfs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/binary-search.md": {
	id: "software-engineer/60-computer-science-foundations/binary-search.md";
  slug: "software-engineer/60-computer-science-foundations/binary-search";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/bloom-filter.md": {
	id: "software-engineer/60-computer-science-foundations/bloom-filter.md";
  slug: "software-engineer/60-computer-science-foundations/bloom-filter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/bst.md": {
	id: "software-engineer/60-computer-science-foundations/bst.md";
  slug: "software-engineer/60-computer-science-foundations/bst";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/data-structures.md": {
	id: "software-engineer/60-computer-science-foundations/data-structures.md";
  slug: "software-engineer/60-computer-science-foundations/data-structures";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/deque.md": {
	id: "software-engineer/60-computer-science-foundations/deque.md";
  slug: "software-engineer/60-computer-science-foundations/deque";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/dfs.md": {
	id: "software-engineer/60-computer-science-foundations/dfs.md";
  slug: "software-engineer/60-computer-science-foundations/dfs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/dijkstra.md": {
	id: "software-engineer/60-computer-science-foundations/dijkstra.md";
  slug: "software-engineer/60-computer-science-foundations/dijkstra";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/divide-and-conquer.md": {
	id: "software-engineer/60-computer-science-foundations/divide-and-conquer.md";
  slug: "software-engineer/60-computer-science-foundations/divide-and-conquer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/dynamic-programming.md": {
	id: "software-engineer/60-computer-science-foundations/dynamic-programming.md";
  slug: "software-engineer/60-computer-science-foundations/dynamic-programming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/graph.md": {
	id: "software-engineer/60-computer-science-foundations/graph.md";
  slug: "software-engineer/60-computer-science-foundations/graph";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/greedy.md": {
	id: "software-engineer/60-computer-science-foundations/greedy.md";
  slug: "software-engineer/60-computer-science-foundations/greedy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/hash-table.md": {
	id: "software-engineer/60-computer-science-foundations/hash-table.md";
  slug: "software-engineer/60-computer-science-foundations/hash-table";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/heap.md": {
	id: "software-engineer/60-computer-science-foundations/heap.md";
  slug: "software-engineer/60-computer-science-foundations/heap";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/linked-list.md": {
	id: "software-engineer/60-computer-science-foundations/linked-list.md";
  slug: "software-engineer/60-computer-science-foundations/linked-list";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/queue.md": {
	id: "software-engineer/60-computer-science-foundations/queue.md";
  slug: "software-engineer/60-computer-science-foundations/queue";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/searching.md": {
	id: "software-engineer/60-computer-science-foundations/searching.md";
  slug: "software-engineer/60-computer-science-foundations/searching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/skip-list.md": {
	id: "software-engineer/60-computer-science-foundations/skip-list.md";
  slug: "software-engineer/60-computer-science-foundations/skip-list";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/sliding-window.md": {
	id: "software-engineer/60-computer-science-foundations/sliding-window.md";
  slug: "software-engineer/60-computer-science-foundations/sliding-window";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/sorting.md": {
	id: "software-engineer/60-computer-science-foundations/sorting.md";
  slug: "software-engineer/60-computer-science-foundations/sorting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/stack.md": {
	id: "software-engineer/60-computer-science-foundations/stack.md";
  slug: "software-engineer/60-computer-science-foundations/stack";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/topological-sort.md": {
	id: "software-engineer/60-computer-science-foundations/topological-sort.md";
  slug: "software-engineer/60-computer-science-foundations/topological-sort";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/tree.md": {
	id: "software-engineer/60-computer-science-foundations/tree.md";
  slug: "software-engineer/60-computer-science-foundations/tree";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/trie.md": {
	id: "software-engineer/60-computer-science-foundations/trie.md";
  slug: "software-engineer/60-computer-science-foundations/trie";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/two-pointers.md": {
	id: "software-engineer/60-computer-science-foundations/two-pointers.md";
  slug: "software-engineer/60-computer-science-foundations/two-pointers";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/60-computer-science-foundations/union-find.md": {
	id: "software-engineer/60-computer-science-foundations/union-find.md";
  slug: "software-engineer/60-computer-science-foundations/union-find";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/context-switching.md": {
	id: "software-engineer/61-operating-systems/context-switching.md";
  slug: "software-engineer/61-operating-systems/context-switching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/deadlocks.md": {
	id: "software-engineer/61-operating-systems/deadlocks.md";
  slug: "software-engineer/61-operating-systems/deadlocks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/file-systems.md": {
	id: "software-engineer/61-operating-systems/file-systems.md";
  slug: "software-engineer/61-operating-systems/file-systems";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/interrupts.md": {
	id: "software-engineer/61-operating-systems/interrupts.md";
  slug: "software-engineer/61-operating-systems/interrupts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/ipc.md": {
	id: "software-engineer/61-operating-systems/ipc.md";
  slug: "software-engineer/61-operating-systems/ipc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/kernel-user-space.md": {
	id: "software-engineer/61-operating-systems/kernel-user-space.md";
  slug: "software-engineer/61-operating-systems/kernel-user-space";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/locks.md": {
	id: "software-engineer/61-operating-systems/locks.md";
  slug: "software-engineer/61-operating-systems/locks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/paging.md": {
	id: "software-engineer/61-operating-systems/paging.md";
  slug: "software-engineer/61-operating-systems/paging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/processes.md": {
	id: "software-engineer/61-operating-systems/processes.md";
  slug: "software-engineer/61-operating-systems/processes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/scheduling.md": {
	id: "software-engineer/61-operating-systems/scheduling.md";
  slug: "software-engineer/61-operating-systems/scheduling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/segmentation.md": {
	id: "software-engineer/61-operating-systems/segmentation.md";
  slug: "software-engineer/61-operating-systems/segmentation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/signals.md": {
	id: "software-engineer/61-operating-systems/signals.md";
  slug: "software-engineer/61-operating-systems/signals";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/sockets.md": {
	id: "software-engineer/61-operating-systems/sockets.md";
  slug: "software-engineer/61-operating-systems/sockets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/system-calls.md": {
	id: "software-engineer/61-operating-systems/system-calls.md";
  slug: "software-engineer/61-operating-systems/system-calls";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/threads.md": {
	id: "software-engineer/61-operating-systems/threads.md";
  slug: "software-engineer/61-operating-systems/threads";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/61-operating-systems/virtual-memory.md": {
	id: "software-engineer/61-operating-systems/virtual-memory.md";
  slug: "software-engineer/61-operating-systems/virtual-memory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/arp.md": {
	id: "software-engineer/62-networking/arp.md";
  slug: "software-engineer/62-networking/arp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/cdn.md": {
	id: "software-engineer/62-networking/cdn.md";
  slug: "software-engineer/62-networking/cdn";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/connection-pooling.md": {
	id: "software-engineer/62-networking/connection-pooling.md";
  slug: "software-engineer/62-networking/connection-pooling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/dhcp.md": {
	id: "software-engineer/62-networking/dhcp.md";
  slug: "software-engineer/62-networking/dhcp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/dns.md": {
	id: "software-engineer/62-networking/dns.md";
  slug: "software-engineer/62-networking/dns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/forward-proxy.md": {
	id: "software-engineer/62-networking/forward-proxy.md";
  slug: "software-engineer/62-networking/forward-proxy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/http-1-1.md": {
	id: "software-engineer/62-networking/http-1-1.md";
  slug: "software-engineer/62-networking/http-1-1";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/http-2.md": {
	id: "software-engineer/62-networking/http-2.md";
  slug: "software-engineer/62-networking/http-2";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/http-3.md": {
	id: "software-engineer/62-networking/http-3.md";
  slug: "software-engineer/62-networking/http-3";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/http.md": {
	id: "software-engineer/62-networking/http.md";
  slug: "software-engineer/62-networking/http";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/https.md": {
	id: "software-engineer/62-networking/https.md";
  slug: "software-engineer/62-networking/https";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/icmp.md": {
	id: "software-engineer/62-networking/icmp.md";
  slug: "software-engineer/62-networking/icmp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/ip.md": {
	id: "software-engineer/62-networking/ip.md";
  slug: "software-engineer/62-networking/ip";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/keep-alive.md": {
	id: "software-engineer/62-networking/keep-alive.md";
  slug: "software-engineer/62-networking/keep-alive";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/load-balancing.md": {
	id: "software-engineer/62-networking/load-balancing.md";
  slug: "software-engineer/62-networking/load-balancing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/nat.md": {
	id: "software-engineer/62-networking/nat.md";
  slug: "software-engineer/62-networking/nat";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/osi.md": {
	id: "software-engineer/62-networking/osi.md";
  slug: "software-engineer/62-networking/osi";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/quic.md": {
	id: "software-engineer/62-networking/quic.md";
  slug: "software-engineer/62-networking/quic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/reverse-proxy.md": {
	id: "software-engineer/62-networking/reverse-proxy.md";
  slug: "software-engineer/62-networking/reverse-proxy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/tcp-ip.md": {
	id: "software-engineer/62-networking/tcp-ip.md";
  slug: "software-engineer/62-networking/tcp-ip";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/tcp.md": {
	id: "software-engineer/62-networking/tcp.md";
  slug: "software-engineer/62-networking/tcp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/tls.md": {
	id: "software-engineer/62-networking/tls.md";
  slug: "software-engineer/62-networking/tls";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/udp.md": {
	id: "software-engineer/62-networking/udp.md";
  slug: "software-engineer/62-networking/udp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/62-networking/websockets.md": {
	id: "software-engineer/62-networking/websockets.md";
  slug: "software-engineer/62-networking/websockets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/ast.md": {
	id: "software-engineer/63-compiler-language-concepts/ast.md";
  slug: "software-engineer/63-compiler-language-concepts/ast";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/closures.md": {
	id: "software-engineer/63-compiler-language-concepts/closures.md";
  slug: "software-engineer/63-compiler-language-concepts/closures";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/dynamic-typing.md": {
	id: "software-engineer/63-compiler-language-concepts/dynamic-typing.md";
  slug: "software-engineer/63-compiler-language-concepts/dynamic-typing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/garbage-collection.md": {
	id: "software-engineer/63-compiler-language-concepts/garbage-collection.md";
  slug: "software-engineer/63-compiler-language-concepts/garbage-collection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/generics.md": {
	id: "software-engineer/63-compiler-language-concepts/generics.md";
  slug: "software-engineer/63-compiler-language-concepts/generics";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/heap.md": {
	id: "software-engineer/63-compiler-language-concepts/heap.md";
  slug: "software-engineer/63-compiler-language-concepts/heap";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/higher-order-functions.md": {
	id: "software-engineer/63-compiler-language-concepts/higher-order-functions.md";
  slug: "software-engineer/63-compiler-language-concepts/higher-order-functions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/lexing.md": {
	id: "software-engineer/63-compiler-language-concepts/lexing.md";
  slug: "software-engineer/63-compiler-language-concepts/lexing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/memory-management.md": {
	id: "software-engineer/63-compiler-language-concepts/memory-management.md";
  slug: "software-engineer/63-compiler-language-concepts/memory-management";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/parsing.md": {
	id: "software-engineer/63-compiler-language-concepts/parsing.md";
  slug: "software-engineer/63-compiler-language-concepts/parsing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/polymorphism.md": {
	id: "software-engineer/63-compiler-language-concepts/polymorphism.md";
  slug: "software-engineer/63-compiler-language-concepts/polymorphism";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/stack.md": {
	id: "software-engineer/63-compiler-language-concepts/stack.md";
  slug: "software-engineer/63-compiler-language-concepts/stack";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/static-typing.md": {
	id: "software-engineer/63-compiler-language-concepts/static-typing.md";
  slug: "software-engineer/63-compiler-language-concepts/static-typing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/strong-typing.md": {
	id: "software-engineer/63-compiler-language-concepts/strong-typing.md";
  slug: "software-engineer/63-compiler-language-concepts/strong-typing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/type-systems.md": {
	id: "software-engineer/63-compiler-language-concepts/type-systems.md";
  slug: "software-engineer/63-compiler-language-concepts/type-systems";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/63-compiler-language-concepts/weak-typing.md": {
	id: "software-engineer/63-compiler-language-concepts/weak-typing.md";
  slug: "software-engineer/63-compiler-language-concepts/weak-typing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/algebraic-data-types.md": {
	id: "software-engineer/64-functional-programming/algebraic-data-types.md";
  slug: "software-engineer/64-functional-programming/algebraic-data-types";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/currying.md": {
	id: "software-engineer/64-functional-programming/currying.md";
  slug: "software-engineer/64-functional-programming/currying";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/function-composition.md": {
	id: "software-engineer/64-functional-programming/function-composition.md";
  slug: "software-engineer/64-functional-programming/function-composition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/functors.md": {
	id: "software-engineer/64-functional-programming/functors.md";
  slug: "software-engineer/64-functional-programming/functors";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/higher-order-functions.md": {
	id: "software-engineer/64-functional-programming/higher-order-functions.md";
  slug: "software-engineer/64-functional-programming/higher-order-functions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/immutability.md": {
	id: "software-engineer/64-functional-programming/immutability.md";
  slug: "software-engineer/64-functional-programming/immutability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/monads.md": {
	id: "software-engineer/64-functional-programming/monads.md";
  slug: "software-engineer/64-functional-programming/monads";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/pattern-matching.md": {
	id: "software-engineer/64-functional-programming/pattern-matching.md";
  slug: "software-engineer/64-functional-programming/pattern-matching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/pure-functions.md": {
	id: "software-engineer/64-functional-programming/pure-functions.md";
  slug: "software-engineer/64-functional-programming/pure-functions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/referential-transparency.md": {
	id: "software-engineer/64-functional-programming/referential-transparency.md";
  slug: "software-engineer/64-functional-programming/referential-transparency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/64-functional-programming/side-effect-isolation.md": {
	id: "software-engineer/64-functional-programming/side-effect-isolation.md";
  slug: "software-engineer/64-functional-programming/side-effect-isolation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/abstract-class.md": {
	id: "software-engineer/65-object-oriented-programming/abstract-class.md";
  slug: "software-engineer/65-object-oriented-programming/abstract-class";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/abstraction.md": {
	id: "software-engineer/65-object-oriented-programming/abstraction.md";
  slug: "software-engineer/65-object-oriented-programming/abstraction";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/aggregation.md": {
	id: "software-engineer/65-object-oriented-programming/aggregation.md";
  slug: "software-engineer/65-object-oriented-programming/aggregation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/association.md": {
	id: "software-engineer/65-object-oriented-programming/association.md";
  slug: "software-engineer/65-object-oriented-programming/association";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/composition.md": {
	id: "software-engineer/65-object-oriented-programming/composition.md";
  slug: "software-engineer/65-object-oriented-programming/composition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/dependency.md": {
	id: "software-engineer/65-object-oriented-programming/dependency.md";
  slug: "software-engineer/65-object-oriented-programming/dependency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/encapsulation.md": {
	id: "software-engineer/65-object-oriented-programming/encapsulation.md";
  slug: "software-engineer/65-object-oriented-programming/encapsulation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/inheritance.md": {
	id: "software-engineer/65-object-oriented-programming/inheritance.md";
  slug: "software-engineer/65-object-oriented-programming/inheritance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/interface.md": {
	id: "software-engineer/65-object-oriented-programming/interface.md";
  slug: "software-engineer/65-object-oriented-programming/interface";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/polymorphism.md": {
	id: "software-engineer/65-object-oriented-programming/polymorphism.md";
  slug: "software-engineer/65-object-oriented-programming/polymorphism";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/65-object-oriented-programming/virtual-dispatch.md": {
	id: "software-engineer/65-object-oriented-programming/virtual-dispatch.md";
  slug: "software-engineer/65-object-oriented-programming/virtual-dispatch";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/agent-architecture.md": {
	id: "software-engineer/66-ai-llm-engineering/agent-architecture.md";
  slug: "software-engineer/66-ai-llm-engineering/agent-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/bm25.md": {
	id: "software-engineer/66-ai-llm-engineering/bm25.md";
  slug: "software-engineer/66-ai-llm-engineering/bm25";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/chunking.md": {
	id: "software-engineer/66-ai-llm-engineering/chunking.md";
  slug: "software-engineer/66-ai-llm-engineering/chunking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/context-engineering.md": {
	id: "software-engineer/66-ai-llm-engineering/context-engineering.md";
  slug: "software-engineer/66-ai-llm-engineering/context-engineering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/cost-optimization.md": {
	id: "software-engineer/66-ai-llm-engineering/cost-optimization.md";
  slug: "software-engineer/66-ai-llm-engineering/cost-optimization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/embeddings.md": {
	id: "software-engineer/66-ai-llm-engineering/embeddings.md";
  slug: "software-engineer/66-ai-llm-engineering/embeddings";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/evaluation.md": {
	id: "software-engineer/66-ai-llm-engineering/evaluation.md";
  slug: "software-engineer/66-ai-llm-engineering/evaluation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/function-calling.md": {
	id: "software-engineer/66-ai-llm-engineering/function-calling.md";
  slug: "software-engineer/66-ai-llm-engineering/function-calling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/guardrails.md": {
	id: "software-engineer/66-ai-llm-engineering/guardrails.md";
  slug: "software-engineer/66-ai-llm-engineering/guardrails";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/hallucination-mitigation.md": {
	id: "software-engineer/66-ai-llm-engineering/hallucination-mitigation.md";
  slug: "software-engineer/66-ai-llm-engineering/hallucination-mitigation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/hybrid-search.md": {
	id: "software-engineer/66-ai-llm-engineering/hybrid-search.md";
  slug: "software-engineer/66-ai-llm-engineering/hybrid-search";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/latency-optimization.md": {
	id: "software-engineer/66-ai-llm-engineering/latency-optimization.md";
  slug: "software-engineer/66-ai-llm-engineering/latency-optimization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/llm-observability.md": {
	id: "software-engineer/66-ai-llm-engineering/llm-observability.md";
  slug: "software-engineer/66-ai-llm-engineering/llm-observability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/memory.md": {
	id: "software-engineer/66-ai-llm-engineering/memory.md";
  slug: "software-engineer/66-ai-llm-engineering/memory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/model-fallback.md": {
	id: "software-engineer/66-ai-llm-engineering/model-fallback.md";
  slug: "software-engineer/66-ai-llm-engineering/model-fallback";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/model-routing.md": {
	id: "software-engineer/66-ai-llm-engineering/model-routing.md";
  slug: "software-engineer/66-ai-llm-engineering/model-routing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/multi-agent-systems.md": {
	id: "software-engineer/66-ai-llm-engineering/multi-agent-systems.md";
  slug: "software-engineer/66-ai-llm-engineering/multi-agent-systems";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/planning.md": {
	id: "software-engineer/66-ai-llm-engineering/planning.md";
  slug: "software-engineer/66-ai-llm-engineering/planning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/prompt-engineering.md": {
	id: "software-engineer/66-ai-llm-engineering/prompt-engineering.md";
  slug: "software-engineer/66-ai-llm-engineering/prompt-engineering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/prompt-versioning.md": {
	id: "software-engineer/66-ai-llm-engineering/prompt-versioning.md";
  slug: "software-engineer/66-ai-llm-engineering/prompt-versioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/query-rewriting.md": {
	id: "software-engineer/66-ai-llm-engineering/query-rewriting.md";
  slug: "software-engineer/66-ai-llm-engineering/query-rewriting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/rag.md": {
	id: "software-engineer/66-ai-llm-engineering/rag.md";
  slug: "software-engineer/66-ai-llm-engineering/rag";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/reflection.md": {
	id: "software-engineer/66-ai-llm-engineering/reflection.md";
  slug: "software-engineer/66-ai-llm-engineering/reflection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/reranking.md": {
	id: "software-engineer/66-ai-llm-engineering/reranking.md";
  slug: "software-engineer/66-ai-llm-engineering/reranking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/semantic-search.md": {
	id: "software-engineer/66-ai-llm-engineering/semantic-search.md";
  slug: "software-engineer/66-ai-llm-engineering/semantic-search";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/state-management.md": {
	id: "software-engineer/66-ai-llm-engineering/state-management.md";
  slug: "software-engineer/66-ai-llm-engineering/state-management";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/structured-outputs.md": {
	id: "software-engineer/66-ai-llm-engineering/structured-outputs.md";
  slug: "software-engineer/66-ai-llm-engineering/structured-outputs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/tool-calling.md": {
	id: "software-engineer/66-ai-llm-engineering/tool-calling.md";
  slug: "software-engineer/66-ai-llm-engineering/tool-calling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/tool-use.md": {
	id: "software-engineer/66-ai-llm-engineering/tool-use.md";
  slug: "software-engineer/66-ai-llm-engineering/tool-use";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/66-ai-llm-engineering/vector-databases.md": {
	id: "software-engineer/66-ai-llm-engineering/vector-databases.md";
  slug: "software-engineer/66-ai-llm-engineering/vector-databases";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/agent.md": {
	id: "software-engineer/67-ai-agent-patterns/agent.md";
  slug: "software-engineer/67-ai-agent-patterns/agent";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/blackboard-architecture.md": {
	id: "software-engineer/67-ai-agent-patterns/blackboard-architecture.md";
  slug: "software-engineer/67-ai-agent-patterns/blackboard-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/debate.md": {
	id: "software-engineer/67-ai-agent-patterns/debate.md";
  slug: "software-engineer/67-ai-agent-patterns/debate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/decision-loop.md": {
	id: "software-engineer/67-ai-agent-patterns/decision-loop.md";
  slug: "software-engineer/67-ai-agent-patterns/decision-loop";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/environment.md": {
	id: "software-engineer/67-ai-agent-patterns/environment.md";
  slug: "software-engineer/67-ai-agent-patterns/environment";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/evaluation.md": {
	id: "software-engineer/67-ai-agent-patterns/evaluation.md";
  slug: "software-engineer/67-ai-agent-patterns/evaluation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/hierarchical-agents.md": {
	id: "software-engineer/67-ai-agent-patterns/hierarchical-agents.md";
  slug: "software-engineer/67-ai-agent-patterns/hierarchical-agents";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/human-in-the-loop.md": {
	id: "software-engineer/67-ai-agent-patterns/human-in-the-loop.md";
  slug: "software-engineer/67-ai-agent-patterns/human-in-the-loop";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/human-on-the-loop.md": {
	id: "software-engineer/67-ai-agent-patterns/human-on-the-loop.md";
  slug: "software-engineer/67-ai-agent-patterns/human-on-the-loop";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/human-out-of-the-loop.md": {
	id: "software-engineer/67-ai-agent-patterns/human-out-of-the-loop.md";
  slug: "software-engineer/67-ai-agent-patterns/human-out-of-the-loop";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/llm-tools.md": {
	id: "software-engineer/67-ai-agent-patterns/llm-tools.md";
  slug: "software-engineer/67-ai-agent-patterns/llm-tools";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/memory.md": {
	id: "software-engineer/67-ai-agent-patterns/memory.md";
  slug: "software-engineer/67-ai-agent-patterns/memory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/parallel-agents.md": {
	id: "software-engineer/67-ai-agent-patterns/parallel-agents.md";
  slug: "software-engineer/67-ai-agent-patterns/parallel-agents";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/plan-and-execute.md": {
	id: "software-engineer/67-ai-agent-patterns/plan-and-execute.md";
  slug: "software-engineer/67-ai-agent-patterns/plan-and-execute";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/policy.md": {
	id: "software-engineer/67-ai-agent-patterns/policy.md";
  slug: "software-engineer/67-ai-agent-patterns/policy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/react.md": {
	id: "software-engineer/67-ai-agent-patterns/react.md";
  slug: "software-engineer/67-ai-agent-patterns/react";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/reflection.md": {
	id: "software-engineer/67-ai-agent-patterns/reflection.md";
  slug: "software-engineer/67-ai-agent-patterns/reflection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/router.md": {
	id: "software-engineer/67-ai-agent-patterns/router.md";
  slug: "software-engineer/67-ai-agent-patterns/router";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/self-critique.md": {
	id: "software-engineer/67-ai-agent-patterns/self-critique.md";
  slug: "software-engineer/67-ai-agent-patterns/self-critique";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/sequential-agents.md": {
	id: "software-engineer/67-ai-agent-patterns/sequential-agents.md";
  slug: "software-engineer/67-ai-agent-patterns/sequential-agents";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/state.md": {
	id: "software-engineer/67-ai-agent-patterns/state.md";
  slug: "software-engineer/67-ai-agent-patterns/state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/supervisor.md": {
	id: "software-engineer/67-ai-agent-patterns/supervisor.md";
  slug: "software-engineer/67-ai-agent-patterns/supervisor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/termination.md": {
	id: "software-engineer/67-ai-agent-patterns/termination.md";
  slug: "software-engineer/67-ai-agent-patterns/termination";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/toolformer-style-tool-use.md": {
	id: "software-engineer/67-ai-agent-patterns/toolformer-style-tool-use.md";
  slug: "software-engineer/67-ai-agent-patterns/toolformer-style-tool-use";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/tools.md": {
	id: "software-engineer/67-ai-agent-patterns/tools.md";
  slug: "software-engineer/67-ai-agent-patterns/tools";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/67-ai-agent-patterns/worker.md": {
	id: "software-engineer/67-ai-agent-patterns/worker.md";
  slug: "software-engineer/67-ai-agent-patterns/worker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/exact-match.md": {
	id: "software-engineer/68-llm-evaluation/exact-match.md";
  slug: "software-engineer/68-llm-evaluation/exact-match";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/f1.md": {
	id: "software-engineer/68-llm-evaluation/f1.md";
  slug: "software-engineer/68-llm-evaluation/f1";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/faithfulness.md": {
	id: "software-engineer/68-llm-evaluation/faithfulness.md";
  slug: "software-engineer/68-llm-evaluation/faithfulness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/golden-datasets.md": {
	id: "software-engineer/68-llm-evaluation/golden-datasets.md";
  slug: "software-engineer/68-llm-evaluation/golden-datasets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/groundedness.md": {
	id: "software-engineer/68-llm-evaluation/groundedness.md";
  slug: "software-engineer/68-llm-evaluation/groundedness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/human-evaluation.md": {
	id: "software-engineer/68-llm-evaluation/human-evaluation.md";
  slug: "software-engineer/68-llm-evaluation/human-evaluation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/llm-as-judge.md": {
	id: "software-engineer/68-llm-evaluation/llm-as-judge.md";
  slug: "software-engineer/68-llm-evaluation/llm-as-judge";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/offline-evaluation.md": {
	id: "software-engineer/68-llm-evaluation/offline-evaluation.md";
  slug: "software-engineer/68-llm-evaluation/offline-evaluation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/online-evaluation.md": {
	id: "software-engineer/68-llm-evaluation/online-evaluation.md";
  slug: "software-engineer/68-llm-evaluation/online-evaluation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/pairwise-evaluation.md": {
	id: "software-engineer/68-llm-evaluation/pairwise-evaluation.md";
  slug: "software-engineer/68-llm-evaluation/pairwise-evaluation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/precision.md": {
	id: "software-engineer/68-llm-evaluation/precision.md";
  slug: "software-engineer/68-llm-evaluation/precision";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/recall.md": {
	id: "software-engineer/68-llm-evaluation/recall.md";
  slug: "software-engineer/68-llm-evaluation/recall";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/regression-datasets.md": {
	id: "software-engineer/68-llm-evaluation/regression-datasets.md";
  slug: "software-engineer/68-llm-evaluation/regression-datasets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/relevance.md": {
	id: "software-engineer/68-llm-evaluation/relevance.md";
  slug: "software-engineer/68-llm-evaluation/relevance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/safety.md": {
	id: "software-engineer/68-llm-evaluation/safety.md";
  slug: "software-engineer/68-llm-evaluation/safety";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/task-success.md": {
	id: "software-engineer/68-llm-evaluation/task-success.md";
  slug: "software-engineer/68-llm-evaluation/task-success";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/tool-call-accuracy.md": {
	id: "software-engineer/68-llm-evaluation/tool-call-accuracy.md";
  slug: "software-engineer/68-llm-evaluation/tool-call-accuracy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/68-llm-evaluation/toxicity.md": {
	id: "software-engineer/68-llm-evaluation/toxicity.md";
  slug: "software-engineer/68-llm-evaluation/toxicity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/data-exfiltration.md": {
	id: "software-engineer/69-ai-security/data-exfiltration.md";
  slug: "software-engineer/69-ai-security/data-exfiltration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/excessive-agency.md": {
	id: "software-engineer/69-ai-security/excessive-agency.md";
  slug: "software-engineer/69-ai-security/excessive-agency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/indirect-prompt-injection.md": {
	id: "software-engineer/69-ai-security/indirect-prompt-injection.md";
  slug: "software-engineer/69-ai-security/indirect-prompt-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/insecure-tool-permissions.md": {
	id: "software-engineer/69-ai-security/insecure-tool-permissions.md";
  slug: "software-engineer/69-ai-security/insecure-tool-permissions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/jailbreaking.md": {
	id: "software-engineer/69-ai-security/jailbreaking.md";
  slug: "software-engineer/69-ai-security/jailbreaking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/least-privilege-tools.md": {
	id: "software-engineer/69-ai-security/least-privilege-tools.md";
  slug: "software-engineer/69-ai-security/least-privilege-tools";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/model-supply-chain-risks.md": {
	id: "software-engineer/69-ai-security/model-supply-chain-risks.md";
  slug: "software-engineer/69-ai-security/model-supply-chain-risks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/output-validation.md": {
	id: "software-engineer/69-ai-security/output-validation.md";
  slug: "software-engineer/69-ai-security/output-validation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/prompt-injection.md": {
	id: "software-engineer/69-ai-security/prompt-injection.md";
  slug: "software-engineer/69-ai-security/prompt-injection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/retrieval-poisoning.md": {
	id: "software-engineer/69-ai-security/retrieval-poisoning.md";
  slug: "software-engineer/69-ai-security/retrieval-poisoning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/sandboxing.md": {
	id: "software-engineer/69-ai-security/sandboxing.md";
  slug: "software-engineer/69-ai-security/sandboxing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/sensitive-data-leakage.md": {
	id: "software-engineer/69-ai-security/sensitive-data-leakage.md";
  slug: "software-engineer/69-ai-security/sensitive-data-leakage";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/69-ai-security/tool-abuse.md": {
	id: "software-engineer/69-ai-security/tool-abuse.md";
  slug: "software-engineer/69-ai-security/tool-abuse";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/container-scanning.md": {
	id: "software-engineer/70-software-supply-chain/container-scanning.md";
  slug: "software-engineer/70-software-supply-chain/container-scanning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/dependency-pinning.md": {
	id: "software-engineer/70-software-supply-chain/dependency-pinning.md";
  slug: "software-engineer/70-software-supply-chain/dependency-pinning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/dependency-scanning.md": {
	id: "software-engineer/70-software-supply-chain/dependency-scanning.md";
  slug: "software-engineer/70-software-supply-chain/dependency-scanning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/lock-files.md": {
	id: "software-engineer/70-software-supply-chain/lock-files.md";
  slug: "software-engineer/70-software-supply-chain/lock-files";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/provenance.md": {
	id: "software-engineer/70-software-supply-chain/provenance.md";
  slug: "software-engineer/70-software-supply-chain/provenance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/reproducible-builds.md": {
	id: "software-engineer/70-software-supply-chain/reproducible-builds.md";
  slug: "software-engineer/70-software-supply-chain/reproducible-builds";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/sbom.md": {
	id: "software-engineer/70-software-supply-chain/sbom.md";
  slug: "software-engineer/70-software-supply-chain/sbom";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/secret-scanning.md": {
	id: "software-engineer/70-software-supply-chain/secret-scanning.md";
  slug: "software-engineer/70-software-supply-chain/secret-scanning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/signed-artifacts.md": {
	id: "software-engineer/70-software-supply-chain/signed-artifacts.md";
  slug: "software-engineer/70-software-supply-chain/signed-artifacts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/slsa.md": {
	id: "software-engineer/70-software-supply-chain/slsa.md";
  slug: "software-engineer/70-software-supply-chain/slsa";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/70-software-supply-chain/vulnerability-scanning.md": {
	id: "software-engineer/70-software-supply-chain/vulnerability-scanning.md";
  slug: "software-engineer/70-software-supply-chain/vulnerability-scanning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/adr.md": {
	id: "software-engineer/71-documentation/adr.md";
  slug: "software-engineer/71-documentation/adr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/api-documentation.md": {
	id: "software-engineer/71-documentation/api-documentation.md";
  slug: "software-engineer/71-documentation/api-documentation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/architecture-diagrams.md": {
	id: "software-engineer/71-documentation/architecture-diagrams.md";
  slug: "software-engineer/71-documentation/architecture-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/design-document.md": {
	id: "software-engineer/71-documentation/design-document.md";
  slug: "software-engineer/71-documentation/design-document";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/onboarding-guide.md": {
	id: "software-engineer/71-documentation/onboarding-guide.md";
  slug: "software-engineer/71-documentation/onboarding-guide";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/operational-documentation.md": {
	id: "software-engineer/71-documentation/operational-documentation.md";
  slug: "software-engineer/71-documentation/operational-documentation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/playbook.md": {
	id: "software-engineer/71-documentation/playbook.md";
  slug: "software-engineer/71-documentation/playbook";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/readme.md": {
	id: "software-engineer/71-documentation/readme.md";
  slug: "software-engineer/71-documentation/readme";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/rfc.md": {
	id: "software-engineer/71-documentation/rfc.md";
  slug: "software-engineer/71-documentation/rfc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/runbook.md": {
	id: "software-engineer/71-documentation/runbook.md";
  slug: "software-engineer/71-documentation/runbook";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/71-documentation/threat-model.md": {
	id: "software-engineer/71-documentation/threat-model.md";
  slug: "software-engineer/71-documentation/threat-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/activity-diagrams.md": {
	id: "software-engineer/72-diagramming/activity-diagrams.md";
  slug: "software-engineer/72-diagramming/activity-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/architecture-diagrams.md": {
	id: "software-engineer/72-diagramming/architecture-diagrams.md";
  slug: "software-engineer/72-diagramming/architecture-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/c4-model.md": {
	id: "software-engineer/72-diagramming/c4-model.md";
  slug: "software-engineer/72-diagramming/c4-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/class-diagrams.md": {
	id: "software-engineer/72-diagramming/class-diagrams.md";
  slug: "software-engineer/72-diagramming/class-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/data-flow-diagrams.md": {
	id: "software-engineer/72-diagramming/data-flow-diagrams.md";
  slug: "software-engineer/72-diagramming/data-flow-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/deployment-diagrams.md": {
	id: "software-engineer/72-diagramming/deployment-diagrams.md";
  slug: "software-engineer/72-diagramming/deployment-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/er-diagrams.md": {
	id: "software-engineer/72-diagramming/er-diagrams.md";
  slug: "software-engineer/72-diagramming/er-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/event-storming.md": {
	id: "software-engineer/72-diagramming/event-storming.md";
  slug: "software-engineer/72-diagramming/event-storming";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/sequence-diagrams.md": {
	id: "software-engineer/72-diagramming/sequence-diagrams.md";
  slug: "software-engineer/72-diagramming/sequence-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/state-diagrams.md": {
	id: "software-engineer/72-diagramming/state-diagrams.md";
  slug: "software-engineer/72-diagramming/state-diagrams";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/72-diagramming/uml.md": {
	id: "software-engineer/72-diagramming/uml.md";
  slug: "software-engineer/72-diagramming/uml";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/architecture.md": {
	id: "software-engineer/73-code-review/architecture.md";
  slug: "software-engineer/73-code-review/architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/correctness.md": {
	id: "software-engineer/73-code-review/correctness.md";
  slug: "software-engineer/73-code-review/correctness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/maintainability.md": {
	id: "software-engineer/73-code-review/maintainability.md";
  slug: "software-engineer/73-code-review/maintainability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/performance.md": {
	id: "software-engineer/73-code-review/performance.md";
  slug: "software-engineer/73-code-review/performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/reliability.md": {
	id: "software-engineer/73-code-review/reliability.md";
  slug: "software-engineer/73-code-review/reliability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/security.md": {
	id: "software-engineer/73-code-review/security.md";
  slug: "software-engineer/73-code-review/security";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/style.md": {
	id: "software-engineer/73-code-review/style.md";
  slug: "software-engineer/73-code-review/style";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/73-code-review/why-did-you-name-this-variable-x.md": {
	id: "software-engineer/73-code-review/why-did-you-name-this-variable-x.md";
  slug: "software-engineer/73-code-review/why-did-you-name-this-variable-x";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/ast-analysis.md": {
	id: "software-engineer/74-static-analysis/ast-analysis.md";
  slug: "software-engineer/74-static-analysis/ast-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/code-smell-detection.md": {
	id: "software-engineer/74-static-analysis/code-smell-detection.md";
  slug: "software-engineer/74-static-analysis/code-smell-detection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/complexity-analysis.md": {
	id: "software-engineer/74-static-analysis/complexity-analysis.md";
  slug: "software-engineer/74-static-analysis/complexity-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/dead-code-detection.md": {
	id: "software-engineer/74-static-analysis/dead-code-detection.md";
  slug: "software-engineer/74-static-analysis/dead-code-detection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/dependency-scanning.md": {
	id: "software-engineer/74-static-analysis/dependency-scanning.md";
  slug: "software-engineer/74-static-analysis/dependency-scanning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/formatters.md": {
	id: "software-engineer/74-static-analysis/formatters.md";
  slug: "software-engineer/74-static-analysis/formatters";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/linters.md": {
	id: "software-engineer/74-static-analysis/linters.md";
  slug: "software-engineer/74-static-analysis/linters";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/sast.md": {
	id: "software-engineer/74-static-analysis/sast.md";
  slug: "software-engineer/74-static-analysis/sast";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/security-scanners.md": {
	id: "software-engineer/74-static-analysis/security-scanners.md";
  slug: "software-engineer/74-static-analysis/security-scanners";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/74-static-analysis/type-checkers.md": {
	id: "software-engineer/74-static-analysis/type-checkers.md";
  slug: "software-engineer/74-static-analysis/type-checkers";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/change-failure-rate.md": {
	id: "software-engineer/75-software-metrics/change-failure-rate.md";
  slug: "software-engineer/75-software-metrics/change-failure-rate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/code-coverage.md": {
	id: "software-engineer/75-software-metrics/code-coverage.md";
  slug: "software-engineer/75-software-metrics/code-coverage";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/cognitive-complexity.md": {
	id: "software-engineer/75-software-metrics/cognitive-complexity.md";
  slug: "software-engineer/75-software-metrics/cognitive-complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/cyclomatic-complexity.md": {
	id: "software-engineer/75-software-metrics/cyclomatic-complexity.md";
  slug: "software-engineer/75-software-metrics/cyclomatic-complexity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/defect-density.md": {
	id: "software-engineer/75-software-metrics/defect-density.md";
  slug: "software-engineer/75-software-metrics/defect-density";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/deployment-frequency.md": {
	id: "software-engineer/75-software-metrics/deployment-frequency.md";
  slug: "software-engineer/75-software-metrics/deployment-frequency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/lead-time.md": {
	id: "software-engineer/75-software-metrics/lead-time.md";
  slug: "software-engineer/75-software-metrics/lead-time";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/mtbf.md": {
	id: "software-engineer/75-software-metrics/mtbf.md";
  slug: "software-engineer/75-software-metrics/mtbf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/mttf.md": {
	id: "software-engineer/75-software-metrics/mttf.md";
  slug: "software-engineer/75-software-metrics/mttf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/mttr.md": {
	id: "software-engineer/75-software-metrics/mttr.md";
  slug: "software-engineer/75-software-metrics/mttr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/75-software-metrics/mutation-score.md": {
	id: "software-engineer/75-software-metrics/mutation-score.md";
  slug: "software-engineer/75-software-metrics/mutation-score";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/76-technical-debt/can-we-avoid-debt.md": {
	id: "software-engineer/76-technical-debt/can-we-avoid-debt.md";
  slug: "software-engineer/76-technical-debt/can-we-avoid-debt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/76-technical-debt/intentional-debt.md": {
	id: "software-engineer/76-technical-debt/intentional-debt.md";
  slug: "software-engineer/76-technical-debt/intentional-debt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/76-technical-debt/is-this-debt-deliberate-visible-and-affordable.md": {
	id: "software-engineer/76-technical-debt/is-this-debt-deliberate-visible-and-affordable.md";
  slug: "software-engineer/76-technical-debt/is-this-debt-deliberate-visible-and-affordable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/76-technical-debt/prudent-debt.md": {
	id: "software-engineer/76-technical-debt/prudent-debt.md";
  slug: "software-engineer/76-technical-debt/prudent-debt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/76-technical-debt/reckless-debt.md": {
	id: "software-engineer/76-technical-debt/reckless-debt.md";
  slug: "software-engineer/76-technical-debt/reckless-debt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/76-technical-debt/unintentional-debt.md": {
	id: "software-engineer/76-technical-debt/unintentional-debt.md";
  slug: "software-engineer/76-technical-debt/unintentional-debt";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/anti-corruption-layer.md": {
	id: "software-engineer/77-legacy-system-engineering/anti-corruption-layer.md";
  slug: "software-engineer/77-legacy-system-engineering/anti-corruption-layer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/backward-compatibility.md": {
	id: "software-engineer/77-legacy-system-engineering/backward-compatibility.md";
  slug: "software-engineer/77-legacy-system-engineering/backward-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/branch-by-abstraction.md": {
	id: "software-engineer/77-legacy-system-engineering/branch-by-abstraction.md";
  slug: "software-engineer/77-legacy-system-engineering/branch-by-abstraction";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/characterization-tests.md": {
	id: "software-engineer/77-legacy-system-engineering/characterization-tests.md";
  slug: "software-engineer/77-legacy-system-engineering/characterization-tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/database-migration.md": {
	id: "software-engineer/77-legacy-system-engineering/database-migration.md";
  slug: "software-engineer/77-legacy-system-engineering/database-migration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/golden-master.md": {
	id: "software-engineer/77-legacy-system-engineering/golden-master.md";
  slug: "software-engineer/77-legacy-system-engineering/golden-master";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/incremental-migration.md": {
	id: "software-engineer/77-legacy-system-engineering/incremental-migration.md";
  slug: "software-engineer/77-legacy-system-engineering/incremental-migration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/parallel-run.md": {
	id: "software-engineer/77-legacy-system-engineering/parallel-run.md";
  slug: "software-engineer/77-legacy-system-engineering/parallel-run";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/seam.md": {
	id: "software-engineer/77-legacy-system-engineering/seam.md";
  slug: "software-engineer/77-legacy-system-engineering/seam";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/77-legacy-system-engineering/strangler-fig.md": {
	id: "software-engineer/77-legacy-system-engineering/strangler-fig.md";
  slug: "software-engineer/77-legacy-system-engineering/strangler-fig";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/backfill.md": {
	id: "software-engineer/78-migration-patterns/backfill.md";
  slug: "software-engineer/78-migration-patterns/backfill";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/big-bang.md": {
	id: "software-engineer/78-migration-patterns/big-bang.md";
  slug: "software-engineer/78-migration-patterns/big-bang";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/blue-green-migration.md": {
	id: "software-engineer/78-migration-patterns/blue-green-migration.md";
  slug: "software-engineer/78-migration-patterns/blue-green-migration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/dual-write.md": {
	id: "software-engineer/78-migration-patterns/dual-write.md";
  slug: "software-engineer/78-migration-patterns/dual-write";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/expand-contract.md": {
	id: "software-engineer/78-migration-patterns/expand-contract.md";
  slug: "software-engineer/78-migration-patterns/expand-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/parallel-migration.md": {
	id: "software-engineer/78-migration-patterns/parallel-migration.md";
  slug: "software-engineer/78-migration-patterns/parallel-migration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/read-migration.md": {
	id: "software-engineer/78-migration-patterns/read-migration.md";
  slug: "software-engineer/78-migration-patterns/read-migration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/shadow-traffic.md": {
	id: "software-engineer/78-migration-patterns/shadow-traffic.md";
  slug: "software-engineer/78-migration-patterns/shadow-traffic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/strangler.md": {
	id: "software-engineer/78-migration-patterns/strangler.md";
  slug: "software-engineer/78-migration-patterns/strangler";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/78-migration-patterns/write-migration.md": {
	id: "software-engineer/78-migration-patterns/write-migration.md";
  slug: "software-engineer/78-migration-patterns/write-migration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/backfill.md": {
	id: "software-engineer/79-data-migration/backfill.md";
  slug: "software-engineer/79-data-migration/backfill";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/data-correctness.md": {
	id: "software-engineer/79-data-migration/data-correctness.md";
  slug: "software-engineer/79-data-migration/data-correctness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/duplicates.md": {
	id: "software-engineer/79-data-migration/duplicates.md";
  slug: "software-engineer/79-data-migration/duplicates";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/idempotency.md": {
	id: "software-engineer/79-data-migration/idempotency.md";
  slug: "software-engineer/79-data-migration/idempotency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/observability.md": {
	id: "software-engineer/79-data-migration/observability.md";
  slug: "software-engineer/79-data-migration/observability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/ordering.md": {
	id: "software-engineer/79-data-migration/ordering.md";
  slug: "software-engineer/79-data-migration/ordering";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/partial-failure.md": {
	id: "software-engineer/79-data-migration/partial-failure.md";
  slug: "software-engineer/79-data-migration/partial-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/rollback.md": {
	id: "software-engineer/79-data-migration/rollback.md";
  slug: "software-engineer/79-data-migration/rollback";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/schema-compatibility.md": {
	id: "software-engineer/79-data-migration/schema-compatibility.md";
  slug: "software-engineer/79-data-migration/schema-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/79-data-migration/validation.md": {
	id: "software-engineer/79-data-migration/validation.md";
  slug: "software-engineer/79-data-migration/validation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/apis.md": {
	id: "software-engineer/80-naming/apis.md";
  slug: "software-engineer/80-naming/apis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/classes.md": {
	id: "software-engineer/80-naming/classes.md";
  slug: "software-engineer/80-naming/classes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/database-tables.md": {
	id: "software-engineer/80-naming/database-tables.md";
  slug: "software-engineer/80-naming/database-tables";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/events.md": {
	id: "software-engineer/80-naming/events.md";
  slug: "software-engineer/80-naming/events";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/functions.md": {
	id: "software-engineer/80-naming/functions.md";
  slug: "software-engineer/80-naming/functions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/modules.md": {
	id: "software-engineer/80-naming/modules.md";
  slug: "software-engineer/80-naming/modules";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/queues.md": {
	id: "software-engineer/80-naming/queues.md";
  slug: "software-engineer/80-naming/queues";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/services.md": {
	id: "software-engineer/80-naming/services.md";
  slug: "software-engineer/80-naming/services";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/80-naming/variables.md": {
	id: "software-engineer/80-naming/variables.md";
  slug: "software-engineer/80-naming/variables";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/amdahl-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/amdahl-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/amdahl-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/brooks-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/brooks-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/brooks-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/chesterton-s-fence.md": {
	id: "software-engineer/81-engineering-heuristics/chesterton-s-fence.md";
  slug: "software-engineer/81-engineering-heuristics/chesterton-s-fence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/conway-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/conway-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/conway-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/gall-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/gall-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/gall-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/hyrum-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/hyrum-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/hyrum-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/murphy-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/murphy-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/murphy-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/pareto-principle.md": {
	id: "software-engineer/81-engineering-heuristics/pareto-principle.md";
  slug: "software-engineer/81-engineering-heuristics/pareto-principle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/parkinson-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/parkinson-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/parkinson-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/postel-s-law.md": {
	id: "software-engineer/81-engineering-heuristics/postel-s-law.md";
  slug: "software-engineer/81-engineering-heuristics/postel-s-law";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/81-engineering-heuristics/understand-why-it-exists.md": {
	id: "software-engineer/81-engineering-heuristics/understand-why-it-exists.md";
  slug: "software-engineer/81-engineering-heuristics/understand-why-it-exists";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/api.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/api.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/api";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/architecture.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/architecture.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/cost.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/cost.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/cost";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/data.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/data.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/data";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/dependencies.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/dependencies.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/dependencies";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/evolution.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/evolution.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/evolution";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/failure.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/failure.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/how-do-we-know-this-works.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/how-do-we-know-this-works.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/how-do-we-know-this-works";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/how-does-it-evolve.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/how-does-it-evolve.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/how-does-it-evolve";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/how-will-we-know-when-it-doesn-t.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/how-will-we-know-when-it-doesn-t.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/how-will-we-know-when-it-doesn-t";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/observability.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/observability.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/observability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/operations.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/operations.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/operations";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/performance.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/performance.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/requirements.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/requirements.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/requirements";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/scale.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/scale.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/scale";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/security.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/security.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/security";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/testing.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/testing.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/testing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-alternatives-were-rejected.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-alternatives-were-rejected.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-alternatives-were-rejected";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-are-the-constraints.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-are-the-constraints.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-are-the-constraints";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-breaks-first.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-breaks-first.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-breaks-first";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-depends-on-this.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-depends-on-this.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-depends-on-this";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-does-success-mean.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-does-success-mean.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-does-success-mean";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-does-this-architecture-cost-at-10-scale.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-does-this-architecture-cost-at-10-scale.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-does-this-architecture-cost-at-10-scale";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-does-this-depend-on.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-does-this-depend-on.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-does-this-depend-on";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-happens-when-requirements-change.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-happens-when-requirements-change.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-happens-when-requirements-change";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-happens-when-this-fails.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-happens-when-this-fails.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-happens-when-this-fails";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-is-the-contract.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-is-the-contract.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-is-the-contract";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/what-problem-are-we-solving.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/what-problem-are-we-solving.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/what-problem-are-we-solving";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/where-are-the-boundaries.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/where-are-the-boundaries.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/where-are-the-boundaries";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/where-is-the-bottleneck.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/where-is-the-bottleneck.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/where-is-the-bottleneck";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/where-is-the-source-of-truth.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/where-is-the-source-of-truth.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/where-is-the-source-of-truth";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/who-can-do-what.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/who-can-do-what.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/who-can-do-what";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/who-gets-paged-at-3-am.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/who-gets-paged-at-3-am.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/who-gets-paged-at-3-am";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/who-owns-this-data.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/who-owns-this-data.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/who-owns-this-data";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/82-the-most-important-engineering-questions/why-this-architecture.md": {
	id: "software-engineer/82-the-most-important-engineering-questions/why-this-architecture.md";
  slug: "software-engineer/82-the-most-important-engineering-questions/why-this-architecture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/authentication.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/authentication.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/authentication";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/authorization.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/authorization.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/authorization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/backward-compatibility.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/backward-compatibility.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/backward-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/caching.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/caching.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/caching";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/concurrency.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/concurrency.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/concurrency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/cost.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/cost.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/cost";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/data-consistency.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/data-consistency.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/data-consistency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/deployment-strategy.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/deployment-strategy.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/deployment-strategy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/documentation.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/documentation.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/documentation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/edge-cases-identified.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/edge-cases-identified.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/edge-cases-identified";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/error-handling.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/error-handling.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/error-handling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/failure-modes-considered.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/failure-modes-considered.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/failure-modes-considered";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/idempotency.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/idempotency.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/idempotency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/input-validation.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/input-validation.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/input-validation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/logging.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/logging.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/logging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/metrics.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/metrics.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/metrics";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/monitoring.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/monitoring.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/monitoring";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/operational-runbook.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/operational-runbook.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/operational-runbook";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/output-validation.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/output-validation.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/output-validation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/performance.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/performance.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/rate-limiting.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/rate-limiting.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/rate-limiting";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/regression-tests.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/regression-tests.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/regression-tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/requirements-understood.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/requirements-understood.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/requirements-understood";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/retries.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/retries.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/retries";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/rollback-strategy.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/rollback-strategy.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/rollback-strategy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/scalability.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/scalability.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/scalability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/secrets.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/secrets.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/secrets";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/security.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/security.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/security";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/tests.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/tests.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/tests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/timeouts.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/timeouts.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/timeouts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/tracing.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/tracing.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/tracing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/83-the-engineer-s-always-check-list/transactions.md": {
	id: "software-engineer/83-the-engineer-s-always-check-list/transactions.md";
  slug: "software-engineer/83-the-engineer-s-always-check-list/transactions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/adapter.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/adapter.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/adapter";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/behavior-changes-dynamically.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/behavior-changes-dynamically.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/behavior-changes-dynamically";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/circuit-breaker.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/circuit-breaker.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/circuit-breaker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/complex-subsystem.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/complex-subsystem.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/complex-subsystem";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/data-synchronization.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/data-synchronization.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/data-synchronization";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/decorator.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/decorator.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/decorator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/distributed-workflow.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/distributed-workflow.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/distributed-workflow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/duplicate-requests.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/duplicate-requests.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/duplicate-requests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/event-cdc-outbox.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/event-cdc-outbox.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/event-cdc-outbox";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/facade.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/facade.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/facade";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/factory-builder.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/factory-builder.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/factory-builder";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/growing-monolith.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/growing-monolith.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/growing-monolith";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/idempotency.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/idempotency.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/idempotency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/legacy-replacement.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/legacy-replacement.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/legacy-replacement";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/modularization-vertical-slices.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/modularization-vertical-slices.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/modularization-vertical-slices";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/need-compatibility.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/need-compatibility.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/need-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/need-notifications.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/need-notifications.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/need-notifications";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/need-to-wrap-behavior.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/need-to-wrap-behavior.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/need-to-wrap-behavior";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/observability-scientific-debugging.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/observability-scientific-debugging.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/observability-scientific-debugging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/observer-pub-sub.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/observer-pub-sub.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/observer-pub-sub";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/repeated-failure.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/repeated-failure.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/repeated-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/repeated-object-creation.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/repeated-object-creation.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/repeated-object-creation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/saga.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/saga.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/saga";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/slow-dependency.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/slow-dependency.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/slow-dependency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/strangler-fig.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/strangler-fig.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/strangler-fig";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/strategy-state.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/strategy-state.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/strategy-state";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/timeout-bulkhead.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/timeout-bulkhead.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/timeout-bulkhead";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/unknown-production-failure.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/unknown-production-failure.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/unknown-production-failure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/84-the-meta-skill-above-all-of-these/what-kind-of-problem-am-i-looking-at.md": {
	id: "software-engineer/84-the-meta-skill-above-all-of-these/what-kind-of-problem-am-i-looking-at.md";
  slug: "software-engineer/84-the-meta-skill-above-all-of-these/what-kind-of-problem-am-i-looking-at";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/correctness.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/correctness.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/correctness";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/cost.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/cost.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/cost";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/evolvability.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/evolvability.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/evolvability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/maintainability.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/maintainability.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/maintainability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/observability.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/observability.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/observability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/performance.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/performance.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/reliability.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/reliability.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/reliability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/security.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/security.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/security";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/simplicity.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/simplicity.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/simplicity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/85-the-ultimate-engineering-loop/testability.md": {
	id: "software-engineer/85-the-ultimate-engineering-loop/testability.md";
  slug: "software-engineer/85-the-ultimate-engineering-loop/testability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/a3-thinking.md": {
	id: "software-engineer/86-communication-frameworks/a3-thinking.md";
  slug: "software-engineer/86-communication-frameworks/a3-thinking";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/background.md": {
	id: "software-engineer/86-communication-frameworks/background.md";
  slug: "software-engineer/86-communication-frameworks/background";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/behavioral-questions.md": {
	id: "software-engineer/86-communication-frameworks/behavioral-questions.md";
  slug: "software-engineer/86-communication-frameworks/behavioral-questions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/bluf.md": {
	id: "software-engineer/86-communication-frameworks/bluf.md";
  slug: "software-engineer/86-communication-frameworks/bluf";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/car.md": {
	id: "software-engineer/86-communication-frameworks/car.md";
  slug: "software-engineer/86-communication-frameworks/car";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/conclusion.md": {
	id: "software-engineer/86-communication-frameworks/conclusion.md";
  slug: "software-engineer/86-communication-frameworks/conclusion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/countermeasures.md": {
	id: "software-engineer/86-communication-frameworks/countermeasures.md";
  slug: "software-engineer/86-communication-frameworks/countermeasures";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/current-condition.md": {
	id: "software-engineer/86-communication-frameworks/current-condition.md";
  slug: "software-engineer/86-communication-frameworks/current-condition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/evidence.md": {
	id: "software-engineer/86-communication-frameworks/evidence.md";
  slug: "software-engineer/86-communication-frameworks/evidence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/explaining-projects.md": {
	id: "software-engineer/86-communication-frameworks/explaining-projects.md";
  slug: "software-engineer/86-communication-frameworks/explaining-projects";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/follow-up.md": {
	id: "software-engineer/86-communication-frameworks/follow-up.md";
  slug: "software-engineer/86-communication-frameworks/follow-up";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/i-investigated-the-api-checked-logs-checked-redis.md": {
	id: "software-engineer/86-communication-frameworks/i-investigated-the-api-checked-logs-checked-redis.md";
  slug: "software-engineer/86-communication-frameworks/i-investigated-the-api-checked-logs-checked-redis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/implementation.md": {
	id: "software-engineer/86-communication-frameworks/implementation.md";
  slug: "software-engineer/86-communication-frameworks/implementation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/incident-explanations.md": {
	id: "software-engineer/86-communication-frameworks/incident-explanations.md";
  slug: "software-engineer/86-communication-frameworks/incident-explanations";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/interviews.md": {
	id: "software-engineer/86-communication-frameworks/interviews.md";
  slug: "software-engineer/86-communication-frameworks/interviews";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/mece.md": {
	id: "software-engineer/86-communication-frameworks/mece.md";
  slug: "software-engineer/86-communication-frameworks/mece";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/par.md": {
	id: "software-engineer/86-communication-frameworks/par.md";
  slug: "software-engineer/86-communication-frameworks/par";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/performance-reviews.md": {
	id: "software-engineer/86-communication-frameworks/performance-reviews.md";
  slug: "software-engineer/86-communication-frameworks/performance-reviews";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/prep.md": {
	id: "software-engineer/86-communication-frameworks/prep.md";
  slug: "software-engineer/86-communication-frameworks/prep";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/problem.md": {
	id: "software-engineer/86-communication-frameworks/problem.md";
  slug: "software-engineer/86-communication-frameworks/problem";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/pyramid-principle.md": {
	id: "software-engineer/86-communication-frameworks/pyramid-principle.md";
  slug: "software-engineer/86-communication-frameworks/pyramid-principle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/root-cause.md": {
	id: "software-engineer/86-communication-frameworks/root-cause.md";
  slug: "software-engineer/86-communication-frameworks/root-cause";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/sar.md": {
	id: "software-engineer/86-communication-frameworks/sar.md";
  slug: "software-engineer/86-communication-frameworks/sar";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/sbar.md": {
	id: "software-engineer/86-communication-frameworks/sbar.md";
  slug: "software-engineer/86-communication-frameworks/sbar";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/star-l.md": {
	id: "software-engineer/86-communication-frameworks/star-l.md";
  slug: "software-engineer/86-communication-frameworks/star-l";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/star.md": {
	id: "software-engineer/86-communication-frameworks/star.md";
  slug: "software-engineer/86-communication-frameworks/star";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/supporting-arguments.md": {
	id: "software-engineer/86-communication-frameworks/supporting-arguments.md";
  slug: "software-engineer/86-communication-frameworks/supporting-arguments";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/the-api-is-failing-because-redis-connections-are-exhausted.md": {
	id: "software-engineer/86-communication-frameworks/the-api-is-failing-because-redis-connections-are-exhausted.md";
  slug: "software-engineer/86-communication-frameworks/the-api-is-failing-because-redis-connections-are-exhausted";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/what-went-wrong.md": {
	id: "software-engineer/86-communication-frameworks/what-went-wrong.md";
  slug: "software-engineer/86-communication-frameworks/what-went-wrong";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/what-you-built.md": {
	id: "software-engineer/86-communication-frameworks/what-you-built.md";
  slug: "software-engineer/86-communication-frameworks/what-you-built";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/what-you-learned.md": {
	id: "software-engineer/86-communication-frameworks/what-you-learned.md";
  slug: "software-engineer/86-communication-frameworks/what-you-learned";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/what-you-need-from-another-team.md": {
	id: "software-engineer/86-communication-frameworks/what-you-need-from-another-team.md";
  slug: "software-engineer/86-communication-frameworks/what-you-need-from-another-team";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/why-a-production-incident-happened.md": {
	id: "software-engineer/86-communication-frameworks/why-a-production-incident-happened.md";
  slug: "software-engineer/86-communication-frameworks/why-a-production-incident-happened";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/why-something-should-be-changed.md": {
	id: "software-engineer/86-communication-frameworks/why-something-should-be-changed.md";
  slug: "software-engineer/86-communication-frameworks/why-something-should-be-changed";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/86-communication-frameworks/why-you-made-a-decision.md": {
	id: "software-engineer/86-communication-frameworks/why-you-made-a-decision.md";
  slug: "software-engineer/86-communication-frameworks/why-you-made-a-decision";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/5-whys.md": {
	id: "software-engineer/87-problem-solving-frameworks/5-whys.md";
  slug: "software-engineer/87-problem-solving-frameworks/5-whys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/debugging.md": {
	id: "software-engineer/87-problem-solving-frameworks/debugging.md";
  slug: "software-engineer/87-problem-solving-frameworks/debugging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/decision-analysis.md": {
	id: "software-engineer/87-problem-solving-frameworks/decision-analysis.md";
  slug: "software-engineer/87-problem-solving-frameworks/decision-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/define.md": {
	id: "software-engineer/87-problem-solving-frameworks/define.md";
  slug: "software-engineer/87-problem-solving-frameworks/define";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/deliver.md": {
	id: "software-engineer/87-problem-solving-frameworks/deliver.md";
  slug: "software-engineer/87-problem-solving-frameworks/deliver";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/detectability.md": {
	id: "software-engineer/87-problem-solving-frameworks/detectability.md";
  slug: "software-engineer/87-problem-solving-frameworks/detectability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/develop.md": {
	id: "software-engineer/87-problem-solving-frameworks/develop.md";
  slug: "software-engineer/87-problem-solving-frameworks/develop";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/discover.md": {
	id: "software-engineer/87-problem-solving-frameworks/discover.md";
  slug: "software-engineer/87-problem-solving-frameworks/discover";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/dmaic.md": {
	id: "software-engineer/87-problem-solving-frameworks/dmaic.md";
  slug: "software-engineer/87-problem-solving-frameworks/dmaic";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/double-diamond.md": {
	id: "software-engineer/87-problem-solving-frameworks/double-diamond.md";
  slug: "software-engineer/87-problem-solving-frameworks/double-diamond";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/fishbone-ishikawa.md": {
	id: "software-engineer/87-problem-solving-frameworks/fishbone-ishikawa.md";
  slug: "software-engineer/87-problem-solving-frameworks/fishbone-ishikawa";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/incidents.md": {
	id: "software-engineer/87-problem-solving-frameworks/incidents.md";
  slug: "software-engineer/87-problem-solving-frameworks/incidents";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/kepner-tregoe.md": {
	id: "software-engineer/87-problem-solving-frameworks/kepner-tregoe.md";
  slug: "software-engineer/87-problem-solving-frameworks/kepner-tregoe";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/materials.md": {
	id: "software-engineer/87-problem-solving-frameworks/materials.md";
  slug: "software-engineer/87-problem-solving-frameworks/materials";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/measurement.md": {
	id: "software-engineer/87-problem-solving-frameworks/measurement.md";
  slug: "software-engineer/87-problem-solving-frameworks/measurement";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/occurrence.md": {
	id: "software-engineer/87-problem-solving-frameworks/occurrence.md";
  slug: "software-engineer/87-problem-solving-frameworks/occurrence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/ooda-loop.md": {
	id: "software-engineer/87-problem-solving-frameworks/ooda-loop.md";
  slug: "software-engineer/87-problem-solving-frameworks/ooda-loop";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/pdca.md": {
	id: "software-engineer/87-problem-solving-frameworks/pdca.md";
  slug: "software-engineer/87-problem-solving-frameworks/pdca";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/people.md": {
	id: "software-engineer/87-problem-solving-frameworks/people.md";
  slug: "software-engineer/87-problem-solving-frameworks/people";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/potential-problem-analysis.md": {
	id: "software-engineer/87-problem-solving-frameworks/potential-problem-analysis.md";
  slug: "software-engineer/87-problem-solving-frameworks/potential-problem-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/problem-analysis.md": {
	id: "software-engineer/87-problem-solving-frameworks/problem-analysis.md";
  slug: "software-engineer/87-problem-solving-frameworks/problem-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/rapidly-changing-environments.md": {
	id: "software-engineer/87-problem-solving-frameworks/rapidly-changing-environments.md";
  slug: "software-engineer/87-problem-solving-frameworks/rapidly-changing-environments";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/risk.md": {
	id: "software-engineer/87-problem-solving-frameworks/risk.md";
  slug: "software-engineer/87-problem-solving-frameworks/risk";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/root-cause-analysis.md": {
	id: "software-engineer/87-problem-solving-frameworks/root-cause-analysis.md";
  slug: "software-engineer/87-problem-solving-frameworks/root-cause-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/severity.md": {
	id: "software-engineer/87-problem-solving-frameworks/severity.md";
  slug: "software-engineer/87-problem-solving-frameworks/severity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/situation-appraisal.md": {
	id: "software-engineer/87-problem-solving-frameworks/situation-appraisal.md";
  slug: "software-engineer/87-problem-solving-frameworks/situation-appraisal";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/87-problem-solving-frameworks/technology.md": {
	id: "software-engineer/87-problem-solving-frameworks/technology.md";
  slug: "software-engineer/87-problem-solving-frameworks/technology";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/accountable.md": {
	id: "software-engineer/88-decision-making-frameworks/accountable.md";
  slug: "software-engineer/88-decision-making-frameworks/accountable";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/agree.md": {
	id: "software-engineer/88-decision-making-frameworks/agree.md";
  slug: "software-engineer/88-decision-making-frameworks/agree";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/approver.md": {
	id: "software-engineer/88-decision-making-frameworks/approver.md";
  slug: "software-engineer/88-decision-making-frameworks/approver";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/consulted.md": {
	id: "software-engineer/88-decision-making-frameworks/consulted.md";
  slug: "software-engineer/88-decision-making-frameworks/consulted";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/contributors.md": {
	id: "software-engineer/88-decision-making-frameworks/contributors.md";
  slug: "software-engineer/88-decision-making-frameworks/contributors";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/cost-benefit-analysis.md": {
	id: "software-engineer/88-decision-making-frameworks/cost-benefit-analysis.md";
  slug: "software-engineer/88-decision-making-frameworks/cost-benefit-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/daci.md": {
	id: "software-engineer/88-decision-making-frameworks/daci.md";
  slug: "software-engineer/88-decision-making-frameworks/daci";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/decide.md": {
	id: "software-engineer/88-decision-making-frameworks/decide.md";
  slug: "software-engineer/88-decision-making-frameworks/decide";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/decision-matrix.md": {
	id: "software-engineer/88-decision-making-frameworks/decision-matrix.md";
  slug: "software-engineer/88-decision-making-frameworks/decision-matrix";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/driver.md": {
	id: "software-engineer/88-decision-making-frameworks/driver.md";
  slug: "software-engineer/88-decision-making-frameworks/driver";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/expected-value.md": {
	id: "software-engineer/88-decision-making-frameworks/expected-value.md";
  slug: "software-engineer/88-decision-making-frameworks/expected-value";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/ice.md": {
	id: "software-engineer/88-decision-making-frameworks/ice.md";
  slug: "software-engineer/88-decision-making-frameworks/ice";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/informed.md": {
	id: "software-engineer/88-decision-making-frameworks/informed.md";
  slug: "software-engineer/88-decision-making-frameworks/informed";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/input.md": {
	id: "software-engineer/88-decision-making-frameworks/input.md";
  slug: "software-engineer/88-decision-making-frameworks/input";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/opportunity-cost.md": {
	id: "software-engineer/88-decision-making-frameworks/opportunity-cost.md";
  slug: "software-engineer/88-decision-making-frameworks/opportunity-cost";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/perform.md": {
	id: "software-engineer/88-decision-making-frameworks/perform.md";
  slug: "software-engineer/88-decision-making-frameworks/perform";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/probability-impact.md": {
	id: "software-engineer/88-decision-making-frameworks/probability-impact.md";
  slug: "software-engineer/88-decision-making-frameworks/probability-impact";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/pros-cons.md": {
	id: "software-engineer/88-decision-making-frameworks/pros-cons.md";
  slug: "software-engineer/88-decision-making-frameworks/pros-cons";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/raci.md": {
	id: "software-engineer/88-decision-making-frameworks/raci.md";
  slug: "software-engineer/88-decision-making-frameworks/raci";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/rapid.md": {
	id: "software-engineer/88-decision-making-frameworks/rapid.md";
  slug: "software-engineer/88-decision-making-frameworks/rapid";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/recommend.md": {
	id: "software-engineer/88-decision-making-frameworks/recommend.md";
  slug: "software-engineer/88-decision-making-frameworks/recommend";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/responsible.md": {
	id: "software-engineer/88-decision-making-frameworks/responsible.md";
  slug: "software-engineer/88-decision-making-frameworks/responsible";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/rice.md": {
	id: "software-engineer/88-decision-making-frameworks/rice.md";
  slug: "software-engineer/88-decision-making-frameworks/rice";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/88-decision-making-frameworks/risk-matrix.md": {
	id: "software-engineer/88-decision-making-frameworks/risk-matrix.md";
  slug: "software-engineer/88-decision-making-frameworks/risk-matrix";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/actor.md": {
	id: "software-engineer/89-requirements-frameworks/actor.md";
  slug: "software-engineer/89-requirements-frameworks/actor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/alternative-flow.md": {
	id: "software-engineer/89-requirements-frameworks/alternative-flow.md";
  slug: "software-engineer/89-requirements-frameworks/alternative-flow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/as-a-user.md": {
	id: "software-engineer/89-requirements-frameworks/as-a-user.md";
  slug: "software-engineer/89-requirements-frameworks/as-a-user";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/could.md": {
	id: "software-engineer/89-requirements-frameworks/could.md";
  slug: "software-engineer/89-requirements-frameworks/could";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/examples.md": {
	id: "software-engineer/89-requirements-frameworks/examples.md";
  slug: "software-engineer/89-requirements-frameworks/examples";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/exception.md": {
	id: "software-engineer/89-requirements-frameworks/exception.md";
  slug: "software-engineer/89-requirements-frameworks/exception";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/given.md": {
	id: "software-engineer/89-requirements-frameworks/given.md";
  slug: "software-engineer/89-requirements-frameworks/given";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/i-want-capability.md": {
	id: "software-engineer/89-requirements-frameworks/i-want-capability.md";
  slug: "software-engineer/89-requirements-frameworks/i-want-capability";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/main-flow.md": {
	id: "software-engineer/89-requirements-frameworks/main-flow.md";
  slug: "software-engineer/89-requirements-frameworks/main-flow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/must.md": {
	id: "software-engineer/89-requirements-frameworks/must.md";
  slug: "software-engineer/89-requirements-frameworks/must";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/postcondition.md": {
	id: "software-engineer/89-requirements-frameworks/postcondition.md";
  slug: "software-engineer/89-requirements-frameworks/postcondition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/precondition.md": {
	id: "software-engineer/89-requirements-frameworks/precondition.md";
  slug: "software-engineer/89-requirements-frameworks/precondition";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/questions.md": {
	id: "software-engineer/89-requirements-frameworks/questions.md";
  slug: "software-engineer/89-requirements-frameworks/questions";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/rules.md": {
	id: "software-engineer/89-requirements-frameworks/rules.md";
  slug: "software-engineer/89-requirements-frameworks/rules";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/should.md": {
	id: "software-engineer/89-requirements-frameworks/should.md";
  slug: "software-engineer/89-requirements-frameworks/should";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/smart.md": {
	id: "software-engineer/89-requirements-frameworks/smart.md";
  slug: "software-engineer/89-requirements-frameworks/smart";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/so-that-value.md": {
	id: "software-engineer/89-requirements-frameworks/so-that-value.md";
  slug: "software-engineer/89-requirements-frameworks/so-that-value";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/story.md": {
	id: "software-engineer/89-requirements-frameworks/story.md";
  slug: "software-engineer/89-requirements-frameworks/story";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/then.md": {
	id: "software-engineer/89-requirements-frameworks/then.md";
  slug: "software-engineer/89-requirements-frameworks/then";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/trigger.md": {
	id: "software-engineer/89-requirements-frameworks/trigger.md";
  slug: "software-engineer/89-requirements-frameworks/trigger";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/use-case.md": {
	id: "software-engineer/89-requirements-frameworks/use-case.md";
  slug: "software-engineer/89-requirements-frameworks/use-case";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/user-story.md": {
	id: "software-engineer/89-requirements-frameworks/user-story.md";
  slug: "software-engineer/89-requirements-frameworks/user-story";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/89-requirements-frameworks/won-t.md": {
	id: "software-engineer/89-requirements-frameworks/won-t.md";
  slug: "software-engineer/89-requirements-frameworks/won-t";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/attractive.md": {
	id: "software-engineer/90-product-user-thinking/attractive.md";
  slug: "software-engineer/90-product-user-thinking/attractive";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/customer-journey-mapping.md": {
	id: "software-engineer/90-product-user-thinking/customer-journey-mapping.md";
  slug: "software-engineer/90-product-user-thinking/customer-journey-mapping";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/does.md": {
	id: "software-engineer/90-product-user-thinking/does.md";
  slug: "software-engineer/90-product-user-thinking/does";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/empathy-map.md": {
	id: "software-engineer/90-product-user-thinking/empathy-map.md";
  slug: "software-engineer/90-product-user-thinking/empathy-map";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/feels.md": {
	id: "software-engineer/90-product-user-thinking/feels.md";
  slug: "software-engineer/90-product-user-thinking/feels";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/indifferent.md": {
	id: "software-engineer/90-product-user-thinking/indifferent.md";
  slug: "software-engineer/90-product-user-thinking/indifferent";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/jobs-to-be-done.md": {
	id: "software-engineer/90-product-user-thinking/jobs-to-be-done.md";
  slug: "software-engineer/90-product-user-thinking/jobs-to-be-done";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/kano-model.md": {
	id: "software-engineer/90-product-user-thinking/kano-model.md";
  slug: "software-engineer/90-product-user-thinking/kano-model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/mlp.md": {
	id: "software-engineer/90-product-user-thinking/mlp.md";
  slug: "software-engineer/90-product-user-thinking/mlp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/must-be.md": {
	id: "software-engineer/90-product-user-thinking/must-be.md";
  slug: "software-engineer/90-product-user-thinking/must-be";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/mvp.md": {
	id: "software-engineer/90-product-user-thinking/mvp.md";
  slug: "software-engineer/90-product-user-thinking/mvp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/north-star-metric.md": {
	id: "software-engineer/90-product-user-thinking/north-star-metric.md";
  slug: "software-engineer/90-product-user-thinking/north-star-metric";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/reverse.md": {
	id: "software-engineer/90-product-user-thinking/reverse.md";
  slug: "software-engineer/90-product-user-thinking/reverse";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/says.md": {
	id: "software-engineer/90-product-user-thinking/says.md";
  slug: "software-engineer/90-product-user-thinking/says";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/thinks.md": {
	id: "software-engineer/90-product-user-thinking/thinks.md";
  slug: "software-engineer/90-product-user-thinking/thinks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/90-product-user-thinking/user-journey-mapping.md": {
	id: "software-engineer/90-product-user-thinking/user-journey-mapping.md";
  slug: "software-engineer/90-product-user-thinking/user-journey-mapping";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/91-software-engineering-principles/kiss.md": {
	id: "software-engineer/91-software-engineering-principles/kiss.md";
  slug: "software-engineer/91-software-engineering-principles/kiss";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/91-software-engineering-principles/lod.md": {
	id: "software-engineer/91-software-engineering-principles/lod.md";
  slug: "software-engineer/91-software-engineering-principles/lod";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/91-software-engineering-principles/ocp.md": {
	id: "software-engineer/91-software-engineering-principles/ocp.md";
  slug: "software-engineer/91-software-engineering-principles/ocp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/91-software-engineering-principles/pola.md": {
	id: "software-engineer/91-software-engineering-principles/pola.md";
  slug: "software-engineer/91-software-engineering-principles/pola";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/91-software-engineering-principles/soc.md": {
	id: "software-engineer/91-software-engineering-principles/soc.md";
  slug: "software-engineer/91-software-engineering-principles/soc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/91-software-engineering-principles/yagni.md": {
	id: "software-engineer/91-software-engineering-principles/yagni.md";
  slug: "software-engineer/91-software-engineering-principles/yagni";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/cell-based.md": {
	id: "software-engineer/92-architecture-patterns/cell-based.md";
  slug: "software-engineer/92-architecture-patterns/cell-based";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/event-driven.md": {
	id: "software-engineer/92-architecture-patterns/event-driven.md";
  slug: "software-engineer/92-architecture-patterns/event-driven";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/hexagonal.md": {
	id: "software-engineer/92-architecture-patterns/hexagonal.md";
  slug: "software-engineer/92-architecture-patterns/hexagonal";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/layered.md": {
	id: "software-engineer/92-architecture-patterns/layered.md";
  slug: "software-engineer/92-architecture-patterns/layered";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/microkernel.md": {
	id: "software-engineer/92-architecture-patterns/microkernel.md";
  slug: "software-engineer/92-architecture-patterns/microkernel";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/n-tier.md": {
	id: "software-engineer/92-architecture-patterns/n-tier.md";
  slug: "software-engineer/92-architecture-patterns/n-tier";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/onion.md": {
	id: "software-engineer/92-architecture-patterns/onion.md";
  slug: "software-engineer/92-architecture-patterns/onion";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/reactive.md": {
	id: "software-engineer/92-architecture-patterns/reactive.md";
  slug: "software-engineer/92-architecture-patterns/reactive";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/space-based.md": {
	id: "software-engineer/92-architecture-patterns/space-based.md";
  slug: "software-engineer/92-architecture-patterns/space-based";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/92-architecture-patterns/vertical-slice.md": {
	id: "software-engineer/92-architecture-patterns/vertical-slice.md";
  slug: "software-engineer/92-architecture-patterns/vertical-slice";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/93-classical-design-patterns/behavioral.md": {
	id: "software-engineer/93-classical-design-patterns/behavioral.md";
  slug: "software-engineer/93-classical-design-patterns/behavioral";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/93-classical-design-patterns/creational.md": {
	id: "software-engineer/93-classical-design-patterns/creational.md";
  slug: "software-engineer/93-classical-design-patterns/creational";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/93-classical-design-patterns/structural.md": {
	id: "software-engineer/93-classical-design-patterns/structural.md";
  slug: "software-engineer/93-classical-design-patterns/structural";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/command-message.md": {
	id: "software-engineer/94-system-integration-patterns/command-message.md";
  slug: "software-engineer/94-system-integration-patterns/command-message";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/content-based-router.md": {
	id: "software-engineer/94-system-integration-patterns/content-based-router.md";
  slug: "software-engineer/94-system-integration-patterns/content-based-router";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/content-enricher.md": {
	id: "software-engineer/94-system-integration-patterns/content-enricher.md";
  slug: "software-engineer/94-system-integration-patterns/content-enricher";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/document-message.md": {
	id: "software-engineer/94-system-integration-patterns/document-message.md";
  slug: "software-engineer/94-system-integration-patterns/document-message";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/event-message.md": {
	id: "software-engineer/94-system-integration-patterns/event-message.md";
  slug: "software-engineer/94-system-integration-patterns/event-message";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/message-broker.md": {
	id: "software-engineer/94-system-integration-patterns/message-broker.md";
  slug: "software-engineer/94-system-integration-patterns/message-broker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/normalizer.md": {
	id: "software-engineer/94-system-integration-patterns/normalizer.md";
  slug: "software-engineer/94-system-integration-patterns/normalizer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/point-to-point-channel.md": {
	id: "software-engineer/94-system-integration-patterns/point-to-point-channel.md";
  slug: "software-engineer/94-system-integration-patterns/point-to-point-channel";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/publish-subscribe-channel.md": {
	id: "software-engineer/94-system-integration-patterns/publish-subscribe-channel.md";
  slug: "software-engineer/94-system-integration-patterns/publish-subscribe-channel";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/recipient-list.md": {
	id: "software-engineer/94-system-integration-patterns/recipient-list.md";
  slug: "software-engineer/94-system-integration-patterns/recipient-list";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/94-system-integration-patterns/translator.md": {
	id: "software-engineer/94-system-integration-patterns/translator.md";
  slug: "software-engineer/94-system-integration-patterns/translator";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/api-versioning.md": {
	id: "software-engineer/95-api-patterns/api-versioning.md";
  slug: "software-engineer/95-api-patterns/api-versioning";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/batch-apis.md": {
	id: "software-engineer/95-api-patterns/batch-apis.md";
  slug: "software-engineer/95-api-patterns/batch-apis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/bff.md": {
	id: "software-engineer/95-api-patterns/bff.md";
  slug: "software-engineer/95-api-patterns/bff";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/bulk-apis.md": {
	id: "software-engineer/95-api-patterns/bulk-apis.md";
  slug: "software-engineer/95-api-patterns/bulk-apis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/conditional-requests.md": {
	id: "software-engineer/95-api-patterns/conditional-requests.md";
  slug: "software-engineer/95-api-patterns/conditional-requests";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/cursor-pagination.md": {
	id: "software-engineer/95-api-patterns/cursor-pagination.md";
  slug: "software-engineer/95-api-patterns/cursor-pagination";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/deprecation.md": {
	id: "software-engineer/95-api-patterns/deprecation.md";
  slug: "software-engineer/95-api-patterns/deprecation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/etags.md": {
	id: "software-engineer/95-api-patterns/etags.md";
  slug: "software-engineer/95-api-patterns/etags";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/offset-pagination.md": {
	id: "software-engineer/95-api-patterns/offset-pagination.md";
  slug: "software-engineer/95-api-patterns/offset-pagination";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/optimistic-concurrency.md": {
	id: "software-engineer/95-api-patterns/optimistic-concurrency.md";
  slug: "software-engineer/95-api-patterns/optimistic-concurrency";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/projection.md": {
	id: "software-engineer/95-api-patterns/projection.md";
  slug: "software-engineer/95-api-patterns/projection";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/rpc.md": {
	id: "software-engineer/95-api-patterns/rpc.md";
  slug: "software-engineer/95-api-patterns/rpc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/95-api-patterns/throttling.md": {
	id: "software-engineer/95-api-patterns/throttling.md";
  slug: "software-engineer/95-api-patterns/throttling";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/96-contract-thinking/contract-first-development.md": {
	id: "software-engineer/96-contract-thinking/contract-first-development.md";
  slug: "software-engineer/96-contract-thinking/contract-first-development";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/96-contract-thinking/full-compatibility.md": {
	id: "software-engineer/96-contract-thinking/full-compatibility.md";
  slug: "software-engineer/96-contract-thinking/full-compatibility";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/96-contract-thinking/json-schema.md": {
	id: "software-engineer/96-contract-thinking/json-schema.md";
  slug: "software-engineer/96-contract-thinking/json-schema";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/96-contract-thinking/openapi.md": {
	id: "software-engineer/96-contract-thinking/openapi.md";
  slug: "software-engineer/96-contract-thinking/openapi";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/96-contract-thinking/schema-evolution.md": {
	id: "software-engineer/96-contract-thinking/schema-evolution.md";
  slug: "software-engineer/96-contract-thinking/schema-evolution";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/97-testing-frameworks/atdd.md": {
	id: "software-engineer/97-testing-frameworks/atdd.md";
  slug: "software-engineer/97-testing-frameworks/atdd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/97-testing-frameworks/bdd.md": {
	id: "software-engineer/97-testing-frameworks/bdd.md";
  slug: "software-engineer/97-testing-frameworks/bdd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/97-testing-frameworks/shift-left.md": {
	id: "software-engineer/97-testing-frameworks/shift-left.md";
  slug: "software-engineer/97-testing-frameworks/shift-left";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/97-testing-frameworks/shift-right.md": {
	id: "software-engineer/97-testing-frameworks/shift-right.md";
  slug: "software-engineer/97-testing-frameworks/shift-right";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/97-testing-frameworks/testing-pyramid.md": {
	id: "software-engineer/97-testing-frameworks/testing-pyramid.md";
  slug: "software-engineer/97-testing-frameworks/testing-pyramid";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/binary-search-debugging.md": {
	id: "software-engineer/98-debugging-frameworks/binary-search-debugging.md";
  slug: "software-engineer/98-debugging-frameworks/binary-search-debugging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/broken.md": {
	id: "software-engineer/98-debugging-frameworks/broken.md";
  slug: "software-engineer/98-debugging-frameworks/broken";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/conclude.md": {
	id: "software-engineer/98-debugging-frameworks/conclude.md";
  slug: "software-engineer/98-debugging-frameworks/conclude";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/configuration.md": {
	id: "software-engineer/98-debugging-frameworks/configuration.md";
  slug: "software-engineer/98-debugging-frameworks/configuration";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/database.md": {
	id: "software-engineer/98-debugging-frameworks/database.md";
  slug: "software-engineer/98-debugging-frameworks/database";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/experiment.md": {
	id: "software-engineer/98-debugging-frameworks/experiment.md";
  slug: "software-engineer/98-debugging-frameworks/experiment";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/fault-isolation.md": {
	id: "software-engineer/98-debugging-frameworks/fault-isolation.md";
  slug: "software-engineer/98-debugging-frameworks/fault-isolation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/five-whys.md": {
	id: "software-engineer/98-debugging-frameworks/five-whys.md";
  slug: "software-engineer/98-debugging-frameworks/five-whys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/git-bisect.md": {
	id: "software-engineer/98-debugging-frameworks/git-bisect.md";
  slug: "software-engineer/98-debugging-frameworks/git-bisect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/measure.md": {
	id: "software-engineer/98-debugging-frameworks/measure.md";
  slug: "software-engineer/98-debugging-frameworks/measure";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/network.md": {
	id: "software-engineer/98-debugging-frameworks/network.md";
  slug: "software-engineer/98-debugging-frameworks/network";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/predict.md": {
	id: "software-engineer/98-debugging-frameworks/predict.md";
  slug: "software-engineer/98-debugging-frameworks/predict";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/scientific-method.md": {
	id: "software-engineer/98-debugging-frameworks/scientific-method.md";
  slug: "software-engineer/98-debugging-frameworks/scientific-method";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/time-travel-debugging.md": {
	id: "software-engineer/98-debugging-frameworks/time-travel-debugging.md";
  slug: "software-engineer/98-debugging-frameworks/time-travel-debugging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/98-debugging-frameworks/working.md": {
	id: "software-engineer/98-debugging-frameworks/working.md";
  slug: "software-engineer/98-debugging-frameworks/working";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/blameless-postmortem.md": {
	id: "software-engineer/99-incident-management/blameless-postmortem.md";
  slug: "software-engineer/99-incident-management/blameless-postmortem";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/communicate.md": {
	id: "software-engineer/99-incident-management/communicate.md";
  slug: "software-engineer/99-incident-management/communicate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/communications.md": {
	id: "software-engineer/99-incident-management/communications.md";
  slug: "software-engineer/99-incident-management/communications";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/contain.md": {
	id: "software-engineer/99-incident-management/contain.md";
  slug: "software-engineer/99-incident-management/contain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/detect.md": {
	id: "software-engineer/99-incident-management/detect.md";
  slug: "software-engineer/99-incident-management/detect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/how-do-we-prevent-recurrence.md": {
	id: "software-engineer/99-incident-management/how-do-we-prevent-recurrence.md";
  slug: "software-engineer/99-incident-management/how-do-we-prevent-recurrence";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/incident-command-system.md": {
	id: "software-engineer/99-incident-management/incident-command-system.md";
  slug: "software-engineer/99-incident-management/incident-command-system";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/incident-commander.md": {
	id: "software-engineer/99-incident-management/incident-commander.md";
  slug: "software-engineer/99-incident-management/incident-commander";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/incident-response-lifecycle.md": {
	id: "software-engineer/99-incident-management/incident-response-lifecycle.md";
  slug: "software-engineer/99-incident-management/incident-response-lifecycle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/learn.md": {
	id: "software-engineer/99-incident-management/learn.md";
  slug: "software-engineer/99-incident-management/learn";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/mitigate.md": {
	id: "software-engineer/99-incident-management/mitigate.md";
  slug: "software-engineer/99-incident-management/mitigate";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/resolve.md": {
	id: "software-engineer/99-incident-management/resolve.md";
  slug: "software-engineer/99-incident-management/resolve";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/subject-matter-experts.md": {
	id: "software-engineer/99-incident-management/subject-matter-experts.md";
  slug: "software-engineer/99-incident-management/subject-matter-experts";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/t-10.md": {
	id: "software-engineer/99-incident-management/t-10.md";
  slug: "software-engineer/99-incident-management/t-10";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/t-20.md": {
	id: "software-engineer/99-incident-management/t-20.md";
  slug: "software-engineer/99-incident-management/t-20";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/t-30.md": {
	id: "software-engineer/99-incident-management/t-30.md";
  slug: "software-engineer/99-incident-management/t-30";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/t-5.md": {
	id: "software-engineer/99-incident-management/t-5.md";
  slug: "software-engineer/99-incident-management/t-5";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/t0.md": {
	id: "software-engineer/99-incident-management/t0.md";
  slug: "software-engineer/99-incident-management/t0";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/timeline-analysis.md": {
	id: "software-engineer/99-incident-management/timeline-analysis.md";
  slug: "software-engineer/99-incident-management/timeline-analysis";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/triage.md": {
	id: "software-engineer/99-incident-management/triage.md";
  slug: "software-engineer/99-incident-management/triage";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/why-wasn-t-it-detected.md": {
	id: "software-engineer/99-incident-management/why-wasn-t-it-detected.md";
  slug: "software-engineer/99-incident-management/why-wasn-t-it-detected";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/99-incident-management/why-wasn-t-it-prevented.md": {
	id: "software-engineer/99-incident-management/why-wasn-t-it-prevented.md";
  slug: "software-engineer/99-incident-management/why-wasn-t-it-prevented";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/content.md": {
	id: "software-engineer/content.md";
  slug: "software-engineer/content";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"software-engineer/content2.md": {
	id: "software-engineer/content2.md";
  slug: "software-engineer/content2";
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
"tools/auto-editor.md": {
	id: "tools/auto-editor.md";
  slug: "tools/auto-editor";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/awesome-quant.md": {
	id: "tools/awesome-quant.md";
  slug: "tools/awesome-quant";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/awesome.md": {
	id: "tools/awesome.md";
  slug: "tools/awesome";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/bitchat.md": {
	id: "tools/bitchat.md";
  slug: "tools/bitchat";
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
"tools/cloudberry.md": {
	id: "tools/cloudberry.md";
  slug: "tools/cloudberry";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/code-server.md": {
	id: "tools/code-server.md";
  slug: "tools/code-server";
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
"tools/foqos.md": {
	id: "tools/foqos.md";
  slug: "tools/foqos";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/free-for-dev.md": {
	id: "tools/free-for-dev.md";
  slug: "tools/free-for-dev";
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
"tools/maxun.md": {
	id: "tools/maxun.md";
  slug: "tools/maxun";
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
"tools/nautilus-trader.md": {
	id: "tools/nautilus-trader.md";
  slug: "tools/nautilus-trader";
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
"tools/openpanel.md": {
	id: "tools/openpanel.md";
  slug: "tools/openpanel";
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
"tools/plane.md": {
	id: "tools/plane.md";
  slug: "tools/plane";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"tools/public-apis.md": {
	id: "tools/public-apis.md";
  slug: "tools/public-apis";
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
"tools/strix.md": {
	id: "tools/strix.md";
  slug: "tools/strix";
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
"webdev/airship.md": {
	id: "webdev/airship.md";
  slug: "webdev/airship";
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
"webdev/gods-eye-view.md": {
	id: "webdev/gods-eye-view.md";
  slug: "webdev/gods-eye-view";
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
"webdev/instatic.md": {
	id: "webdev/instatic.md";
  slug: "webdev/instatic";
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
"webdev/markdoc.md": {
	id: "webdev/markdoc.md";
  slug: "webdev/markdoc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/open-saas.md": {
	id: "webdev/open-saas.md";
  slug: "webdev/open-saas";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"webdev/pic-smaller.md": {
	id: "webdev/pic-smaller.md";
  slug: "webdev/pic-smaller";
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
"webdev/scrapling.md": {
	id: "webdev/scrapling.md";
  slug: "webdev/scrapling";
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
