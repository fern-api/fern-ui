import { FernNavigation } from "../generated";

export type NavigationNode =
    | FernNavigation.RootNode
    | FernNavigation.VersionedNode
    | FernNavigation.TabbedNode
    | FernNavigation.SidebarRootNode
    | FernNavigation.SidebarGroupNode
    | FernNavigation.VersionNode
    | FernNavigation.TabNode
    | FernNavigation.LinkNode
    | FernNavigation.PageNode
    | FernNavigation.SectionNode
    | FernNavigation.ApiReferenceNode
    | FernNavigation.ChangelogNode
    | FernNavigation.ChangelogYearNode
    | FernNavigation.ChangelogMonthNode
    | FernNavigation.ChangelogEntryNode
    | FernNavigation.EndpointNode
    | FernNavigation.EndpointPairNode
    | FernNavigation.WebSocketNode
    | FernNavigation.WebhookNode
    | FernNavigation.ApiSectionNode;

export type NavigationNodeWithMetadata =
    | FernNavigation.RootNode
    | FernNavigation.VersionNode
    | FernNavigation.TabNode
    | FernNavigation.PageNode
    | FernNavigation.SectionNode
    | FernNavigation.ApiReferenceNode
    | FernNavigation.ChangelogNode
    | FernNavigation.ChangelogYearNode
    | FernNavigation.ChangelogMonthNode
    | FernNavigation.ChangelogEntryNode
    | FernNavigation.EndpointNode
    | FernNavigation.WebSocketNode
    | FernNavigation.WebhookNode
    | FernNavigation.ApiSectionNode;

type WithRequiredOverviewPage<T extends { overviewPageId: FernNavigation.PageId | undefined }> = T & {
    overviewPageId: FernNavigation.PageId;
};

export type NavigationNodeWithContent =
    | WithRequiredOverviewPage<FernNavigation.SectionNode>
    | WithRequiredOverviewPage<FernNavigation.ApiReferenceNode>
    | WithRequiredOverviewPage<FernNavigation.ChangelogNode>
    | WithRequiredOverviewPage<FernNavigation.ApiSectionNode>
    | FernNavigation.ChangelogEntryNode
    | FernNavigation.EndpointNode
    | FernNavigation.WebSocketNode
    | FernNavigation.WebhookNode
    | FernNavigation.PageNode;

export type NavigationLeafNode =
    | NavigationNodeWithContent
    | FernNavigation.ChangelogNode
    | FernNavigation.ChangelogYearNode
    | FernNavigation.ChangelogMonthNode;
