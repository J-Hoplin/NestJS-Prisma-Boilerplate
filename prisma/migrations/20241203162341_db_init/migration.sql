-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MAINTAINER', 'USER');

-- CreateEnum
CREATE TYPE "SignupType" AS ENUM ('LOCAL', 'GOOGLE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(80) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "sign_up_type" "SignupType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile_image" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "original_name" TEXT NOT NULL,
    "extension" VARCHAR(10) NOT NULL,
    "size" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_profile_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_image_userId_key" ON "user_profile_image"("userId");

-- AddForeignKey
ALTER TABLE "user_profile_image" ADD CONSTRAINT "user_profile_image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
