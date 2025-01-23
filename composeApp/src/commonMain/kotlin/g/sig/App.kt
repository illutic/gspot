package g.sig

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import g.sig.designsystem.ui.theme.AppTheme
import g.sig.feature.atoms.navigation.AdaptiveBottomBar
import g.sig.feature.atoms.navigation.AdaptiveTopBar
import g.sig.feature.atoms.navigation.NavigationItem

@Composable
fun App() {
    AppTheme {
        AdaptiveTopBarPreview()
    }
}

@Composable
private fun AdaptiveTopBarPreview() {
    var selectedRoute by remember { mutableStateOf("Home") }
    val items =
        listOf(
            NavigationItem("Home", "Home", rememberVectorPainter(Icons.Default.Home)),
            NavigationItem("About", "About", rememberVectorPainter(Icons.Default.Info)),
            NavigationItem("Contact", "Contact", rememberVectorPainter(Icons.Default.Call)),
        )

    AppTheme {
        Column {
            AdaptiveTopBar(
                modifier = Modifier.fillMaxWidth(),
                selectedRoute = selectedRoute,
                navigationItems = items,
                onNavigationItemClick = {
                    selectedRoute = it.route
                },
                onSearch = {},
            )
            Spacer(modifier = Modifier.weight(1f))

            AdaptiveBottomBar(
                selectedRoute = selectedRoute,
                navigationItems = items,
                onNavigationItemClick = {
                    selectedRoute = it.route
                },
            )
        }
    }
}
