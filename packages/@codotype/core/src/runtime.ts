import { Project, ProjectInput } from "./Project";
import { RelationReference, InflatedSchema } from "./reference";
import { PluginMetadata } from "./plugin";

// // // //

/**
 * RuntimeLogLevel
 * Designates different levels of logging for a CodotypeRuntime.
 * @variation info - displays runtime status (always prints)
 * @variation warning - displays runtime warnings (always prints)
 * @variation error - displays errors (always prints)
 * @variation verbose - displays detailed play-by-play of ProjectBuild execution. Helpful when developing.
 * @variation suppress - supresses all logs
 */
export type RuntimeLogLevel =
    | "info"
    | "warning"
    | "error"
    | "verbose"
    | "suppress";
export enum RuntimeLogLevels {
    info = "info",
    warning = "warning",
    error = "error",
    verbose = "verbose",
    suppress = "suppress",
}

/**
 * RuntimeErrorCode
 * Used to differentiate between various errors in a CodotypeRuntime
 */
export type RuntimeErrorCode = "MODULE_NOT_FOUND" | "UNKNOWN";
export enum RuntimeErrorCodes {
    moduleNotFound = "MODULE_NOT_FOUND",
    unknownd = "UNKNOWN",
}

/**
 * FileOverwriteBehavior
 * Used to determine behavior when a CodotypeRuntime needs to overwrite an existing file
 * @variation force - always overwrites the existing file with the newer one. This is used most of the time.
 * @variation skip - skips the new file and keeps the old one.
 * @variation ask - asks the user if they want to keep or override the file (@codotype/cli ONLY, will block server)
 */
export type FileOverwriteBehavior = "force" | "skip" | "ask";
export enum FileOverwriteBehaviors {
    force = "force",
    skip = "skip",
    ask = "ask",
}

/**
 * RuntimeConstructorParams
 * Options accepted when constructing a new CodotypeRuntime
 * @param cwd - The absolute path representing the "current working directory" (i.e. `/path/to/dir`), usually value from `process.cwd()`.
 *              Used by the CodotypeRuntime to determine where a a ProjectBuild output should belong
 * @param logLevel - The level of logging permitted by the Runtime's `log` function. See `RuntimeLogLevel`
 * @param fileOverwriteBehavior - Sets FileOverwriteBehavior for the Runtime. @see FileOverwriteBehavior
 */
export interface RuntimeConstructorParams {
    cwd: string;
    logLevel: RuntimeLogLevel;
    fileOverwriteBehavior: FileOverwriteBehavior;
}

/**
 * ProjectBuild
 * Encapsulates the data required to build a single Project
 * @todo - add start/finish timestamps to ProjectBuild?
 * @param id - (optional) The UUID of the build - used to determine the output directory for a ProjectBuild (i.e. OUTPUT_DIRECTORY/ProjectBuild.id/my_project).
 *             Value of `undefined` simply sends ProjectBuild output to OUTPUT_DIRECTORY/my_project
 * @param projectInput - The ProjectInput for a specific Codotype Plugin that's available in the Runtime.
 */
export interface ProjectBuild {
    id?: string;
    projectInput: ProjectInput;
}

/**
 * PluginRegistration
 * Used by the Runtime to internally keep a record of which Plugins have been registered with the runtime
 * @param id - the ID of the Plugin (value from PluginMetadata.id)
 * @param pluginPath - the absolute path that points to the Plugin's dist/ directory
 * @param pluginDynamicImportPath - the absolute path that points to the Plugin's entry Generator
 * @param pluginMetadata - The data pulled from the Plugin's `src/meta.ts` file - @see PluginMetadata
 */
export interface PluginRegistration {
    id: string;
    pluginPath: string;
    pluginDynamicImportPath: string;
    pluginMetadata: PluginMetadata;
}

/**
 * RuntimeProxy
 * Defines slimmed-down Runtime passed into each generator, fascade/proxy
 * @param ensureDir - TODO - annotate this
 * @param writeFile - TODO - annotate this
 * @param copyDir - TODO - annotate this
 * @param renderComponent - TODO - annotate this
 * @param templatePath - TODO - annotate this
 * @param destinationPath - TODO - annotate this
 * @param composeWith - TODO - annotate this
 */
export interface RuntimeProxy {
    ensureDir: (dir: string) => Promise<boolean>;
    writeFile: WriteFileFunction;
    copyDir: ({ src, dest }: { src: string; dest: string }) => Promise<boolean>;
    renderComponent: RenderComponentFunction;
    copyTemplate: (src: string, dest: string, options: object) => Promise<any>;
    templatePath: (template_path: string) => string;
    destinationPath: (destination_path: string) => string;
    composeWith: (generatorModule: string, options?: any) => Promise<any>;
}

// TODO - rename this to
// - GeneratorAgent?
// - GeneratorInitiator?
// - GeneratorInvoker? -> It ALSO exposes a RuntimeAdaptor
// - GeneratorLauncher?
// - GeneratorLoader?
// - GeneratorRunner?
// - GeneratorStarter?
// - GeneratorWrapper?
// - RuntimeAdaptorInjector?
// - RuntimeAgent?
// - RuntimeBroker?
// - RuntimeConnector?
// - RuntimeDelegate?
// - RuntimeInjector?
// - RuntimeInvoker?
// - RuntimeMediator?
export interface RuntimeAdaptor {
    runtimeProxy: RuntimeProxy;
    options: RuntimeInjectorProps;
    write: WriteFunction;
    forEachSchema: ForEachSchemaFunction;
    forEachRelation: ForEachRelationFunction;
    forEachReverseRelation: ForEachReverseRelationFunction;
    ensureDir: (dir: string) => Promise<boolean>;
    writeFile: WriteFileFunction;
    copyDir: ({ src, dest }: { src: string; dest: string }) => Promise<boolean>;
    compileTemplatesInPlace: () => Promise<Array<unknown>>;
    renderComponent: RenderComponentFunction;
    copyTemplate: (src: string, dest: string, options: object) => Promise<any>;
    templatePath: (template_path: string) => string;
    destinationPath: (destination_path: string) => string;
    composeWith: (generatorModule: string, options?: any) => Promise<any>;
}

// CONTEXT - these are passed into the "CodotypeGeneratorRunner" component
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination
export interface RuntimeInjectorProps {
    resolved: string; // What's this?
    project: Project;
    dest: string; // What's this?
    plugin: PluginMetadata;
    runtime: Runtime;
}

// // // //
// Runtime function types

export type WriteFileFunction = (
    destinationPath: string,
    compiledTemplate: string,
) => Promise<boolean>;

export type RenderComponentFunction = (params: {
    src: string;
    dest: string;
    data: { [key: string]: any };
}) => Promise<boolean>;

export type WriteFunction = (params: {
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

export type ForEachSchemaFunction = (params: {
    schema: InflatedSchema;
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

export type ForEachRelationFunction = (params: {
    schema: InflatedSchema;
    relation: RelationReference;
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

export type ForEachReverseRelationFunction = (params: {
    schema: InflatedSchema; // TODO - rename `Schema` to `SchemaInput`, `InflatedSchema` to `Schema`
    relation: RelationReference;
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

// // // //

/**
 * Runtime
 * TODO - clean this up a bit more
 */
export interface Runtime {
    templatePath: (resolvedPath: string, templatePath: string) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
    renderTemplate: (
        generatorInstance: RuntimeAdaptor,
        src: string,
        options: any,
    ) => Promise<string>;
    fileExists: (filepath: string) => Promise<boolean>;
    compareFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    writeFile: WriteFileFunction;
    destinationPath: (destination: string, filename: string) => string;
    composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule
    log: (message: any, options: { level: RuntimeLogLevel }) => void;
    registerPlugin: (props: {
        modulePath?: string;
        relativePath?: string;
        absolutePath?: string;
    }) => Promise<PluginRegistration | null>;
    execute: (props: { build: ProjectBuild }) => Promise<void>;
}

//////////////

// NOTE - these work, add to test_state?
// const myOpts: CodotypeRuntimeConstructorOptions = {
//     cwd: "string",
//     logLevel: RuntimeLogLevels.verbose,
//     fileOverwriteBehavior: FileOverwriteBehaviors.skip,
// };

// const myOpts2: CodotypeRuntimeConstructorOptions = {
//     cwd: "string",
//     logLevel: "verbose",
//     fileOverwriteBehavior: "skip",
// };
