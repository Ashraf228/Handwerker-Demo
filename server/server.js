const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

// CRA läuft meist auf http://localhost:3000
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// **ERGÄNZTE ROUTE: Statusseite für Root-Pfad**
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Handwerker Demo API</title>
        <style>
          body { font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 20px; }
          code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Backend läuft ✅</h1>
        <p>Verfügbare Endpoints:</p>
        <ul>
          <li><a href="/health"><code>GET /health</code></a> – API-Status</li>
          <li><code>POST /api/leads</code> – Kontaktformular (benötigt JSON-Body)</li>
        </ul>
        <p style="margin-top: 30px; color: #666; font-size: 0.9em;">
          Port: ${process.env.PORT || 5000} | Environment: ${process.env.NODE_ENV || 'development'}
        </p>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => res.json({ 
  ok: true, 
  timestamp: new Date().toISOString(),
  service: "handwerker-demo-api"
}));

app.post("/api/leads", async (req, res) => {
  const { service, description, urgency, location, name, phone, timeWindow } = req.body || {};

  // **VERBESSERTE VALIDIERUNG**
  const missingFields = [];
  if (!service) missingFields.push("service");
  if (!description) missingFields.push("description");
  if (!location) missingFields.push("location");
  if (!name) missingFields.push("name");
  if (!phone) missingFields.push("phone");

  if (missingFields.length > 0) {
    console.warn(`Validierungsfehler: Fehlende Felder: ${missingFields.join(", ")}`);
    return res.status(400).json({ 
      error: "Pflichtfelder fehlen.", 
      missingFields 
    });
  }

  const subject = `Neue Anfrage – ${service} | Dringlichkeit: ${urgency || "-"}`;
  const text = `Neue Anfrage (Demo)

Art: ${service}
Dringlichkeit: ${urgency || "-"}
Ort: ${location}

Beschreibung:
${description}

Kontakt:
Name: ${name}
Telefon: ${phone}
Wunschzeit: ${timeWindow || "-"}

Zeit: ${new Date().toLocaleString("de-DE")}
`;

  try {
    // **TRANSPORTER-KONFIGURATION MIT BESSERER FEHLERBEHANDLUNG**
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      throw new Error("SMTP-Konfiguration unvollständig. Prüfe .env-Datei.");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465", // Automatisch für Port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // **TIMEOUTS FÜR ROBUSTHEIT**
      connectionTimeout: 10000,
      greetingTimeout: 5000,
    });

    console.log(`Versende E-Mail an: ${process.env.MAIL_TO}`);
    
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || `"Handwerker Demo" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject,
      text,
      // **OPTIONAL: HTML-VERSION DER E-MAIL**
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Neue Anfrage – ${service}</h2>
          <p><strong>Dringlichkeit:</strong> ${urgency || "-"}</p>
          <p><strong>Ort:</strong> ${location}</p>
          <h3>Beschreibung:</h3>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${description.replace(/\n/g, '<br>')}</p>
          <h3>Kontakt:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Wunschzeit:</strong> ${timeWindow || "-"}</p>
          <hr>
          <p style="color: #666; font-size: 0.9em;">
            Gesendet: ${new Date().toLocaleString("de-DE")}<br>
            Demo-System Handwerker
          </p>
        </div>
      `
    });

    console.log(`✅ E-Mail gesendet: ${info.messageId}`);
    res.json({ 
      ok: true, 
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ E-Mail-Fehler:", error.message);
    
    // **NUTZERFREUNDLICHERE FEHLERMELDUNGEN**
    let errorMessage = "Mailversand fehlgeschlagen.";
    let statusCode = 500;
    
    if (error.code === "EAUTH") {
      errorMessage = "SMTP-Authentifizierung fehlgeschlagen. Prüfe Benutzername/Passwort.";
    } else if (error.code === "ENOTFOUND") {
      errorMessage = "SMTP-Server nicht erreichbar. Prüfe Host-Einstellung.";
    } else if (error.code === "ECONNREFUSED") {
      errorMessage = "Verbindung zum SMTP-Server abgelehnt. Prüfe Port-Einstellung.";
    }
    
    res.status(statusCode).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ API läuft auf http://localhost:${PORT}`);
  console.log(`📧 SMTP-Host: ${process.env.SMTP_HOST || "Nicht konfiguriert"}`);
});