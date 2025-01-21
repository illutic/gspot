plugins {
    `kotlin-dsl`
}

group = "g.sig.buildlogic"

dependencies {
    compileOnly(libs.plugins.androidApplication.toDep())
    compileOnly(libs.plugins.androidLibrary.toDep())
    compileOnly(libs.plugins.composeMultiplatform.toDep())
    compileOnly(libs.plugins.kotlinMultiplatform.toDep())
    compileOnly(libs.plugins.kotlinSerialization.toDep())
    compileOnly(libs.plugins.composeCompiler.toDep())
}

fun Provider<PluginDependency>.toDep() =
    map {
        "${it.pluginId}:${it.pluginId}.gradle.plugin:${it.version}"
    }

tasks {
    validatePlugins {
        enableStricterValidation = true
        failOnWarning = true
    }
}

gradlePlugin {
    plugins {
        register("kotlinMultiplatform") {
            id =
                libs.plugins.gsig.kotlin.multiplatform
                    .get()
                    .pluginId
            implementationClass = "KMPConventionPlugin"
        }
        register("androidApp") {
            id =
                libs.plugins.gsig.android.app
                    .get()
                    .pluginId
            implementationClass = "AndroidAppConventionPlugin"
        }
        register("androidLibrary") {
            id =
                libs.plugins.gsig.android.library
                    .get()
                    .pluginId
            implementationClass = "AndroidLibraryConventionPlugin"
        }
        register("androidFeature") {
            id =
                libs.plugins.gsig.android.feature
                    .get()
                    .pluginId
            implementationClass = "AndroidFeatureConventionPlugin"
        }
        register("androidCompose") {
            id =
                libs.plugins.gsig.android.compose
                    .get()
                    .pluginId
            implementationClass = "AndroidComposeConventionPlugin"
        }
    }
}
