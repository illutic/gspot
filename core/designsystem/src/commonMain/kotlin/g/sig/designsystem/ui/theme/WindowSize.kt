@file:Suppress("ktlint:compose:compositionlocal-allowlist")

package g.sig.designsystem.ui.theme

import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp

internal val DesktopSize = DpSize(1280.dp, 720.dp)
internal val MobileSize = DpSize(360.dp, 640.dp)

enum class WindowSize {
    Desktop,
    Tablet,
    Mobile,
}
