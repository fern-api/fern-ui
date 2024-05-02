import { FdrAPI } from "@fern-api/fdr-sdk";
import { SnippetTemplateResolver } from "../../SnippetTemplateResolver";
import { CHAT_COMPLETION_PAYLOAD, CHAT_COMPLETION_SNIPPET } from "../octo";

describe("Snippet Template Resolver", () => {
    it("Test Snippet Template Resolution", () => {
        // Example with an object, a list of strings, a list of objects, and an enum
        const payload: FdrAPI.CustomSnippetPayload = {
            pathParameters: [{ name: "tune_id", value: "someId" }],
            queryParameters: [{ name: "offset", value: "10" }],
            requestBody: {
                prompt: "A prompt",
                negative_prompt: "A negative prompt",
                loras: { key1: "value1", key2: "value2" },
                scheduler: "PNDM",
            },
        };

        const samplerTemplate: FdrAPI.TemplateInput = {
            type: "template",
            value: {
                imports: ["from octoai.image_gen import Scheduler"],
                type: "enum",
                values: { PNDM: "OctoAI.myenum.PNDM", LMS: "LMS" },
                templateString: "sampler=$FERN_INPUT",
                templateInput: { location: "BODY", path: "scheduler" },
                isOptional: true,
            },
        };

        const lorasTemplate: FdrAPI.TemplateInput = {
            type: "template",
            value: {
                imports: [],
                type: "dict",
                containerTemplateString: "loras={$FERN_INPUT}",
                delimiter: ", ",
                keyTemplate: {
                    type: "generic",
                    templateString: "$FERN_INPUT",
                    templateInputs: [{ type: "payload", location: "RELATIVE" }],
                    isOptional: false,
                },
                valueTemplate: {
                    type: "generic",
                    templateString: "$FERN_INPUT",
                    templateInputs: [{ type: "payload", location: "RELATIVE" }],
                    isOptional: false,
                },
                keyValueSeparator: ": ",
                templateInput: { location: "BODY", path: "loras" },
                isOptional: true,
            },
        };

        const generateSdxlRequestTemplate: FdrAPI.TemplateInput = {
            type: "template",
            value: {
                imports: ["from octoai.image_gen import ImageGenerationRequest"],
                type: "generic",
                templateString: "\tImageGenerationRequest(\n\t\t$FERN_INPUT\n\t)",
                templateInputs: [
                    {
                        type: "template",
                        value: {
                            type: "generic",
                            templateString: "prompt=$FERN_INPUT",
                            templateInputs: [{ type: "payload", location: "BODY", path: "prompt" }],
                            isOptional: false,
                        },
                    },
                    {
                        type: "template",
                        value: {
                            type: "generic",
                            templateString: "negative_prompt=$FERN_INPUT",
                            templateInputs: [{ type: "payload", location: "BODY", path: "negative_prompt" }],
                            isOptional: false,
                        },
                    },
                    {
                        type: "template",
                        value: {
                            imports: [],
                            isOptional: true,
                            templateString: "tune_id=$FERN_INPUT",
                            templateInputs: [
                                {
                                    location: "PATH",
                                    path: "tune_id",
                                    type: "payload",
                                },
                            ],
                            type: "generic",
                        },
                    },
                    {
                        type: "template",
                        value: {
                            imports: [],
                            isOptional: true,
                            templateString: "offset=$FERN_INPUT",
                            templateInputs: [
                                {
                                    location: "QUERY",
                                    path: "offset",
                                    type: "payload",
                                },
                            ],
                            type: "generic",
                        },
                    },
                    lorasTemplate,
                    samplerTemplate,
                ],
                inputDelimiter: ",\n\t\t",
                isOptional: false,
            },
        };

        const functionInvocationTemplate: FdrAPI.Template = {
            imports: [],
            type: "generic",
            templateString: "client.image_gen.generate_sdxl(\n$FERN_INPUT\n)",
            templateInputs: [generateSdxlRequestTemplate],
            isOptional: false,
        };
        const endpointSnippetTemplate: FdrAPI.EndpointSnippetTemplate = {
            sdk: { type: "python", package: "acme", version: "0.0.1" },
            endpointId: { path: "/image_gen", method: "GET" },
            snippetTemplate: {
                type: "v1",
                clientInstantiation: "from octoai import AsyncAcme\n\nclient = AsyncAcme(api_key='YOUR_API_KEY')",
                functionInvocation: functionInvocationTemplate,
            },
        };
        const resolver = new SnippetTemplateResolver({ payload, endpointSnippetTemplate });
        const customSnippet = resolver.resolve();

        expect(customSnippet.type).toEqual("python");
        expect((customSnippet as FdrAPI.PythonSnippet).sync_client).toEqual(
            'from octoai.image_gen import ImageGenerationRequest\nfrom octoai.image_gen import Scheduler\n\nfrom octoai import AsyncAcme\n\nclient = AsyncAcme(api_key=\'YOUR_API_KEY\')\nclient.image_gen.generate_sdxl(\n\tImageGenerationRequest(\n\t\tprompt="A prompt",\n\t\tnegative_prompt="A negative prompt",\n\t\ttune_id="someId",\n\t\toffset="10",\n\t\tloras={"key1": "value1", "key2": "value2"},\n\t\tsampler=OctoAI.myenum.PNDM\n\t)\n)',
        );
    });

    it("Test Chat Completion snippet", () => {
        const resolver = new SnippetTemplateResolver({
            payload: CHAT_COMPLETION_PAYLOAD,
            endpointSnippetTemplate: CHAT_COMPLETION_SNIPPET,
        });
        const customSnippet = resolver.resolve();

        expect(customSnippet.type).toEqual("python");
    });
});
