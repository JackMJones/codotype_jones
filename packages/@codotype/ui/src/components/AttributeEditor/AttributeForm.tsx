import { AttributePropertiesForm } from "./AttributePropertiesForm";
import { AttributeDatatypeForm } from "./AttributeDatatypeForm";
import { AttributeMetaForm } from "./AttributeMetaForm";
import {
    Datatype,
    AttributeAddon,
    AttributeInput,
    AddonsValue,
    TokenCasing,
} from "@codotype/core";
import * as React from "react";
import { AddonPropertyForm } from "./AttributeAddonForm";

// // // //

function FormGroupTab(props: {
    label: string;
    active: boolean;
    disabled: boolean;
    onClick: () => void;
}) {
    const { label } = props;
    const btnClassName: string[] = ["btn btn-block nav-link w-100"];
    if (props.active) {
        btnClassName.push("active");
    }

    return (
        <li className="nav-item d-flex flex-grow-1">
            <button
                className={btnClassName.join(" ")}
                disabled={props.disabled}
                onClick={props.onClick}
            >
                {label}
            </button>
        </li>
    );
}

/**
 * AttributeFormSelector
 */
export function AttributeFormSelector(props: {
    attributeInput: AttributeInput;
    renderAddonsTab: boolean;
    children: (childProps: {
        selectedForm: string;
        setSelectedForm: (updatedSelectedGroup: string) => void;
    }) => React.ReactNode;
}) {
    const { attributeInput, renderAddonsTab } = props;
    const defaultSelectedForm =
        attributeInput.datatype === null ? "DATATYPE" : "PROPERTIES";

    const [selectedForm, setSelectedForm] = React.useState<string>(
        defaultSelectedForm,
    );

    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="nav nav-tabs w-100 d-flex">
                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("DATATYPE");
                        }}
                        disabled={attributeInput.datatype === null}
                        active={selectedForm === "DATATYPE"}
                        label={"Datatype"}
                    />

                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("PROPERTIES");
                        }}
                        disabled={attributeInput.datatype === null}
                        active={selectedForm === "PROPERTIES"}
                        label={"Tokens"}
                    />

                    {renderAddonsTab && (
                        <FormGroupTab
                            onClick={() => {
                                setSelectedForm("ADDONS");
                            }}
                            disabled={attributeInput.datatype === null}
                            active={selectedForm === "ADDONS"}
                            label={"Behavior"}
                        />
                    )}
                </ul>
            </div>
            <div className="col-lg-12">
                {props.children({ selectedForm, setSelectedForm })}
            </div>
        </div>
    );
}

// // // //

/**
 * AttributeFormProps
 * `attributeInput` - the `Attribute` currently being edited
 * `supportedDatatypes` - the unique IDs of supported datatypes made available in the form
 */
interface AttributeFormProps {
    attributes: AttributeInput[];
    addons: AttributeAddon[];
    attributeInput: AttributeInput;
    supportedDatatypes: Datatype[];
    onChange: (updatedAttributeInput: AttributeInput) => void;
    onKeydownEnter: () => void;
}

/**
 * AttributeForm
 * @param props - see `AttributeFormProps`
 */
export function AttributeForm(props: AttributeFormProps) {
    const { attributeInput, supportedDatatypes, addons } = props;

    const renderAddonsTab: boolean =
        attributeInput.datatype !== null &&
        addons.some(addon =>
            addon.supportedDatatypes.includes(
                attributeInput.datatype as Datatype,
            ),
        );

    return (
        <div className="row">
            <div className="col-lg-12">
                {/* {attributeInput.datatype && ( */}
                <div className="mx-3">
                    <AttributeFormSelector
                        renderAddonsTab={renderAddonsTab}
                        attributeInput={attributeInput}
                    >
                        {({ selectedForm, setSelectedForm }) => {
                            if (selectedForm === "DATATYPE") {
                                return (
                                    <AttributeDatatypeForm
                                        datatype={attributeInput.datatype}
                                        supportedDatatypes={supportedDatatypes}
                                        onChangeDatatype={updatedDatatype => {
                                            props.onChange({
                                                ...attributeInput,
                                                datatype: updatedDatatype,
                                            });
                                            setSelectedForm("PROPERTIES");
                                        }}
                                    />
                                );
                            }

                            if (selectedForm === "PROPERTIES") {
                                return (
                                    <React.Fragment>
                                        <AttributePropertiesForm
                                            attributeInput={attributeInput}
                                            onKeydownEnter={
                                                props.onKeydownEnter
                                            }
                                            onChange={(
                                                updatedAttributeInput: AttributeInput,
                                            ) => {
                                                props.onChange({
                                                    ...attributeInput,
                                                    ...updatedAttributeInput,
                                                });
                                            }}
                                        />

                                        {/* Null-check for attributeInput.datatype */}
                                        {attributeInput.datatype && (
                                            <AddonPropertyForm
                                                addons={props.addons}
                                                attributeCollection={
                                                    props.attributes
                                                }
                                                attributeInput={attributeInput}
                                                value={attributeInput.addons}
                                                onChange={(
                                                    updatedAttributeAddons: AddonsValue,
                                                ) => {
                                                    props.onChange({
                                                        ...attributeInput,
                                                        addons: {
                                                            ...updatedAttributeAddons,
                                                        },
                                                    });
                                                }}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            }

                            if (renderAddonsTab) {
                                return (
                                    <AttributeMetaForm
                                        description={
                                            attributeInput.internalNote
                                        }
                                        onDescriptionChange={(
                                            updatedDescription: string,
                                        ) => {
                                            props.onChange({
                                                ...attributeInput,
                                                internalNote: updatedDescription,
                                            });
                                        }}
                                    />
                                );
                            }

                            return null;
                        }}
                    </AttributeFormSelector>
                </div>
            </div>
        </div>
    );
}
