-- CreateTable
CREATE TABLE "Gear" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "sizes" BOOLEAN NOT NULL,

    CONSTRAINT "Gear_pkey" PRIMARY KEY ("id")
);
