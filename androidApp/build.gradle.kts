plugins {
    alias(libs.plugins.gsig.android.app)
}

dependencies {
    implementation(projects.core.network)
    implementation(projects.core.model)
    implementation(projects.core.common)
    implementation(projects.core.designsystem)
    implementation(projects.core.data)
}
