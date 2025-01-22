package g.sig.designsystem.ui.theme

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

data class Dimens(
    val extraSmall: Dp,
    val small: Dp,
    val medium: Dp,
    val large: Dp,
    val extraLarge: Dp,
    val desktopScreenPadding: Dp,
    val tabletScreenPadding: Dp,
    val mobileScreenPadding: Dp,
)

val AppDimens =
    Dimens(
        extraSmall = 4.dp,
        small = 8.dp,
        medium = 16.dp,
        large = 24.dp,
        extraLarge = 32.dp,
        desktopScreenPadding = 160.dp,
        tabletScreenPadding = 80.dp,
        mobileScreenPadding = 16.dp,
    )
