import { buildTokenPluralization } from "./buildTokenPluralization";
import { makeUniqueId } from "./makeUniqueId";
import {
    SchemaInput,
    RelationInput,
    Relation,
    Schema,
    ProjectInput,
    Project,
} from "../";

// // // //

export function buildRelation(params: {
    relationInput: RelationInput;
    sourceSchema: SchemaInput;
    destinationSchema: SchemaInput;
}): Relation {
    const { relationInput, sourceSchema, destinationSchema } = params;

    return {
        id: makeUniqueId(),
        type: relationInput.type,
        sourceSchemaId: sourceSchema.id,
        destinationSchemaId: destinationSchema.id,
        sourceRelationId: relationInput.id,
        identifiers: {
            source: {
                canonical: { ...sourceSchema.identifiers },
                alias: buildTokenPluralization(
                    relationInput.sourceSchemaAlias ||
                        sourceSchema.identifiers.singular.label,
                ),
            },
            destination: {
                canonical: { ...destinationSchema.identifiers },
                alias: {
                    ...buildTokenPluralization(
                        relationInput.destinationSchemaAlias ||
                            destinationSchema.identifiers.singular.label,
                    ),
                },
            },
        },
    };
}

// // // //

export function buildRelations(params: {
    schemaInputs: SchemaInput[];
    relationInputs: RelationInput[];
}): Relation[] {
    const { relationInputs, schemaInputs } = params;

    // Defines array of RelationReferences we're going to return
    return relationInputs.map(relationInput => {
        const sourceSchema = schemaInputs.find(
            s => s.id === relationInput.sourceSchemaID,
        );
        const destinationSchema = schemaInputs.find(
            s => s.id === relationInput.destinationSchemaID,
        );
        return buildRelation({
            sourceSchema,
            destinationSchema,
            relationInput,
        });
    });
}

// // // //

/**
 * inflateSchema
 * Inflates a single Schema and returns an Schema instance
 */
export function inflateSchema(params: {
    schemaInput: SchemaInput;
    relations: Relation[];
}): Schema {
    const { schemaInput, relations } = params;

    return {
        id: schemaInput.id,
        attributes: schemaInput.attributes,
        identifiers: {
            ...schemaInput.identifiers,
        },
        configuration: schemaInput.configuration,
        relations: relations.filter(r => r.sourceSchemaId === schemaInput.id),
        references: relations.filter(
            r => r.destinationSchemaId === schemaInput.id,
        ),
    };
}

// // // //

/**
 * inflateSchemas
 * Inflates each schema in params.schemas
 */
export function inflateSchemas(params: {
    schemaInputs: SchemaInput[];
    relations: Relation[];
}): Schema[] {
    return params.schemaInputs.map(
        (s: SchemaInput): Schema =>
            inflateSchema({
                schemaInput: s,
                relations: params.relations,
            }),
    );
}

// // // //

/**
 * normalizeProjectInput
 * Accepts ProjectInput and returns Project
 * @param params.projectInput - the ProjectInput being normalized
 */
export function normalizeProjectInput(params: {
    projectInput: ProjectInput;
}): Project {
    const { projectInput } = params;

    const relations: Relation[] = buildRelations({
        schemaInputs: projectInput.schemas,
        relationInputs: projectInput.relations,
    });

    return {
        id: projectInput.id,
        schemas: inflateSchemas({
            relations,
            schemaInputs: projectInput.schemas,
        }),
        configuration: projectInput.configuration,
        pluginID: projectInput.pluginID,
        identifiers: projectInput.identifiers,
        pluginVersion: projectInput.pluginVersion,
    };
}
