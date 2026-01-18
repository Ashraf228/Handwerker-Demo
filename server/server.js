import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
app.use(express.json());

// Für Demo: React läuft meist auf 5173 (Vite) oder 3000 (CRA)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
}));

app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/api/leads", async (req, res) => {
  const { service, description, urgency, location, name, phone, timeWindow } = req.body || {};

  // Minimal-Validation
  if (!service || !description || !location || !name || !phone) {
    return res.status(400).send("Pflichtfelder fehlen.");
  }

  const subject = `Neue Anfrage – ${service} | Dringlichkeit: ${urgency || "-"}`;
  const text =
`Neue Anfrage (Demo)

Art: ${service}
Dringlichkeit: ${urgency || "-"}
Ort: ${location}

Beschreibung:
${description}

Kontakt:
Name: ${name}
Telefon: ${phone}
Wunschzeit: ${timeWindow || "-"}

Zeit: ${new Date().toISOString()}
`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // true nur bei 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject,
      text,
    });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Mailversand fehlgeschlagen.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API läuft auf Port ${PORT}`));
