---
slug: optimizing-compose
title: "Βελτιστοποίηση Recomposition στο Compose: Πέρα από τα Βασικά"
subtitle: Σταματήστε να βασίζεστε στον compiler για να διορθώσει τα performance προβλήματά σας.
date: Sep 12, 2024
readTime: 8 λεπτά ανάγνωσης
tag: Performance
author: George Sigalas
featured: false
---

## Εισαγωγή

Το Jetpack Compose παρέχει ένα ισχυρό declarative layout paradigm, αλλά η ανεξέλεγκτη recomposition μπορεί να οδηγήσει σε σοβαρές πτώσεις frame rate σε χαμηλής ισχύος συσκευές.

## Βασικές Στρατηγικές

- **Χρησιμοποιήστε annotations `@Stable` και `@Immutable`** σε data classes που περνούν σε composables.
- **Προτιμήστε Lambda Parameters** αντί για άμεσες τιμές κατάστασης για αναβολή ανάγνωσης κατάστασης έως τη φάση layout ή draw.
- **Χρησιμοποιήστε `derivedStateOf`** για συχνά ενημερούμενες καταστάσεις (π.χ. scroll offsets).

```kotlin
val showScrollToTop by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}
```

Αναβάλλοντας τις αναγνώσεις κατάστασης έως το χρόνο layout, αποφεύγετε την ενεργοποίηση recompositions για ολόκληρα γονικά containers.
