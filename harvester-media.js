/*
  Client-side media extraction:
  - PDF pages rendered via pdf.js
  - PPTX images extracted by unzipping the .pptx (a zip) via JSZip and reading ppt/media/*
*/

function $(id) { return document.getElementById(id); }

function openModal(src, caption) {
  const modal = $('modal');
  const img = $('modal-img');
  const cap = $('modal-caption');
  if (!modal || !img || !cap) return;

  img.src = src;
  cap.textContent = caption || '';
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = $('modal');
  const img = $('modal-img');
  if (!modal || !img) return;
  modal.setAttribute('aria-hidden', 'true');
  img.src = '';
}

function wireModal() {
  const modal = $('modal');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === 'true') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

async function renderPdfPages({ pdfUrl, container, pageNumbers, scale = 1.35 }) {
  if (!window.pdfjsLib) throw new Error('pdf.js not loaded');
  // Configure worker
  if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js';
  }

  container.innerHTML = '';

  const loading = document.createElement('div');
  loading.className = 'muted small';
  loading.textContent = 'Loading PDF pages…';
  container.appendChild(loading);

  const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
  container.innerHTML = '';

  for (const n of pageNumbers) {
    const page = await pdf.getPage(n);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    await page.render({ canvasContext: ctx, viewport }).promise;

    // Wrap in a clickable thumb
    const wrap = document.createElement('div');
    wrap.className = 'thumb';

    const cap = document.createElement('div');
    cap.className = 'thumbcap';
    cap.textContent = `Report page ${n}`;

    wrap.appendChild(canvas);
    wrap.appendChild(cap);

    wrap.addEventListener('click', () => {
      const dataUrl = canvas.toDataURL('image/png');
      openModal(dataUrl, `Report page ${n}`);
    });

    container.appendChild(wrap);
  }
}

async function extractPptxImages({ pptxUrl, container, limit = 30 }) {
  if (!window.JSZip) throw new Error('JSZip not loaded');

  container.innerHTML = '';
  const loading = document.createElement('div');
  loading.className = 'muted small';
  loading.textContent = 'Extracting images from PPTX…';
  container.appendChild(loading);

  const res = await fetch(pptxUrl);
  if (!res.ok) throw new Error(`Failed to fetch PPTX (${res.status})`);
  const buf = await res.arrayBuffer();

  const zip = await window.JSZip.loadAsync(buf);

  const mediaEntries = Object.keys(zip.files)
    .filter((p) => p.startsWith('ppt/media/'))
    .filter((p) => /\.(png|jpe?g|gif)$/i.test(p))
    .sort((a, b) => a.localeCompare(b));

  container.innerHTML = '';

  if (mediaEntries.length === 0) {
    const none = document.createElement('div');
    none.className = 'muted small';
    none.textContent = 'No compatible raster images found in ppt/media/. (If slides are mostly vector, we can export slide renders later.)';
    container.appendChild(none);
    return;
  }

  const use = mediaEntries.slice(0, limit);

  for (const path of use) {
    const file = zip.file(path);
    if (!file) continue;

    const blob = await file.async('blob');
    const url = URL.createObjectURL(blob);

    const wrap = document.createElement('div');
    wrap.className = 'thumb';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = path.replace('ppt/media/', '');
    img.src = url;

    const cap = document.createElement('div');
    cap.className = 'thumbcap';
    cap.textContent = img.alt;

    wrap.appendChild(img);
    wrap.appendChild(cap);

    wrap.addEventListener('click', () => openModal(img.src, img.alt));

    container.appendChild(wrap);
  }

  const note = document.createElement('div');
  note.className = 'muted small';
  note.style.marginTop = '10px';
  note.textContent = `Showing ${use.length} image(s) from PPTX media.`;
  container.appendChild(note);
}

function initHarvesterPage() {
  wireModal();

  const pdfBtn = $('pdf-load');
  const pptxBtn = $('pptx-load');
  const pdfGallery = $('pdf-gallery');
  const pptxGallery = $('pptx-gallery');

  // Only run on the harvester page
  if (!pdfBtn || !pptxBtn || !pdfGallery || !pptxGallery) return;

  const pdfUrl = encodeURI('3-DOF/Project Final Report.pdf');
  const pptxUrl = encodeURI('3-DOF/FinalPresentation.pptx');

  pdfBtn.addEventListener('click', async () => {
    pdfBtn.setAttribute('disabled', 'true');
    pdfBtn.classList.add('disabled');
    try {
      await renderPdfPages({ pdfUrl, container: pdfGallery, pageNumbers: [1, 2, 3, 4] });
    } catch (e) {
      pdfGallery.innerHTML = `<div class="muted small">Failed to render PDF pages. ${String(e)}</div>`;
    } finally {
      pdfBtn.removeAttribute('disabled');
      pdfBtn.classList.remove('disabled');
    }
  });

  pptxBtn.addEventListener('click', async () => {
    pptxBtn.setAttribute('disabled', 'true');
    pptxBtn.classList.add('disabled');
    try {
      await extractPptxImages({ pptxUrl, container: pptxGallery });
    } catch (e) {
      pptxGallery.innerHTML = `<div class="muted small">Failed to extract PPTX images. ${String(e)}</div>`;
    } finally {
      pptxBtn.removeAttribute('disabled');
      pptxBtn.classList.remove('disabled');
    }
  });

  // Auto-load media for a more “flashy” first impression.
  // Buttons remain for quick reload/retry.
  setTimeout(() => {
    pdfBtn.click();
    pptxBtn.click();
  }, 0);
}

document.addEventListener('DOMContentLoaded', initHarvesterPage);
