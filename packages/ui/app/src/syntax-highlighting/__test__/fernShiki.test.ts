import { getHighlighterInstance, highlightTokens } from "../fernShiki";

describe("fernShiki", () => {
    it("should highlight diff", async () => {
        const highlighter = await getHighlighterInstance("diff");
        expect(highlighter.getLoadedLanguages()).toContain("diff");
        const result = highlightTokens(
            highlighter,
            `*** file1.txt   Thu Jan 11 08:52:37 2018                                                                                                         
--- file2.txt   Thu Jan 11 08:53:01 2018                                                                                                         
***************                                                                                                                                  
*** 1,4 ****                                                                                                                                     
  cat                                                                                                                                            
- mv                                                                                                                                             
- comm                                                                                                                                           
  cp                                                                                                                                             
--- 1,4 ----                                                                                                                                     
  cat                                                                                                                                            
  cp                                                                                                                                             
+ diff                                                                                                                                           
+ comm`,
            "diff",
        );
        expect(result).toMatchInlineSnapshot(`
          {
            "code": "*** file1.txt   Thu Jan 11 08:52:37 2018                                                                                                         
          --- file2.txt   Thu Jan 11 08:53:01 2018                                                                                                         
          ***************                                                                                                                                  
          *** 1,4 ****                                                                                                                                     
            cat                                                                                                                                            
          - mv                                                                                                                                             
          - comm                                                                                                                                           
            cp                                                                                                                                             
          --- 1,4 ----                                                                                                                                     
            cat                                                                                                                                            
            cp                                                                                                                                             
          + diff                                                                                                                                           
          + comm",
            "hast": {
              "children": [
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "*** file1.txt   Thu Jan 11 08:52:37 2018                                                                                                         ",
                                },
                              ],
                              "properties": {
                                "style": "color:#B31D28;--shiki-dark:#FDAEB7",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "--- file2.txt   Thu Jan 11 08:53:01 2018                                                                                                         ",
                                },
                              ],
                              "properties": {
                                "style": "color:#B31D28;--shiki-dark:#FDAEB7",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "***************                                                                                                                                  ",
                                },
                              ],
                              "properties": {
                                "style": "color:#24292E;--shiki-dark:#E1E4E8",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "*** 1,4 ****                                                                                                                                     ",
                                },
                              ],
                              "properties": {
                                "style": "color:#B31D28;--shiki-dark:#FDAEB7",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "  cat                                                                                                                                            ",
                                },
                              ],
                              "properties": {
                                "style": "color:#24292E;--shiki-dark:#E1E4E8",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "- mv                                                                                                                                             ",
                                },
                              ],
                              "properties": {
                                "style": "color:#B31D28;--shiki-dark:#FDAEB7",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "- comm                                                                                                                                           ",
                                },
                              ],
                              "properties": {
                                "style": "color:#B31D28;--shiki-dark:#FDAEB7",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "  cp                                                                                                                                             ",
                                },
                              ],
                              "properties": {
                                "style": "color:#24292E;--shiki-dark:#E1E4E8",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "--- 1,4 ----                                                                                                                                     ",
                                },
                              ],
                              "properties": {
                                "style": "color:#B31D28;--shiki-dark:#FDAEB7",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "  cat                                                                                                                                            ",
                                },
                              ],
                              "properties": {
                                "style": "color:#24292E;--shiki-dark:#E1E4E8",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "  cp                                                                                                                                             ",
                                },
                              ],
                              "properties": {
                                "style": "color:#24292E;--shiki-dark:#E1E4E8",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "+ diff                                                                                                                                           ",
                                },
                              ],
                              "properties": {
                                "style": "color:#22863A;--shiki-dark:#85E89D",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                        {
                          "type": "text",
                          "value": "
          ",
                        },
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "+ comm",
                                },
                              ],
                              "properties": {
                                "style": "color:#22863A;--shiki-dark:#85E89D",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                      ],
                      "properties": {},
                      "tagName": "code",
                      "type": "element",
                    },
                  ],
                  "properties": {
                    "class": "shiki shiki-themes github-light github-dark",
                    "style": "background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8",
                    "tabindex": "0",
                  },
                  "tagName": "pre",
                  "type": "element",
                },
              ],
              "type": "root",
            },
            "lang": "diff",
          }
        `);
    });

    it("should highlight ts", async () => {
        const highlighter = await getHighlighterInstance("typescript");
        const result = highlightTokens(highlighter, "const a = 1", "typescript");
        expect(result).toMatchInlineSnapshot(`
          {
            "code": "const a = 1",
            "hast": {
              "children": [
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": "const",
                                },
                              ],
                              "properties": {
                                "style": "color:#D73A49;--shiki-dark:#F97583",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": " a",
                                },
                              ],
                              "properties": {
                                "style": "color:#005CC5;--shiki-dark:#79B8FF",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": " =",
                                },
                              ],
                              "properties": {
                                "style": "color:#D73A49;--shiki-dark:#F97583",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                            {
                              "children": [
                                {
                                  "type": "text",
                                  "value": " 1",
                                },
                              ],
                              "properties": {
                                "style": "color:#005CC5;--shiki-dark:#79B8FF",
                              },
                              "tagName": "span",
                              "type": "element",
                            },
                          ],
                          "properties": {
                            "class": "line",
                          },
                          "tagName": "span",
                          "type": "element",
                        },
                      ],
                      "properties": {},
                      "tagName": "code",
                      "type": "element",
                    },
                  ],
                  "properties": {
                    "class": "shiki shiki-themes github-light github-dark",
                    "style": "background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8",
                    "tabindex": "0",
                  },
                  "tagName": "pre",
                  "type": "element",
                },
              ],
              "type": "root",
            },
            "lang": "typescript",
          }
        `);
    });
});
