plugins {
    alias(libs.plugins.kotlinSerialization)
    alias(libs.plugins.gsig.kotlin.multiplatform)
}

kotlin {
    sourceSets {
        androidMain.dependencies {
            implementation(libs.kotlinx.coroutines.android)
            implementation(libs.google.playServicesNearby)
        }
        commonMain.dependencies {
            implementation(projects.core.model)
            implementation(projects.core.common)
            implementation(libs.kotlinx.serialization.protobuf)
        }
        iosMain.dependencies {
        }
    }
}
