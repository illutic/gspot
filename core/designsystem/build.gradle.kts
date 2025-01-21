plugins {
    alias(libs.plugins.gsig.android.library)
    alias(libs.plugins.gsig.kotlin.multiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.composeMultiplatform)
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            api(projects.core.common)
            api(compose.components.resources)
        }
    }
}

compose.resources {
    publicResClass = true
    generateResClass = auto
}

android.namespace += ".core.designsystem"
