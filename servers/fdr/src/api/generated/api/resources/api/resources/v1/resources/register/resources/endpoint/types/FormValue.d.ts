/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export declare type FormValue = FernRegistry.api.v1.register.FormValue.Json | FernRegistry.api.v1.register.FormValue.Filename | FernRegistry.api.v1.register.FormValue.Filenames | FernRegistry.api.v1.register.FormValue.FilenameWithData | FernRegistry.api.v1.register.FormValue.FilenamesWithData;
export declare namespace FormValue {
    interface Json {
        type: "json";
        value: unknown;
    }
    interface Filename {
        type: "filename";
        value: string;
    }
    interface Filenames {
        type: "filenames";
        value: string[];
    }
    interface FilenameWithData extends FernRegistry.api.v1.register.FilenameWithData {
        type: "filenameWithData";
    }
    interface FilenamesWithData {
        type: "filenamesWithData";
        value: FernRegistry.api.v1.register.FilenameWithData[];
    }
}
