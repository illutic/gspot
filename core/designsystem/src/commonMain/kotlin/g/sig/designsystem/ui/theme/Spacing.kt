package g.sig.designsystem.ui.theme

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

data class Spacing(
    val extraSmall: Dp,
    val small: Dp,
    val medium: Dp,
    val large: Dp,
    val extraLarge: Dp,
)

val AppSpacing =
    Spacing(
        extraSmall = 4.dp,
        small = 8.dp,
        medium = 16.dp,
        large = 24.dp,
        extraLarge = 32.dp,
    )
