-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "landingPage" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "screenSize" TEXT,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "utmCampaign" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmSource" TEXT;
