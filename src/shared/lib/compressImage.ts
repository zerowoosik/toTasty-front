const compressImage = (file: File, targetSize: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;

      // 크기 계산
      const shorterSide = Math.min(width, height);
      const ratio = targetSize / shorterSide;
      const newWidth = Math.round(width * ratio);
      const newHeight = Math.round(height * ratio);

      // Canvas에 이미지 그리기
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      // Blob으로 변환하여 File 생성
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('이미지 압축에 실패했습니다.'));
          }
        },
        file.type,
        0.8,
      );
    };

    img.onerror = () => reject(new Error('이미지 로드에 실패했습니다.'));

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default compressImage;
