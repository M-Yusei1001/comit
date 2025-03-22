-- CreateTable
CREATE TABLE "Authenticator" (
    "credential_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "credential_productKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credential_device_type" TEXT NOT NULL,
    "credential_backed_up" BOOLEAN NOT NULL,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("user_id","credential_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credential_id_key" ON "Authenticator"("credential_id");

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
