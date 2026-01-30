import fs from 'node:fs';
import path from 'node:path';

const TEMPLATES_URL = 'https://templates.dokploy.com/meta.json';
const BASE_BLUEPRINT_URL = 'https://templates.dokploy.com/blueprints';
const OUTPUT_DIR = './content/docs/templates';

async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (e) {
        clearTimeout(id);
        throw e;
    }
}

async function getTemplateFile(id, fileName) {
    try {
        const response = await fetchWithTimeout(`${BASE_BLUEPRINT_URL}/${id}/${fileName}`);
        if (!response.ok) return null;
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${fileName} for ${id}:`, error.message);
        return null;
    }
}

/** Normalize and indent code so it renders correctly inside MDX code blocks (preserves YAML/TOML formatting). */
function formatCodeForMdx(code) {
    if (!code || !code.trim()) return '# Not available';
    return code
        .replace(/\r\n/g, '\n')
        .trim()
        .split('\n')
        .map((line) => line.trimEnd())
        .join('\n')
        .split('\n')
        .map(line => `    ${line}`)
        .join('\n');
}

/** Build Base64 payload for Dokploy import (same format as UI: compose + config as JSON, then base64). */
function templateToBase64(dockerCompose, config) {
    const configObj = {
        compose: dockerCompose || '',
        config: config || '',
    };
    const jsonString = JSON.stringify(configObj, null, 2);
    return Buffer.from(jsonString, 'utf-8').toString('base64');
}

async function generateTemplates() {
    try {
        console.log('Fetching templates metadata...');
        const response = await fetch(TEMPLATES_URL);
        const templates = await response.json();

        console.log(`Found ${templates.length} templates. Starting data collection...`);

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        const batchSize = 10;
        for (let i = 0; i < templates.length; i += batchSize) {
            const batch = templates.slice(i, i + batchSize);
            console.log(`Processing batch ${i / batchSize + 1}/${Math.ceil(templates.length / batchSize)}...`);
            
            await Promise.all(batch.map(async (template) => {
                const composeYaml = await getTemplateFile(template.id, 'docker-compose.yml');
                const templateToml = await getTemplateFile(template.id, 'template.toml');
                const instructionsRaw = await getTemplateFile(template.id, 'instructions.md');
                const hasRealInstructions =
                    instructionsRaw &&
                    instructionsRaw.trim().length > 0 &&
                    !/^\s*<!doctype/i.test(instructionsRaw.trim()) &&
                    !/^\s*<html\b/i.test(instructionsRaw.trim());
                const instructionsSafe = hasRealInstructions
                    ? instructionsRaw.trim().replace(/\$\{/g, '\\${')
                    : '';
                const safeDescription = template.description.replace(/"/g, '\\"');
                const safeName = template.name.replace(/"/g, '\\"');
                const logoUrl = `${BASE_BLUEPRINT_URL}/${template.id}/${template.logo}`;

                const mdxContent = `---
title: "${safeName}"
description: "${safeDescription}"
---

<ImageZoom
  src="${logoUrl}"
  alt="${template.name} logo"
  width={100}
  height={100}
  className="my-8 rounded-xl"
/>

## Configuration

<Tabs items={["docker-compose.yml", "template.toml"]}>
  <Tab value="docker-compose.yml">
    \`\`\`yaml
${formatCodeForMdx(composeYaml)}
    \`\`\`
  </Tab>
  <Tab value="template.toml">
    \`\`\`toml
${formatCodeForMdx(templateToml)}
    \`\`\`
  </Tab>
</Tabs>

## Base64

To import this template in Dokploy: create a **Compose** service → **Advanced** → **Base64 import** and paste the content below:

\`\`\`text
${templateToBase64(composeYaml, templateToml)}
\`\`\`
${instructionsSafe ? `

## Instructions

${instructionsSafe}
` : ''}

## Links
${template.links.website ? `- [Website](${template.links.website})` : ''}
${template.links.github ? `- [Github](${template.links.github})` : ''}
${template.links.docs ? `- [Documentation](${template.links.docs})` : ''}

## Tags
${template.tags.map(tag => `\`${tag}\``).join(', ')}

---

Version: \`${template.version}\`
`;
                fs.writeFileSync(path.join(OUTPUT_DIR, `${template.id}.mdx`), mdxContent);
            }));
        }

        // Generate index.mdx
        const indexContent = `---
title: Introduction
description: Browse our collection of ${templates.length}+ self-hosted open source templates
---

# Templates

Welcome to the Dokploy Templates collection. We currently have **${templates.length}+** pre-configured templates that you can deploy with a single click.

Our templates cover a wide range of categories, including:
- **Databases**: PostgreSQL, MySQL, MongoDB, Redis, and more.
- **CMS**: WordPress, Ghost, Straple, Directus.
- **Analytics**: Umami, Plausible, Ackee.
- **Development Tools**: Gitea, Jenkins, Woodpecker CI.
- **And much more!**

Explore the sidebar to find the template you need.

`;
        fs.writeFileSync(path.join(OUTPUT_DIR, 'index.mdx'), indexContent);

        // Update meta.json with all template IDs
        const metaContent = {
            title: "Templates",
            description: `Browse our collection of ${templates.length}+ self-hosted open source templates`,
            icon: "LayoutGrid",
            root: true,
            pages: [
                "index",
                "---Templates---",
                ...templates.map(t => t.id)
            ]
        };
        fs.writeFileSync(path.join(OUTPUT_DIR, 'meta.json'), JSON.stringify(metaContent, null, 2));

        console.log('✓ Successfully generated template documentation');
    } catch (error) {
        console.error('Error generating templates:', error);
        process.exit(1);
    }
}

generateTemplates();
