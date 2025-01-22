import { isEqual } from "es-toolkit/predicate";
import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { DOCS_ATOM } from "./docs";
import { EDGE_FLAGS_ATOM } from "./flags";
import { BASEPATH_ATOM } from "./navigation";
import { ImageData } from "./types";

export const LOGO_TEXT_ATOM = atom<string | undefined>((get) =>
  get(EDGE_FLAGS_ATOM).isDocsLogoTextEnabled ? "docs" : undefined
);

const INTERNAL_LOGO_ATOM = selectAtom(DOCS_ATOM, (docs) => docs.logo, isEqual);

interface LogoConfiguration {
  href: string;
  height: number;
  light: ImageData | undefined;
  dark: ImageData | undefined;
}

export const LOGO_ATOM = atom<LogoConfiguration>((get) => {
  const logo = get(INTERNAL_LOGO_ATOM);
  const basepath = get(BASEPATH_ATOM);
  return {
    href: logo.href ?? basepath ?? "/",
    height: logo.height && logo.height > 0 ? logo.height : 20,
    light: logo.light,
    dark: logo.dark,
  };
});

// export const LOGO_HREF_ATOM = atom<string | undefined>(
//   (get) => get(DOCS_ATOM).logo.href
// );
// LOGO_HREF_ATOM.debugLabel = "LOGO_HREF_ATOM";

// const DEFAULT_LOGO_HEIGHT = 20;
// export const LOGO_HEIGHT_ATOM = atom<number>(
//   (get) => get(DOCS_ATOM).logo.height ?? DEFAULT_LOGO_HEIGHT
// );
// LOGO_HEIGHT_ATOM.debugLabel = "LOGO_HEIGHT_ATOM";

// export function useLogoHeight(): number {
//   return useAtomValue(LOGO_HEIGHT_ATOM);
// }

// function isFileIdOrUrl(logo: Logo | undefined): logo is FileIdOrUrl {
//   if (logo == null) {
//     return false;
//   }
//   if (typeof logo !== "object") {
//     return false;
//   }
//   if (!("type" in logo && "value" in logo)) {
//     return false;
//   }
//   return logo.type === "fileId" || logo.type === "url";
// }

// export const LOGO_IMAGE_ATOM = atom<LogoConfiguration>((get) => {
//   const { content, colors } = get(DOCS_ATOM);
//   const markdownText =
//     content.type === "markdown-page"
//       ? content.content
//       : content.type === "changelog" && content.node.overviewPageId != null
//         ? content.pages[content.node.overviewPageId]
//         : content.type === "changelog-entry"
//           ? content.page
//           : undefined;

//   const { logo } =
//     typeof markdownText === "object"
//       ? markdownText.frontmatter
//       : EMPTY_FRONTMATTER;

//   if (logo != null && typeof logo === "object") {
//     if (
//       "light" in logo &&
//       "dark" in logo &&
//       isFileIdOrUrl(logo.light) &&
//       isFileIdOrUrl(logo.dark)
//     ) {
//       return { light: logo.light, dark: logo.dark };
//     }
//     if ("light" in logo && isFileIdOrUrl(logo.light)) {
//       return { light: logo.light, dark: logo.light };
//     }
//     if ("dark" in logo && isFileIdOrUrl(logo.dark)) {
//       return { light: logo.dark, dark: logo.dark };
//     }
//     if (isFileIdOrUrl(logo)) {
//       return { light: logo, dark: logo };
//     }
//   }

//   const light =
//     colors.light?.logo != null
//       ? { type: "fileId" as const, value: colors.light.logo }
//       : undefined;
//   const dark =
//     colors.dark?.logo != null
//       ? { type: "fileId" as const, value: colors.dark.logo }
//       : undefined;

//   return { light: light ?? dark, dark: dark ?? light };
// });
