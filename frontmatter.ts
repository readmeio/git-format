import type { PartialDeep, SetRequired } from 'type-fest';

interface CoreFrontMatter {
  hidden: boolean;
  title: string;
}

interface MetadataFrontmatter {
  description: string;
  excerpt: string;
  image: string;
  keywords: string[];
  robots: 'index' | 'noindex';
  /** @example This is the SEO title. */
  title: string;
}

interface CommonPageFrontmatter extends CoreFrontMatter {
  deprecated?: boolean;
  metadata: MetadataFrontmatter;
  next: {
    description: string;
    pages: {
      slug: string;
      title: string;
      type: 'basic' | 'endpoint';
    }[];
  };
}

export type PageFrontmatter = SetRequired<PartialDeep<CommonPageFrontmatter>, 'title'> & {
  link: {
    new_tab: boolean;
    url: string;
  };
};

export type CustomPageFrontmatter = SetRequired<
  PartialDeep<
    // Custom pages have everything that a common page has except that they can't be deprecated.
    Omit<CommonPageFrontmatter, 'deprecated'>
  >,
  'title'
> & {
  fullscreen: boolean;
};

export type APIFrontmatter = SetRequired<PartialDeep<CommonPageFrontmatter>, 'title'> & {
  api: {
    file: string;
    operationId: string;
    webhook?: boolean;
  };
};

export type RecipeFrontmatter = SetRequired<PartialDeep<CoreFrontMatter>, 'title'> & {
  metadata: PartialDeep<Pick<MetadataFrontmatter, 'description' | 'title'>>;
  recipe: {
    color: `#${string}`;
    icon: string;
  };
};

export type FrontmatterData = APIFrontmatter | CustomPageFrontmatter | PageFrontmatter | RecipeFrontmatter;
