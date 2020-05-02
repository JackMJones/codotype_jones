import * as React from "react";

// // // //

export function GeneratorExperienceTag(props: { experience: string }) {
    return <span className="badge badge-success mr-1">{props.experience}</span>;
}
