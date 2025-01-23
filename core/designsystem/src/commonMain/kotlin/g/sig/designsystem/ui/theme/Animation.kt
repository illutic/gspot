package g.sig.designsystem.ui.theme

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring

data object Animation {
    fun <T> getContentTransition() =
        spring<T>(
            dampingRatio = Spring.DampingRatioLowBouncy,
            stiffness = Spring.StiffnessLow,
        )

    fun <T> getScreenTransition() =
        spring<T>(
            dampingRatio = Spring.DampingRatioNoBouncy,
            stiffness = Spring.StiffnessHigh,
        )
}
