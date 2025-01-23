package g.sig.feature.atoms.navigation

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import g.sig.designsystem.ui.theme.LocalWindowSize
import g.sig.designsystem.ui.theme.Theme
import g.sig.designsystem.ui.theme.WindowSize
import g.sig.feature.atoms.input.SearchComponent
import gsig.core.designsystem.generated.resources.Res
import gsig.core.designsystem.generated.resources.app_name
import gsig.core.designsystem.generated.resources.search
import org.jetbrains.compose.resources.stringResource

@Composable
fun AdaptiveTopBar(
    selectedRoute: String,
    navigationItems: List<NavigationItem>,
    onNavigationItemClick: (NavigationItem) -> Unit,
    onSearch: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    val isDesktop = LocalWindowSize.current == WindowSize.Desktop
    Column(
        modifier.background(Theme.colors.background),
    ) {
        if (isDesktop) {
            DesktopTopBar(
                selectedRoute = selectedRoute,
                navigationItems = navigationItems,
                onNavigationItemClick = onNavigationItemClick,
                onSearch = onSearch,
                modifier = Modifier.fillMaxWidth(),
            )
        } else {
            MobileTopBar(
                onSearch = onSearch,
                modifier = Modifier.fillMaxWidth(),
            )
        }

        HorizontalDivider(color = Theme.colors.onBackground)
    }
}

@Composable
private fun MobileTopBar(
    onSearch: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(
            text = stringResource(Res.string.app_name),
            style = Theme.typography.titleMedium,
            color = Theme.colors.onBackground,
            modifier = Modifier.padding(Theme.dimens.small),
        )

        SearchComponent(
            onSearch = onSearch,
            searchHint = stringResource(Res.string.search),
            modifier =
                Modifier
                    .weight(1f, false)
                    .padding(Theme.dimens.small),
        )
    }
}

@Composable
private fun DesktopTopBar(
    selectedRoute: String,
    navigationItems: List<NavigationItem>,
    onNavigationItemClick: (NavigationItem) -> Unit,
    onSearch: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(
            text = stringResource(Res.string.app_name),
            style = Theme.typography.titleMedium,
            color = Theme.colors.onBackground,
            modifier = Modifier.padding(Theme.dimens.small),
        )

        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(Theme.dimens.extraLarge),
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(Theme.dimens.small),
            ) {
                navigationItems.forEach { navigationItem ->
                    NavigationItem(
                        navigationItem = navigationItem,
                        onNavigationItemClick = onNavigationItemClick,
                        modifier = Modifier,
                        isSelected = selectedRoute == navigationItem.route,
                    )
                }
            }
            SearchComponent(
                onSearch = onSearch,
                searchHint = stringResource(Res.string.search),
                modifier = Modifier.padding(Theme.dimens.small),
            )
        }
    }
}
