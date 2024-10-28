import { AuthorizationURLOptions, WorkOS } from "@workos-inc/node";

export const workos = new WorkOS(getWorkOSApiKey());

export function getWorkOSApiKey(): string {
    const apiKey = process.env.WORKOS_API_KEY;

    if (apiKey != null) {
        return apiKey;
    }

    throw new Error("WORKOS_API_KEY is not set");
}

export function getWorkOSClientId(): string {
    const clientId = process.env.WORKOS_CLIENT_ID;

    if (clientId != null) {
        return clientId;
    }

    throw new Error("WORKOS_CLIENT_ID is not set");
}

export function getJwtSecretKey(): string {
    const secret = process.env.JWT_SECRET_KEY;

    if (secret != null) {
        return secret;
    }

    throw new Error("JWT_SECRET_KEY is not set");
}

export function getAuthorizationUrl(options: Omit<AuthorizationURLOptions, "provider" | "clientId">): string {
    const authorizationUrl = workos.sso.getAuthorizationUrl({
        ...options,
        provider: "authkit",
        clientId: getWorkOSClientId(),
        // The endpoint that WorkOS will redirect to after a user authenticates
        redirectUri: options.redirectUri,
    });
    return authorizationUrl;
}
