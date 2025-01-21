import com.android.build.api.dsl.ApplicationExtension
import g.sig.buildlogic.configureAndroidApp
import g.sig.buildlogic.configureAndroidCompose
import g.sig.buildlogic.getPlugin
import g.sig.buildlogic.libs
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.getByType

class AndroidAppConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) =
        with(target) {
            with(pluginManager) {
                apply(libs.getPlugin("kotlinAndroid"))
                apply(libs.getPlugin("androidApplication"))
                apply(libs.getPlugin("composeCompiler"))
            }

            val extension = extensions.getByType<ApplicationExtension>()
            configureAndroidApp(extension)
            configureAndroidCompose(extension)
        }
}
