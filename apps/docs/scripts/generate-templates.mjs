import fs from 'node:fs';
import path from 'node:path';

const TEMPLATES_URL = 'https://templates.dokploy.com/meta.json';
const OUTPUT_DIR = './content/docs/templates';

async function generateTemplates() {
    try {
        console.log('Fetching templates...');
        const response = await fetch(TEMPLATES_URL);
        const templates = await response.json();

        console.log(`Found ${templates.length} templates.`);

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        // Generate individual MDX files
        for (const template of templates) {
            const safeDescription = template.description.replace(/"/g, '\\"');
            const safeName = template.name.replace(/"/g, '\\"');
            const mdxContent = `---
title: "${safeName}"
description: "${safeDescription}"
---

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
