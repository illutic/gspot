package g.sig.designsystem.ui.theme

import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.graphics.Shape

data class Shapes(
    val extraSmall: Shape,
    val small: Shape,
    val medium: Shape,
    val large: Shape,
    val extraLarge: Shape,
    val circle: Shape,
)

val AppShapes =
    Shapes(
        extraSmall = RoundedCornerShape(AppSpacing.extraSmall),
        small = RoundedCornerShape(AppSpacing.small),
        medium = RoundedCornerShape(AppSpacing.medium),
        large = RoundedCornerShape(AppSpacing.large),
        extraLarge = RoundedCornerShape(AppSpacing.extraLarge),
        circle = CircleShape,
    )
