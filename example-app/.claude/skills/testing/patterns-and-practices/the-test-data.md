# The Test Data

**When to use:** When working with JSONs, entities, or any test input data.

---

## Section C - The Test Data

C.3. Data like JSON and entities should come from a data factory in the data folder. Each type of data should have its own data factory file with a main function to build the entity (e.g., buildOrder, buildUser)

C.4. The factory function should return default data but also allow the caller to provide overrides to specific fields, this way each test can modify specific field values

C.5. When setting a common universal data in a field like dates, addresses or anything that is not domain-specific, use libraries that provide realistic real-world data like fakerjs and alike

C.7. The data factory function incoming and outgoing params should have types, the same types that are used by the code under test

C.10. For the test data, use meaningful domain data, not dummy values

C.15. When building a field that can have multiple options, by default randomize an option to allow testing across all options

C.20. When having list/arrays, by default put two items. Why? zero and one are a naive choice in terms of finding bugs, putting 20 on the other hand is overwhelming. Two is a good balance between simplicity and realism

---

## Example: Good Data Factory

```typescript
import { faker } from "@faker-js/faker";
import { FileContext } from "../types";

export function buildFileFromIDE(overrides: Partial<FileContext> = {}): FileContext {
  return {
    path: faker.system.filePath(),
    type: faker.helpers.arrayElement(["file", "folder"]),
    ...overrides,
  };
}
```
