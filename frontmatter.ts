import type { PartialDeep, SetRequired } from 'type-fest';

interface CoreFrontMatter {
  hidden: boolean;
  title: string;
}

interface CommonFrontMatter extends CoreFrontMatter {
  deprecated?: boolean;
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

export type PageFrontmatter = SetRequired<PartialDeep<CommonFrontMatter>, 'title'> & {
  link: {
    new_tab: boolean;
    url: string;
  };
};

export type CustomPageFrontmatter = SetRequired<PartialDeep<CommonFrontMatter>, 'title'> &  {
  fullscreen: boolean;
};

export type APIFrontMatter = SetRequired<PartialDeep<CommonFrontMatter>, 'title'> & {
  api: {
    file: string;
    operationId: string;
    webhook?: boolean;
  };
};

export type RecipeFrontMatter = SetRequired<PartialDeep<CommonFrontMatter>, 'title'> & {
  recipes: {
    color: `#${string}`;
    icon: string;
  };
};
