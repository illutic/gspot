---
title: Δημιουργία Ισχυρών Android Οικοσυστημάτων
subtitle: Ειδικεύομαι σε καθαρή αρχιτεκτονική, Jetpack Compose και Kotlin. Υλοποιώ υψηλής απόδοσης native εφαρμογές με αποδεδειγμένη εμπειρία σε LLM integration, CI/CD βελτιστοποίηση και ηγεσία σύνθετων μετεγγραφών.
yearsExp: 5+
appsShipped: 4
recognition: BSc Πληροφορική
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

Δημιουργία υψηλής απόδοσης mobile εμπειριών σε fintech, e-commerce και ψυχαγωγία πτήσεων — Portsmouth, UK.
