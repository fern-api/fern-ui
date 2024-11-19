import { algoliasearch } from "algoliasearch";
import { assert } from "ts-essentials";
import { browseAllObjectsForDomain } from "../algolia/browse-all-objects";
import { createAlgoliaRecords } from "../algolia/records/create-algolia-records";
import { loadDocsWithUrl } from "../fdr/load-docs-with-url";

interface AlgoliaIndexerPayload {
    /**
     * The Algolia app ID.
     */
    appId: string;

    /**
     * The Algolia admin API key.
     */
    writeApiKey: string;

    /**
     * The FDR environment to use. (either `https://registry-dev2.buildwithfern.com` or `https://registry.buildwithfern.com`)
     */
    environment: string;

    /**
     * The shared secret token use to authenticate with FDR.
     */
    fernToken: string;

    /**
     * The domain to load docs for.
     */
    domain: string;

    /**
     * The Algolia index name to use.
     */
    indexName: string;

    /**
     * Whether the docs are authed or not.
     */
    authed?: boolean;

    // feature flags for v1 -> v2 migration
    isBatchStreamToggleDisabled?: boolean;
    isApiScrollingDisabled?: boolean;
    useJavaScriptAsTypeScript?: boolean;
    alwaysEnableJavaScriptFetch?: boolean;
    usesApplicationJsonInFormDataValue?: boolean;
}

export interface AlgoliaIndexerTaskResponse {
    taskID: number;
    deletedObjectIDs: string[];
    addedObjectIDs: string[];
    updatedObjectIDs: string[];
}

export async function algoliaIndexerTask(payload: AlgoliaIndexerPayload): Promise<AlgoliaIndexerTaskResponse> {
    assert(!!payload.appId, "appId is required");
    assert(!!payload.writeApiKey, "writeApiKey is required");

    const algolia = algoliasearch(payload.appId, payload.writeApiKey);

    // load the docs
    const { org_id, root, pages, apis, domain } = await loadDocsWithUrl(payload);

    // create new records (this is the target state of the index)
    const targetRecords = createAlgoliaRecords({ root, domain, org_id, pages, apis, authed: payload.authed ?? false });

    // browse the existing records (what is currently in the index)
    const existingObjectIDs = (await browseAllObjectsForDomain(algolia, domain, payload.indexName, ["objectID"]))
        .map((object) => object.objectID)
        .filter((objectID): objectID is string => typeof objectID === "string");

    // generate a map of the created, updated, and deleted records by their objectIDs
    // the idea is that we want to delete old records a
    const targetRecordsByID = new Map(targetRecords.map((record) => [record.objectID, record]));
    const updatedObjectIDs = existingObjectIDs.filter((objectID) => targetRecordsByID.has(objectID));
    const deletedObjectIDs = existingObjectIDs.filter((objectID) => !targetRecordsByID.has(objectID));

    const updatedObjectIDsSet = new Set(updatedObjectIDs);
    const addedObjectIDs = Array.from(targetRecordsByID.keys()).filter(
        (objectID) => !updatedObjectIDsSet.has(objectID),
    );

    // TODO: add retry loop
    const response = await algolia.batch({
        indexName: payload.indexName,
        batchWriteParams: {
            requests: [
                ...deletedObjectIDs.map((objectID) => ({ action: "deleteObject" as const, body: { objectID } })),
                ...updatedObjectIDs.map((objectID) => ({
                    action: "updateObject" as const,
                    body: targetRecordsByID.get(objectID) ?? { objectID },
                })),
                ...addedObjectIDs.map((objectID) => ({
                    action: "addObject" as const,
                    body: targetRecordsByID.get(objectID) ?? { objectID },
                })),
            ],
        },
    });

    return {
        taskID: response.taskID,
        deletedObjectIDs,
        addedObjectIDs,
        updatedObjectIDs,
    };
}
