plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.gsig.app)
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation(projects.core.network)
            implementation(projects.core.model)
            implementation(projects.core.common)
            implementation(projects.core.designsystem)
            implementation(projects.core.data)
            implementation(projects.feature.atoms)
        }
    }
}
