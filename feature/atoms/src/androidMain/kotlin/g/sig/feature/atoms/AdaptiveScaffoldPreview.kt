package g.sig.feature.atoms

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import g.sig.designsystem.ui.theme.AppTheme
import g.sig.feature.atoms.adaptive.AdaptiveScaffold
import g.sig.feature.atoms.navigation.AdaptiveTopBar
import g.sig.feature.atoms.navigation.NavigationItem

@Composable
@Preview
private fun AdaptiveScaffoldPreview() {
    AdaptiveScaffold(
        topBar = {},
        bottomBar = {},
    ) {
        Text("Hello, World!")
    }
}

@Composable
@Preview
private fun AdaptiveTopBarPreview() {
    AppTheme {
        AdaptiveTopBar(
            modifier = Modifier.fillMaxWidth(),
            selectedRoute = "Home",
            navigationItems =
                listOf(
                    NavigationItem("Home", "Home"),
                    NavigationItem("About", "About"),
                    NavigationItem("Contact", "Contact"),
                ),
            onNavigationItemClick = {},
            onSearch = {},
        )
    }
}
