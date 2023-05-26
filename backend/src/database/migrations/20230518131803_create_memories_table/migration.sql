-- CreateTable
CREATE TABLE "tb_memories" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_memories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_memories" ADD CONSTRAINT "tb_memories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
