package g.sig.feature.atoms.input

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.semantics.error
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import g.sig.designsystem.ui.theme.Theme

@Composable
internal fun BasicTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    minTextFieldWidth: Dp = 0.dp,
    placeholder: String? = null,
    errorEnabled: Boolean = false,
    errorMessage: String? = null,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    visualTransformation: VisualTransformation = VisualTransformation.None,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    textStyle: TextStyle = Theme.typography.bodyLarge,
    leadingContent: @Composable (() -> Unit)? = null,
    trailingContent: @Composable (() -> Unit)? = null,
    contentPadding: PaddingValues = PaddingValues(Theme.dimens.small),
) {
    val isFocused by interactionSource.collectIsFocusedAsState()
    val isActive = isFocused || value.isNotEmpty()
    val contentColor =
        when {
            errorEnabled -> Theme.colors.error
            isActive -> Theme.colors.onSurfaceVariant
            else -> Theme.colors.onSurface
        }

    CompositionLocalProvider(
        LocalContentColor provides contentColor,
    ) {
        BasicTextField(
            modifier =
                modifier
                    .width(IntrinsicSize.Max)
                    .animateContentSize(Theme.animation.getContentTransition())
                    .semantics {
                        if (errorEnabled && errorMessage != null) {
                            error(errorMessage)
                        }
                    },
            value = value,
            onValueChange = onValueChange,
            maxLines = 1,
            textStyle = textStyle.copy(contentColor),
            cursorBrush = SolidColor(contentColor),
            visualTransformation = visualTransformation,
            interactionSource = interactionSource,
            keyboardOptions = keyboardOptions,
            keyboardActions = KeyboardActions.Default,
            decorationBox = { innerTextField ->
                Row(
                    modifier =
                        Modifier
                            .heightIn(min = 48.dp)
                            .clip(CircleShape)
                            .background(Theme.colors.surfaceVariant)
                            .then(
                                if (errorEnabled) {
                                    Modifier
                                        .background(Theme.colors.errorContainer)
                                        .border(1.dp, Theme.colors.error, Theme.shapes.circle)
                                } else {
                                    Modifier
                                },
                            ).padding(contentPadding),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(Theme.dimens.small),
                ) {
                    leadingContent?.invoke()

                    Box(
                        modifier =
                            Modifier
                                .widthIn(min = minTextFieldWidth)
                                .weight(1f),
                    ) {
                        innerTextField()
                        if (value.isEmpty()) {
                            val message = errorMessage ?: placeholder
                            Text(
                                text = message.orEmpty(),
                                style = textStyle,
                                color = contentColor,
                                maxLines = 1,
                            )
                        }
                    }
                    trailingContent?.invoke()
                }
            },
        )
    }
}
