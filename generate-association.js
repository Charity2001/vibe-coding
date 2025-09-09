// Simple script to help generate Farcaster account association
// This is a helper script - the actual association needs to be generated through Farcaster's tools

const domain = "vibe-coding-charity2001.vercel.app";

console.log("=== Farcaster Account Association Helper ===");
console.log("Domain:", domain);
console.log("");
console.log("To generate the correct account association:");
console.log("1. Go to: https://docs.farcaster.xyz/developers/mini-apps");
console.log("2. Use the manifest generator tool");
console.log("3. Enter your domain:", domain);
console.log("4. Generate the association data");
console.log("");
console.log("Or try:");
console.log("1. Go to: https://miniapps.farcaster.xyz/");
console.log("2. Enter your domain: https://" + domain);
console.log("3. Generate the association");
console.log("");
console.log("The association should look like:");
console.log(JSON.stringify({
  "accountAssociation": {
    "header": "base64_encoded_header",
    "payload": "base64_encoded_payload", 
    "signature": "0x_hex_signature"
  }
}, null, 2));
