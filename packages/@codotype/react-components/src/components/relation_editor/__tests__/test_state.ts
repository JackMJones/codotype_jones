import {
    Relation,
    Schema,
    SchemaSource,
    RelationType,
    Datatype,
} from "@codotype/types";

// // // //

export const relationExample01: Relation = {
    id: "name-attr",
    type: RelationType.TO_ONE,
    required: false,
    schema_id: "",
    related_schema_id: "",
    reverse_relation_id: "",
    as: "",
    reverse_as: "",
};

export const relationExample02: Relation = {
    id: "Email-attr",
    type: RelationType.TO_ONE,
    required: false,
    schema_id: "",
    related_schema_id: "",
    reverse_relation_id: "",
    as: "",
    reverse_as: "",
};

export const supportedRelationTypes: RelationType[] = [
    RelationType.TO_ONE,
    RelationType.TO_MANY,
    RelationType.HAS_ONE,
    RelationType.HAS_MANY,
    RelationType.HAS_AND_BELONGS_TO_MANY,
];

export const userSchema: Schema = {
    id: "12345",
    identifiers: {
        singular: {
            label: "User",
            snake: "user",
            camel: "user",
            pascal: "User",
            kebab: "user",
        },
        plural: {
            label: "Users",
            snake: "users",
            camel: "users",
            pascal: "Users",
            kebab: "users",
        },
    },
    attributes: [
        {
            id: "ATTR_01",
            label: "Email",
            identifier: "email",
            required: true,
            unique: true,
            datatype: Datatype.STRING,
            datatypeOptions: {},
            default_value: "",
            locked: false,
            description: "Email for the user",
        },
    ],
    relations: [],
    locked: false,
    removable: false,
    source: SchemaSource.USER,
    configuration: {},
};
