CREATE TABLE `documentRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`performerId` int NOT NULL,
	`clientId` int NOT NULL,
	`documentTemplateId` int NOT NULL,
	`status` enum('pending','submitted','approved','rejected') NOT NULL DEFAULT 'pending',
	`submittedAt` timestamp,
	`approvedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `documentRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documentTemplates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`documentType` enum('performer_onboarding','contractor_agreement','form_1099','client_findom_contract','client_dominatrix_contract','client_privacy_agreement','waiver') NOT NULL,
	`description` text,
	`fileUrl` text NOT NULL,
	`version` varchar(50) NOT NULL DEFAULT '1.0',
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `documentTemplates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileUrl` text NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`fileSize` int NOT NULL,
	`fileType` enum('profile_photo','gallery_image','gallery_video','avatar','document','contract','form','waiver') NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`approvedBy` int,
	`approvedAt` timestamp,
	`rejectionReason` text,
	`isPrivate` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `galleries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`performerId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`isPublic` int NOT NULL DEFAULT 0,
	`isPurchaseRequired` int NOT NULL DEFAULT 0,
	`price` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `galleries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `galleryItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`galleryId` int NOT NULL,
	`fileId` int NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `galleryItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`documentTemplateId` int NOT NULL,
	`fileId` int,
	`status` enum('pending','submitted','approved','rejected') NOT NULL DEFAULT 'pending',
	`submittedAt` timestamp,
	`approvedBy` int,
	`approvedAt` timestamp,
	`rejectionReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userType` enum('performer','client') NOT NULL,
	`avatarUrl` text,
	`bio` text,
	`isPublic` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `userProfiles_userId_unique` UNIQUE(`userId`)
);
