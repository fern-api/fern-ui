import { APIV1Read } from "@fern-api/fdr-sdk";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import cn from "clsx";
import { ReactNode } from "react";
import { ResolvedRequestBody, ResolvedTypeDefinition, visitResolvedHttpRequestBodyShape } from "../../util/resolver";
import { ApiPageDescription } from "../ApiPageDescription";
import { JsonPropertyPath } from "../examples/JsonPropertyPath";
import { TypeReferenceDefinitions } from "../types/type-reference/TypeReferenceDefinitions";
import { renderTypeShorthand } from "../types/type-shorthand/TypeShorthand";
import { TypeComponentSeparator } from "../types/TypeComponentSeparator";
import { EndpointParameter, EndpointParameterContent } from "./EndpointParameter";

export declare namespace EndpointRequestSection {
    export interface Props {
        requestBody: ResolvedRequestBody;
        onHoverProperty?: (path: JsonPropertyPath, opts: { isHovering: boolean }) => void;
        anchorIdParts: string[];
        route: string;
        defaultExpandAll?: boolean;
        types: Record<string, ResolvedTypeDefinition>;
    }
}

export const EndpointRequestSection: React.FC<EndpointRequestSection.Props> = ({
    requestBody,
    onHoverProperty,
    anchorIdParts,
    route,
    defaultExpandAll = false,
    types,
}) => {
    return (
        <div className="flex flex-col">
            <ApiPageDescription className="mt-3 text-sm" description={requestBody.description} isMarkdown={true} />
            <div
                className={cn("t-muted pb-5 text-sm leading-6", {
                    "border-default border-b": requestBody.shape.type !== "fileUpload",
                })}
            >
                {`This endpoint expects ${visitResolvedHttpRequestBodyShape<string>(requestBody.shape, {
                    fileUpload: (fileUpload) => {
                        if (fileUpload.value == null) {
                            return "a file";
                        }
                        const fileArrays = fileUpload.value.properties.filter(
                            (p) => p.type === "fileArray",
                        ) as APIV1Read.FilePropertyArray[];
                        const files = fileUpload.value.properties.filter(
                            (p) => p.type === "file",
                        ) as APIV1Read.FilePropertySingle[];
                        return `a multipart form${fileArrays.length > 0 || files.length > 1 ? " with multiple files" : files[0] != null ? ` containing ${files[0].isOptional ? "an optional" : "a"} file` : ""}`;
                    },
                    bytes: (bytes) => `binary data${bytes.contentType != null ? ` of type ${bytes.contentType}` : ""}`,
                    typeShape: (typeShape) => renderTypeShorthand(typeShape, { withArticle: true }, types),
                })}.`}
            </div>
            {visitResolvedHttpRequestBodyShape<ReactNode | null>(requestBody.shape, {
                fileUpload: (fileUpload) =>
                    fileUpload.value?.properties.map((p) => (
                        <>
                            <TypeComponentSeparator />
                            {visitDiscriminatedUnion(p, "type")._visit<ReactNode | null>({
                                file: (file) => (
                                    <EndpointParameterContent
                                        key={file.key}
                                        name={file.key}
                                        description={undefined}
                                        typeShorthand={file.isOptional ? "optional file" : "file"}
                                        anchorIdParts={[...anchorIdParts, file.key]}
                                        route={route}
                                        availability={undefined}
                                    />
                                ),
                                fileArray: (fileArray) => (
                                    <EndpointParameterContent
                                        key={fileArray.key}
                                        name={fileArray.key}
                                        description={undefined}
                                        typeShorthand={
                                            fileArray.isOptional ? "optional list of files" : "list of files"
                                        }
                                        anchorIdParts={[...anchorIdParts, fileArray.key]}
                                        route={route}
                                        availability={undefined}
                                    />
                                ),
                                bodyProperty: (bodyProperty) => (
                                    <EndpointParameter
                                        name={bodyProperty.key}
                                        description={bodyProperty.description}
                                        shape={bodyProperty.valueShape}
                                        anchorIdParts={[...anchorIdParts, bodyProperty.key]}
                                        route={route}
                                        availability={bodyProperty.availability}
                                        types={types}
                                    />
                                ),
                                _other: () => null,
                            })}
                        </>
                    )),
                bytes: () => null,
                typeShape: (typeShape) => (
                    <TypeReferenceDefinitions
                        shape={typeShape}
                        isCollapsible={false}
                        onHoverProperty={onHoverProperty}
                        anchorIdParts={anchorIdParts}
                        route={route}
                        defaultExpandAll={defaultExpandAll}
                        applyErrorStyles={false}
                        types={types}
                    />
                ),
            })}
        </div>
    );
};
