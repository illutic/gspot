plugins {
    alias(libs.plugins.gsig.kotlin.multiplatform)
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation(projects.core.common)
            implementation(projects.core.model)
        }
    }
}
