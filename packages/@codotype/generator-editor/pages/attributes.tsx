import { AttributeEditor } from "../components/attribute_editor";
import { SchemaEditor } from "../components/schema_editor";
import { Datatype } from "@codotype/types";

// // // //

export default () => {
  return (
    <div className="row mt-4">
      <div className="col-lg-12">

        <SchemaEditor
          schemas={[]}
          onChange={(updatedAttributes: any[]) => {
            console.log(updatedAttributes);
          }}
        />

        <AttributeEditor
          attributes={[]}
          supportedDatatypes={[Datatype.STRING, Datatype.NUMERIC]}
          onChange={(updatedAttributes: any[]) => {
            console.log(updatedAttributes);
          }}
        />
      </div>
    </div>
  );
}