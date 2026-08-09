---
title: Engineering Robust Android Ecosystems
subtitle: Specializing in clean architecture, Jetpack Compose, and Kotlin. Delivering high-performance native apps with a proven track record in LLM integration, CI/CD optimization, and leading complex rewrites.
yearsExp: 5+
appsShipped: 4
recognition: BSc Computer Science
badges: [Kotlin, Jetpack Compose, Coroutines, Hilt, MVI]
snippetTitle: AiChatbot.kt
snippetCode: |
  @Composable
  fun ChatScreen(
    viewModel: ChatViewModel = hiltViewModel()
  ) {
    val state by viewModel
      .uiState
      .collectAsStateWithLifecycle()
    // 60% network improvement ✓
  }
---

Building high-impact mobile experiences across fintech, e-commerce, and inflight entertainment — Portsmouth, UK.
