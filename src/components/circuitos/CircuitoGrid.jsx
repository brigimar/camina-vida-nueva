'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CalendarDays, Clock, Map } from 'lucide-react';
import styles from './CircuitoGrid.module.css';

export default function CircuitoGrid({
  circuitos = [],
  columns = { base: 1, sm: 2, lg: 3 },
  gap = '1.5rem',
  mostrarBotonReserva = false,
  renderCardContent,
}) {
  const gridStyle = {
    display: 'grid',
    gap,
    gridTemplateColumns: `repeat(${columns.base}, 1fr)`,
  };

  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width >= 1024 && columns.lg) gridStyle.gridTemplateColumns = `repeat(${columns.lg}, 1fr)`;
    else if (width >= 640 && columns.sm) gridStyle.gridTemplateColumns = `repeat(${columns.sm}, 1fr)`;
  }

  return (
    <div className={styles.gridWrapper}>
      <AnimatePresence>
        {circuitos.map((c) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={styles.card}
          >
            <img
              src={c.foto || '/images/circuitos/default.jpg'}
              alt={c.nombre}
              className={styles.cardImage}
            />

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{c.nombre}</h3>
              <p className={styles.cardText}>
                <MapPin size={16} className="inline mr-1 text-gray-500" />
                {c.localidad}
              </p>
              <p className={styles.cardText}>
                <CalendarDays size={16} className="inline mr-1 text-gray-500" />
                {Array.isArray(c.dias) ? c.dias.join(', ') : '—'}
              </p>
              <p className={styles.cardText}>
                <Clock size={16} className="inline mr-1 text-gray-500" />
                {Array.isArray(c.horarios) ? c.horarios.join(', ') : '—'}
              </p>
              <p className={styles.cardText}>
                <Map size={16} className="inline mr-1 text-gray-500" />
                {c.punto_encuentro || '—'}
              </p>

              {renderCardContent && renderCardContent(c)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
