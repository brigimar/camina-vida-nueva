export default function SeCoordinador() {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="max-w-6xl mx-auto bg-[#FFFBF7] rounded-[3rem] overflow-hidden border border-orange-100/50 shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[400px] md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1551632811-561732d1e306" 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Coordinador"
            />
          </div>
          <div className="p-10 md:p-20">
            <h2 className="text-4xl font-serif text-slate-900 mb-6">
              Convertí tu pasión en un <br/>
              <span className="text-[#FF5C35] italic">pequeño negocio</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Unite a nuestra comunidad de coordinadores y liderá grupos en la naturaleza.
            </p>
            <button className="bg-[#FF5C35] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-[#e44d2a] transition-all">
              Quiero ser coordinador
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}