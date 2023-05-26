-- CreateTable
CREATE TABLE "tb_users" (
    "id" TEXT NOT NULL,
    "githubId" TEXT,
    "name" TEXT,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_githubId_key" ON "tb_users"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_login_key" ON "tb_users"("login");
