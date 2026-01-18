import { useState } from "react";

// CRA (Create React App) nutzt REACT_APP_... (nicht VITE_...)
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function LeadForm() {
  const [form, setForm] = useState({
    service: "Reparatur",
    description: "",
    urgency: "In den nächsten Tagen",
    location: "",
    name: "",
    phone: "",
    timeWindow: "",
  });

  const [status, setStatus] = useState({ type: "idle", msg: "" });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Sende Anfrage..." });

    // kleine Normalisierung
    const payload = {
      ...form,
      description: form.description.trim(),
      location: form.location.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      timeWindow: form.timeWindow.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Fehler beim Senden");
      }

      setStatus({
        type: "success",
        msg: "Anfrage gesendet. Wir melden uns zeitnah.",
      });

      // Formular nach Erfolg komplett zurücksetzen
      setForm({
        service: "Reparatur",
        description: "",
        urgency: "In den nächsten Tagen",
        location: "",
        name: "",
        phone: "",
        timeWindow: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err?.message || "Unerwarteter Fehler",
      });
    }
  }

  const statusStyles = {
    borderColor:
      status.type === "success"
        ? "#4caf50"
        : status.type === "error"
        ? "#f44336"
        : "#ff9800",
    backgroundColor:
      status.type === "success"
        ? "#f1f8e9"
        : status.type === "error"
        ? "#ffebee"
        : "#fff3e0",
    color:
      status.type === "success"
        ? "#2e7d32"
        : status.type === "error"
        ? "#c62828"
        : "#ef6c00",
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 6 }}>Anfrage – Müller Heizung & Sanitär</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        Bitte kurz ausfüllen – wir melden uns zeitnah zurück.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <label>
          <span style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Art der Anfrage *
          </span>
          <select
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            <option>Reparatur</option>
            <option>Neuinstallation / Umbau</option>
            <option>Wartung</option>
            <option>Notfall</option>
            <option>Sonstiges</option>
          </select>
        </label>

        <label>
          <span style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Kurzbeschreibung *
          </span>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            required
            rows={4}
            placeholder="z. B. Heizung kalt, Fehlercode 12, seit heute Morgen…"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>

        <label>
          <span style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Dringlichkeit
          </span>
          <select
            value={form.urgency}
            onChange={(e) => update("urgency", e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            <option>Heute</option>
            <option>In den nächsten Tagen</option>
            <option>Nicht dringend</option>
          </select>
        </label>

        <label>
          <span style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            PLZ / Ort *
          </span>
          <input
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            required
            placeholder="z. B. 65549 Limburg"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>

        <label>
          <span style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Name *
          </span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            placeholder="Max Mustermann"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>

        <label>
          <span style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Telefonnummer *
          </span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            pattern="^[0-9 +()/-]{6,}$"
            title="Bitte eine gültige Telefonnummer eingeben (mindestens 6 Zeichen)."
            placeholder="z. B. 0176 12345678 oder 030 123456"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>

        <label>
          <span style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
            Wunschzeit (optional)
          </span>
          <input
            type="text"
            value={form.timeWindow}
            onChange={(e) => update("timeWindow", e.target.value)}
            placeholder="z. B. 14–17 Uhr"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>

        <button
          type="submit"
          disabled={status.type === "loading"}
          style={{
            padding: 12,
            fontWeight: 600,
            cursor: status.type === "loading" ? "not-allowed" : "pointer",
            backgroundColor: status.type === "loading" ? "#ccc" : "#007acc",
            color: "white",
            border: "none",
            borderRadius: 4,
            fontSize: "16px",
            transition: "background-color 0.2s",
          }}
        >
          {status.type === "loading" ? "Wird gesendet..." : "Anfrage senden"}
        </button>

        <small style={{ color: "#555", fontSize: "14px" }}>
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur Bearbeitung der Anfrage zu.
        </small>

        {status.type !== "idle" && (
          <div
            style={{
              padding: 12,
              border: "1px solid",
              borderRadius: 4,
              ...statusStyles,
            }}
          >
            {status.msg}
          </div>
        )}
      </form>
    </div>
  );
}
