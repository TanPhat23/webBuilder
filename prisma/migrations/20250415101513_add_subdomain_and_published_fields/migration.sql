-- CreateTable
CREATE TABLE "Elements" (
    "Id" TEXT NOT NULL,
    "Type" VARCHAR(8) NOT NULL,
    "Content" TEXT,
    "IsSelected" BOOLEAN NOT NULL,
    "Styles" TEXT NOT NULL,
    "X" DOUBLE PRECISION NOT NULL,
    "Y" DOUBLE PRECISION NOT NULL,
    "Src" TEXT,
    "Href" TEXT,
    "ParentId" TEXT,
    "ProjectId" TEXT NOT NULL,
    "Order" INTEGER NOT NULL DEFAULT 0,
    "Name" TEXT,

    CONSTRAINT "PK_Elements" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "OwnerId" TEXT NOT NULL,
    "subdomain" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_Projects" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Users" (
    "Id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT,
    "LastName" TEXT,
    "ImageUrl" TEXT,
    "CreatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UpdatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "__EFMigrationsHistory" (
    "MigrationId" VARCHAR(150) NOT NULL,
    "ProductVersion" VARCHAR(32) NOT NULL,

    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

-- CreateTable
CREATE TABLE "Images" (
    "ImageId" TEXT NOT NULL,
    "ImageBlob" BYTEA NOT NULL,
    "ImageName" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "PK_Images" PRIMARY KEY ("ImageId")
);

-- CreateIndex
CREATE INDEX "IX_Elements_ParentId" ON "Elements"("ParentId");

-- CreateIndex
CREATE INDEX "IX_Elements_ProjectId" ON "Elements"("ProjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_subdomain_key" ON "Projects"("subdomain");

-- CreateIndex
CREATE INDEX "IX_Projects_OwnerId" ON "Projects"("OwnerId");

-- CreateIndex
CREATE INDEX "IX_Images_UserId" ON "Images"("UserId");

-- AddForeignKey
ALTER TABLE "Elements" ADD CONSTRAINT "FK_Elements_Elements_ParentId" FOREIGN KEY ("ParentId") REFERENCES "Elements"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Elements" ADD CONSTRAINT "FK_Elements_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "FK_Projects_Users_OwnerId" FOREIGN KEY ("OwnerId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "FK_Images_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
