// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  categories;
  products;
  orders;
  contacts;
  currentUserId;
  currentCategoryId;
  currentProductId;
  currentOrderId;
  currentContactId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.orders = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentContactId = 1;
    this.seedData();
  }
  seedData() {
    const defaultCategories = [
      { name: "Nameplates", nameEn: "Nameplates", nameBn: "\u09A8\u09C7\u09AE\u09AA\u09CD\u09B2\u09C7\u099F", slug: "nameplates" },
      { name: "Wall Decor", nameEn: "Wall Decor", nameBn: "\u09A6\u09C7\u09AF\u09BC\u09BE\u09B2 \u09B8\u09BE\u099C\u09BE\u09A8\u09CB", slug: "wall-decor" },
      { name: "Gift Items", nameEn: "Gift Items", nameBn: "\u0989\u09AA\u09B9\u09BE\u09B0", slug: "gifts" },
      { name: "Islamic Craft", nameEn: "Islamic Craft", nameBn: "\u0987\u09B8\u09B2\u09BE\u09AE\u09BF\u0995 \u09B6\u09BF\u09B2\u09CD\u09AA", slug: "islamic" }
    ];
    defaultCategories.forEach((cat) => {
      const category = { ...cat, id: this.currentCategoryId++ };
      this.categories.set(category.id, category);
    });
    const defaultProducts = [
      {
        name: "Custom Wooden Nameplate",
        nameEn: "Custom Wooden Nameplate",
        nameBn: "\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u0995\u09BE\u09A0\u09C7\u09B0 \u09A8\u09C7\u09AE\u09AA\u09CD\u09B2\u09C7\u099F",
        description: "Beautiful hand-carved nameplate",
        descriptionEn: "Beautiful hand-carved nameplate",
        descriptionBn: "\u09B9\u09BE\u09A4\u09C7 \u0996\u09CB\u09A6\u09BE\u0987 \u0995\u09B0\u09BE \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u09A8\u09C7\u09AE\u09AA\u09CD\u09B2\u09C7\u099F",
        price: "1200.00",
        categoryId: 1,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Traditional Wall Art",
        nameEn: "Traditional Wall Art",
        nameBn: "\u0990\u09A4\u09BF\u09B9\u09CD\u09AF\u09AC\u09BE\u09B9\u09C0 \u09A6\u09C7\u09AF\u09BC\u09BE\u09B2 \u09B6\u09BF\u09B2\u09CD\u09AA",
        description: "Hand-painted beautiful design",
        descriptionEn: "Hand-painted beautiful design",
        descriptionBn: "\u09B9\u09BE\u09A4\u09C7 \u0986\u0981\u0995\u09BE \u09AE\u09A8\u09CB\u09AE\u09C1\u0997\u09CD\u09A7\u0995\u09B0 \u09A1\u09BF\u099C\u09BE\u0987\u09A8",
        price: "800.00",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Special Gift Set",
        nameEn: "Special Gift Set",
        nameBn: "\u09AC\u09BF\u09B6\u09C7\u09B7 \u0989\u09AA\u09B9\u09BE\u09B0 \u09B8\u09C7\u099F",
        description: "Special collection for loved ones",
        descriptionEn: "Special collection for loved ones",
        descriptionBn: "\u09AA\u09CD\u09B0\u09BF\u09AF\u09BC\u099C\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AC\u09BF\u09B6\u09C7\u09B7 \u09B8\u0982\u0997\u09CD\u09B0\u09B9",
        price: "1500.00",
        categoryId: 3,
        imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Islamic Calligraphy",
        nameEn: "Islamic Calligraphy",
        nameBn: "\u0987\u09B8\u09B2\u09BE\u09AE\u09BF\u0995 \u0995\u09CD\u09AF\u09BE\u09B2\u09BF\u0997\u09CD\u09B0\u09BE\u09AB\u09BF",
        description: "Beautiful hand-written verses",
        descriptionEn: "Beautiful hand-written verses",
        descriptionBn: "\u09B9\u09BE\u09A4\u09C7 \u09B2\u09C7\u0996\u09BE \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u0986\u09AF\u09BC\u09BE\u09A4",
        price: "900.00",
        categoryId: 4,
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      }
    ];
    defaultProducts.forEach((prod) => {
      const product = {
        ...prod,
        id: this.currentProductId++,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.products.set(product.id, product);
    });
    const adminUser = {
      id: this.currentUserId++,
      username: "admin",
      email: "admin@shokher-kureghor.com",
      password: "admin123",
      // In real app, this would be hashed
      isAdmin: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(adminUser.id, adminUser);
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = {
      ...insertUser,
      id,
      isAdmin: insertUser.isAdmin ?? false,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  // Category methods
  async getCategories() {
    return Array.from(this.categories.values());
  }
  async getCategory(id) {
    return this.categories.get(id);
  }
  async createCategory(insertCategory) {
    const id = this.currentCategoryId++;
    const category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  // Product methods
  async getProducts() {
    return Array.from(this.products.values()).filter((p) => p.isActive);
  }
  async getProductsByCategory(categoryId) {
    return Array.from(this.products.values()).filter((p) => p.categoryId === categoryId && p.isActive);
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = {
      ...insertProduct,
      id,
      isActive: insertProduct.isActive ?? true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.products.set(id, product);
    return product;
  }
  async updateProduct(id, updateData) {
    const product = this.products.get(id);
    if (!product) return void 0;
    const updatedProduct = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  async deleteProduct(id) {
    const product = this.products.get(id);
    if (!product) return false;
    const updatedProduct = { ...product, isActive: false };
    this.products.set(id, updatedProduct);
    return true;
  }
  // Order methods
  async getOrders() {
    return Array.from(this.orders.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getOrdersByUser(userId) {
    return Array.from(this.orders.values()).filter((order) => order.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getOrder(id) {
    return this.orders.get(id);
  }
  async createOrder(insertOrder) {
    const id = this.currentOrderId++;
    const now = /* @__PURE__ */ new Date();
    const order = {
      ...insertOrder,
      id,
      status: insertOrder.status || "pending",
      quantity: insertOrder.quantity || 1,
      customerMessage: insertOrder.customerMessage || null,
      createdAt: now,
      updatedAt: now
    };
    this.orders.set(id, order);
    return order;
  }
  async updateOrderStatus(id, status) {
    const order = this.orders.get(id);
    if (!order) return void 0;
    const updatedOrder = { ...order, status, updatedAt: /* @__PURE__ */ new Date() };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  // Contact methods
  async getContacts() {
    return Array.from(this.contacts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async createContact(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      isRead: false,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async markContactAsRead(id) {
    const contact = this.contacts.get(id);
    if (!contact) return void 0;
    const updatedContact = { ...contact, isRead: true };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  nameBn: text("name_bn").notNull(),
  slug: text("slug").notNull().unique()
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  nameBn: text("name_bn").notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionBn: text("description_bn").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: integer("category_id").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerMessage: text("customer_message"),
  status: text("status").notNull().default("pending"),
  // pending, confirmed, delivered, cancelled
  quantity: integer("quantity").default(1).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});
var insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  isRead: true,
  createdAt: true
});
var loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await storage.createUser(userData);
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories2 = await storage.getCategories();
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const { categoryId } = req.query;
      if (categoryId) {
        const products2 = await storage.getProductsByCategory(Number(categoryId));
        res.json(products2);
      } else {
        const products2 = await storage.getProducts();
        res.json(products2);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });
  app2.put("/api/products/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updateData = req.body;
      const product = await storage.updateProduct(id, updateData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });
  app2.delete("/api/products/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  app2.get("/api/orders", async (req, res) => {
    try {
      const { userId } = req.query;
      if (userId) {
        const orders2 = await storage.getOrdersByUser(Number(userId));
        res.json(orders2);
      } else {
        const orders2 = await storage.getOrders();
        res.json(orders2);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data" });
    }
  });
  app2.put("/api/orders/:id/status", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      if (!status || !["pending", "confirmed", "delivered", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const order = await storage.updateOrderStatus(id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });
  app2.put("/api/contacts/:id/read", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const contact = await storage.markContactAsRead(id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark contact as read" });
    }
  });
  app2.get("/api/analytics", async (req, res) => {
    try {
      const orders2 = await storage.getOrders();
      const products2 = await storage.getProducts();
      const categories2 = await storage.getCategories();
      const statusCounts = orders2.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});
      const categorySales = orders2.reduce((acc, order) => {
        const product = products2.find((p) => p.id === order.productId);
        if (product) {
          const category = categories2.find((c) => c.id === product.categoryId);
          if (category) {
            acc[category.nameEn] = (acc[category.nameEn] || 0) + 1;
          }
        }
        return acc;
      }, {});
      const monthlySales = orders2.reduce((acc, order) => {
        const month = order.createdAt.toISOString().slice(0, 7);
        acc[month] = (acc[month] || 0) + parseFloat(order.totalPrice);
        return acc;
      }, {});
      res.json({
        totalOrders: orders2.length,
        totalProducts: products2.length,
        statusCounts,
        categorySales,
        monthlySales
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
