import com.android.build.api.dsl.ApplicationExtension
import g.sig.buildlogic.configureAndroidApp
import g.sig.buildlogic.configureIosApp
import g.sig.buildlogic.configureWasmApp
import g.sig.buildlogic.getPlugin
import g.sig.buildlogic.libs
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.getByType
import org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension

class AppConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) =
        with(target) {
            with(pluginManager) {
                apply(libs.getPlugin("androidApplication"))
            }

            val kmpExtension = extensions.getByType<KotlinMultiplatformExtension>()
            val appExtension = extensions.getByType<ApplicationExtension>()
            configureIosApp(kmpExtension)
            configureWasmApp(kmpExtension)
            configureAndroidApp(appExtension)
        }
}
