# 3 Years Anniversary - Interactive SPA

A beautiful, interactive single-page application to celebrate your 3-year anniversary! This project features swipeable sections with auto-switching music, animated statistics, and a photo-focused design.

## 🎵 Setup Instructions

### 1. Add Your Music Files

Place your audio files in the `public/audio/` folder:
- Name them: `track1.mp3`, `track2.mp3`, `track3.mp3`, etc.
- Use **128kbps MP3** format for optimal file size
- Keep each track under 3-4MB if possible
- You need **9 tracks** total (one for each section)

**Don't have audio files yet?**
- Use any audio converter to convert your songs to MP3
- Recommended: Use Audacity or online tools to compress to 128kbps

### 2. Update Your Statistics

Edit `src/data/anniversaryData.js` to add your real statistics:
- Number of messages sent
- Times you said "I love you"
- Movies watched together
- Photos taken
- And more!

You can also:
- Change colors for each section (`backgroundColor`)
- Add photos by placing them in `public/images/` and updating `imageUrl`
- Modify section titles and descriptions

### 3. Configure GitHub Pages

Update two files with your GitHub username and repository name:

**package.json:**
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

**vite.config.js:**
```js
base: '/YOUR-REPO-NAME/'
```

### 4. Run Locally

```bash
npm run dev
```

Visit http://localhost:5173 to see your anniversary SPA!

### 5. Deploy to GitHub Pages

```bash
# First time: Create a GitHub repository and push your code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

After deployment:
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Source should be set to `gh-pages` branch (automatically done by gh-pages package)
4. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

## 📱 Features

- ✨ **Swipeable sections** - Touch, mouse drag, arrow keys, and scroll support
- 🎵 **Auto-switching music** - Smooth fade transitions between tracks
- 📊 **Animated statistics** - Count up animations for numbers
- 📱 **Fully responsive** - Works on mobile and desktop
- 💝 **Photo-focused design** - Beautiful gradient backgrounds (add photos for more impact!)
- 🎨 **Playful styling** - Bright colors and fun animations

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Swiper** - Touch slider
- **Howler.js** - Audio management
- **GitHub Pages** - Hosting

## 📝 Customization Tips

### Adding Photos
1. Place images in `public/images/`
2. Update `anniversaryData.js`:
   ```js
   imageUrl: "/images/your-photo.jpg"
   ```

### Changing Navigation Direction
In `SwipeContainer.jsx`, change:
```js
direction="vertical"  // or "horizontal"
```

### Adjusting Colors
Modify `backgroundColor` in each section of `anniversaryData.js`. Try:
- Gradients: Use CSS in Section.css
- Solid colors: Use hex codes like `#FF6B9D`

### More Sections
Just add more objects to the `anniversaryData` array! Make sure to add corresponding audio tracks.

## 🎁 Making It Special

- Add personal photos as section backgrounds
- Include specific dates or memories in descriptions
- Use songs that are meaningful to your relationship
- Add a final section with a personal message
- Consider adding a "gallery" section with multiple photos

## 🐛 Troubleshooting

**Audio not playing?**
- Make sure audio files are in `public/audio/`
- Check browser console for errors
- Try opening dev tools and checking the Network tab
- Remember: Audio only plays after clicking "Start Experience" (browser requirement)

**Swipe not working?**
- Check that Swiper CSS is imported
- Ensure touch-action CSS is set correctly
- Try on a different browser

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then `npm install` again

## ❤️ Share Your Love!

Once deployed, share the link with your special someone and watch their reaction! 💕

---

Made with ❤️ for celebrating love and memories
