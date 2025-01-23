plugins {
    alias(libs.plugins.gsig.kotlin.multiplatform)
    alias(libs.plugins.gsig.compose.multiplatform)
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
