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
        extraSmall = RoundedCornerShape(AppDimens.extraSmall),
        small = RoundedCornerShape(AppDimens.small),
        medium = RoundedCornerShape(AppDimens.medium),
        large = RoundedCornerShape(AppDimens.large),
        extraLarge = RoundedCornerShape(AppDimens.extraLarge),
        circle = CircleShape,
    )
