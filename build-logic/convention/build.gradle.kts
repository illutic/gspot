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
            implementationClass = "KotlinMultiplatformConventionPlugin"
        }
        register("app") {
            id =
                libs.plugins.gsig.app
                    .get()
                    .pluginId
            implementationClass = "AppConventionPlugin"
        }
        register("composeMultiplatform") {
            id =
                libs.plugins.gsig.compose.multiplatform
                    .get()
                    .pluginId
            implementationClass = "ComposeMultipatformConventionPlugin"
        }
    }
}
