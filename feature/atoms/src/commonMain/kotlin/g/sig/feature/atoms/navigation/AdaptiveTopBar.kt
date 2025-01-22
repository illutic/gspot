package g.sig.feature.atoms.navigation

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import g.sig.designsystem.ui.theme.LocalWindowSize
import g.sig.designsystem.ui.theme.Theme
import g.sig.designsystem.ui.theme.WindowSize
import g.sig.feature.atoms.input.SearchAtom
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

    if (isDesktop) {
        DesktopTopBar(
            selectedRoute = selectedRoute,
            navigationItems = navigationItems,
            onNavigationItemClick = onNavigationItemClick,
            onSearch = onSearch,
            modifier = modifier,
        )
    } else {
        MobileTopBar(
            onSearch = onSearch,
            modifier = modifier,
        )
    }
}

@Composable
private fun MobileTopBar(
    onSearch: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier.background(Theme.colors.surface),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(
            text = stringResource(Res.string.app_name),
            style = Theme.typography.titleMedium,
            color = Theme.colors.onSurface,
        )

        SearchAtom(
            onSearch = onSearch,
            searchHint = stringResource(Res.string.search),
            modifier = Modifier,
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
        modifier = modifier.background(Theme.colors.surface),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(
            text = stringResource(Res.string.app_name),
            style = Theme.typography.titleMedium,
            color = Theme.colors.onSurface,
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
                    TopBarNavigationItem(
                        navigationItem = navigationItem,
                        onNavigationItemClick = onNavigationItemClick,
                        modifier = Modifier,
                        isSelected = selectedRoute == navigationItem.route,
                    )
                }
            }
            SearchAtom(
                onSearch = onSearch,
                searchHint = stringResource(Res.string.search),
            )
        }
    }
}

@Composable
private fun TopBarNavigationItem(
    navigationItem: NavigationItem,
    onNavigationItemClick: (NavigationItem) -> Unit,
    modifier: Modifier = Modifier,
    isSelected: Boolean = false,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isHovered by interactionSource.collectIsHoveredAsState()

    val textStyle =
        when {
            isSelected -> Theme.typography.titleSmall
            isHovered -> Theme.typography.titleSmall
            else -> Theme.typography.bodyMedium
        }

    val borderColor =
        when {
            isSelected -> Theme.colors.onSurface
            isHovered -> Theme.colors.onSurfaceVariant
            else -> Color.Unspecified
        }

    Box(
        modifier =
            modifier
                .width(IntrinsicSize.Max)
                .clickable(
                    indication = null,
                    interactionSource = interactionSource,
                ) {
                    onNavigationItemClick(navigationItem)
                },
        contentAlignment = Alignment.Center,
    ) {
        Text(
            text = navigationItem.title,
            color = Theme.colors.onSurface,
            style = textStyle,
        )
        Spacer(modifier = Modifier.height(Theme.dimens.extraSmall))
        HorizontalDivider(
            modifier =
                Modifier
                    .fillMaxWidth()
                    .align(Alignment.BottomCenter),
            color = borderColor,
            thickness = 2.dp,
        )
    }
}
