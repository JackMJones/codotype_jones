import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ProjectEditor } from "../component";
import { Project, Schema, Datatype } from "../../types";
import { buildDefaultProject } from "../buildDefaultProject";
import { Story } from "@src/components/dev";
import { dummyGeneratorMeta } from "./test_state";

// // // //

const dummyProject: Project = buildDefaultProject(dummyGeneratorMeta);

const userSchema: Schema = {
    id: "12345",
    tokens: {
        label: "User",
        label_plural: "Users",
        identifier: "user",
        identifier_plural: "users",
    },
    attributes: [],
    relations: [],
    locked: false,
    removable: false,
    source: "USER",
    configuration: {},
};

const movieSchema: Schema = {
    id: "45678",
    tokens: {
        label: "Movie",
        label_plural: "Movies",
        identifier: "movie",
        identifier_plural: "movies",
    },
    attributes: [
        {
            id: "name-attr",
            label: "Name",
            identifier: "name",
            description: "the name of the user",
            required: true,
            unique: true,
            locked: false,
            datatype: Datatype.STRING,
            default_value: "string",
            datatypeOptions: {},
        },
        {
            id: "email-attr",
            label: "Email",
            identifier: "email",
            description: "the email of the user",
            required: true,
            unique: true,
            locked: false,
            datatype: Datatype.STRING,
            default_value: "string",
            datatypeOptions: {},
        },
    ],
    relations: [],
    locked: false,
    removable: false,
    source: "USER",
    configuration: {},
};

dummyProject.schemas.push(movieSchema);
dummyProject.schemas.push(userSchema);

storiesOf("ProjectEditor", module).add("renders", () => {
    const [project, setProject] = React.useState<Project>(dummyProject);
    return (
        <Story>
            <ProjectEditor
                label={"Label"}
                generator={dummyGeneratorMeta}
                project={project}
                onClickGenerate={() => {
                    console.log("Generate Project!");
                }}
                onChange={(updatedProject: Project) => {
                    console.log("onChange!");
                    console.log(updatedProject);
                    setProject(updatedProject);
                }}
            />
            <hr />
            <pre>{JSON.stringify(project, null, 4)}</pre>
        </Story>
    );
});
