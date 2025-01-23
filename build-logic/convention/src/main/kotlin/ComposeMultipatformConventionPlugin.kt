import g.sig.buildlogic.configureCompose
import g.sig.buildlogic.getPlugin
import g.sig.buildlogic.libs
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.configure
import org.jetbrains.compose.ComposeExtension
import org.jetbrains.kotlin.compose.compiler.gradle.ComposeCompilerGradlePluginExtension
import org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension

class ComposeMultipatformConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) =
        with(target) {
            with(pluginManager) {
                apply(libs.getPlugin("composeMultiplatform"))
                apply(libs.getPlugin("composeCompiler"))
            }

            val composeDeps = extensions.getByType<ComposeExtension>(ComposeExtension::class.java).dependencies

            extensions.configure<ComposeCompilerGradlePluginExtension>(::configureCompose)

            extensions.configure<KotlinMultiplatformExtension> {
                sourceSets.apply {
                    commonMain {
                        dependencies {
                            implementation(composeDeps.runtime)
                            implementation(composeDeps.foundation)
                            implementation(composeDeps.material3)
                            implementation(composeDeps.materialIconsExtended)
                            implementation(composeDeps.material)
                            implementation(composeDeps.ui)
                            implementation(composeDeps.components.resources)
                            implementation(composeDeps.components.uiToolingPreview)
                        }
                    }
                }
            }
        }
}
