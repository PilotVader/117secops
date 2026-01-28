const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BUILDS_DIR = path.join(process.cwd(), 'content', 'builds');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'data', 'builds-projects.json');

function generateBuildsData() {
    if (!fs.existsSync(BUILDS_DIR)) {
        console.log('No builds directory found.');
        return;
    }

    const files = fs.readdirSync(BUILDS_DIR);
    const projects = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const filePath = path.join(BUILDS_DIR, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            return {
                slug: file.replace('.md', ''),
                ...data,
                content
            };
        });

    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
    console.log(`Builds data generated! Found ${projects.length} projects.`);
}

generateBuildsData();
