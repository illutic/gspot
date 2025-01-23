plugins {
    alias(libs.plugins.gsig.kotlin.multiplatform)
}

kotlin {
    sourceSets {
        androidMain.dependencies {
        }
        commonMain.dependencies {
            api(libs.kotlinx.coroutines.core)
            api(project.dependencies.platform(libs.koin.bom))
            api(libs.koin.core)
            api(libs.napier)
        }
    }
}
