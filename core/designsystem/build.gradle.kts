plugins {
    alias(libs.plugins.gsig.kotlin.multiplatform)
    alias(libs.plugins.gsig.compose.multiplatform)
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            api(projects.core.common)
            api(compose.components.resources)
            api(compose.runtime)
            api(compose.foundation)
            api(compose.material3)
            api(compose.ui)
            api(compose.components.resources)
        }
        androidMain.dependencies {
            api(compose.uiTooling)
            api(compose.preview)
        }
    }
}

compose.resources {
    publicResClass = true
    generateResClass = auto
}
