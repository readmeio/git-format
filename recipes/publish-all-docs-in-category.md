---
title: Publish all Docs in Category
summary: Update each doc in a specific category as published.
color: #203821
emoji: 👾
---

# Install the api module from NPM

You can install the api module by running `npm install api`.

```Node
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

```Python
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

# Get the category to mark docs as published

You need the category containing the docs to mark them as published. Here, we'll use the first category.

<!-- Node[0-4,6] -->
<!-- Python[2-3,9] -->

# Get all docs in the category

Using the category slug we got from the previous category, we can fetch all of the docs that belong to the category.

```Python[1]
  print "Hello I replace all the code!"
  print "New line here"
```

# Iterate over each doc to mark as published

We can iterate over each doc returned in the previous call, and update each one to be published.

<!-- Python[2] -->
