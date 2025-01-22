package g.sig.feature.atoms.navigation

import androidx.compose.ui.graphics.painter.Painter

data class NavigationItem(
    val title: String,
    val route: String,
    val icon: Painter? = null,
)
