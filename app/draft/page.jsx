"use client"
import DraftForm from "../../components/DraftForm";

export default function DraftPage() {
  const savePost = async (data) => {
    const res = await fetch("/api/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create post why??? ");
    }

    const { post } = await res.json();
    return post; // return post data so DraftForm knows the slug
  };

  return (
    <div className="p-8">
      <DraftForm onSave={savePost} />
    </div>
  );
}
