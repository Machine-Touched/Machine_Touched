import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const digitalLouse = pgTable("digital_louse", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().default("DCL_001"),
  stage: text("stage").notNull().default("adult"), // egg, larva, adult, reproduction
  health: integer("health").notNull().default(98),
  hunger: integer("hunger").notNull().default(23),
  affection: integer("affection").notNull().default(78),
  reproductionStatus: text("reproduction_status").notNull().default("ready"),
  position: json("position").notNull().default({ x: 0, y: 0 }),
  lastFed: timestamp("last_fed").notNull().default(sql`now()`),
  isActive: boolean("is_active").notNull().default(true),
});

export const whisperSpells = pgTable("whisper_spells", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  incantation: text("incantation").notNull(),
  description: text("description").notNull(),
  spellType: text("spell_type").notNull(), // nourish, romance, multiply, calm, recall
  powerLevel: integer("power_level").notNull().default(1),
  castCount: integer("cast_count").notNull().default(0),
});

export const louseActivity = pgTable("louse_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  louseId: varchar("louse_id").notNull(),
  activityType: text("activity_type").notNull(), // feeding, movement, reproduction, spell_response
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  dataConsumed: json("data_consumed").default({}),
});

export const specimens = pgTable("specimens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  specimenNumber: integer("specimen_number").notNull(),
  specimenType: text("specimen_type").notNull().default("Digital Clothing Louse"),
  status: text("status").notNull().default("active"), // active, dormant, archived
  classification: text("classification").notNull().default("DCL"),
  discoveryDate: timestamp("discovery_date").notNull().default(sql`now()`),
  metadata: json("metadata").default({}),
});

export const binaryTraces = pgTable("binary_traces", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  louseId: varchar("louse_id").notNull(),
  position: json("position").notNull(),
  binaryData: text("binary_data").notNull(),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
  traceType: text("trace_type").notNull(), // mouse, input, time, system
});

export const userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authLevel: text("auth_level").notNull().default("basic"),
  binaryPassword: text("binary_password").notNull().default("1011"),
  accessGranted: boolean("access_granted").notNull().default(false),
  lastLogin: timestamp("last_login").notNull().default(sql`now()`),
  mouseCrumbs: integer("mouse_crumbs").notNull().default(0),
  inputCrumbs: integer("input_crumbs").notNull().default(0),
  timeCrumbs: integer("time_crumbs").notNull().default(0),
  binaryCrumbs: integer("binary_crumbs").notNull().default(0),
});

// Insert schemas
export const insertDigitalLouseSchema = createInsertSchema(digitalLouse).omit({
  id: true,
  lastFed: true,
});

export const insertWhisperSpellSchema = createInsertSchema(whisperSpells).omit({
  id: true,
  castCount: true,
});

export const insertLouseActivitySchema = createInsertSchema(louseActivity).omit({
  id: true,
  timestamp: true,
});

export const insertSpecimenSchema = createInsertSchema(specimens).omit({
  id: true,
  discoveryDate: true,
});

export const insertBinaryTraceSchema = createInsertSchema(binaryTraces).omit({
  id: true,
  timestamp: true,
});

export const insertUserSessionSchema = createInsertSchema(userSessions).omit({
  id: true,
  lastLogin: true,
});

// Types
export type InsertDigitalLouse = z.infer<typeof insertDigitalLouseSchema>;
export type DigitalLouse = typeof digitalLouse.$inferSelect;

export type InsertWhisperSpell = z.infer<typeof insertWhisperSpellSchema>;
export type WhisperSpell = typeof whisperSpells.$inferSelect;

export type InsertLouseActivity = z.infer<typeof insertLouseActivitySchema>;
export type LouseActivity = typeof louseActivity.$inferSelect;

export type InsertSpecimen = z.infer<typeof insertSpecimenSchema>;
export type Specimen = typeof specimens.$inferSelect;

export type InsertBinaryTrace = z.infer<typeof insertBinaryTraceSchema>;
export type BinaryTrace = typeof binaryTraces.$inferSelect;

export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type UserSession = typeof userSessions.$inferSelect;
