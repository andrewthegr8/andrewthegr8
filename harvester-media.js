/*
  Optional media loader for harvester.html.
  - Renders selected report pages in-browser with pdf.js.
  - Extracts raster images from the PPTX with JSZip.
  The case study still works if these CDN libraries are blocked; users can open the PDF/PPTX directly.
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
    const target = e.target;
    if (target && target.dataset && target.dataset.close === 'true') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  document.querySelectorAll('.gallery-item').forEach((item) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    if (!img) return;
    item.addEventListener('click', () => openModal(img.src, caption ? caption.textContent : img.alt));
  });
}

function setButtonBusy(button, isBusy) {
  if (!button) return;
  if (isBusy) {
    button.setAttribute('disabled', 'true');
    button.classList.add('disabled');
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('disabled');
  }
}

async function renderPdfPages({ pdfUrl, container, pageNumbers, scale = 1.25 }) {
  if (!window.pdfjsLib) throw new Error('pdf.js is not loaded');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  container.innerHTML = '<div class="muted small">Loading report pages...</div>';
  const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
  container.innerHTML = '';

  for (const pageNumber of pageNumbers) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    await page.render({ canvasContext: ctx, viewport }).promise;

    const wrap = document.createElement('div');
    wrap.className = 'thumb';
    const cap = document.createElement('div');
    cap.className = 'thumbcap';
    cap.textContent = `Report page ${pageNumber}`;
    wrap.appendChild(canvas);
    wrap.appendChild(cap);
    wrap.addEventListener('click', () => openModal(canvas.toDataURL('image/png'), `Report page ${pageNumber}`));
    container.appendChild(wrap);
  }
}

async function extractPptxImages({ pptxUrl, container, limit = 18 }) {
  if (!window.JSZip) throw new Error('JSZip is not loaded');

  container.innerHTML = '<div class="muted small">Extracting slide media...</div>';
  const res = await fetch(pptxUrl);
  if (!res.ok) throw new Error(`Failed to fetch PPTX (${res.status})`);
  const zip = await window.JSZip.loadAsync(await res.arrayBuffer());
  const mediaEntries = Object.keys(zip.files)
    .filter((path) => path.startsWith('ppt/media/'))
    .filter((path) => /\.(png|jpe?g|gif|webp)$/i.test(path))
    .sort((a, b) => a.localeCompare(b));

  container.innerHTML = '';
  if (mediaEntries.length === 0) {
    container.innerHTML = '<div class="muted small">No compatible raster images found in the PPTX.</div>';
    return;
  }

  for (const path of mediaEntries.slice(0, limit)) {
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
}

function initHarvesterPage() {
  wireModal();

  const pdfBtn = $('pdf-load');
  const pptxBtn = $('pptx-load');
  const pdfGallery = $('pdf-gallery');
  const pptxGallery = $('pptx-gallery');
  if (!pdfBtn || !pptxBtn || !pdfGallery || !pptxGallery) return;

  const pdfUrl = encodeURI('3-DOF/Project Final Report.pdf');
  const pptxUrl = encodeURI('3-DOF/FinalPresentation.pptx');

  pdfBtn.addEventListener('click', async () => {
    setButtonBusy(pdfBtn, true);
    try {
      await renderPdfPages({ pdfUrl, container: pdfGallery, pageNumbers: [9, 16, 19, 21, 23] });
    } catch (err) {
      pdfGallery.innerHTML = `<div class="muted small">Could not render PDF pages: ${String(err)}</div>`;
    } finally {
      setButtonBusy(pdfBtn, false);
    }
  });

  pptxBtn.addEventListener('click', async () => {
    setButtonBusy(pptxBtn, true);
    try {
      await extractPptxImages({ pptxUrl, container: pptxGallery });
    } catch (err) {
      pptxGallery.innerHTML = `<div class="muted small">Could not extract slide images: ${String(err)}</div>`;
    } finally {
      setButtonBusy(pptxBtn, false);
    }
  });
}

document.addEventListener('DOMContentLoaded', initHarvesterPage);
