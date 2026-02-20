---
title: getPet
api:
  file: oas.json
  operationId: getPet
---

# Get Pet Markdown

This is markdown for an endpoint in oas.json with the operationId of get-pet.

I put the OAS files at hte root since with the manual editor today we have endpoint pages spread across the entire referene section. We've never had this limitation of tying an endpoint to a category. Because of this we'd have to do a massive migration (basically forcing people to reorganize their docs) for most manaul apis.

If we don't want any markdown associated with any endpoints, then we can just have the following folder structure and it will work:

```
  - References
    - oas.json
```

We can create a "virtual" category based on the spec and do all of the pages based on the tags. Only when they want to reorder or add markdown will we require anything more in the directory.
