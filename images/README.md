# Photo Gallery Images

Place your anniversary photos here and reference them in the `anniversaryData.js` file.

## How to Add Images

1. **Place your photos in this folder:**
   - Example: `photo1.jpg`, `photo2.jpg`, `couple-beach.jpg`, etc.
   - Any format: JPG, PNG, WEBP

2. **Optimize your images** (recommended):
   - Resize to max width 1920px for best performance
   - Compress using tools like TinyPNG or ImageOptim
   - Keep each image under 500KB if possible

3. **Add to your sections** in `src/data/anniversaryData.js`:

```js
{
  id: 1,
  title: "Messages Sent",
  stat: 47832,
  statLabel: "messages",
  description: "We never stopped talking 💬",
  audioTrack: "track1.mp3",
  backgroundColor: "#FF6B9D",
  imageUrl: null, // Single image (legacy support)
  images: [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg"
  ], // Array of images that will auto-scroll every 3 seconds
},
```

## Features

- **Auto-scrolling**: Images cycle every 3 seconds
- **Manual control**: Small dots at bottom let users click to view specific images
- **Multiple per section**: Add as many as you want (3-5 recommended per section)
- **Full background**: Images display as full-screen backgrounds behind stats

## Tips

- Mix landscape and portrait photos - they'll be cropped to fill the screen
- Use photos that represent each section's theme
- Consider the text overlay - darker photos or those with clear focal areas work best
- You can use different images for each section to tell your story chronologically
