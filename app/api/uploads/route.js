import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtldnlzfa",
  api_key: "857167229998564",
  api_secret: "aXU8aGu3ymrlKm7dSb6TgqJU9rc", // server-only secret
});

export async function POST(request) {
  try {
    const { file } = await request.json(); // base64 image string
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "cms-uploads",
    });

    return new Response(
      JSON.stringify({ url: uploadResponse.secure_url }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
