// ✅ Helper para registrar métricas (fire-and-forget, no bloquea UI)
export const trackMetric = async (type, data = {}) => {
  try {
    // ✅ Fire and forget - no await, no bloquea UI
    fetch("/api/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        source: "web",
        ...data,
      }),
    }).catch((err) => console.error("Metric tracking error:", err));
  } catch (error) {
    console.error("Track metric error:", error);
  }
};

// ✅ Agrupar circuitos por categoría para view events
export const groupCircuitosByCategoria = (circuitos) => {
  const grouped = {};

  circuitos.forEach((c) => {
    const cat = c.categoria || "sin-categoria";
    if (!grouped[cat]) {
      grouped[cat] = 0;
    }
    grouped[cat]++;
  });

  return grouped;
};
