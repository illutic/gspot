package g.sig.feature.atoms.input

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import g.sig.designsystem.ui.theme.Theme
import g.sig.feature.atoms.action.AppButton
import g.sig.feature.atoms.action.AppIconButton
import gsig.core.designsystem.generated.resources.Res
import gsig.core.designsystem.generated.resources.search
import org.jetbrains.compose.resources.stringResource

private val ExpandedSearchSize = 200.dp

private val SearchContentPadding
    @Composable get() =
        PaddingValues(
            top = Theme.dimens.extraSmall,
            bottom = Theme.dimens.extraSmall,
            start = Theme.dimens.medium,
            end = Theme.dimens.small,
        )

@Composable
fun SearchAtom(
    onSearch: (String) -> Unit,
    searchHint: String,
    modifier: Modifier = Modifier,
    expanded: Boolean = false,
) {
    var searchValue by rememberSaveable { mutableStateOf("") }
    var isExpanded by rememberSaveable { mutableStateOf(expanded) }
    val isActive by remember { derivedStateOf { isExpanded || searchValue.isNotEmpty() } }

    AnimatedContent(
        modifier = modifier,
        targetState = isActive,
        transitionSpec = {
            fadeIn() togetherWith fadeOut()
        },
    ) { active ->
        if (active) {
            BasicTextField(
                value = searchValue,
                minTextFieldWidth = ExpandedSearchSize,
                onValueChange = { searchValue = it },
                placeholder = searchHint,
                leadingContent = {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = "Search",
                    )
                },
                trailingContent = {
                    Row {
                        if (searchValue.isNotEmpty()) {
                            AppIconButton(
                                onClick = { searchValue = "" },
                                modifier = Modifier.padding(end = Theme.dimens.small),
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Clear,
                                    contentDescription = "Clear search",
                                )
                            }
                        }
                        SearchButton(
                            onClick = {
                                onSearch(searchValue)
                            },
                        )
                    }
                },
                contentPadding = SearchContentPadding,
            )
        } else {
            AppIconButton(
                onClick = { isExpanded = true },
            ) {
                Icon(
                    imageVector = Icons.Default.Search,
                    contentDescription = "Search",
                )
            }
        }
    }
}

@Composable
private fun SearchButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    AppButton(
        onClick = onClick,
        modifier = modifier,
    ) {
        Text(text = stringResource(Res.string.search), maxLines = 1)
    }
}
