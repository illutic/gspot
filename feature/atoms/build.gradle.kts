plugins {
    alias(libs.plugins.gsig.android.library)
    alias(libs.plugins.gsig.kotlin.multiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.composeMultiplatform)
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation(projects.core.designsystem)
        }
    }
}

compose.resources {
    publicResClass = true
    generateResClass = auto
}

android.namespace += ".feature.adaptive"
