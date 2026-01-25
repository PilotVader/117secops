const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const LABS_DIR = path.join(process.cwd(), 'content', 'labs');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'data', 'labs-projects.json');

function generateLabsData() {
    if (!fs.existsSync(LABS_DIR)) {
        console.log('No labs directory found.');
        return;
    }

    const files = fs.readdirSync(LABS_DIR);
    const projects = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const filePath = path.join(LABS_DIR, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            return {
                slug: file.replace('.md', ''),
                ...data,
                content
            };
        });

    // Sort by status if needed, or manual order
    // For now, Active Development > Prototype > Archived could be a logic, or simple date/featured

    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
    console.log(`Labs data generated! Found ${projects.length} projects.`);
}

generateLabsData();
