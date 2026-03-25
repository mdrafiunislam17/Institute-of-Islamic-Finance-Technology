const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. Extract the background from "Why Study"
    // Starts exactly at: <!-- 6 & 7. "Why Study English in Malaysia?" and CTA (Perfect Match) -->
    const startMarker1 = '<!-- Background Ambient Injected -->';
    const endMarker1 = '<div style="max-width:1200px;margin:0 auto;padding:0 15px;position:relative;z-index:2">';
    
    // Find the actual block location under Why Study
    const whyStudyStart = html.indexOf('<!-- 6 & 7. "Why Study English in Malaysia?"');
    if (whyStudyStart === -1) throw new Error('Could not find Why Study section');
    
    const bgStart1 = html.indexOf(startMarker1, whyStudyStart);
    const bgEnd1 = html.indexOf(endMarker1, bgStart1);
    
    let whyStudyBgHTML = html.substring(bgStart1, bgEnd1);
    
    // Customize it for How to Apply (change SUCCESS to APPLY)
    whyStudyBgHTML = whyStudyBgHTML.replace('>SUCCESS<', '>APPLY<');

    // 2. Locate the "How to Apply" ambient block limits
    const howToApplySectionPattern = '<!-- 8. "How to Apply" Section -->';
    const htaStart = html.indexOf(howToApplySectionPattern);
    if (htaStart === -1) throw new Error('Could not find How to Apply section');
    
    const bgStart2Pattern = '<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">';
    const bgStart2 = html.indexOf(bgStart2Pattern, htaStart);
    
    const endMarker2Pattern = '<div class="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 pt-8">';
    const bgEnd2 = html.indexOf(endMarker2Pattern, bgStart2);
    
    if (bgStart2 === -1 || bgEnd2 === -1) {
         throw new Error('Could not determine bounds of How to Apply background');
    }

    // 3. Swap the HTML
    html = html.substring(0, bgStart2) + whyStudyBgHTML + '\n        ' + html.substring(bgEnd2);
    
    fs.writeFileSync('index.html', html);
    console.log('Successfully synced background from Why Study to How to Apply.');
    
} catch (err) {
    console.error('Error:', err.message);
}
