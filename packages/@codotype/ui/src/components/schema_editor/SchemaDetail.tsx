import * as React from "react";
import { SchemaPreview } from "./SchemaPreview";
import { AttributeEditor } from "../attribute_editor";
import { RelationEditor } from "../relation_editor";
import { SchemaDetailHeader } from "./SchemaDetailHeader";
import { inflateSchema } from "@codotype/util";
import {
    ProjectConfiguration,
    Schema,
    Attribute,
    Relation,
    InflatedSchema,
    GeneratorMeta,
} from "@codotype/types";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { SchemaIncomingRelations } from "./SchemaIncomingRelations";

// // // //

interface SchemaDetailProps {
    schema: Schema;
    schemas: Schema[];
    generatorMeta: GeneratorMeta;
    onChange: (updatedSchema: Schema) => void;
    onClickEdit: () => void;
    onConfirmDelete: () => void;
}

/**
 * SchemaDetail
 * @param props - see `SchemaDetailProps`
 */
export function SchemaDetail(props: SchemaDetailProps) {
    const inflatedSchema: InflatedSchema = inflateSchema({
        schema: props.schema,
        schemas: props.schemas,
    });

    const { schemaConfigurationGroup } = props.generatorMeta;

    return (
        <div className="row" style={{ borderLeft: "1px solid lightgrey" }}>
            <div className="col-sm-12">
                <SchemaDetailHeader
                    schema={props.schema}
                    onClickEdit={props.onClickEdit}
                    onConfirmDelete={props.onConfirmDelete}
                />
            </div>

            <div className="col-sm-12">
                <ConfigurationGroupSelector
                    configuration={props.schema.configuration}
                    configurationGroups={
                        schemaConfigurationGroup.configurationGroups
                    }
                    onChange={(updatedConfiguration: ProjectConfiguration) => {
                        props.onChange({
                            ...props.schema,
                            configuration: updatedConfiguration,
                        });
                    }}
                >
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <AttributeEditor
                                attributes={props.schema.attributes}
                                supportedDatatypes={
                                    schemaConfigurationGroup.supportedDatatypes
                                }
                                onChange={(updatedAttributes: Attribute[]) => {
                                    // Defines updated schema
                                    const updatedSchema: Schema = {
                                        ...props.schema,
                                        attributes: updatedAttributes,
                                    };

                                    // Passes into `props.onChange`
                                    props.onChange(updatedSchema);
                                }}
                            />
                        </div>
                        <div className="pl-md-0 col-sm-12 col-md-6 col-lg-6">
                            <RelationEditor
                                selectedSchema={props.schema}
                                relationReferences={inflatedSchema.relations}
                                schemas={props.schemas}
                                relations={props.schema.relations}
                                supportedRelationTypes={
                                    schemaConfigurationGroup.supportedRelations
                                }
                                onChange={(updatedRelations: Relation[]) => {
                                    // Defines updated schema
                                    const updatedSchema: Schema = {
                                        ...props.schema,
                                        relations: updatedRelations,
                                    };

                                    // Passes into `props.onChange`
                                    props.onChange(updatedSchema);
                                }}
                            />
                        </div>
                        <div className="col-sm-6">
                            <SchemaPreview
                                schema={props.schema}
                                schemas={props.schemas}
                            />
                        </div>
                        <div className="pl-md-0 col-sm-6">
                            <SchemaIncomingRelations
                                inflatedSchema={inflatedSchema}
                            />
                        </div>
                    </div>
                </ConfigurationGroupSelector>
            </div>
        </div>
    );
}
