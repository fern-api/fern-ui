
import { visitDiscriminatedUnion } from "@/utils/visitDiscriminatedUnion";
import { APIV1Read } from "@fern-api/fdr-sdk";
import { ReactElement } from "react";
import { ObjectProperty } from "./ObjectProperty";

export function RequestBody({ body }: { body: APIV1Read.HttpRequest | undefined }): ReactElement | null {
    if (body == null) {
        return null;
    }

    return (
        <>
            <h3 className="mb-3 mt-12 text-2xl">Request</h3>
            <div className="mb-6">{body.description}</div>
            {visitDiscriminatedUnion(body.type)._visit({
                object: object => (
                    <ul>{object.properties.map(property => <ObjectProperty key={property.key} property={property} />)}</ul>
                ),
                reference: reference => {
                    return visitDiscriminatedUnion(reference.value)._visit({
                        id: () => {
                            return null;
                        },
                        primitive: () => null,
                        optional: () => null,
                        list: () => null,
                        set: () => null,
                        map: () => null,
                        literal: () => null,
                        unknown: () => null,
                    });
                },
                bytes: () => null,
                formData: () => null,
                fileUpload: () => null
            })}
        </>
    );
    
    // return (
    //     <ul>
    //         {body._visit({
    //             inlinedRequestBody: (inlinedRequestBody) => inlinedRequestBody.extends.map((body) => {}),
    //             reference: () => null,
    //             fileUpload: () => null,
    //             bytes: () => null,
    //             _other: () => null,
    //         })}
    //     </ul>
    // );
}
