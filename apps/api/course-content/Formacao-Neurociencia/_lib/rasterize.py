import sys
import fitz

def rasterize(pdf_path, dpi=100, prefix="qa"):
    doc = fitz.open(pdf_path)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=dpi)
        pix.save(f"{prefix}-{i+1:02d}.jpg")
    print(f"rasterized: {pdf_path} ({len(doc)} pages)")

if __name__ == "__main__":
    for p in sys.argv[1:]:
        rasterize(p)
