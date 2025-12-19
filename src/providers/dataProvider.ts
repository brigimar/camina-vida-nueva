// dataProvider removed (Refine-specific). If imported, provide no-op implementations.
// ✅ Usando ruta relativa para evitar undefined en SSR
const API_URL = "/api";

export const dataProvider = {
  async getList() {
    const res = await fetch(`${API_URL}`);
    return { data: await res.json(), total: 0 };
  },
  async getOne() {
    throw new Error('dataProvider.getOne removed');
  },
  async create() {
    throw new Error('dataProvider.create removed');
  },
  async update() {
    throw new Error('dataProvider.update removed');
  },
  async deleteOne() {
    throw new Error('dataProvider.deleteOne removed');
  },
};
