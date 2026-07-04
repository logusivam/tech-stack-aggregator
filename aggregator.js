const fs = require('fs');
const Parser = require('rss-parser');

const parser = new Parser();
const README_FILE = 'README.md';

const FEEDS = [
    { category: 'React', url: 'https://react.dev/rss.xml' },
    { category: 'Node.js', url: 'https://nodejs.org/en/feed/blog.xml' },
    { category: 'MongoDB', url: 'https://www.mongodb.com/blog/rss' },
    { category: 'Tailwind CSS', url: 'https://tailwindcss.com/feeds/feed.xml' },
    { category: 'Python', url: 'https://blog.python.org/feeds/posts/default?alt=rss' },
    { category: 'SQL (PostgreSQL)', url: 'https://www.postgresql.org/news.rss' }
];

async function run() {
    // 1. Load existing README or create the initial structure
    let content = fs.existsSync(README_FILE) ? 
        fs.readFileSync(README_FILE, 'utf8') : 
        '# Tech Stack RSS Aggregator\n\nAutomated daily updates.\n\n';
    
    const today = new Date().toISOString().split('T')[0];
    let addedSomething = false;
    let appendString = '';

    // 2. Add the date header only if it doesn't already exist in the file
    if (!content.includes(`## ${today}`)) {
        appendString += `\n## ${today}\n`;
    }

    // 3. Fetch and parse feeds
    for (const feed of FEEDS) {
        try {
            const parsed = await parser.parseURL(feed.url);
            let categoryNewItems = [];

            // Check the latest 5 articles per feed
            for (const item of parsed.items.slice(0, 5)) {
                // Prevent duplicates by checking if the exact URL is already in the README
                if (!content.includes(item.link)) {
                    categoryNewItems.push(`- [${item.title}](${item.link})`);
                }
            }

            // Group new articles under their category heading
            if (categoryNewItems.length > 0) {
                appendString += `\n### ${feed.category}\n` + categoryNewItems.join('\n') + '\n';
                addedSomething = true;
            }
        } catch (err) {
            console.error(`Error fetching ${feed.category}:`, err.message);
        }
    }

    // 4. Append to README if new content was found
    if (addedSomething) {
        fs.appendFileSync(README_FILE, appendString);
        console.log("Successfully appended new articles.");
    } else {
        console.log("No new articles found across feeds.");
    }
}

run();