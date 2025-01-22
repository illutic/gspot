package g.sig.feature.atoms.adaptive

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import g.sig.designsystem.ui.theme.LocalWindowSize
import g.sig.designsystem.ui.theme.Theme
import g.sig.designsystem.ui.theme.WindowSize

@Composable
fun AdaptiveScaffold(
    topBar: @Composable () -> Unit,
    bottomBar: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    val screenPadding =
        when (LocalWindowSize.current) {
            WindowSize.Desktop ->
                PaddingValues(
                    horizontal = Theme.dimens.desktopScreenPadding,
                    vertical = Theme.dimens.large,
                )

            WindowSize.Tablet ->
                PaddingValues(
                    horizontal = Theme.dimens.tabletScreenPadding,
                    vertical = Theme.dimens.medium,
                )

            else ->
                PaddingValues(
                    horizontal = Theme.dimens.mobileScreenPadding,
                    vertical = Theme.dimens.small,
                )
        }

    Scaffold(
        modifier = modifier,
        topBar = topBar,
        bottomBar = bottomBar,
    ) {
        Box(
            Modifier
                .padding(it)
                .padding(screenPadding),
        ) {
            content()
        }
    }
}
