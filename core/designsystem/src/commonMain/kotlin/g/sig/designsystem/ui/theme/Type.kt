package g.sig.designsystem.ui.theme

import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

data class Type(
    val displayLarge: TextStyle,
    val displayMedium: TextStyle,
    val displaySmall: TextStyle,
    val headlineLarge: TextStyle,
    val headlineMedium: TextStyle,
    val headlineSmall: TextStyle,
    val titleLarge: TextStyle,
    val titleMedium: TextStyle,
    val titleSmall: TextStyle,
    val bodyLarge: TextStyle,
    val bodyMedium: TextStyle,
    val bodySmall: TextStyle,
    val labelLarge: TextStyle,
    val labelMedium: TextStyle,
    val labelSmall: TextStyle,
)

val AppTypography =
    Type(
        displayLarge =
            TextStyle(
                fontSize = 57.sp,
                lineHeight = 64.sp,
                letterSpacing = (-0.25).sp,
                fontWeight = FontWeight.Bold,
            ),
        displayMedium =
            TextStyle(
                fontSize = 45.sp,
                lineHeight = 52.sp,
                letterSpacing = 0.sp,
                fontWeight = FontWeight.Bold,
            ),
        displaySmall =
            TextStyle(
                fontSize = 36.sp,
                lineHeight = 44.sp,
                letterSpacing = 0.sp,
                fontWeight = FontWeight.Bold,
            ),
        headlineLarge =
            TextStyle(
                fontSize = 32.sp,
                lineHeight = 40.sp,
                letterSpacing = 0.sp,
                fontWeight = FontWeight.Bold,
            ),
        headlineMedium =
            TextStyle(
                fontSize = 28.sp,
                lineHeight = 36.sp,
                letterSpacing = 0.sp,
                fontWeight = FontWeight.Bold,
            ),
        headlineSmall =
            TextStyle(
                fontSize = 24.sp,
                lineHeight = 32.sp,
                letterSpacing = 0.sp,
                fontWeight = FontWeight.Bold,
            ),
        titleLarge =
            TextStyle(
                fontSize = 22.sp,
                lineHeight = 28.sp,
                letterSpacing = 0.sp,
                fontWeight = FontWeight.Bold,
            ),
        titleMedium =
            TextStyle(
                fontSize = 18.sp,
                lineHeight = 24.sp,
                letterSpacing = 0.15.sp,
                fontWeight = FontWeight.Bold,
            ),
        titleSmall =
            TextStyle(
                fontSize = 16.sp,
                lineHeight = 20.sp,
                letterSpacing = 0.1.sp,
                fontWeight = FontWeight.Bold,
            ),
        bodyLarge =
            TextStyle(
                fontSize = 16.sp,
                lineHeight = 24.sp,
                letterSpacing = 0.5.sp,
            ),
        bodyMedium =
            TextStyle(
                fontSize = 14.sp,
                lineHeight = 20.sp,
                letterSpacing = 0.25.sp,
            ),
        bodySmall =
            TextStyle(
                fontSize = 12.sp,
                lineHeight = 16.sp,
                letterSpacing = 0.4.sp,
            ),
        labelLarge =
            TextStyle(
                fontSize = 14.sp,
                lineHeight = 20.sp,
                letterSpacing = 0.1.sp,
                fontWeight = FontWeight.SemiBold,
            ),
        labelMedium =
            TextStyle(
                fontSize = 12.sp,
                lineHeight = 16.sp,
                letterSpacing = 0.5.sp,
                fontWeight = FontWeight.SemiBold,
            ),
        labelSmall =
            TextStyle(
                fontSize = 11.sp,
                lineHeight = 16.sp,
                letterSpacing = 0.5.sp,
                fontWeight = FontWeight.SemiBold,
            ),
    )
