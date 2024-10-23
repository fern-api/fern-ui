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
import * as errors from "../../../../../../errors/index";
export class V3Service {
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
        this.router.get("/load/:domain/organization", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getOrganization(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                        case "NotFoundError":
                            break;
                        default:
                            console.warn(`Endpoint 'getOrganization' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.get("/load/:domain/instance/:id/navigation", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getNavigation(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                        case "NotFoundError":
                            break;
                        default:
                            console.warn(`Endpoint 'getNavigation' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.get("/load/:domain/instance/:id/config", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getConfig(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                        case "NotFoundError":
                            break;
                        default:
                            console.warn(`Endpoint 'getConfig' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.post("/load/:domain/instance/:id/files", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getFilesMetadata(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                            break;
                        default:
                            console.warn(`Endpoint 'getFilesMetadata' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.post("/register/:organization/preview", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.startDocsPreview(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                            break;
                        default:
                            console.warn(`Endpoint 'startDocsPreview' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.post("/register/:organization/init/:domain", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.startDocsRegister(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                        case "BadRequestError":
                            break;
                        default:
                            console.warn(`Endpoint 'startDocsRegister' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.put("/register/:organization/job/:docsRegistrationId/metadata", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.finishDocsRegister(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                        case "NotFoundError":
                        case "BadRequestError":
                            break;
                        default:
                            console.warn(`Endpoint 'finishDocsRegister' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.post("/revalidate/:domain", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.startDocsRevalidation(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                        case "NotFoundError":
                        case "BadRequestError":
                            break;
                        default:
                            console.warn(`Endpoint 'startDocsRevalidation' unexpectedly threw ${error.constructor.name}.` +
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
        this.router.get("/revalidate/:domain/status", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.getDocsRevalidationStatus(req, {
                    send: (responseBody) => __awaiter(this, void 0, void 0, function* () {
                        res.json(responseBody);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                }, next);
                next();
            }
            catch (error) {
                if (error instanceof errors.FernRegistryError) {
                    switch (error.errorName) {
                        case "UnauthorizedError":
                            break;
                        default:
                            console.warn(`Endpoint 'getDocsRevalidationStatus' unexpectedly threw ${error.constructor.name}.` +
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
