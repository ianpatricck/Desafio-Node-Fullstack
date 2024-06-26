-- CreateTable
CREATE TABLE "place_types" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "place_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(100),
    "cnpj" VARCHAR(20) NOT NULL,
    "city" VARCHAR(80) NOT NULL,
    "cep" VARCHAR(20) NOT NULL,
    "complement" VARCHAR(80),
    "state" VARCHAR(5) NOT NULL,
    "address" VARCHAR(80) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "inputs" VARCHAR(90) NOT NULL,
    "turnstiles" VARCHAR(90) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_types" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "event_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "date" VARCHAR(10) NOT NULL,
    "time" VARCHAR(10) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "typeId" VARCHAR(100) NOT NULL,
    "placeId" VARCHAR(100) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "places_email_key" ON "places"("email");

-- CreateIndex
CREATE UNIQUE INDEX "events_email_key" ON "events"("email");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "place_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "event_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
