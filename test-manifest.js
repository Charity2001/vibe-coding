// Test script to check your Farcaster manifest
const https = require('https');

const domain = 'vibe-coding-charity2001.vercel.app';
const manifestUrl = `https://${domain}/.well-known/farcaster.json`;

console.log('🔍 Testing Farcaster Manifest...');
console.log('Domain:', domain);
console.log('Manifest URL:', manifestUrl);
console.log('');

https.get(manifestUrl, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const manifest = JSON.parse(data);
      console.log('✅ Manifest is accessible!');
      console.log('');
      console.log('📋 Current Manifest:');
      console.log(JSON.stringify(manifest, null, 2));
      console.log('');
      
      // Check required fields
      const requiredFields = ['version', 'name', 'iconUrl', 'homeUrl'];
      const missingFields = requiredFields.filter(field => !manifest[field]);
      
      if (missingFields.length === 0) {
        console.log('✅ All required fields are present!');
      } else {
        console.log('❌ Missing required fields:', missingFields);
      }
      
      if (manifest.accountAssociation) {
        console.log('⚠️  Account association is present but may be incorrect');
        console.log('   You need to generate a new one for:', domain);
      } else {
        console.log('ℹ️  No account association found');
        console.log('   You need to add one for:', domain);
      }
      
    } catch (error) {
      console.log('❌ Error parsing manifest:', error.message);
    }
  });
  
}).on('error', (error) => {
  console.log('❌ Error fetching manifest:', error.message);
  console.log('');
  console.log('🔧 Troubleshooting:');
  console.log('1. Make sure your Vercel deployment is live');
  console.log('2. Check if the manifest file exists at:', manifestUrl);
  console.log('3. Verify your domain is correct:', domain);
});
