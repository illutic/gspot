package g.sig.designsystem.ui.theme

import androidx.compose.foundation.Indication
import androidx.compose.foundation.LocalIndication
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.ContentAlpha
import androidx.compose.material.LocalContentAlpha
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf

data object Theme {
    val colors: ColorScheme
        @Composable @ReadOnlyComposable
        get() = LocalColors.current

    val typography: Type
        @Composable @ReadOnlyComposable
        get() = LocalTypography.current

    val shapes: Shapes
        @Composable @ReadOnlyComposable
        get() = LocalShapes.current

    val spacing: Spacing
        @Composable @ReadOnlyComposable
        get() = LocalSpacing.current
}

val LocalColors = staticCompositionLocalOf { lightColorScheme() }

val LocalTypography = staticCompositionLocalOf { AppTypography }

val LocalShapes = staticCompositionLocalOf { AppShapes }

val LocalSpacing = staticCompositionLocalOf { AppSpacing }

private val NoIndication = object : Indication {}

@Composable
fun AppTheme(
    colors: ColorScheme = if (isSystemInDarkTheme()) lightColorScheme() else darkColorScheme(),
    typography: Type = Theme.typography,
    shapes: Shapes = Theme.shapes,
    content: @Composable () -> Unit,
) {
    CompositionLocalProvider(
        LocalColors provides colors,
        LocalContentAlpha provides ContentAlpha.high,
        LocalIndication provides NoIndication,
        LocalShapes provides shapes,
        LocalTypography provides typography,
    ) {
        content()
    }
}
