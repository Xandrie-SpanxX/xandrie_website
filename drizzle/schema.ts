import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User profiles with role-specific information
 * Extends the base users table with performer/client details
 */
export const userProfiles = mysqlTable("userProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  userType: mysqlEnum("userType", ["performer", "client"]).notNull(),
  avatarUrl: text("avatarUrl"), // Avatar image URL from S3
  bio: text("bio"), // Short bio/description
  isPublic: int("isPublic").default(0).notNull(), // 0 = private, 1 = public
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

/**
 * File storage metadata
 * Stores references to files in S3 with approval workflow
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(), // S3 file key
  fileUrl: text("fileUrl").notNull(), // S3 file URL
  fileName: varchar("fileName", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: int("fileSize").notNull(), // in bytes
  fileType: mysqlEnum("fileType", [
    "profile_photo",
    "gallery_image",
    "gallery_video",
    "avatar",
    "document",
    "contract",
    "form",
    "waiver",
  ]).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  approvedBy: int("approvedBy"), // Admin user ID who approved
  approvedAt: timestamp("approvedAt"),
  rejectionReason: text("rejectionReason"),
  isPrivate: int("isPrivate").default(1).notNull(), // 0 = public, 1 = private
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;

/**
 * Performer galleries (collections of images/videos)
 * Organizes content into named galleries
 */
export const galleries = mysqlTable("galleries", {
  id: int("id").autoincrement().primaryKey(),
  performerId: int("performerId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isPublic: int("isPublic").default(0).notNull(), // 0 = private, 1 = public
  isPurchaseRequired: int("isPurchaseRequired").default(0).notNull(), // 0 = free, 1 = paid
  price: int("price"), // Price in cents if isPurchaseRequired = 1
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Gallery = typeof galleries.$inferSelect;
export type InsertGallery = typeof galleries.$inferInsert;

/**
 * Gallery items (individual files in a gallery)
 */
export const galleryItems = mysqlTable("galleryItems", {
  id: int("id").autoincrement().primaryKey(),
  galleryId: int("galleryId").notNull(),
  fileId: int("fileId").notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

/**
 * Document library for contracts, forms, and waivers
 * Pre-made templates that can be downloaded or filled out
 */
export const documentTemplates = mysqlTable("documentTemplates", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  documentType: mysqlEnum("documentType", [
    "performer_onboarding",
    "contractor_agreement",
    "form_1099",
    "client_findom_contract",
    "client_dominatrix_contract",
    "client_privacy_agreement",
    "waiver",
  ]).notNull(),
  description: text("description"),
  fileUrl: text("fileUrl").notNull(), // S3 URL to PDF or template
  version: varchar("version", { length: 50 }).default("1.0").notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DocumentTemplate = typeof documentTemplates.$inferSelect;
export type InsertDocumentTemplate = typeof documentTemplates.$inferInsert;

/**
 * User document submissions (signed contracts, forms, etc.)
 */
export const userDocuments = mysqlTable("userDocuments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  documentTemplateId: int("documentTemplateId").notNull(),
  fileId: int("fileId"), // Uploaded file (if applicable)
  status: mysqlEnum("status", ["pending", "submitted", "approved", "rejected"]).default("pending").notNull(),
  submittedAt: timestamp("submittedAt"),
  approvedBy: int("approvedBy"), // Admin who approved
  approvedAt: timestamp("approvedAt"),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserDocument = typeof userDocuments.$inferSelect;
export type InsertUserDocument = typeof userDocuments.$inferInsert;

/**
 * Performer requests for documents from clients
 * (e.g., requesting signed contracts before engagement)
 */
export const documentRequests = mysqlTable("documentRequests", {
  id: int("id").autoincrement().primaryKey(),
  performerId: int("performerId").notNull(),
  clientId: int("clientId").notNull(),
  documentTemplateId: int("documentTemplateId").notNull(),
  status: mysqlEnum("status", ["pending", "submitted", "approved", "rejected"]).default("pending").notNull(),
  submittedAt: timestamp("submittedAt"),
  approvedAt: timestamp("approvedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DocumentRequest = typeof documentRequests.$inferSelect;
export type InsertDocumentRequest = typeof documentRequests.$inferInsert;

