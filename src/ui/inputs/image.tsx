import { Dispatch, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../icons/upload";
import Image from "next/image";

export function UploadImageInput({
  setPhoto,
  photo,
}: {
  photo: string;
  setPhoto: Dispatch<SetStateAction<string>>;
}) {
  const [previewImage, setPreviewImage] = useState<string>(photo);
  function onDrop(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(URL.createObjectURL(file));
      const base64String = reader.result as string;
      const base64Data = base64String.replace(
        /^data:image\/(png|jpg|jpeg|webp);base64,/,
        ""
      );
      setPhoto(base64Data);
    };
  }
  const { getRootProps, getInputProps } = useDropzone({ maxFiles: 1, onDrop });

  return (
    <div
      style={{ minHeight: "350px" }}
      className="relative w-full flex flex-column justify-center  items-center bg-default-100 border-r-medium tap-highlight-transparent rounded-medium shadow-sm hover:bg-default-200"
      {...getRootProps()}>
      <input name={"photo"} type="file" {...getInputProps()} />
      {previewImage ? (
        <Image
          unoptimized
          src={previewImage}
          alt={"photo"}
          fill
          style={{ objectFit: "contain", padding: "5px" }}
        />
      ) : (
        <div className="flex flex-col justify-center items-center gap-1">
          <UploadIcon></UploadIcon>
          <p>Haga clic para cargar o arrastre y suelte</p>
          <p>SVG, PNG, JPG or GIF (max. 3MB)</p>
        </div>
      )}
    </div>
  );
}
