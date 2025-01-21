import g.sig.buildlogic.configureKotlinMultiplatform
import g.sig.buildlogic.getLibrary
import g.sig.buildlogic.getPlugin
import g.sig.buildlogic.libs
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.configure
import org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension

class KMPConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) =
        with(target) {
            with(pluginManager) {
                apply(libs.getPlugin("kotlinMultiplatform"))
            }

            extensions.configure<KotlinMultiplatformExtension> {
                configureKotlinMultiplatform(this)

                sourceSets.apply {
                    commonMain.dependencies {
                        val koinBom = libs.getLibrary("koin-bom").get()
                        api(libs.getLibrary("kotlinx-coroutines-core"))
                        api(project.dependencies.platform(koinBom))
                        api(libs.findLibrary("koin-core").get())
                    }
                    androidMain.dependencies {
                        api(libs.findLibrary("koin-android").get())
                    }
                }
            }
        }
}
