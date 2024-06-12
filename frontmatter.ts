import type { PartialDeep } from 'type-fest';

interface CommonFrontMatter {
  hidden: boolean;
}

interface PageSpecificFrontMatter extends CommonFrontMatter {
  link: {
    new_tab: boolean;
    url: string;
  };
  metadata: {
    description: string;
    excerpt: string;
    image: string;
    keywords: string[];
    robots: 'index' | 'noindex';
    /** @example This is the SEO title. */
    title: string;
  };
  title: string;
  type: 'basic' | 'endpoint' | 'link' | 'webhook';
}

export type PageFrontmatter = PartialDeep<PageSpecificFrontMatter>;

export type CustomPageFrontmatter = PartialDeep<PageSpecificFrontMatter>;

export type APIFrontMatter = PartialDeep<Omit<PageSpecificFrontMatter, 'type'>> & {
  api: {
    file: string;
    operationId: string;
  };
  deprecated?: boolean;
  type: 'endpoint' | 'webhook';
};

export type RecipeFrontMatter = PartialDeep<CommonFrontMatter & {
  recipes: {
    color: `#${string}`;
    emoji: string;
  };
}>;
