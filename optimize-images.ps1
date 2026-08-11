Add-Type -AssemblyName System.Drawing

$claude = "C:\Users\Omen\OneDrive\Dokumenty\Claude"
# Pin the real project folder "IKO Plzeň" by Unicode codepoint (ň = U+0148) to avoid
# ambiguity with any mojibake sibling under the current console codepage.
$base = Join-Path $claude ("IKO Plze" + [char]0x148)
$out  = Join-Path $base "iko-web\public\projects"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function Save-Resized {
    param([string]$src, [string]$dest, [int]$maxW, [int]$quality)
    $img = [System.Drawing.Image]::FromFile($src)
    try {
        $w = $img.Width; $h = $img.Height
        if ($w -le $maxW) { $nw = $w; $nh = $h }
        else { $nw = $maxW; $nh = [int]([math]::Round($h * ($maxW / $w))) }
        $bmp = New-Object System.Drawing.Bitmap $nw, $nh
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $nw, $nh)
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
        $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
        $ms = New-Object System.IO.MemoryStream
        $bmp.Save($ms, $codec, $ep)
        [System.IO.File]::WriteAllBytes($dest, $ms.ToArray())
        $ms.Dispose(); $g.Dispose(); $bmp.Dispose()
    } finally { $img.Dispose() }
}

# Find every VIZUALIZACE / Vizualizace folder under the project root and map by name
$vizDirs = Get-ChildItem -LiteralPath $base -Directory -Recurse |
    Where-Object { $_.Name -match '^(VIZUALIZACE|Vizualizace)$' }

$jobs = @()
foreach ($d in $vizDirs) {
    $slug = $null
    if ($d.FullName -match 'Rezidence|Slovansk') { $slug = 'slovanske-udoli' }
    elseif ($d.FullName -match 'Cukrovar')        { $slug = 'cukrovarska' }
    if ($slug) { $jobs += @{ vizDir = $d.FullName; slug = $slug } }
}

foreach ($j in $jobs) {
    $files = Get-ChildItem -LiteralPath $j.vizDir -Filter *.jpg -File -ErrorAction SilentlyContinue | Sort-Object Name
    $i = 0
    foreach ($f in $files) {
        $i++; $n = "{0:00}" -f $i
        Save-Resized $f.FullName (Join-Path $out ("{0}-{1}-lg.jpg" -f $j.slug, $n)) 1920 82
        Save-Resized $f.FullName (Join-Path $out ("{0}-{1}-sm.jpg" -f $j.slug, $n)) 900 80
        Write-Host ("{0}-{1} <= {2}" -f $j.slug, $n, $f.Name)
    }
}

$radobyDir = (Get-ChildItem -LiteralPath $base -Directory | Where-Object { $_.Name -like 'Radoby*' } | Select-Object -First 1).FullName
$radFiles = Get-ChildItem -LiteralPath $radobyDir -Filter *.jpg -File | Where-Object { $_.Name -notmatch '\(1\)' } | Sort-Object Name
$i = 0
foreach ($f in $radFiles) {
    $i++; $n = "{0:00}" -f $i
    Save-Resized $f.FullName (Join-Path $out ("radobycice-{0}-lg.jpg" -f $n)) 1920 84
    Save-Resized $f.FullName (Join-Path $out ("radobycice-{0}-sm.jpg" -f $n)) 900 82
    Write-Host ("radobycice-{0} <= {1}" -f $n, $f.Name)
}
Write-Host "DONE"
