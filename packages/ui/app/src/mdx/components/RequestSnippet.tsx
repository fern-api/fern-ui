import { APIV1Read } from "@fern-api/fdr-sdk";
import { EMPTY_OBJECT } from "@fern-ui/core-utils";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import { CodeExampleClientDropdown } from "../../api-page/endpoints/CodeExampleClientDropdown";
import { EndpointUrlWithOverflow } from "../../api-page/endpoints/EndpointUrlWithOverflow";
import { CodeExample, CodeExampleGroup, generateCodeExamples } from "../../api-page/examples/code-example";
import { CodeSnippetExample } from "../../api-page/examples/CodeSnippetExample";
import { useNavigationContext } from "../../contexts/navigation-context";
import { FERN_LANGUAGE_ATOM } from "../../sidebar/atom";
import { findEndpoint } from "../../util/processRequestSnippetComponents";
import { ResolvedEndpointDefinition } from "../../util/resolver";

export declare namespace RequestSnippet {
    export interface Props {
        path: string;
        method: APIV1Read.HttpMethod;
    }
}

const selectedClientAtom = atom<Record<string, CodeExample | undefined>>({});

function useSelectedClient(
    path: string,
    method: string,
    clients: CodeExampleGroup[],
): [CodeExample | undefined, (nextClient: CodeExample) => void] {
    const [selectedLanguage, setSelectedLanguage] = useAtom(FERN_LANGUAGE_ATOM);
    const [selectedClientMap, setSelectedClientMap] = useAtom(selectedClientAtom);
    const selectedClient =
        selectedClientMap[`${path}-${method}`] ??
        clients.find((c) => c.language === selectedLanguage)?.examples[0] ??
        clients[0]?.examples[0];

    const setSelectedClient = useCallback(
        (nextClient: CodeExample | ((prev: CodeExample | undefined) => CodeExample | undefined)) => {
            setSelectedClientMap((prev) => ({
                ...prev,
                [`${path}-${method}`]: typeof nextClient === "function" ? nextClient(selectedClient) : nextClient,
            }));
        },
        [setSelectedClientMap, path, method, selectedClient],
    );

    useEffect(() => {
        setSelectedClient((prev) => clients.find((c) => c.language === selectedLanguage)?.examples[0] ?? prev);
    }, [clients, selectedLanguage, setSelectedClient]);

    const handleClickClient = useCallback(
        (nextClient: CodeExample) => {
            setSelectedClient(nextClient);
            setSelectedLanguage(nextClient.language);
        },
        [setSelectedClient, setSelectedLanguage],
    );

    return [selectedClient, handleClickClient];
}

export const EndpointRequestSnippet: React.FC<React.PropsWithChildren<RequestSnippet.Props>> = ({ path, method }) => {
    const { resolvedPath } = useNavigationContext();

    const endpoint = useMemo(() => {
        if (resolvedPath.type !== "custom-markdown-page") {
            return;
        }
        let endpoint: ResolvedEndpointDefinition | undefined;
        for (const api of Object.values(resolvedPath.apis)) {
            endpoint = findEndpoint({
                api,
                path,
                method,
            });
            if (endpoint) {
                break;
            }
        }
        return endpoint;
    }, [method, path, resolvedPath]);

    const clients = useMemo(() => generateCodeExamples(endpoint?.examples ?? []), [endpoint?.examples]);
    const [selectedClient, setSelectedClient] = useSelectedClient(path, method, clients);

    if (endpoint == null || selectedClient == null) {
        return null;
    }

    return (
        <CodeSnippetExample
            title={
                <EndpointUrlWithOverflow
                    path={endpoint.path}
                    method={method}
                    environment={endpoint.defaultEnvironment?.baseUrl}
                />
            }
            type="primary"
            actions={
                clients.length > 1 ? (
                    <CodeExampleClientDropdown
                        clients={clients}
                        onClickClient={setSelectedClient}
                        selectedClient={selectedClient}
                    />
                ) : undefined
            }
            code={selectedClient.code}
            language={selectedClient.language}
            json={EMPTY_OBJECT}
        />
    );
};

export const EndpointResponseSnippet: React.FC<React.PropsWithChildren<RequestSnippet.Props>> = ({ path, method }) => {
    const { resolvedPath } = useNavigationContext();

    const endpoint = useMemo(() => {
        if (resolvedPath.type !== "custom-markdown-page") {
            return;
        }
        let endpoint: ResolvedEndpointDefinition | undefined;
        for (const api of Object.values(resolvedPath.apis)) {
            endpoint = findEndpoint({
                api,
                path,
                method,
            });
            if (endpoint) {
                break;
            }
        }
        return endpoint;
    }, [method, path, resolvedPath]);

    const clients = useMemo(() => generateCodeExamples(endpoint?.examples ?? []), [endpoint?.examples]);
    const [selectedClient] = useSelectedClient(path, method, clients);

    if (endpoint == null) {
        return null;
    }

    const responseJson = selectedClient?.exampleCall.responseBody?.value;

    if (responseJson == null) {
        return null;
    }

    const responseJsonString = JSON.stringify(responseJson, null, 2);

    return (
        <CodeSnippetExample
            title="Response"
            type="primary"
            // actions={undefined}
            code={responseJsonString}
            language="json"
            json={responseJson}
        />
    );
};
