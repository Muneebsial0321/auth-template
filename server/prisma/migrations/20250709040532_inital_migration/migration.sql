-- CreateEnum
CREATE TYPE "User_Provier" AS ENUM ('GOOGLE', 'LOCAL', 'GITHUB');

-- CreateEnum
CREATE TYPE "User_Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "User_Provier" NOT NULL DEFAULT 'LOCAL',
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "role" "User_Role" NOT NULL DEFAULT 'USER',
    "picUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");
