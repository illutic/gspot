---
slug: optimizing-compose
title: "Optimizing Compose Recomposition: Beyond the Basics"
subtitle: Stop relying on the compiler to fix your performance issues.
date: Sep 12, 2024
readTime: 8 min read
tag: Performance
author: Alex Mercer
featured: false
---

## Introduction

Jetpack Compose provides a powerful declarative layout paradigm, but unmanaged recomposition can lead to severe frame drops on lower-end devices.

## Key Strategies

- **Use `@Stable` and `@Immutable` annotations** on data classes passed into composables.
- **Prefer Lambda Parameters** over direct state values to delay reading state until the layout or draw phase.
- **Use `derivedStateOf`** for high-frequency state updates (e.g. scroll offsets).

```kotlin
val showScrollToTop by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}
```

By postponing state reads until layout time, you avoid triggering recompositions for entire parent containers.
