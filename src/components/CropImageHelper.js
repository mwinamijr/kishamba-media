export default function getCroppedImg(imageSrc, pixelCrop, cropSize) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropSize.width;
      canvas.height = cropSize.height;
      const ctx = canvas.getContext("2d");

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

      canvas.toBlob((blob) => {
        const file = new File([blob], `cropped-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        resolve(file);
      }, "image/jpeg");
    };
  });
}
