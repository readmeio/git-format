import type { PartialDeep, SetRequired } from 'type-fest';

interface CommonFrontMatter {
  hidden: boolean;
  title: string;
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
}

export type PageFrontmatter = SetRequired<PartialDeep<PageSpecificFrontMatter>, 'title'>;

export type CustomPageFrontmatter = SetRequired<PartialDeep<PageSpecificFrontMatter>, 'title'> &  {
  fullscreen: boolean;
};

export type APIFrontMatter = SetRequired<PartialDeep<PageSpecificFrontMatter>, 'title'> & {
  api: {
    file: string;
    operationId: string;
    webhook?: boolean;
    deprecated?: boolean;
  };
};

export type RecipeFrontMatter = SetRequired<PartialDeep<CommonFrontMatter>, 'title'> & {
  recipes: {
    color: `#${string}`;
    emoji: string;
  };
};
