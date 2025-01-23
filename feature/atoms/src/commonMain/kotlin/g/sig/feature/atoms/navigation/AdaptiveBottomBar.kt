package g.sig.feature.atoms.navigation

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import g.sig.designsystem.ui.theme.LocalWindowSize
import g.sig.designsystem.ui.theme.Theme
import g.sig.designsystem.ui.theme.WindowSize
import gsig.core.designsystem.generated.resources.Res
import gsig.core.designsystem.generated.resources.app_name
import org.jetbrains.compose.resources.stringResource

@Composable
fun AdaptiveBottomBar(
    selectedRoute: String,
    navigationItems: List<NavigationItem>,
    onNavigationItemClick: (NavigationItem) -> Unit,
    modifier: Modifier = Modifier,
) {
    val isDesktop = LocalWindowSize.current == WindowSize.Desktop

    Column(
        modifier.background(Theme.colors.background),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        HorizontalDivider(color = Theme.colors.onBackground)

        Spacer(modifier = Modifier.height(Theme.dimens.small))

        if (isDesktop) {
            DesktopBottomBar(
                selectedRoute = selectedRoute,
                navigationItems = navigationItems,
                onNavigationItemClick = onNavigationItemClick,
                modifier =
                    Modifier
                        .padding(Theme.dimens.large)
                        .fillMaxWidth(),
            )
        } else {
            MobileBottomBar(
                selectedRoute = selectedRoute,
                navigationItems = navigationItems,
                onNavigationItemClick = onNavigationItemClick,
                modifier =
                    Modifier
                        .padding(Theme.dimens.small)
                        .fillMaxWidth(),
            )
        }

        Spacer(modifier = Modifier.height(Theme.dimens.small))
    }
}

@Composable
private fun MobileBottomBar(
    navigationItems: List<NavigationItem>,
    onNavigationItemClick: (NavigationItem) -> Unit,
    selectedRoute: String,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceEvenly,
    ) {
        navigationItems.forEach { navigationItem ->
            NavigationItem(
                navigationItem = navigationItem,
                onNavigationItemClick = onNavigationItemClick,
                isSelected = selectedRoute == navigationItem.route,
            )
        }
    }
}

@Composable
private fun DesktopBottomBar(
    selectedRoute: String,
    navigationItems: List<NavigationItem>,
    onNavigationItemClick: (NavigationItem) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceEvenly,
    ) {
        navigationItems.forEach { navigationItem ->
            NavigationItem(
                navigationItem = navigationItem,
                onNavigationItemClick = onNavigationItemClick,
                isSelected = selectedRoute == navigationItem.route,
                showIcon = false,
            )
        }
    }

    Text(
        text = stringResource(Res.string.app_name),
        style = Theme.typography.titleMedium,
        color = Theme.colors.onBackground,
        modifier = Modifier.padding(Theme.dimens.small),
    )
}
