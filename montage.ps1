Add-Type -AssemblyName System.Drawing
$dir = Join-Path (Join-Path "C:\Users\Omen\OneDrive\Dokumenty\Claude" ("IKO Plze" + [char]0x148)) "iko-web\public\projects"
$out = "C:\Users\Omen\AppData\Local\Temp\claude\C--Users-Omen-OneDrive-Dokumenty-Claude\19ba85ba-2b93-4c78-b9ac-3a8b200235ad\scratchpad"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function Make-Sheet($slug) {
    $files = Get-ChildItem -LiteralPath $dir -Filter "$slug-*-sm.jpg" | Sort-Object Name
    $tw = 300; $th = 190; $cols = 5; $pad = 26
    $rows = [math]::Ceiling($files.Count / $cols)
    $W = $cols * $tw + ($cols+1)*8
    $H = $rows * ($th+$pad) + 8
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::FromArgb(20,26,32))
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $font = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
    $brush = [System.Drawing.Brushes]::White
    $i = 0
    foreach ($f in $files) {
        $c = $i % $cols; $r = [math]::Floor($i / $cols)
        $x = 8 + $c*($tw+8); $y = 8 + $r*($th+$pad)
        $im = [System.Drawing.Image]::FromFile($f.FullName)
        $g.DrawImage($im, $x, $y, $tw, $th)
        $im.Dispose()
        $label = ($f.BaseName -replace '-sm$','')
        $g.DrawString($label, $font, $brush, $x, $y+$th+4)
        $i++
    }
    $path = Join-Path $out "sheet-$slug.jpg"
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, $codec, $ep)
    [System.IO.File]::WriteAllBytes($path, $ms.ToArray())
    $ms.Dispose(); $g.Dispose(); $bmp.Dispose()
    Write-Host $path
}
Make-Sheet 'slovanske-udoli'
Make-Sheet 'cukrovarska'
Make-Sheet 'radobycice'
