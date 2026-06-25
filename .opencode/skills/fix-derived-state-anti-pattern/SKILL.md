---
name: fix-derived-state-anti-pattern
description: Use when refactoring React hooks that have Redundant State / Derived State Anti-Pattern — removing useState + useEffect that merely copy data from useQuery, and ensuring types stay on useQuery without using `any`.
---

# Fix Redundant State / Derived State Anti-Pattern in React Hooks

Use this skill when refactoring custom hooks that use `useState` + `useEffect` to copy data from `useQuery` into local state. This is an anti-pattern because the derived state is redundant — it can be computed directly from the query data.

## Anti-Pattern Detection

A hook has this anti-pattern when it contains ALL of these:

1. `useQuery` returns `data`
2. `useState` creates local state (e.g. `const [items, setItems] = useState(...)`)
3. `useEffect` watches `data` and copies it into the local state (e.g. `setItems(data)`)

### Example — BEFORE (Anti-Pattern)

```tsx
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const useGetData = () => {
  const [items, setItems] = useState<Item[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: Item[]
    meta: Meta
  }>({
    queryKey: ['items'],
    queryFn: () => AxiosClient.get('/items').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setItems(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { items, loading, meta }
}
```

### Example — AFTER (Fixed)

```tsx
import { useQuery } from '@tanstack/react-query'

const useGetData = () => {
  const { data, isLoading, isFetching } = useQuery<{
    data: Item[]
    meta: Meta
  }>({
    queryKey: ['items'],
    queryFn: () => AxiosClient.get('/items').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    items: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}
```

## Rules

1. **Remove `useState` + `useEffect`** that only copies query data into local state.
2. **Return data directly from `useQuery`** using optional chaining and defaults:
   - Lists: `data?.data ?? []`
   - Single objects: `data?.data` or `data?.data ?? undefined`
   - Meta: `data?.meta`
3. **Keep the type parameter on `useQuery<T>`** — do NOT use `any`. The type should be the API response shape, e.g. `useQuery<{ data: Item[]; meta: Meta }>`.
4. **Remove unused imports** (`useState`, `useEffect`) after refactoring.
5. **`loading = isLoading || isFetching`** is NOT an anti-pattern — it's a derived computation, not state. Keep it.
6. **`useMemo` for expensive transformations** (e.g. building UI arrays from data) is NOT an anti-pattern — keep it.

## Where to Apply

This pattern typically appears in custom hooks under `controller/`, `hooks/`, or similar directories that wrap `useQuery`. Search for files that:
- Import both `useState` AND `useQuery`
- Have a `useEffect` that calls a `setState` function

## Files to Check

Look in:
- `src/pages/modules/**/hooks/index.tsx`
- `src/pages/modules/**/controller/*.tsx`

## Verification

After refactoring:
1. Run TypeScript check: `npx tsc --noEmit`
2. Ensure no `any` types leaked into `useQuery` — the type parameter should be the full response shape
3. Ensure `useState` and `useEffect` imports are removed if no longer used
