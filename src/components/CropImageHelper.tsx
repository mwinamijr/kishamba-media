type PixelCrop = {
  x: number,
  y: number,
  width: number,
  height: number,
};

type CropSize = {
  width: number,
  height: number,
};

export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  cropSize: CropSize
): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Add if image is from a different origin
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropSize.width;
      canvas.height = cropSize.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas 2D context"));
        return;
      }

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        cropSize.width,
        cropSize.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const file = new File([blob], `cropped.jpg`, {
            type: "image/jpeg",
          });
          resolve(file);
        },
        "image/jpeg",
        1 // quality parameter (1 is max quality)
      );
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}
