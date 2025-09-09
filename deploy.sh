#!/bin/bash

# Deploy script for blockvibez
echo "🚀 Deploying blockvibez to GitHub and Vercel..."

# Add all changes
git add .

# Commit with timestamp
git commit -m "Update blockvibez - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub (this will trigger Vercel deployment)
git push origin main

echo "✅ Deployment complete! Check your Vercel dashboard for status."
echo "🌐 Your app will be live at: https://your-app-name.vercel.app"
