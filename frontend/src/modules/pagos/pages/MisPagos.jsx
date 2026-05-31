import React from 'react';
import { CreditCard, Download, ExternalLink, Calendar, DollarSign } from 'lucide-react';

const mockTransactions = [
  { id: 'TX-1002', fecha: '28/05/2026', curso: 'React Avanzado: Hooks, Context y Patrones', monto: 39.99, estado: 'completado' },
  { id: 'TX-1001', fecha: '15/04/2026', curso: 'Node.js & Express: API REST Completa', monto: 33.99, estado: 'completado' },
  { id: 'TX-0998', fecha: '02/03/2026', curso: 'Base de Datos con PostgreSQL', monto: 19.99, estado: 'completado' }
];

const MisPagos = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="section-title">Mis Pagos</h1>
        <p className="section-subtitle">Consulta tu historial de compras y descarga facturas.</p>
      </div>

      {/* Overview totals card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-display font-black text-white">$93.97</span>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-wider mt-0.5">Total invertido</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-display font-black text-white">3</span>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-wider mt-0.5">Transacciones exitosas</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-display font-black text-white">Mensual</span>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-wider mt-0.5">Método de pago principal</p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-dark-900">
          <h3 className="font-bold text-white text-base">Historial de Compras</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark-350">
            <thead className="bg-dark-900/30 text-xs text-dark-400 font-bold uppercase border-b border-dark-900">
              <tr>
                <th className="p-4">ID Transacción</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Curso / Producto</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Factura</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-900">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-dark-900/10 transition-colors">
                  <td className="p-4 font-mono text-xs text-white">{tx.id}</td>
                  <td className="p-4">{tx.fecha}</td>
                  <td className="p-4 font-semibold text-white">{tx.curso}</td>
                  <td className="p-4 font-bold text-white">${tx.monto}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                      {tx.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-900 transition-all">
                      <Download className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MisPagos;
