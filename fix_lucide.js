const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The regex matches: class="lucide lucide-xyz [other classes]"
// We want to extract 'xyz' and append data-lucide="xyz" while keeping other classes if needed.
// Wait, my previous code wrote: <i class="lucide lucide-home w-5 h-5...">
// So let's replace `lucide lucide-([a-z-]+)` with `lucide $1` and add `data-lucide="$1"`
// Actually, I can just do a regex replace:
html = html.replace(/class="lucide lucide-([a-z-]+) ([^"]+)"/g, 'data-lucide="$1" class="lucide $1 $2"');

fs.writeFileSync('index.html', html);
console.log("Fixed Lucide icon attributes.");
