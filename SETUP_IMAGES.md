# Setting Up Book Cover Images

## Quick Setup:

1. **Run the PowerShell script** (easiest method):
   ```powershell
   .\COPY_BOOK_IMAGES.ps1
   ```
   This will automatically find and copy your book images from Downloads.

2. **Manual method** (if script doesn't work):

   Copy your book cover images from `C:\Users\deeks\Downloads` to:
   ```
   frontend/public/images/books/
   ```

   Rename them to these exact filenames:

   - `immortals-of-meluha.jpg` (or .png)
   - `secret-of-the-nagas.jpg`
   - `oath-of-the-vayuputras.jpg`
   - `ramayana-rk-narayan.jpg`
   - `palace-of-illusions.jpg`
   - `mahabharata.jpg`
   - `sita-ramayana.jpg`
   - `white-tiger.jpg`
   - `god-of-small-things.jpg`
   - `suitable-boy.jpg`
   - `train-to-pakistan.jpg`
   - `guide.jpg`
   - `wings-of-fire.jpg`
   - `my-experiments-with-truth.jpg`
   - `discovery-of-india.jpg`
   - `argumentative-indian.jpg`
   - `gitanjali.jpg`
   - `midnights-children.jpg`
   - `inheritance-of-loss.jpg`
   - `namesake.jpg`

3. **After copying images:**
   - The images will be served from: `http://localhost:3000/images/books/filename.jpg`
   - Refresh your browser (Ctrl+Shift+R) to see the images
   - No need to restart the server - images in the public folder are served automatically

4. **Supported formats:**
   - .jpg / .jpeg
   - .png
   - .webp

## Verification:

After copying, you should see files in:
```
frontend/public/images/books/
```

Then refresh your browser to see the book cover images!

