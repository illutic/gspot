@file:Suppress("ktlint:compose:compositionlocal-allowlist")

package g.sig.designsystem.ui.theme

import androidx.compose.foundation.Indication
import androidx.compose.foundation.LocalIndication
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.Modifier

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

    val dimens: Dimens
        @Composable @ReadOnlyComposable
        get() = LocalDimens.current

    val animation: Animation
        @Composable @ReadOnlyComposable
        get() = LocalAnimation.current
}

val LocalColors = staticCompositionLocalOf { lightColorScheme() }

val LocalTypography = staticCompositionLocalOf { AppTypography }

val LocalShapes = staticCompositionLocalOf { AppShapes }

val LocalDimens = staticCompositionLocalOf { AppDimens }

val LocalAnimation = staticCompositionLocalOf { Animation }

val LocalWindowSize = staticCompositionLocalOf { WindowSize.Mobile }

private val NoIndication = object : Indication {}

@Composable
fun AppTheme(
    modifier: Modifier = Modifier,
    colors: ColorScheme = if (isSystemInDarkTheme()) darkColorScheme() else lightColorScheme(),
    typography: Type = Theme.typography,
    shapes: Shapes = Theme.shapes,
    animations: Animation = Theme.animation,
    content: @Composable () -> Unit,
) {
    BoxWithConstraints(modifier) {
        val isDesktop = maxWidth >= DesktopSize.width && maxHeight >= DesktopSize.height
        val isTablet = maxWidth >= MobileSize.width && maxHeight >= MobileSize.height

        val windowSize =
            when {
                isDesktop -> WindowSize.Desktop
                isTablet -> WindowSize.Tablet
                else -> WindowSize.Mobile
            }

        CompositionLocalProvider(
            LocalWindowSize provides windowSize,
            LocalAnimation provides animations,
            LocalColors provides colors,
            LocalIndication provides NoIndication,
            LocalShapes provides shapes,
            LocalTypography provides typography,
        ) {
            content()
        }
    }
}
