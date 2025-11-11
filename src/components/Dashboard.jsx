'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

import LogoutButton from './LogoutButton';
import DashboardResumen from './DashboardResumen';
import DashboardSesiones from './DashboardSesiones';
import DashboardCircuitos from './DashboardCircuitos';
import DashboardInscriptos from './DashboardInscriptos';
import DashboardComparativo from './DashboardComparativo';
import GraficoDiasHorarios from './GraficoDiasHorarios';



export default function Dashboard() {
  const router = useRouter();
  const [inscriptos, setInscriptos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchInscriptos = async () => {
      const { data, error } = await supabase.from('vista_inscriptos_dashboard').select('*');
      if (error) {
        console.error('❌ Error al cargar vista_inscriptos_dashboard:', error.message);
        setInscriptos([]);
      } else {
        setInscriptos(data);
      }
      setLoading(false);
    };

    fetchInscriptos();
  }, []);

  const inscriptosFiltrados = useMemo(() => inscriptos, [inscriptos]);

  return (
    <main className="min-h-screen bg-fondo text-texto font-sans p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-verde-oscuro">Dashboard Camina Vida</h1>
        <LogoutButton />
      </div>

      <DashboardResumen inscriptosFiltrados={inscriptosFiltrados} />
      <DashboardCircuitos />
      <DashboardSesiones />

      {!loading && (
        <>
          <DashboardInscriptos inscriptosFiltrados={inscriptosFiltrados} />
          
        </>
      )}

      <DashboardComparativo />

    </main>
  );
}
