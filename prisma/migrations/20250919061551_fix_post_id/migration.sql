-- AlterTable
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."Post_id_key";
