

const path = require("path");

module.exports = function (plop) {
  plop.setGenerator("page", {
    description: "Generate page component with hook, service, and types",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Page name (e.g., auth/reset-password):",
      },
    ],
    actions: function (data) {
      const fullPath = data.name.toLowerCase(); // e.g., auth/reset-password
      const pathParts = fullPath.split("/");
      const baseName = pathParts[pathParts.length - 1];
      const isNested = pathParts.length > 1;

      const properCaseBase = baseName
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join("");

      const basePath = `src/app/${fullPath}`;

      // Inject into template context
      data.fullPath = fullPath;
      data.baseName = baseName;
      data.properCaseBase = properCaseBase;

      const actions = [
        {
          type: "add",
          path: `${basePath}/${baseName}.page.tsx`,
          template: `
import { use${properCaseBase} } from './${baseName}.controller';

export default function ${properCaseBase}Page() {
  const { data } = use${properCaseBase}();

  return (
    <div>
      <h1>${properCaseBase} Page</h1>
    </div>
  );
}
          `.trim(),
        },
        {
          type: "add",
          path: `${basePath}/${baseName}.controller.ts`,
          template: `
import { useState } from 'react';
import type { ${properCaseBase}Type } from './${baseName}.type';

export function use${properCaseBase}() {
  const [data, setData] = useState<${properCaseBase}Type[]>([]);
  return { data, setData };
}
          `.trim(),
        },
        {
          type: "add",
          path: `${basePath}/${baseName}.service.ts`,
          template: `
import axios from 'axios';
import type { ${properCaseBase}Type } from './${baseName}.type';

const baseUrl = '/api/${fullPath}';

export async function get${properCaseBase}(): Promise<${properCaseBase}Type[]> {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error: any) {
    return error
  }
}
          `.trim(),
        },
        {
          type: "add",
          path: `${basePath}/${baseName}.type.ts`,
          template: `
export type ${properCaseBase}Type = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
          `.trim(),
        },
      ];

      // Only generate .module.tsx + append route if NOT nested
      if (!isNested) {
        actions.push(
          {
            type: "add",
            path: `${basePath}/${baseName}.route.tsx`,
            template: `
import type { RouteObject } from 'react-router-dom';
import { default as ${properCaseBase}Page } from './${baseName}.page';

export const ${properCaseBase}Route: RouteObject = {
  path: '${fullPath}',
  children: [
    {
      index: true,
      element: <${properCaseBase}Page />
    }
  ]
};
            `.trim(),
          },
          {
            type: "append",
            path: "src/routes/routes.ts",
            pattern: /(import .*?Route.*?;)/s,
            template: `import { {{properCaseBase}}Route } from "../app/{{fullPath}}/{{baseName}}.route";`,
          },
          {
            type: "append",
            path: "src/routes/routes.ts",
            pattern: /(export const AllRoutes: RouteObject\[\] = \[\n?)/,
            template: `  {{properCaseBase}}Route,\n`,
          }
        );
      }

      return actions;
    },
  });
};
