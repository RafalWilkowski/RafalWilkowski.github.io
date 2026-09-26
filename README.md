# rafalwilkowski.github.io

Portfolio + printable CV. Plain HTML/CSS/JS, no build step, no frameworks.

| File | What it is |
| --- | --- |
| `assets/js/cv-data.js` | **The only file you edit.** Name, headline, summary, experience, skills, links. |
| `index.html` | Portfolio page, rendered from the data file. |
| `cv.html` | A4 CV, rendered from the same data. Print → *Save as PDF*. |
| `Rafal_Wilkowski_CV.pdf` | Pre-built PDF linked from the site. Regenerate after edits. |
| `tools/build-pdf.ps1` | Regenerates the PDF with headless Chrome/Edge. |
| `tools/style-variants-archive.css` | Not loaded. The seven preview styles from the redesign plus the style bar, with restore steps at the top. |

## Update the CV

1. Edit `assets/js/cv-data.js`.
2. Open `cv.html` in a browser to check the layout (or `index.html` for the site).
3. Regenerate the PDF:

   ```powershell
   powershell -ExecutionPolicy Bypass -File tools\build-pdf.ps1
   ```

   Or open `cv.html`, print it from the browser (Ctrl+P) and save as PDF, A4, no margins, no headers/footers. `cv.html?print` opens the dialog automatically.

4. Commit and push. GitHub Pages serves `master`.

`cv.photo` in the data file controls whether the PDF shows the photo.

## Photo

`assets/images/rafal-portrait.jpg` (site), `rafal-avatar-320.jpg` (CV) and `og.jpg` (link previews) are crops of the original `DSC_8484.JPG`, which is kept out of git via `.gitignore`.
