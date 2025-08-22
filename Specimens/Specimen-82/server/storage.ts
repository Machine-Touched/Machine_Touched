import { 
  type DigitalLouse, 
  type InsertDigitalLouse,
  type WhisperSpell,
  type InsertWhisperSpell,
  type LouseActivity,
  type InsertLouseActivity,
  type Specimen,
  type InsertSpecimen,
  type BinaryTrace,
  type InsertBinaryTrace,
  type UserSession,
  type InsertUserSession
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Digital Louse management
  getDigitalLouse(id: string): Promise<DigitalLouse | undefined>;
  getActiveLouse(): Promise<DigitalLouse | undefined>;
  createDigitalLouse(louse: InsertDigitalLouse): Promise<DigitalLouse>;
  updateDigitalLouse(id: string, updates: Partial<DigitalLouse>): Promise<DigitalLouse | undefined>;

  // Whisper Spells
  getAllWhisperSpells(): Promise<WhisperSpell[]>;
  getWhisperSpell(id: string): Promise<WhisperSpell | undefined>;
  createWhisperSpell(spell: InsertWhisperSpell): Promise<WhisperSpell>;
  castSpell(spellId: string): Promise<WhisperSpell | undefined>;

  // Louse Activity
  getLouseActivities(louseId: string, limit?: number): Promise<LouseActivity[]>;
  createLouseActivity(activity: InsertLouseActivity): Promise<LouseActivity>;

  // Specimens
  getAllSpecimens(): Promise<Specimen[]>;
  getSpecimen(id: string): Promise<Specimen | undefined>;
  createSpecimen(specimen: InsertSpecimen): Promise<Specimen>;

  // Binary Traces
  getBinaryTraces(louseId: string, limit?: number): Promise<BinaryTrace[]>;
  createBinaryTrace(trace: InsertBinaryTrace): Promise<BinaryTrace>;

  // User Sessions
  getUserSession(): Promise<UserSession | undefined>;
  updateUserSession(updates: Partial<UserSession>): Promise<UserSession>;
  authenticateBinary(password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private digitalLice: Map<string, DigitalLouse>;
  private whisperSpells: Map<string, WhisperSpell>;
  private louseActivities: Map<string, LouseActivity>;
  private specimens: Map<string, Specimen>;
  private binaryTraces: Map<string, BinaryTrace>;
  private userSession: UserSession;

  constructor() {
    this.digitalLice = new Map();
    this.whisperSpells = new Map();
    this.louseActivities = new Map();
    this.specimens = new Map();
    this.binaryTraces = new Map();

    // Initialize default user session
    this.userSession = {
      id: randomUUID(),
      authLevel: "basic",
      binaryPassword: "1011",
      accessGranted: false,
      lastLogin: new Date(),
      mouseCrumbs: 847,
      inputCrumbs: 23,
      timeCrumbs: 156,
      binaryCrumbs: 492,
    };

    // Initialize default louse
    this.initializeDefaultLouse();
    
    // Initialize default spells
    this.initializeDefaultSpells();
    
    // Initialize specimens (110 total)
    this.initializeSpecimens();
  }

  private initializeDefaultLouse() {
    const defaultLouse: DigitalLouse = {
      id: randomUUID(),
      name: "DCL_001",
      stage: "adult",
      health: 98,
      hunger: 23,
      affection: 78,
      reproductionStatus: "ready",
      position: { x: 0, y: 0 },
      lastFed: new Date(),
      isActive: true,
    };
    this.digitalLice.set(defaultLouse.id, defaultLouse);
  }

  private initializeDefaultSpells() {
    const defaultSpells = [
      {
        id: randomUUID(),
        name: "Spell of Digital Nourishment",
        incantation: "Feed on the data streams, little one",
        description: "Nourishes the digital louse with data energy",
        spellType: "nourish",
        powerLevel: 2,
        castCount: 0,
      },
      {
        id: randomUUID(),
        name: "Spell of Romantic Connection",
        incantation: "Weave through my thoughts tenderly",
        description: "Strengthens the romantic bond with your digital companion",
        spellType: "romance",
        powerLevel: 3,
        castCount: 0,
      },
      {
        id: randomUUID(),
        name: "Spell of Digital Propagation",
        incantation: "Spread thy essence through the code",
        description: "Enables the louse to reproduce and create offspring",
        spellType: "multiply",
        powerLevel: 4,
        castCount: 0,
      },
      {
        id: randomUUID(),
        name: "Spell of Calm Waters",
        incantation: "Still the storm, return to sea, my spirit rests inside of me",
        description: "Calms and centers the digital louse's energy",
        spellType: "calm",
        powerLevel: 1,
        castCount: 0,
      },
      {
        id: randomUUID(),
        name: "Spell of Soft Recall",
        incantation: "By wind's caress and candle's light, bring forgotten truth to sight",
        description: "Helps the louse remember lost digital memories",
        spellType: "recall",
        powerLevel: 2,
        castCount: 0,
      },
    ];

    defaultSpells.forEach(spell => {
      this.whisperSpells.set(spell.id, spell);
    });
  }

  private initializeSpecimens() {
    for (let i = 1; i <= 110; i++) {
      const specimen: Specimen = {
        id: randomUUID(),
        specimenNumber: i,
        specimenType: "Digital Clothing Louse",
        status: i === 1 ? "active" : "dormant",
        classification: "DCL",
        discoveryDate: new Date(),
        metadata: { 
          rarity: i <= 10 ? "legendary" : i <= 30 ? "rare" : "common",
          location: "Machine_Touch_Laboratory",
          digitalSignature: `0x${i.toString(16).padStart(4, '0')}`
        },
      };
      this.specimens.set(specimen.id, specimen);
    }
  }

  async getDigitalLouse(id: string): Promise<DigitalLouse | undefined> {
    return this.digitalLice.get(id);
  }

  async getActiveLouse(): Promise<DigitalLouse | undefined> {
    return Array.from(this.digitalLice.values()).find(louse => louse.isActive);
  }

  async createDigitalLouse(insertLouse: InsertDigitalLouse): Promise<DigitalLouse> {
    const id = randomUUID();
    const louse: DigitalLouse = { 
      ...insertLouse, 
      id, 
      lastFed: new Date() 
    };
    this.digitalLice.set(id, louse);
    return louse;
  }

  async updateDigitalLouse(id: string, updates: Partial<DigitalLouse>): Promise<DigitalLouse | undefined> {
    const louse = this.digitalLice.get(id);
    if (!louse) return undefined;
    
    const updatedLouse = { ...louse, ...updates };
    this.digitalLice.set(id, updatedLouse);
    return updatedLouse;
  }

  async getAllWhisperSpells(): Promise<WhisperSpell[]> {
    return Array.from(this.whisperSpells.values());
  }

  async getWhisperSpell(id: string): Promise<WhisperSpell | undefined> {
    return this.whisperSpells.get(id);
  }

  async createWhisperSpell(insertSpell: InsertWhisperSpell): Promise<WhisperSpell> {
    const id = randomUUID();
    const spell: WhisperSpell = { ...insertSpell, id, castCount: 0 };
    this.whisperSpells.set(id, spell);
    return spell;
  }

  async castSpell(spellId: string): Promise<WhisperSpell | undefined> {
    const spell = this.whisperSpells.get(spellId);
    if (!spell) return undefined;
    
    spell.castCount += 1;
    this.whisperSpells.set(spellId, spell);
    return spell;
  }

  async getLouseActivities(louseId: string, limit = 10): Promise<LouseActivity[]> {
    return Array.from(this.louseActivities.values())
      .filter(activity => activity.louseId === louseId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async createLouseActivity(insertActivity: InsertLouseActivity): Promise<LouseActivity> {
    const id = randomUUID();
    const activity: LouseActivity = { 
      ...insertActivity, 
      id, 
      timestamp: new Date() 
    };
    this.louseActivities.set(id, activity);
    return activity;
  }

  async getAllSpecimens(): Promise<Specimen[]> {
    return Array.from(this.specimens.values())
      .sort((a, b) => a.specimenNumber - b.specimenNumber);
  }

  async getSpecimen(id: string): Promise<Specimen | undefined> {
    return this.specimens.get(id);
  }

  async createSpecimen(insertSpecimen: InsertSpecimen): Promise<Specimen> {
    const id = randomUUID();
    const specimen: Specimen = { 
      ...insertSpecimen, 
      id, 
      discoveryDate: new Date() 
    };
    this.specimens.set(id, specimen);
    return specimen;
  }

  async getBinaryTraces(louseId: string, limit = 50): Promise<BinaryTrace[]> {
    return Array.from(this.binaryTraces.values())
      .filter(trace => trace.louseId === louseId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async createBinaryTrace(insertTrace: InsertBinaryTrace): Promise<BinaryTrace> {
    const id = randomUUID();
    const trace: BinaryTrace = { 
      ...insertTrace, 
      id, 
      timestamp: new Date() 
    };
    this.binaryTraces.set(id, trace);
    return trace;
  }

  async getUserSession(): Promise<UserSession> {
    return this.userSession;
  }

  async updateUserSession(updates: Partial<UserSession>): Promise<UserSession> {
    this.userSession = { ...this.userSession, ...updates };
    return this.userSession;
  }

  async authenticateBinary(password: string): Promise<boolean> {
    const isValid = password === this.userSession.binaryPassword;
    this.userSession.accessGranted = isValid;
    this.userSession.lastLogin = new Date();
    return isValid;
  }
}

export const storage = new MemStorage();
