package g.sig.feature.atoms.action

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonColors
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import g.sig.designsystem.ui.theme.Theme

@Composable
fun AppIconButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: IconButtonColors =
        IconButtonDefaults.iconButtonColors(
            containerColor = Theme.colors.surfaceVariant,
            contentColor = Theme.colors.onSurfaceVariant,
        ),
    interactionSource: MutableInteractionSource? = null,
    icon: @Composable () -> Unit,
) {
    IconButton(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        colors = colors,
        interactionSource = interactionSource,
        content = icon,
    )
}
