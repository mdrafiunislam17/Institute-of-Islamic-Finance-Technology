const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Locate the <nav> element bounds
const navStart = html.indexOf('<nav class="bg-white sticky top-0');
const navEnd = html.indexOf('</nav>', navStart) + 6;

let navHTML = html.substring(navStart, navEnd);

// 2. We need to restructure the mobile buttons (Language + Hamburger)
// Currently it's:
// <div class="hidden lg:flex items-center space-x-3"> ... </div>
// <button id="mobile-menu-btn" class="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"><i class="fa-solid fa-bars text-2xl"></i></button>

// Let's replace the whole tail end of the nav content inside the container:
const desktopButtonsPattern = '<div class="hidden lg:flex items-center space-x-3">';
const desktopButtonsStart = navHTML.indexOf(desktopButtonsPattern);
const hamburgerPattern = '<button id="mobile-menu-btn"';
const hamburgerStart = navHTML.indexOf(hamburgerPattern);
const containerEnd = navHTML.lastIndexOf('</div>', navHTML.lastIndexOf('</nav>'));

if(desktopButtonsStart !== -1 && hamburgerStart !== -1) {
    
    // We will extract everything from desktopButtonsStart to the end of the container,
    // and replace it with our unified Desktop + Mobile blocks + Sidebar HTML.
    
    const newNavTail = `
            <!-- Desktop Buttons -->
            <div class="hidden lg:flex items-center space-x-3">
                <a href="#" class="bg-britBlue text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-xs font-bold shadow hover:shadow-lg transition-all">
                    <i class="fa-solid fa-globe"></i>
                    <span>العربية</span>
                </a>
                <a href="#" class="bg-gradient-to-r from-britRed to-britDarkRed text-white px-5 py-2.5 rounded-lg shadow hover:shadow-lg transition-all text-sm font-bold whitespace-nowrap">
                    Apply Now
                </a>
            </div>

            <!-- Mobile Buttons (Visible only on lg:hidden) -->
            <div class="flex lg:hidden items-center space-x-2">
                <a href="#" class="bg-britBlue text-white px-2 py-1.5 rounded-lg flex items-center space-x-1.5 text-[10px] font-bold shadow">
                    <i class="fa-solid fa-globe"></i>
                    <span>ع</span>
                </a>
                <button id="mobile-menu-btn" class="p-2 text-gray-700 hover:bg-gray-100 bg-gray-50 rounded-lg transition-colors border border-gray-100 z-[70] relative">
                    <i class="fa-solid fa-bars text-xl" id="menu-icon"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <div id="mobile-menu-overlay" class="fixed inset-0 bg-black/50 z-[60] opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

        <!-- Mobile Sidebar Panel -->
        <div id="mobile-sidebar" class="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-[#f8f9fa] shadow-2xl z-[65] transform -translate-x-full transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-20 overflow-y-auto">
            
            <div class="flex-1 pb-20">
                <!-- Links -->
                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-home w-5 h-5 text-[#E53E3E] stroke-2"></i>
                        <span class="font-bold text-[#E53E3E] text-base">Home</span>
                    </div>
                    <div class="w-2.5 h-2.5 bg-[#E53E3E] rounded-full shadow-sm"></div>
                </a>
                
                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-info w-5 h-5 text-[#374151] stroke-2 group-hover:text-[#E53E3E] transition-colors"></i>
                        <span class="font-bold text-[#374151] group-hover:text-[#E53E3E] text-base transition-colors">About</span>
                    </div>
                    <i class="fa-solid fa-chevron-right text-xs text-gray-400 group-hover:text-[#E53E3E] transition-colors"></i>
                </a>

                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-book-open w-5 h-5 text-[#374151] stroke-2 group-hover:text-[#E53E3E] transition-colors"></i>
                        <span class="font-bold text-[#374151] group-hover:text-[#E53E3E] text-base transition-colors">Courses</span>
                    </div>
                    <i class="fa-solid fa-chevron-right text-xs text-gray-400 group-hover:text-[#E53E3E] transition-colors"></i>
                </a>

                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-file-text w-5 h-5 text-[#374151] stroke-2 group-hover:text-[#E53E3E] transition-colors"></i>
                        <span class="font-bold text-[#374151] group-hover:text-[#E53E3E] text-base transition-colors">Apply</span>
                    </div>
                    <i class="fa-solid fa-chevron-right text-xs text-gray-400 group-hover:text-[#E53E3E] transition-colors"></i>
                </a>

                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-camera w-5 h-5 text-[#374151] stroke-2 group-hover:text-[#E53E3E] transition-colors"></i>
                        <span class="font-bold text-[#374151] group-hover:text-[#E53E3E] text-base transition-colors">Gallery</span>
                    </div>
                </a>

                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-edit w-5 h-5 text-[#374151] stroke-2 group-hover:text-[#E53E3E] transition-colors"></i>
                        <span class="font-bold text-[#374151] group-hover:text-[#E53E3E] text-base transition-colors">Blog</span>
                    </div>
                </a>

                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-users w-5 h-5 text-[#374151] stroke-2 group-hover:text-[#E53E3E] transition-colors"></i>
                        <span class="font-bold text-[#374151] group-hover:text-[#E53E3E] text-base transition-colors">Agents</span>
                    </div>
                </a>

                <a href="#" class="w-full flex items-center justify-between px-6 py-4 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 border-b border-gray-200/50">
                    <div class="flex items-center gap-4">
                        <i class="lucide lucide-phone w-5 h-5 text-[#374151] stroke-2 group-hover:text-[#E53E3E] transition-colors"></i>
                        <span class="font-bold text-[#374151] group-hover:text-[#E53E3E] text-base transition-colors">Contact Us</span>
                    </div>
                </a>
            </div>
            
            <!-- Bottom language button inside sidebar -->
            <div class="p-6 mt-auto">
                <a href="#" class="w-full bg-white border-2 border-[#174DA5] text-[#174DA5] flex items-center justify-center gap-2 py-3 rounded-xl font-bold hover:bg-[#174DA5] hover:text-white transition-colors shadow-sm">
                    <i class="fa-solid fa-globe"></i> العربية
                </a>
            </div>
        </div>
    </nav>`;

    // Replace the exact chunk from desktopButtonsStart to the end of the <nav> block
    const finalNavHTML = navHTML.substring(0, desktopButtonsStart) + newNavTail.trim();
    html = html.replace(navHTML, finalNavHTML);
    
    // Now add Lucide script strictly at the bottom if not present so SVG icons load
    if (html.indexOf('lucide.createIcons') === -1) {
        html = html.replace('</body>', `    <script src="https://unpkg.com/lucide@latest"></script>\n    <script>lucide.createIcons();</script>\n</body>`);
    }
    
    // And finally add the Vanilla JS to toggle the menu logic
    const toggleScript = `
    <script>
        // Mobile Menu Toggle Logic
        document.addEventListener('DOMContentLoaded', () => {
            const btn = document.getElementById('mobile-menu-btn');
            const icon = document.getElementById('menu-icon');
            const sidebar = document.getElementById('mobile-sidebar');
            const overlay = document.getElementById('mobile-menu-overlay');
            
            let isOpen = false;
            
            function toggleMenu() {
                isOpen = !isOpen;
                if(isOpen) {
                    sidebar.classList.remove('-translate-x-full');
                    overlay.classList.remove('opacity-0', 'pointer-events-none');
                    overlay.classList.add('opacity-100', 'pointer-events-auto');
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                    document.body.style.overflow = 'hidden';
                } else {
                    sidebar.classList.add('-translate-x-full');
                    overlay.classList.remove('opacity-100', 'pointer-events-auto');
                    overlay.classList.add('opacity-0', 'pointer-events-none');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            }
            
            if (btn) {
                btn.addEventListener('click', toggleMenu);
            }
            if (overlay) {
                overlay.addEventListener('click', toggleMenu);
            }
        });
    </script>
</body>`;
    
    html = html.replace('</body>', toggleScript);

    // Write back
    fs.writeFileSync('index.html', html);
    console.log("Mobile Navbar successfully integrated.");

} else {
    console.error("Could not find the target buttons inside nav!");
}
