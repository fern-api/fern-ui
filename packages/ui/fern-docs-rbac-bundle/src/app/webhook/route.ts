import { getWorkosWebhookSecret, workos } from "@/workos";
import { WarrantOp } from "@workos-inc/node";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const sigHeader = request.headers.get("workos-signature");

    if (!sigHeader) {
        return new NextResponse(null, { status: 400 });
    }

    const payload = await request.json();

    const client = workos();

    const verified = await client.webhooks.verifyHeader({
        sigHeader,
        payload,
        secret: getWorkosWebhookSecret(),
    });

    if (!verified) {
        return new NextResponse(null, { status: 400 });
    }

    const event = await client.webhooks.constructEvent({
        sigHeader,
        payload,
        secret: getWorkosWebhookSecret(),
    });

    if (event.event === "user.created" || event.event === "user.updated") {
        await client.fga.createResource({
            resource: {
                resourceType: "user",
                resourceId: event.data.email,
            },
            meta: {
                firstName: event.data.firstName,
                lastName: event.data.lastName,
                profilePictureUrl: event.data.profilePictureUrl,
                pendingInvite: null,
            },
        });
    } else if (event.event === "user.deleted") {
        await client.fga.deleteResource({
            resourceType: "user",
            resourceId: event.data.email,
        });
    } else if (event.event === "organization_membership.created" || event.event === "organization_membership.updated") {
        const org = await client.organizations.getOrganization(event.data.organizationId);
        const user = await client.userManagement.getUser(event.data.userId);
        await client.fga.writeWarrant({
            // if the user is inactive, we should delete the warrant
            op: event.data.status === "inactive" ? WarrantOp.Delete : WarrantOp.Create,
            resource: {
                resourceType: "org",
                resourceId: org.name,
            },
            relation: event.data.role.slug === "admin" ? "admin" : "member",
            subject: {
                resourceType: "user",
                resourceId: user.email,
            },
        });
    } else if (event.event === "organization_membership.deleted") {
        const org = await client.organizations.getOrganization(event.data.organizationId);
        const user = await client.userManagement.getUser(event.data.userId);
        await client.fga.writeWarrant({
            op: WarrantOp.Delete,
            resource: {
                resourceType: "org",
                resourceId: org.name,
            },
            relation: event.data.role.slug === "admin" ? "admin" : "member",
            subject: {
                resourceType: "user",
                resourceId: user.email,
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
