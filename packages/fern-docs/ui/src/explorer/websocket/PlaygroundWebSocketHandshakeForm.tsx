import type { WebSocketContext } from "@fern-api/fdr-sdk/api-definition";
import { FernCard } from "@fern-docs/components";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Callout } from "../../mdx/components/callout";
import { ExplorerAuthorizationFormCard } from "../auth";
import { ExplorerObjectPropertiesForm } from "../form/ExplorerObjectPropertyForm";
import { ExplorerWebSocketRequestFormState } from "../types";

interface ExplorerWebSocketHandshakeFormProps {
  context: WebSocketContext;
  formState: ExplorerWebSocketRequestFormState;
  setFormState: Dispatch<SetStateAction<ExplorerWebSocketRequestFormState>>;
  error: string | null;
  disabled: boolean;
}

export const ExplorerWebSocketHandshakeForm: FC<
  ExplorerWebSocketHandshakeFormProps
> = ({ context, formState, setFormState, error, disabled }) => {
  const setHeaders = useCallback(
    (value: ((old: unknown) => unknown) | unknown) => {
      setFormState((state) => ({
        ...state,
        headers: typeof value === "function" ? value(state.headers) : value,
      }));
    },
    [setFormState]
  );

  const setPathParameters = useCallback(
    (value: ((old: unknown) => unknown) | unknown) => {
      setFormState((state) => ({
        ...state,
        pathParameters:
          typeof value === "function" ? value(state.pathParameters) : value,
      }));
    },
    [setFormState]
  );

  const setQueryParameters = useCallback(
    (value: ((old: unknown) => unknown) | unknown) => {
      setFormState((state) => ({
        ...state,
        queryParameters:
          typeof value === "function" ? value(state.queryParameters) : value,
      }));
    },
    [setFormState]
  );

  if (
    error == null &&
    context.auth == null &&
    (context.channel.requestHeaders == null ||
      context.channel.requestHeaders.length === 0) &&
    (context.channel.pathParameters == null ||
      context.channel.pathParameters.length === 0) &&
    (context.channel.queryParameters == null ||
      context.channel.queryParameters.length === 0)
  ) {
    return null;
  }

  const { auth, channel, types, globalHeaders } = context;

  const headers = [...globalHeaders, ...(channel.requestHeaders ?? [])];

  return (
    <>
      {error != null && (
        <Callout intent="error">
          <div className="text-base">{error}</div>
        </Callout>
      )}

      {auth != null && (
        <ExplorerAuthorizationFormCard auth={auth} disabled={disabled} />
      )}

      <div className="col-span-2 space-y-8">
        {headers.length > 0 && (
          <div>
            <div className="mb-4 px-4">
              <h5 className="t-muted m-0">Headers</h5>
            </div>
            <FernCard className="rounded-xl p-4 shadow-sm">
              <ExplorerObjectPropertiesForm
                id="header"
                properties={headers}
                extraProperties={undefined}
                onChange={setHeaders}
                value={formState?.headers}
                types={types}
                disabled={disabled}
              />
            </FernCard>
          </div>
        )}

        {channel.pathParameters && channel.pathParameters.length > 0 && (
          <div>
            <div className="mb-4 px-4">
              <h5 className="t-muted m-0">Path Parameters</h5>
            </div>
            <FernCard className="rounded-xl p-4 shadow-sm">
              <ExplorerObjectPropertiesForm
                id="path"
                properties={channel.pathParameters}
                extraProperties={undefined}
                onChange={setPathParameters}
                value={formState?.pathParameters}
                types={types}
                disabled={disabled}
              />
            </FernCard>
          </div>
        )}

        {channel.queryParameters && channel.queryParameters.length > 0 && (
          <div>
            <div className="mb-4 px-4">
              <h5 className="t-muted m-0">Query Parameters</h5>
            </div>
            <FernCard className="rounded-xl p-4 shadow-sm">
              <ExplorerObjectPropertiesForm
                id="query"
                properties={channel.queryParameters}
                extraProperties={undefined}
                onChange={setQueryParameters}
                value={formState?.queryParameters}
                types={types}
                disabled={disabled}
              />
            </FernCard>
          </div>
        )}
      </div>

      <hr />
    </>
  );
};
