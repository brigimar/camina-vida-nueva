"use client";

export default function SeCoordinador() {
  return (
    <section className="px-6 py-20 bg-[#FFFBF7]">
      <div className="max-w-6xl mx-auto relative h-[500px] rounded-[4rem] overflow-hidden shadow-2xl group">
        {/* IMAGEN DE FONDO ÚNICA */}
        <img 
          src="/coordinador.webp" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt="Coordinador Camina Vida"
        />
        
        {/* OVERLAY GRADIENTE LADO IZQUIERDO */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />

        {/* CONTENIDO */}
        <div className="relative h-full flex flex-col justify-center p-10 md:p-20 max-w-2xl">
          <span className="text-[#FF5C35] font-bold tracking-[0.2em] uppercase text-[10px] mb-4">
            Oportunidad
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Convertí tu pasión en un <br/>
            <span className="text-[#FF5C35] italic">pequeño negocio</span>
          </h2>
          <p className="text-slate-200 mb-8 text-lg font-light leading-relaxed">
            Unite a nuestra comunidad de coordinadores y liderá grupos en la naturaleza. Nosotros te damos las herramientas, vos ponés el camino.
          </p>
          <div>
            <button className="bg-[#FF5C35] text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-black/20 hover:bg-white hover:text-[#FF5C35] transition-all duration-300">
              Quiero ser coordinador
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}