package g.sig.feature.atoms.navigation

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.unit.dp
import g.sig.designsystem.ui.theme.Theme

data class NavigationItem(
    val title: String,
    val route: String,
    val icon: Painter? = null,
)

@Composable
internal fun NavigationItem(
    navigationItem: NavigationItem,
    onNavigationItemClick: (NavigationItem) -> Unit,
    modifier: Modifier = Modifier,
    isSelected: Boolean = false,
    showIcon: Boolean = true,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isHovered by interactionSource.collectIsHoveredAsState()
    val isHoveredOrSelected = isHovered || isSelected

    val textStyle =
        when {
            isSelected -> Theme.typography.titleSmall
            isHovered -> Theme.typography.titleSmall
            else -> Theme.typography.bodyMedium
        }

    val borderColor by
        when {
            isSelected -> Theme.colors.onSurface
            isHovered -> Theme.colors.onSurfaceVariant
            else -> Color.Unspecified
        }.animate()

    val iconBackgroundColor by
        when {
            isSelected -> Theme.colors.primaryContainer
            isHovered -> Theme.colors.secondaryContainer
            else -> Color.Transparent
        }.animate()

    val iconTint by
        when {
            isSelected -> Theme.colors.onPrimaryContainer
            isHovered -> Theme.colors.onSecondaryContainer
            else -> Theme.colors.onSurface
        }.animate()

    Column(
        modifier =
            modifier
                .width(IntrinsicSize.Max)
                .clickable(
                    indication = null,
                    interactionSource = interactionSource,
                ) {
                    onNavigationItemClick(navigationItem)
                },
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(Theme.dimens.extraSmall),
    ) {
        if (navigationItem.icon != null && showIcon) {
            Box(
                modifier =
                    Modifier.background(
                        color = iconBackgroundColor,
                        shape = CircleShape,
                    ),
            ) {
                Icon(
                    modifier =
                        Modifier
                            .padding(Theme.dimens.extraSmall)
                            .padding(horizontal = Theme.dimens.small),
                    painter = navigationItem.icon,
                    contentDescription = null,
                    tint = iconTint,
                )
            }
        } else {
            Text(
                text = navigationItem.title,
                color = Theme.colors.onSurface,
                style = textStyle,
            )
            HorizontalDivider(
                modifier =
                    Modifier
                        .animateContentSize(Theme.animation.getContentTransition())
                        .fillMaxWidth(if (isHoveredOrSelected) 1f else 0f),
                color = borderColor,
                thickness = 2.dp,
            )
        }
    }
}

@Composable
private inline fun Color.animate() = animateColorAsState(this, Theme.animation.getContentTransition())
