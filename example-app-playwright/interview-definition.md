# React Code Review Interview Exercise

## Overview

**Purpose:** Interview exercise to evaluate a candidate's ability to spot React anti-patterns and bugs.

**How it works:** The candidate reviews the `wishlist-interview` feature - a copy of the real wishlist with intentional issues planted. They have 30-45 minutes to find and document as many issues as they can.

**Code to review:**

- Feature: `src/features/wishlist-interview/`
- Page: `src/pages/WishlistInterview/`
- Route: `/wishlist-interview`

## Files to Review

| File                                                                          | Description               |
| ----------------------------------------------------------------------------- | ------------------------- |
| `src/pages/WishlistInterview/index.tsx`                                       | Page component            |
| `src/features/wishlist-interview/presentation/WishlistInterviewList.tsx`      | List component (has bugs) |
| `src/features/wishlist-interview/presentation/WishlistInterviewItem.tsx`      | Item component            |
| `src/features/wishlist-interview/infrastructure/useWishlistInterviewStore.ts` | Zustand store             |

---

## Proposed Mistakes (10-12 to be introduced)

### Basic Mistakes (Junior developers should find)

| #   | Mistake                      | Description                                                                           | Example                                                            |
| --- | ---------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| B1  | Direct DOM manipulation      | Using `document.getElementById()` or `document.querySelector()` instead of React refs | `document.getElementById('item').style.display = 'none'`           |
| B2  | Static key value             | Using a non-unique static string as key instead of unique identifier                  | `items.map(item => <Item key="id" />)`                             |
| B3  | Index as key                 | Using array index as key in a dynamic list that can be reordered/filtered             | `items.map((item, i) => <Item key={i} />)`                         |
| B4  | State mutation               | Directly mutating state array instead of creating new reference                       | `state.items.push(newItem)` instead of `[...state.items, newItem]` |
| B5  | Missing useEffect dependency | Omitting dependencies causing stale closures                                          | `useEffect(() => { doSomething(count) }, [])` when `count` changes |
| B6  | Console.log in production    | Debug statements left in code                                                         | `console.log('items:', items)`                                     |

### Subtle Mistakes (Senior developers should find)

| #   | Mistake                        | Description                                                                      | Example                                                            |
| --- | ------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| S1  | Zustand selector anti-pattern  | Selecting entire store instead of specific slice, causing unnecessary re-renders | `useStore()` vs `useStore(s => s.items)`                           |
| S2  | Stale closure in async handler | State value captured at function creation time, not current value                | Async callback using stale `items` after state update              |
| S3  | Memory leak - missing cleanup  | useEffect with subscription/timer without cleanup function                       | `useEffect(() => { setInterval(...) }, [])` without return cleanup |
| S4  | Derived state in useState      | Storing computed values in state instead of deriving them                        | `const [total, setTotal] = useState(items.reduce(...))`            |
| S5  | Object creation in render      | Creating new objects inline causing unnecessary re-renders                       | `style={{ marginTop: 10 }}` in JSX                                 |
| S6  | Accessibility - clickable div  | Using div with onClick without keyboard support (role, tabIndex, onKeyDown)      | `<div onClick={...}>Click me</div>`                                |
| S7  | Unnecessary useEffect          | Using effect for something that should be an event handler                       | `useEffect` to react to state when handler would suffice           |
| S8  | Implicit any / weak typing     | TypeScript losing type information                                               | `items.find(...)?.data` without proper typing                      |
| S9  | Race condition on unmount      | Async state update after component unmounts                                      | `fetch().then(data => setState(data))` without abort               |
| S10 | Unnecessary spread             | Spreading all props when only 2-3 are needed                                     | `<Component {...product} />` when only `id`, `title` needed        |

---

## Evaluation Criteria

### Junior (0-2 years)

- Should find: 3-4 basic mistakes (B1-B6)
- Bonus: 1 subtle mistake

### Mid-level (2-5 years)

- Should find: 4-5 basic mistakes
- Should find: 2-3 subtle mistakes (S1-S10)

### Senior (5+ years)

- Should find: All basic mistakes
- Should find: 5+ subtle mistakes
- Should explain: WHY each is a problem and HOW to fix it
- Bonus: Suggest architectural improvements

---

## Interview Instructions

1. Give candidate 30-45 minutes to review the code
2. They can use any tools (IDE, browser, etc.)
3. Ask them to document findings with:
   - Location (file:line)
   - Description of the issue
   - Severity (low/medium/high)
   - Suggested fix
4. Discuss findings together, focusing on reasoning

---

## Bug Planting Guidelines

**Leave a bold clue near each issue** - candidates skim the code first and need visual hints to pause and investigate. The clue should draw attention without revealing the answer.

Examples of good clues:

- Suspicious comment: `// scroll to list when items change`
- Odd variable name: `key="id"` (looks like it should be `product.id`)
- Redundant code nearby that makes you look twice
- A comment that's slightly "off": `// using DOM for performance`

The goal: **make them stop and think**, not hand them the answer.

---

## Implemented Issues (Answer Key)

### B1 - Direct DOM Manipulation

**Location:** `src/features/wishlist-interview/presentation/WishlistInterviewList.tsx:19-24`

**The Bug:**

```tsx
// Scroll to list using DOM for better performance  <-- clue
useEffect(() => {
  const list = document.getElementById("wishlist-items");
  if (list && wishlistProducts.length > 0) {
    list.scrollIntoView({ behavior: "smooth" });
  }
}, [wishlistProducts.length]);
```

**Why it's wrong:**

- Bypasses React's virtual DOM, breaking the declarative paradigm
- Creates tight coupling to DOM structure (fragile if ID changes)
- Not SSR-compatible (document doesn't exist on server)
- Can cause issues with React's reconciliation

**Correct Answer:**

```tsx
const listRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (listRef.current && wishlistProducts.length > 0) {
    listRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [wishlistProducts.length]);

// In JSX:
<VStack ref={listRef} w="100%" spacing={8}>
```

---

### B2 - Static Key Value

**Location:** `src/features/wishlist-interview/presentation/WishlistInterviewList.tsx:42-46`

**The Bug:**

```tsx
{
  wishlistProducts.map((product) => (
    // Using key for React reconciliation  <-- clue
    <Fragment key="id">
      <WishlistInterviewItem {...product} />
      <Divider />
    </Fragment>
  ));
}
```

**Why it's wrong:**

- All items share the same key `"id"` - keys must be unique among siblings
- React cannot distinguish between items, breaking reconciliation
- Causes incorrect DOM updates when items are added/removed/reordered
- May cause state to "stick" to wrong items

**Correct Answer:**

```tsx
{
  wishlistProducts.map((product) => (
    <Fragment key={product.id}>
      <WishlistInterviewItem {...product} />
      <Divider />
    </Fragment>
  ));
}
```

---

### S5 - Object Creation in Render

**Location:** `src/features/wishlist-interview/presentation/WishlistInterviewList.tsx:71`

**The Bug:**

```tsx
<div
  style={{ padding: "10px", marginBottom: "20px", cursor: "pointer", backgroundColor: "#f0f0f0" }}
>
```

**Why it's wrong:**

- Creates a new object on every render
- Breaks memoization (React.memo, useMemo) because reference changes
- Causes unnecessary child re-renders
- Should use Chakra's style props or useMemo for static styles

**Correct Answer:**

```tsx
const boxStyle = useMemo(() => ({
  padding: "10px",
  marginBottom: "20px",
  // ...
}), []);
// Or better: use Chakra's Box with style props
```

---

### S6 - Accessibility - Clickable Div

**Location:** `src/features/wishlist-interview/presentation/WishlistInterviewList.tsx:69-74`

**The Bug:**

```tsx
<div
  onClick={() => setLastViewed(wishlistProducts[0]?.id)}
  style={{ ... }}
>
  <Text>Click to mark first item as viewed</Text>
</div>
```

**Why it's wrong:**

- No `role="button"` - screen readers don't know it's interactive
- No `tabIndex={0}` - keyboard users can't focus it
- No `onKeyDown` handler - Enter/Space won't trigger the action
- Violates WCAG 2.1 accessibility guidelines

**Correct Answer:**

```tsx
<Button onClick={...}>
  Click to mark first item as viewed
</Button>
// Or add role="button", tabIndex={0}, onKeyDown
```

---

### S7 - Unnecessary useEffect

**Location:** `src/features/wishlist-interview/presentation/WishlistInterviewList.tsx:29-33`

**The Bug:**

```tsx
const [lastViewed, setLastViewed] = useState<number | null>(null);

useEffect(() => {
  if (lastViewed) {
    console.log(`User viewed item ${lastViewed}`);
  }
}, [lastViewed]);
```

**Why it's wrong:**

- useEffect runs after render, adding unnecessary work
- This should be done directly in the onClick handler
- Creates extra state + effect when none is needed
- Violates "You Might Not Need an Effect" principle

**Correct Answer:**

```tsx
const handleClick = (id: number) => {
  console.log(`User viewed item ${id}`);
};
// No state, no effect needed
```

---

## Notes

- 5 of 10-12 issues have been implemented (B1, B2, S5, S6, S7)
- Remaining issues will be added incrementally
- Use ESLint warnings as hints: the missing key will trigger a lint error
