const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. Target the end of the Side Social Bar to inject the Mobile Bottom Bar
    const targetString = `            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- 3. Hero Section -->`;
    const targetStringLF = `            </div>\n        </div>\n    </div>\n\n    <!-- 3. Hero Section -->`;

    const mobileBarHTML = `
    <!-- Mobile Bottom Social Bar -->
    <div class="md:hidden fixed bottom-0 left-0 w-full bg-[#1A202C] z-[80] flex justify-between items-center pt-2 pb-3 px-2 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] border-t border-gray-800">
        <a href="#" class="flex flex-col items-center gap-1 group w-1/5">
            <div class="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md transform active:scale-95 transition-transform">
                <i class="fa-brands fa-whatsapp text-xl"></i>
            </div>
            <span class="text-[9px] font-bold text-white tracking-wider uppercase mt-0.5">WhatsApp</span>
        </a>
        <a href="#" class="flex flex-col items-center gap-1 group w-1/5">
            <div class="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white shadow-md transform active:scale-95 transition-transform">
                <i data-lucide="send" class="lucide send w-[18px] h-[18px]"></i>
            </div>
            <span class="text-[9px] font-bold text-white tracking-wider uppercase mt-0.5">ES Chat</span>
        </a>
        <a href="#" class="flex flex-col items-center gap-1 group w-1/5">
            <div class="w-10 h-10 rounded-full bg-[#374151] flex items-center justify-center text-white shadow-md transform active:scale-95 transition-transform">
                <i data-lucide="map-pin" class="lucide map-pin w-5 h-5"></i>
            </div>
            <span class="text-[9px] font-bold text-white tracking-wider uppercase mt-0.5">Globe</span>
        </a>
        <a href="#" class="flex flex-col items-center gap-1 group w-1/5">
            <div class="w-10 h-10 rounded-full bg-[#374151] flex items-center justify-center text-white shadow-md transform active:scale-95 transition-transform">
                <i data-lucide="phone" class="lucide phone w-[18px] h-[18px]"></i>
            </div>
            <span class="text-[9px] font-bold text-white tracking-wider uppercase mt-0.5">Call</span>
        </a>
        <a href="#" class="flex flex-col items-center gap-1 group w-1/5">
            <div class="w-10 h-10 rounded-full bg-[#374151] flex items-center justify-center text-white shadow-md transform active:scale-95 transition-transform">
                <i data-lucide="message-square" class="lucide message-square w-5 h-5"></i>
            </div>
            <span class="text-[9px] font-bold text-white tracking-wider uppercase mt-0.5">Email</span>
        </a>
    </div>`;

    if (html.includes(targetString)) {
        html = html.replace(targetString, `            </div>\r\n        </div>\r\n    </div>\r\n${mobileBarHTML}\r\n\r\n    <!-- 3. Hero Section -->`);
        console.log("Injected mobile bottom bar (CRLF)");
    } else if (html.includes(targetStringLF)) {
        html = html.replace(targetStringLF, `            </div>\n        </div>\n    </div>\n${mobileBarHTML}\n\n    <!-- 3. Hero Section -->`);
        console.log("Injected mobile bottom bar (LF)");
    } else {
        console.error("Could not find the target end of Side Social Bar.");
    }

    // 2. Add padded bottom to body to not hide text under this 80px bar
    const bodyTagPattern = /<body\s*([^>]*)>/i;
    const bodyMatch = html.match(bodyTagPattern);
    if (bodyMatch) {
       let bodyAttrs = bodyMatch[1];
       if (!bodyAttrs.includes('class=')) {
           html = html.replace(/<body([^>]*)>/i, '<body class="pb-20 md:pb-0" $1>');
       } else {
           html = html.replace(/<body([^>]*)class="([^"]*)"([^>]*)>/i, '<body$1class="$2 pb-20 md:pb-0"$3>');
       }
       console.log("Added pb-20 md:pb-0 to body tag.");
    }

    // Write the modified HTML back
    fs.writeFileSync('index.html', html);
    console.log("Done updating index.html");

} catch(e) {
    console.error("Error:", e);
}
