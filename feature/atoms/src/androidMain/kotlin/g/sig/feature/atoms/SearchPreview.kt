package g.sig.feature.atoms

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import g.sig.designsystem.ui.theme.AppTheme
import g.sig.feature.atoms.input.SearchComponent

@Composable
@Preview
private fun SearchPreview() {
    AppTheme {
        SearchComponent(
            onSearch = {},
            searchHint = "Search",
        )
    }
}

@Composable
@Preview
private fun ExpandedSearchPreview() {
    AppTheme {
        SearchComponent(
            onSearch = {},
            expanded = true,
            searchHint = "Search",
        )
    }
}
