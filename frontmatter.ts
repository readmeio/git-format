import type { PartialDeep } from 'type-fest';

interface CommonFrontMatter {
  excerpt?: string;
  hidden?: boolean;
}

interface PageSpecificFrontMatter extends CommonFrontMatter {
  link: {
    external: boolean;
    url: string;
  };
  metadata: {
    image: string;
  };
  seo: {
    description: string;
    keywords: string[];
    title: string;
  };
  summary: string;
  title: string;
  type: 'basic' | 'endpoint' | 'link' | 'webhook';
}

type APIFrontMatter = PartialDeep<Omit<PageSpecificFrontMatter, 'type'>> & {
  api: {
    file: string;
    operationId: string;
  };
  deprecated?: boolean;
  type: 'endpoint' | 'webhook';
};

type RecipeFrontMatter = PartialDeep<CommonFrontMatter & {
  recipes: {
    color: `#${string}`;
    emoji: string;
  };
}>;
