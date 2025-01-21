import com.android.build.api.dsl.LibraryExtension
import g.sig.buildlogic.configureAndroidCompose
import g.sig.buildlogic.getPlugin
import g.sig.buildlogic.libs
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.getByType

class AndroidComposeConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) =
        with(target) {
            with(pluginManager) {
                apply("gsig.android.library")
                apply(libs.getPlugin("composeCompiler"))
            }

            configureAndroidCompose(extensions.getByType<LibraryExtension>())
        }
}
