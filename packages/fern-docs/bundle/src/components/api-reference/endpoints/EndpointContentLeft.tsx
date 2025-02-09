"use client";

import * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import { EndpointContext } from "@fern-api/fdr-sdk/api-definition";
import { visitDiscriminatedUnion } from "@fern-api/ui-core-utils";
import { sortBy } from "es-toolkit/array";
import { memo, useEffect, useRef } from "react";
import { useEdgeFlags } from "../../atoms";
import { TypeComponentSeparator } from "../types/TypeComponentSeparator";
import { useEndpointContext } from "./EndpointContext";
import { EndpointError } from "./EndpointError";
import { EndpointParameter } from "./EndpointParameter";
import { EndpointRequestSection } from "./EndpointRequestSection";
import { EndpointResponseSection } from "./EndpointResponseSection";
import { EndpointSection } from "./EndpointSection";
import { convertNameToAnchorPart } from "./utils";

export interface HoveringProps {
  isHovering: boolean;
}

export declare namespace EndpointContentLeft {
  export interface Props {
    context: EndpointContext;
    showErrors: boolean;
  }
}

const REQUEST = ["request"];
const RESPONSE = ["response"];
const REQUEST_PATH = ["request", "path"];
const REQUEST_QUERY = ["request", "query"];
const REQUEST_HEADER = ["request", "header"];
const REQUEST_BODY = ["request", "body"];
const RESPONSE_BODY = ["response", "body"];
const RESPONSE_ERROR = ["response", "error"];

const UnmemoizedEndpointContentLeft: React.FC<EndpointContentLeft.Props> = ({
  context: { node, endpoint, types, auth, globalHeaders },
  showErrors,
}) => {
  // if the user clicks outside of the error, clear the selected error
  const errorRef = useRef<HTMLDivElement>(null);

  const { selectedError, setSelectedError, selectedExample } =
    useEndpointContext();

  useEffect(() => {
    if (selectedError == null || errorRef.current == null) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      if (event.target == null) {
        return;
      }

      if (
        event.target instanceof Node &&
        errorRef.current?.contains(event.target)
      ) {
        return;
      }

      // check that target is not inside of ".fern-endpoint-code-snippets"
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(".fern-endpoint-code-snippets") != null
      ) {
        return;
      }

      // if the target is the body, then the event propagation was prevented by a radix button
      if (event.target === window.document.body) {
        return;
      }

      setSelectedError(undefined);
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [selectedError, setSelectedError]);

  const { isAuthEnabledInDocs } = useEdgeFlags();

  let authHeader: ApiDefinition.ObjectProperty | undefined;
  if (auth && isAuthEnabledInDocs) {
    const stringShape: ApiDefinition.TypeShape = {
      type: "alias",
      value: {
        type: "primitive",
        value: {
          type: "string",
          format: undefined,
          regex: undefined,
          minLength: undefined,
          maxLength: undefined,
          default: undefined,
        },
      },
    };
    authHeader = visitDiscriminatedUnion(
      auth
    )._visit<ApiDefinition.ObjectProperty>({
      basicAuth: () => {
        return {
          key: ApiDefinition.PropertyKey("Authorization"),
          description:
            "Basic authentication of the form Basic <username:password>.",
          hidden: false,
          valueShape: stringShape,
          availability: undefined,
        };
      },
      bearerAuth: () => {
        return {
          key: ApiDefinition.PropertyKey("Authorization"),
          description:
            "Bearer authentication of the form Bearer <token>, where token is your auth token.",
          hidden: false,
          valueShape: stringShape,
          availability: undefined,
        };
      },
      header: (value) => {
        return {
          key: ApiDefinition.PropertyKey(value.headerWireValue),
          description:
            value.prefix != null
              ? `Header authentication of the form ${value.prefix} <token>`
              : undefined,
          hidden: false,
          valueShape: stringShape,
          availability: undefined,
        };
      },
      oAuth: (value) => {
        return visitDiscriminatedUnion(value.value, "type")._visit({
          clientCredentials: (clientCredentialsValue) =>
            visitDiscriminatedUnion(
              clientCredentialsValue.value,
              "type"
            )._visit({
              referencedEndpoint: () => ({
                key: ApiDefinition.PropertyKey(
                  clientCredentialsValue.value.headerName || "Authorization"
                ),
                description: `OAuth authentication of the form ${clientCredentialsValue.value.tokenPrefix ? `${clientCredentialsValue.value.tokenPrefix ?? "Bearer"} ` : ""}<token>.`,
                hidden: false,
                valueShape: stringShape,
                availability: undefined,
              }),
            }),
        });
      },
    });
  }

  const headers = [
    ...(authHeader ? [authHeader] : []),
    ...globalHeaders,
    ...(endpoint.requestHeaders ?? []),
  ];

  return (
    <div className="flex max-w-full flex-1 flex-col gap-12">
      {endpoint.pathParameters && endpoint.pathParameters.length > 0 && (
        <EndpointSection
          title="Path parameters"
          anchorIdParts={REQUEST_PATH}
          slug={node.slug}
        >
          <div>
            {endpoint.pathParameters.map((parameter) => (
              <div key={parameter.key}>
                <TypeComponentSeparator />
                <EndpointParameter
                  name={parameter.key}
                  shape={parameter.valueShape}
                  anchorIdParts={[...REQUEST_PATH, parameter.key]}
                  slug={node.slug}
                  description={parameter.description}
                  additionalDescriptions={
                    ApiDefinition.unwrapReference(parameter.valueShape, types)
                      .descriptions
                  }
                  availability={parameter.availability}
                  types={types}
                />
              </div>
            ))}
          </div>
        </EndpointSection>
      )}
      {headers.length > 0 && (
        <EndpointSection
          title="Headers"
          anchorIdParts={REQUEST_HEADER}
          slug={node.slug}
        >
          <div>
            {headers.map((parameter) => {
              let isAuth = false;
              if (
                (auth?.type === "header" &&
                  parameter.key === auth?.headerWireValue) ||
                parameter.key === "Authorization"
              ) {
                isAuth = true;
              }

              return (
                <div key={parameter.key} className="relative">
                  {isAuth && (
                    <div className="absolute right-0 top-3">
                      <div className="bg-tag-danger flex h-5 items-center rounded-xl px-2">
                        <span className="t-danger text-xs">Auth</span>
                      </div>
                    </div>
                  )}
                  <TypeComponentSeparator />
                  <EndpointParameter
                    name={parameter.key}
                    shape={parameter.valueShape}
                    anchorIdParts={[...REQUEST_HEADER, parameter.key]}
                    slug={node.slug}
                    description={parameter.description}
                    additionalDescriptions={
                      ApiDefinition.unwrapReference(parameter.valueShape, types)
                        .descriptions
                    }
                    availability={parameter.availability}
                    types={types}
                  />
                </div>
              );
            })}
          </div>
        </EndpointSection>
      )}
      {endpoint.queryParameters && endpoint.queryParameters.length > 0 && (
        <EndpointSection
          title="Query parameters"
          anchorIdParts={REQUEST_QUERY}
          slug={node.slug}
        >
          <div>
            {endpoint.queryParameters.map((parameter) => (
              <div key={parameter.key}>
                <TypeComponentSeparator />
                <EndpointParameter
                  name={parameter.key}
                  shape={parameter.valueShape}
                  anchorIdParts={[...REQUEST_QUERY, parameter.key]}
                  slug={node.slug}
                  description={parameter.description}
                  additionalDescriptions={
                    ApiDefinition.unwrapReference(parameter.valueShape, types)
                      .descriptions
                  }
                  availability={parameter.availability}
                  types={types}
                />
              </div>
            ))}
          </div>
        </EndpointSection>
      )}
      {endpoint.requests?.[0] != null && (
        <EndpointSection
          key={endpoint.requests[0].contentType}
          title="Request"
          anchorIdParts={REQUEST}
          slug={node.slug}
        >
          <EndpointRequestSection
            request={endpoint.requests[0]}
            anchorIdParts={REQUEST_BODY}
            slug={node.slug}
            types={types}
          />
        </EndpointSection>
      )}
      {endpoint.responses?.[0] != null && (
        <EndpointSection
          title="Response"
          anchorIdParts={RESPONSE}
          slug={node.slug}
        >
          <EndpointResponseSection
            response={endpoint.responses[0]}
            exampleResponseBody={selectedExample?.exampleCall.responseBody}
            anchorIdParts={RESPONSE_BODY}
            slug={node.slug}
            types={types}
          />
        </EndpointSection>
      )}
      {showErrors && endpoint.errors && endpoint.errors.length > 0 && (
        <EndpointSection
          title="Errors"
          anchorIdParts={RESPONSE_ERROR}
          slug={node.slug}
        >
          <div
            className="border-default flex flex-col overflow-visible rounded-lg border"
            ref={errorRef}
          >
            {sortBy(endpoint.errors, [(e) => e.statusCode, (e) => e.name]).map(
              (error, idx) => {
                return (
                  <EndpointError
                    key={idx}
                    error={error}
                    isFirst={idx === 0}
                    isLast={idx === (endpoint.errors?.length ?? 0) - 1}
                    isSelected={
                      selectedError != null &&
                      isErrorEqual(error, selectedError)
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedError(error);
                    }}
                    anchorIdParts={[
                      ...RESPONSE_ERROR,
                      `${convertNameToAnchorPart(error.name) ?? error.statusCode}`,
                    ]}
                    slug={node.slug}
                    availability={error.availability}
                    types={types}
                  />
                );
              }
            )}
          </div>
        </EndpointSection>
      )}
    </div>
  );
};

export const EndpointContentLeft = memo(UnmemoizedEndpointContentLeft);

function isErrorEqual(
  a: ApiDefinition.ErrorResponse,
  b: ApiDefinition.ErrorResponse
): boolean {
  return (
    a.statusCode === b.statusCode &&
    (a.name != null && b.name != null
      ? a.name === b.name
      : a.name == null && b.name == null)
  );
}
