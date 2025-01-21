package g.sig.designsystem.ui.theme

import androidx.compose.ui.graphics.Color

val primaryLight = Color(0xFF6F5D0E)
val onPrimaryLight = Color(0xFFFFFFFF)
val primaryContainerLight = Color(0xFFFBE187)
val onPrimaryContainerLight = Color(0xFF221B00)
val secondaryLight = Color(0xFF00696C)
val onSecondaryLight = Color(0xFFFFFFFF)
val secondaryContainerLight = Color(0xFF9CF1F3)
val onSecondaryContainerLight = Color(0xFF002021)
val tertiaryLight = Color(0xFF44664D)
val onTertiaryLight = Color(0xFFFFFFFF)
val tertiaryContainerLight = Color(0xFFC6ECCD)
val onTertiaryContainerLight = Color(0xFF00210E)
val errorLight = Color(0xFFBA1A1A)
val onErrorLight = Color(0xFFFFFFFF)
val errorContainerLight = Color(0xFFFFDAD6)
val onErrorContainerLight = Color(0xFF410002)
val backgroundLight = Color(0xFFFFF9EF)
val onBackgroundLight = Color(0xFF1E1B13)
val surfaceLight = Color(0xFFF5FAFB)
val onSurfaceLight = Color(0xFF171D1E)
val surfaceVariantLight = Color(0xFFE3E4D3)
val onSurfaceVariantLight = Color(0xFF46483C)
val outlineLight = Color(0xFF76786B)
val outlineVariantLight = Color(0xFFC7C8B8)
val scrimLight = Color(0xFF000000)
val inverseSurfaceLight = Color(0xFF2B3133)
val inverseOnSurfaceLight = Color(0xFFECF2F3)
val inversePrimaryLight = Color(0xFFDDC56E)
val surfaceDimLight = Color(0xFFD5DBDC)
val surfaceBrightLight = Color(0xFFF5FAFB)
val surfaceContainerLowestLight = Color(0xFFFFFFFF)
val surfaceContainerLowLight = Color(0xFFEFF5F6)
val surfaceContainerLight = Color(0xFFE9EFF0)
val surfaceContainerHighLight = Color(0xFFE3E9EA)
val surfaceContainerHighestLight = Color(0xFFDEE3E5)

val primaryDark = Color(0xFFDDC56E)
val onPrimaryDark = Color(0xFF3A3000)
val primaryContainerDark = Color(0xFF544600)
val onPrimaryContainerDark = Color(0xFFFBE187)
val secondaryDark = Color(0xFF80D4D6)
val onSecondaryDark = Color(0xFF003738)
val secondaryContainerDark = Color(0xFF004F51)
val onSecondaryContainerDark = Color(0xFF9CF1F3)
val tertiaryDark = Color(0xFFAAD0B1)
val onTertiaryDark = Color(0xFF163722)
val tertiaryContainerDark = Color(0xFF2D4E37)
val onTertiaryContainerDark = Color(0xFFC6ECCD)
val errorDark = Color(0xFFFFB4AB)
val onErrorDark = Color(0xFF690005)
val errorContainerDark = Color(0xFF93000A)
val onErrorContainerDark = Color(0xFFFFDAD6)
val backgroundDark = Color(0xFF16130B)
val onBackgroundDark = Color(0xFFE9E2D4)
val surfaceDark = Color(0xFF0E1415)
val onSurfaceDark = Color(0xFFDEE3E5)
val surfaceVariantDark = Color(0xFF46483C)
val onSurfaceVariantDark = Color(0xFFC7C8B8)
val outlineDark = Color(0xFF909283)
val outlineVariantDark = Color(0xFF46483C)
val scrimDark = Color(0xFF000000)
val inverseSurfaceDark = Color(0xFFDEE3E5)
val inverseOnSurfaceDark = Color(0xFF2B3133)
val inversePrimaryDark = Color(0xFF6F5D0E)
val surfaceDimDark = Color(0xFF0E1415)
val surfaceBrightDark = Color(0xFF343A3B)
val surfaceContainerLowestDark = Color(0xFF090F10)
val surfaceContainerLowDark = Color(0xFF171D1E)
val surfaceContainerDark = Color(0xFF1B2122)
val surfaceContainerHighDark = Color(0xFF252B2C)
val surfaceContainerHighestDark = Color(0xFF303637)

data class ColorScheme(
    val primary: Color,
    val onPrimary: Color,
    val primaryContainer: Color,
    val onPrimaryContainer: Color,
    val secondary: Color,
    val onSecondary: Color,
    val secondaryContainer: Color,
    val onSecondaryContainer: Color,
    val tertiary: Color,
    val onTertiary: Color,
    val tertiaryContainer: Color,
    val onTertiaryContainer: Color,
    val error: Color,
    val onError: Color,
    val errorContainer: Color,
    val onErrorContainer: Color,
    val background: Color,
    val onBackground: Color,
    val surface: Color,
    val onSurface: Color,
    val surfaceVariant: Color,
    val onSurfaceVariant: Color,
    val outline: Color,
    val outlineVariant: Color,
    val scrim: Color,
    val inverseSurface: Color,
    val inverseOnSurface: Color,
    val inversePrimary: Color,
    val surfaceDim: Color,
    val surfaceBright: Color,
    val surfaceContainerLowest: Color,
    val surfaceContainerLow: Color,
    val surfaceContainer: Color,
    val surfaceContainerHigh: Color,
    val surfaceContainerHighest: Color,
)

fun lightColorScheme() =
    ColorScheme(
        primary = primaryLight,
        onPrimary = onPrimaryLight,
        primaryContainer = primaryContainerLight,
        onPrimaryContainer = onPrimaryContainerLight,
        secondary = secondaryLight,
        onSecondary = onSecondaryLight,
        secondaryContainer = secondaryContainerLight,
        onSecondaryContainer = onSecondaryContainerLight,
        tertiary = tertiaryLight,
        onTertiary = onTertiaryLight,
        tertiaryContainer = tertiaryContainerLight,
        onTertiaryContainer = onTertiaryContainerLight,
        error = errorLight,
        onError = onErrorLight,
        errorContainer = errorContainerLight,
        onErrorContainer = onErrorContainerLight,
        background = backgroundLight,
        onBackground = onBackgroundLight,
        surface = surfaceLight,
        onSurface = onSurfaceLight,
        surfaceVariant = surfaceVariantLight,
        onSurfaceVariant = onSurfaceVariantLight,
        outline = outlineLight,
        outlineVariant = outlineVariantLight,
        scrim = scrimLight,
        inverseSurface = inverseSurfaceLight,
        inverseOnSurface = inverseOnSurfaceLight,
        inversePrimary = inversePrimaryLight,
        surfaceDim = surfaceDimLight,
        surfaceBright = surfaceBrightLight,
        surfaceContainerLowest = surfaceContainerLowestLight,
        surfaceContainerLow = surfaceContainerLowLight,
        surfaceContainer = surfaceContainerLight,
        surfaceContainerHigh = surfaceContainerHighLight,
        surfaceContainerHighest = surfaceContainerHighestLight,
    )

fun darkColorScheme() =
    ColorScheme(
        primary = primaryDark,
        onPrimary = onPrimaryDark,
        primaryContainer = primaryContainerDark,
        onPrimaryContainer = onPrimaryContainerDark,
        secondary = secondaryDark,
        onSecondary = onSecondaryDark,
        secondaryContainer = secondaryContainerDark,
        onSecondaryContainer = onSecondaryContainerDark,
        tertiary = tertiaryDark,
        onTertiary = onTertiaryDark,
        tertiaryContainer = tertiaryContainerDark,
        onTertiaryContainer = onTertiaryContainerDark,
        error = errorDark,
        onError = onErrorDark,
        errorContainer = errorContainerDark,
        onErrorContainer = onErrorContainerDark,
        background = backgroundDark,
        onBackground = onBackgroundDark,
        surface = surfaceDark,
        onSurface = onSurfaceDark,
        surfaceVariant = surfaceVariantDark,
        onSurfaceVariant = onSurfaceVariantDark,
        outline = outlineDark,
        outlineVariant = outlineVariantDark,
        scrim = scrimDark,
        inverseSurface = inverseSurfaceDark,
        inverseOnSurface = inverseOnSurfaceDark,
        inversePrimary = inversePrimaryDark,
        surfaceDim = surfaceDimDark,
        surfaceBright = surfaceBrightDark,
        surfaceContainerLowest = surfaceContainerLowestDark,
        surfaceContainerLow = surfaceContainerLowDark,
        surfaceContainer = surfaceContainerDark,
        surfaceContainerHigh = surfaceContainerHighDark,
        surfaceContainerHighest = surfaceContainerHighestDark,
    )
