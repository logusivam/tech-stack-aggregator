const fs = require('fs');
const Parser = require('rss-parser');

const parser = new Parser();
const README_FILE = 'README.md';

const FEEDS = [
    { category: 'React', url: 'https://react.dev/rss.xml' },
    { category: 'Node.js', url: 'https://nodejs.org/en/feed/blog.xml' },
    { category: 'MongoDB', url: 'https://www.mongodb.com/blog/rss' }
];

async function run() {
    let content = fs.existsSync(README_FILE) ? 
        fs.readFileSync(README_FILE, 'utf8') : 
        '# Tech Stack RSS Aggregator\n\nAutomated daily updates.\n\n';
    
    const today = new Date().toISOString().split('T')[0];
    let addedSomething = false;
    let appendString = '';

    if (!content.includes(`## ${today}`)) {
        appendString += `\n## ${today}\n`;
    }

    for (const feed of FEEDS) {
        try {
            const parsed = await parser.parseURL(feed.url);
            let categoryNewItems = [];

            for (const item of parsed.items.slice(0, 5)) {
                if (!content.includes(item.link)) {
                    categoryNewItems.push(`- [${item.title}](${item.link})`);
                }
            }

            if (categoryNewItems.length > 0) {
                appendString += `\n### ${feed.category}\n` + categoryNewItems.join('\n') + '\n';
                addedSomething = true;
            }
        } catch (err) {
            console.error(`Error fetching ${feed.category}:`, err.message);
        }
    }

    if (addedSomething) {
        fs.appendFileSync(README_FILE, appendString);
        console.log("Successfully appended new articles.");
    } else {
        console.log("No new articles found across feeds.");
    }
}

run();