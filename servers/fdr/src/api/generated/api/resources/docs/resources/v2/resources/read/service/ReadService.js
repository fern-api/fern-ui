/**
 * This file was auto-generated by Fern from our API Definition.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import * as errors from "../../../../../../../../errors";
export class ReadService {
    constructor(methods, middleware = []) {
        this.methods = methods;
        this.router = express.Router({ mergeParams: true }).use(express.json({
            strict: false,
        }), ...middleware);
    }
    addMiddleware(handler) {
        this.router.use(handler);
        return this;
    }
    toRouter() {
        this.router.post("/organization-for-url", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getOrganizationForUrl(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "DomainNotRegisteredError":
                            break;
                        default:
                            console.warn(`Endpoint 'getOrganizationForUrl' unexpectedly threw ${error.constructor.name}.` +
                                ` If this was intentional, please add ${error.constructor.name} to` +
                                " the endpoint's errors list in your Fern Definition.");
                    }
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/load-with-url", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getDocsForUrl(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "DomainNotRegisteredError":
                        case "UnauthorizedError":
                            break;
                        default:
                            console.warn(`Endpoint 'getDocsForUrl' unexpectedly threw ${error.constructor.name}.` +
                                ` If this was intentional, please add ${error.constructor.name} to` +
                                " the endpoint's errors list in your Fern Definition.");
                    }
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/private/load-with-url", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getPrivateDocsForUrl(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "DomainNotRegisteredError":
                        case "UnauthorizedError":
                            break;
                        default:
                            console.warn(`Endpoint 'getPrivateDocsForUrl' unexpectedly threw ${error.constructor.name}.` +
                                ` If this was intentional, please add ${error.constructor.name} to` +
                                " the endpoint's errors list in your Fern Definition.");
                    }
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.get("/:docsConfigId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getDocsConfigById(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "DocsDefinitionNotFoundError":
                            break;
                        default:
                            console.warn(`Endpoint 'getDocsConfigById' unexpectedly threw ${error.constructor.name}.` +
                                ` If this was intentional, please add ${error.constructor.name} to` +
                                " the endpoint's errors list in your Fern Definition.");
                    }
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/search-api-key-with-index-segment", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getSearchApiKeyForIndexSegment(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "IndexSegmentNotFoundError":
                            break;
                        default:
                            console.warn(`Endpoint 'getSearchApiKeyForIndexSegment' unexpectedly threw ${error.constructor.name}.` +
                                ` If this was intentional, please add ${error.constructor.name} to` +
                                " the endpoint's errors list in your Fern Definition.");
                    }
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        return this.router;
    }
}
