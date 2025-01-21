package g.sig.buildlogic

import org.jetbrains.kotlin.gradle.ExperimentalWasmDsl
import org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension
import org.jetbrains.kotlin.gradle.targets.js.webpack.KotlinWebpackConfig

fun configureKotlinMultiplatform(kmpExtension: KotlinMultiplatformExtension) =
    kmpExtension.apply {
        androidTarget {
            compilations.all {
                compileTaskProvider.configure {
                    compilerOptions {
                        jvmTarget.set(JVM_TARGET)
                    }
                }
            }
        }

        applyDefaultHierarchyTemplate()

        listOf(
            iosArm64(),
            iosX64(),
            iosSimulatorArm64(),
        )

        @OptIn(ExperimentalWasmDsl::class)
        wasmJs {
            moduleName = "composeApp"
            browser {
                val rootDirPath = project.rootDir.path
                val projectDirPath = project.projectDir.path
                commonWebpackConfig {
                    outputFileName = "composeApp.js"
                    devServer =
                        (devServer ?: KotlinWebpackConfig.DevServer()).apply {
                            static =
                                (static ?: mutableListOf()).apply {
                                    // Serve sources to debug inside browser
                                    add(rootDirPath)
                                    add(projectDirPath)
                                }
                        }
                }
            }
            binaries.executable()
        }
    }
