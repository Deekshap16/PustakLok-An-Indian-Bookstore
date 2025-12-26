# Script to copy book images from Downloads to the public/images/books folder

$downloadsPath = "C:\Users\deeks\Downloads"
$targetPath = "C:\Users\deeks\OneDrive\Desktop\bookstore website\frontend\public\images\books"

# Create target directory if it doesn't exist
if (-not (Test-Path $targetPath)) {
    New-Item -ItemType Directory -Path $targetPath -Force
}

# Mapping of book titles to image filenames
$imageMapping = @{
    "The Immortals of Meluha" = "immortals-of-meluha"
    "The Secret of the Nagas" = "secret-of-the-nagas"
    "The Oath of the Vayuputras" = "oath-of-the-vayuputras"
    "Ramayana" = "ramayana-rk-narayan"
    "The Palace of Illusions" = "palace-of-illusions"
    "Mahabharata" = "mahabharata"
    "Sita: An Illustrated Retelling of the Ramayana" = "sita-ramayana"
    "Sita" = "sita-ramayana"
    "The White Tiger" = "white-tiger"
    "The God of Small Things" = "god-of-small-things"
    "A Suitable Boy" = "suitable-boy"
    "Train to Pakistan" = "train-to-pakistan"
    "The Guide" = "guide"
    "Wings of Fire" = "wings-of-fire"
    "My Experiments with Truth" = "my-experiments-with-truth"
    "The Discovery of India" = "discovery-of-india"
    "The Argumentative Indian" = "argumentative-indian"
    "Gitanjali" = "gitanjali"
    "Midnight's Children" = "midnights-children"
    "The Inheritance of Loss" = "inheritance-of-loss"
    "The Namesake" = "namesake"
    "The Bombay Prince" = "the-bombay-prince"
    "The Mistress of Spices" = "the-mistress-of-spices"
}

# Find image files in Downloads
$imageFiles = Get-ChildItem -Path $downloadsPath -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$'
}

Write-Host "Found $($imageFiles.Count) image files in Downloads folder" -ForegroundColor Green

# Try to match and copy images
foreach ($file in $imageFiles) {
    $copied = $false
    $filename = $file.BaseName
    $extension = $file.Extension
    
    # Try to match by filename
    foreach ($bookTitle in $imageMapping.Keys) {
        $targetName = $imageMapping[$bookTitle]
        
        # Check if filename contains keywords from book title
        $titleWords = $bookTitle -split '\s+' | ForEach-Object { $_.Trim() }
        $matched = $true
        
        foreach ($word in $titleWords) {
            if ($word.Length -gt 3 -and $filename -notmatch [regex]::Escape($word)) {
                $matched = $false
                break
            }
        }
        
        if ($matched -or $filename -match [regex]::Escape($targetName.Replace('-', ' '))) {
            $targetFile = Join-Path $targetPath "$targetName$extension"
            Copy-Item -Path $file.FullName -Destination $targetFile -Force
            Write-Host "Copied: $($file.Name) -> $targetName$extension" -ForegroundColor Yellow
            $copied = $true
            break
        }
    }
    
    if (-not $copied) {
        Write-Host "Could not match: $($file.Name)" -ForegroundColor Red
    }
}

Write-Host "`nDone! Check the folder: $targetPath" -ForegroundColor Green
Write-Host "`nYou may need to manually rename files that didn't match automatically." -ForegroundColor Yellow

