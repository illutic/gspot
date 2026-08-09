---
title: Engineering Robust Android Ecosystems
subtitle: Specializing in clean architecture, Jetpack Compose, and Kotlin. Delivering high-performance native apps with a proven track record in LLM integration, CI/CD optimization, and leading complex rewrites.
yearsExp: 5+
appsShipped: 4
recognition: BSc Computer Science
badges: [Kotlin, Jetpack Compose, Coroutines, Hilt, MVI]
snippetTitle: ChatViewModel.kt
snippetCode: |
  @HiltViewModel
  class ChatViewModel @Inject constructor(
    private val llm: LlmRepository
  ) : ViewModel() {

    val messages = llm
      .streamResponse()
      .map { it.toUiMessage() }
      .stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5_000),
        emptyList()
      )
  }
---

Building high-impact mobile experiences across fintech, e-commerce, and inflight entertainment — Portsmouth, UK.
