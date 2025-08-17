import Image from "next/image";
import { useState } from "react";

export default function ImageUploader({ returnImage,preLoadedImage }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;

      const res = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64data }),
      });

      const data = await res.json();
      setImageUrl(data.url);
      if (returnImage) returnImage(data.url);
      setLoading(false);
    };
  };
  if(preLoadedImage){
    return (
      <div>
         <label>
        <span className="border-2 border-gray-300 p-2 border-dashed">Update Cover Image</span>
        <input type="file" onChange={handleImageUpload} hidden />
        <Image src={preLoadedImage} alt="Uploaded" width={300} height={170} className="mt-4" />
      </label>

      </div>
    )
  }

  return (
    <div>
      <label>
        <span className="border-2 border-gray-300 p-2 border-dashed">Upload Cover Image</span>
        <input type="file" onChange={handleImageUpload} hidden />
      </label>
      {loading && <p>Uploading...</p>}
      {imageUrl &&(
        <div>
           <h3>Image uploaded successfully!</h3>
         <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "200px" }} />

        </div>
       
        )}
    </div>
  );
}
