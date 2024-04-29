/**
 * This file was auto-generated by Fern from our API Definition.
 */
export function register(expressApp, services) {
    expressApp.use("/registry/api", services.api.v1.read._root.toRouter());
    expressApp.use("/registry/api", services.api.v1.register._root.toRouter());
    expressApp.use("/registry/docs", services.docs.v1.read._root.toRouter());
    expressApp.use("/registry/docs", services.docs.v1.write._root.toRouter());
    expressApp.use("/v2/registry/docs", services.docs.v2.read._root.toRouter());
    expressApp.use("/v2/registry/docs", services.docs.v2.write._root.toRouter());
    expressApp.use("/snippets", services.snippetsFactory.toRouter());
    expressApp.use("/snippets", services.snippets.toRouter());
    expressApp.use("/snippet-template", services.templates.toRouter());
}
