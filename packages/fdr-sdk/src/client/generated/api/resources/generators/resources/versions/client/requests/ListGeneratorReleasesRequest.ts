/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         page: 1,
 *         page_size: 1
 *     }
 */
export interface ListGeneratorReleasesRequest {
    /**
     * The page integer to retrieve. Defaults to 0.
     */
    page?: number;
    /**
     * The integer of items to retrieve per page. Defaults to 20.
     */
    page_size?: number;
}
