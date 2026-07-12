import sys
import zipfile
import shutil
import os

def rezip(path):
    tmp = path + ".tmp"
    with zipfile.ZipFile(path, "r") as zin:
        with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zout:
            for item in zin.infolist():
                data = zin.read(item.filename)
                item.compress_type = zipfile.ZIP_DEFLATED
                zout.writestr(item, data)
    shutil.move(tmp, path)
    print(f"rezipped: {path} ({os.path.getsize(path)} bytes)")

if __name__ == "__main__":
    for p in sys.argv[1:]:
        rezip(p)
