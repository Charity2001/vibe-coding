// Script to help find your actual Vercel domain
const https = require('https');

console.log('🔍 Searching for your Vercel deployment...');
console.log('');

// Common Vercel domain patterns
const possibleDomains = [
  'vibe-coding-charity2001.vercel.app',
  'vibe-coding-git-main-charity2001.vercel.app',
  'vibe-coding-charity2001s-team.vercel.app',
  'vibe-coding-charity2001s-projects.vercel.app',
  'vibe-coding-charity2001s-projects-charity2001.vercel.app',
  'vibe-coding-git-main-charity2001s-team.vercel.app'
];

function testDomain(domain) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: domain,
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 5000
    }, (res) => {
      resolve({
        domain,
        status: res.statusCode,
        success: res.statusCode === 200
      });
    });
    
    req.on('error', () => {
      resolve({
        domain,
        status: 'ERROR',
        success: false
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        domain,
        status: 'TIMEOUT',
        success: false
      });
    });
    
    req.end();
  });
}

async function findWorkingDomain() {
  console.log('Testing possible domains...');
  console.log('');
  
  for (const domain of possibleDomains) {
    process.stdout.write(`Testing ${domain}... `);
    const result = await testDomain(domain);
    
    if (result.success) {
      console.log(`✅ SUCCESS! (${result.status})`);
      console.log('');
      console.log('🎉 Found your working domain!');
      console.log(`🌐 Your app is live at: https://${domain}`);
      console.log('');
      console.log('📋 Next steps:');
      console.log(`1. Test your manifest: https://${domain}/.well-known/farcaster.json`);
      console.log(`2. Test your app: https://${domain}`);
      console.log(`3. Update Farcaster with this domain: ${domain}`);
      return domain;
    } else {
      console.log(`❌ ${result.status}`);
    }
  }
  
  console.log('');
  console.log('❌ No working domain found.');
  console.log('');
  console.log('🔧 Troubleshooting steps:');
  console.log('1. Go to vercel.com and check your dashboard');
  console.log('2. Look for a project named "vibe-coding"');
  console.log('3. Check if there are any deployment errors');
  console.log('4. If no project exists, create a new one from GitHub');
  console.log('5. Make sure the GitHub repo is: Charity2001/vibe-coding');
  
  return null;
}

findWorkingDomain();
