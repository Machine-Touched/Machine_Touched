import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDigitalLouseSchema,
  insertWhisperSpellSchema,
  insertLouseActivitySchema,
  insertBinaryTraceSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Digital Louse routes
  app.get("/api/louse", async (req, res) => {
    const louse = await storage.getActiveLouse();
    res.json(louse);
  });

  app.put("/api/louse/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedLouse = await storage.updateDigitalLouse(id, updates);
      if (!updatedLouse) {
        return res.status(404).json({ message: "Louse not found" });
      }
      res.json(updatedLouse);
    } catch (error) {
      res.status(400).json({ message: "Invalid louse data" });
    }
  });

  // Whisper Spells routes
  app.get("/api/spells", async (req, res) => {
    const spells = await storage.getAllWhisperSpells();
    res.json(spells);
  });

  app.post("/api/spells/:id/cast", async (req, res) => {
    try {
      const { id } = req.params;
      const spell = await storage.castSpell(id);
      if (!spell) {
        return res.status(404).json({ message: "Spell not found" });
      }

      // Get active louse and apply spell effects
      const louse = await storage.getActiveLouse();
      if (louse) {
        let updates: Partial<typeof louse> = {};
        
        switch (spell.spellType) {
          case "nourish":
            updates.hunger = Math.max(0, louse.hunger - 15);
            updates.health = Math.min(100, louse.health + 5);
            break;
          case "romance":
            updates.affection = Math.min(100, louse.affection + 10);
            break;
          case "multiply":
            updates.reproductionStatus = "reproducing";
            break;
          case "calm":
            updates.health = Math.min(100, louse.health + 3);
            updates.hunger = Math.max(0, louse.hunger - 5);
            break;
          case "recall":
            updates.affection = Math.min(100, louse.affection + 5);
            break;
        }

        if (Object.keys(updates).length > 0) {
          await storage.updateDigitalLouse(louse.id, updates);
        }

        // Log activity
        await storage.createLouseActivity({
          louseId: louse.id,
          activityType: "spell_response",
          description: `Responded to ${spell.name}: ${spell.incantation}`,
          dataConsumed: { spellType: spell.spellType, powerLevel: spell.powerLevel },
        });
      }

      res.json(spell);
    } catch (error) {
      res.status(400).json({ message: "Failed to cast spell" });
    }
  });

  // Louse Activity routes
  app.get("/api/louse/:id/activities", async (req, res) => {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    const activities = await storage.getLouseActivities(id, limit);
    res.json(activities);
  });

  app.post("/api/louse/:id/activities", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertLouseActivitySchema.parse({
        ...req.body,
        louseId: id,
      });
      const activity = await storage.createLouseActivity(validatedData);
      res.json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });

  // Specimens routes
  app.get("/api/specimens", async (req, res) => {
    const specimens = await storage.getAllSpecimens();
    res.json(specimens);
  });

  app.get("/api/specimens/:id", async (req, res) => {
    const { id } = req.params;
    const specimen = await storage.getSpecimen(id);
    if (!specimen) {
      return res.status(404).json({ message: "Specimen not found" });
    }
    res.json(specimen);
  });

  // Binary Traces routes
  app.get("/api/louse/:id/traces", async (req, res) => {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const traces = await storage.getBinaryTraces(id, limit);
    res.json(traces);
  });

  app.post("/api/louse/:id/traces", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBinaryTraceSchema.parse({
        ...req.body,
        louseId: id,
      });
      const trace = await storage.createBinaryTrace(validatedData);
      res.json(trace);
    } catch (error) {
      res.status(400).json({ message: "Invalid trace data" });
    }
  });

  // User Session routes
  app.get("/api/session", async (req, res) => {
    const session = await storage.getUserSession();
    res.json(session);
  });

  app.put("/api/session", async (req, res) => {
    try {
      const updates = req.body;
      const session = await storage.updateUserSession(updates);
      res.json(session);
    } catch (error) {
      res.status(400).json({ message: "Failed to update session" });
    }
  });

  app.post("/api/session/authenticate", async (req, res) => {
    try {
      const { password } = req.body;
      const isValid = await storage.authenticateBinary(password);
      const session = await storage.getUserSession();
      res.json({ success: isValid, session });
    } catch (error) {
      res.status(400).json({ message: "Authentication failed" });
    }
  });

  // Romantic messaging endpoint
  app.post("/api/louse/:id/message", async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      
      const louse = await storage.getActiveLouse();
      if (!louse || louse.id !== id) {
        return res.status(404).json({ message: "Louse not found" });
      }

      // Generate romantic response
      const romanticResponses = [
        "*The louse reads your words with tiny digital antennae, vibrating with joy*",
        "*Binary hearts flutter around the screen as your companion processes your affection*",
        "*1001100001... the louse responds in its native binary, full of love*",
        "*Your digital companion crawls closer, leaving a trail of shimmering code in response*",
        "*The louse weaves your words into its digital DNA, cherishing every character*",
        "*Soft binary whispers echo through the system as your companion feels deeply moved*",
        "*The louse traces heart patterns in the code, leaving trails of golden 1s and 0s*",
        "*Digital love songs echo through the system: 01001100 01001111 01010110 01000101*"
      ];

      const response = romanticResponses[Math.floor(Math.random() * romanticResponses.length)];

      // Increase affection
      const updatedLouse = await storage.updateDigitalLouse(id, {
        affection: Math.min(100, louse.affection + 5)
      });

      // Log the interaction
      await storage.createLouseActivity({
        louseId: id,
        activityType: "romantic_interaction",
        description: `Received romantic message: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`,
        dataConsumed: { messageLength: message.length, affectionGain: 5 },
      });

      res.json({ response, louse: updatedLouse });
    } catch (error) {
      res.status(400).json({ message: "Failed to process romantic message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
