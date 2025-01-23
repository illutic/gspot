import com.android.build.api.dsl.LibraryExtension
import g.sig.buildlogic.TARGET_SDK
import g.sig.buildlogic.configureAndroidLibrary
import g.sig.buildlogic.configureKotlinMultiplatform
import g.sig.buildlogic.getPlugin
import g.sig.buildlogic.libs
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.configure
import org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension

class KotlinMultiplatformConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) =
        with(target) {
            with(pluginManager) {
                apply(libs.getPlugin("androidLibrary"))
                apply(libs.getPlugin("kotlinMultiplatform"))
            }

            extensions.configure<LibraryExtension> {
                configureAndroidLibrary(this)

                defaultConfig.testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
                // The resource prefix is derived from the module name,
                // so resources inside ":core:module1" must be prefixed with "core_module1_"
                resourcePrefix = path
                    .split("""\W""".toRegex())
                    .drop(1)
                    .distinct()
                    .joinToString(separator = "_")
                    .lowercase() + "_"

                testOptions {
                    targetSdk = TARGET_SDK
                    animationsDisabled = true
                }
            }

            extensions.configure<KotlinMultiplatformExtension>(::configureKotlinMultiplatform)
        }
}
