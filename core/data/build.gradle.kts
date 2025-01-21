plugins {
    alias(libs.plugins.gsig.android.library)
    alias(libs.plugins.gsig.kotlin.multiplatform)
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation(projects.core.common)
            implementation(projects.core.model)
            implementation(projects.core.domain)
            implementation(projects.core.network)
        }
    }
}

android.namespace += ".core.data"
