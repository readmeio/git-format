---
title: Publish all Docs in Category
summary: Update each doc in a specific category as published.
hidden: true
recipes:
  color: "#203821"
  emoji: 👾
---

```node selection=L1-L2
const sdk = require("api")(
  "https://docs.readme.com/developers/openapi/62056dee230e07007218be15"
);
sdk.auth("<<user>>");

const categories = await sdk.getCategories({ perPage: "10", page: "1" });

const docs = await sdk.getCategoryDocs({ slug: categories[0].slug });

docs.forEach(async (doc) => {
  await sdk.updateDoc({ hidden: false }, { slug: doc.slug });
});
```

```python selection=L1-L2
const sdk = require('api')('https://docs.readme.com/developers/openapi/62056dee230e07007218be15');
sdk.auth('<<user>>');

const categories = await sdk
  .getCategories({ perPage: "10", page: "1" });

const docs = await sdk
  .getCategoryDocs({ slug: categories[0].slug });

docs.forEach(async (doc) => {
  await sdk.updateDoc({ hidden: false }, { slug: doc.slug });
});
```

# Install the api module from NPM

<!-- node@L0-L4,L6 -->
<!-- python@L2-L3,L9 -->

You can install the api module by running `npm install api`.

# Get the category to mark docs as published

You need the category containing the docs to mark them as published. Here, we'll use the first category.

<!-- node@L5-L10 -->
<!-- python@L5-L12 -->

# Get all docs in the category

<!-- node@L0-L4,L6 -->
<!-- python@L2-L3,L9 -->

Using the category slug we got from the previous category, we can fetch all of the docs that belong to the category.

# Iterate over each doc to mark as published

<!-- node@L0-L4,L6 -->
<!-- python@L2-L3,L9 -->

We can iterate over each doc returned in the previous call, and update each one to be published.
