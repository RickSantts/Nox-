import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- SVGs Globais ---
const SvgIcon = ({ name, size = 24 }) => {
  const paths = {
    alimentacao: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
    transporte: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />,
    moradia: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    saude: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    lazer: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    educacao: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14v7 M5 10v6 a7 7 0 0014 0v-6" />,
    vestuario: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />,
    outros_saida: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />,
    salario: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    freelance: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    investimento: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    presente: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    empty_box: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4M12 12L12 21 M4.5 8L12 11 M19.5 8L12 11" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    config: <g><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>,
    wallet: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z m0 0V8a2 2 0 012-2h10" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
    eye_off: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  };
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {paths[name] || paths['outros_saida']}
    </svg>
  );
};

// --- DEFINIÇÕES DE DADOS ---
const EXPENSE_CATEGORIES = [
  { id: 'alimentacao', label: 'Alimentação', color: '#FF7A59' },
  { id: 'transporte', label: 'Transporte', color: '#FFB142' },
  { id: 'moradia', label: 'Moradia', color: '#00C896' },
  { id: 'saude', label: 'Saúde', color: '#0097E6' },
  { id: 'lazer', label: 'Lazer', color: '#8C7AE6' },
  { id: 'educacao', label: 'Educação', color: '#B33771' },
  { id: 'vestuario', label: 'Vestuário', color: '#D6A2E8' },
  { id: 'outros_saida', label: 'Outros', color: '#A0AEC0' }
];

const INCOME_CATEGORIES = [
  { id: 'salario', label: 'Salário', color: '#00C896' },
  { id: 'freelance', label: 'Freelance', color: '#0097E6' },
  { id: 'investimento', label: 'Invstmnt', color: '#8C7AE6' },
  { id: 'presente', label: 'Presente', color: '#FFB142' }
];

const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

const getCategoryInfo = (id) => ALL_CATEGORIES.find(c => c.id === id) || { label: 'Desconhecido', color: '#A0AEC0' };

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
const getMonthLabel = (dateStr) => {
  if (!dateStr || dateStr.length < 7) return '';
  const [year, month] = dateStr.split('-');
  const date = new Date(year, parseInt(month) - 1, 1);
  const m = date.toLocaleDateString('pt-BR', { month: 'long' });
  return m.charAt(0).toUpperCase() + m.slice(1) + ' ' + year;
};
const getCurrentMonthStr = () => new Date().toISOString().substring(0, 7);

// --- ESTILIZAÇÃO NEUMORPHISM/MODERNA (V2) ---
const globalStyle = `
  :root {
    --bg-page-dark: #0D1F1A;
    --bg-surface-dark: #152E27;
    --bg-surface-hover: #1E3D35;
    --border-dark: #2A4D43;
    --text-main-dark: #FFFFFF;
    --text-muted-dark: #8AA89E;
    
    --color-primary: #3DCEA8; 
    --color-secondary: #7FFFd4;
    --color-income: #7FFFd4;
    --color-expense: #FF6B6B; 
    --color-warning: #FFD93D;
  }

  body, html {
    margin: 0; padding: 0;
    background-color: var(--bg-page-dark);
    color: var(--text-main-dark);
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  * { box-sizing: border-box; }
  button, input, select { font-family: 'Poppins', sans-serif; outline: none; }

  @keyframes slideUpFade { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes popIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  @keyframes slideLeft { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

  .app-container { max-width: 480px; margin: 0 auto; min-height: 100vh; padding-bottom: calc(90px + env(safe-area-inset-bottom)); position: relative; }
  ::-webkit-scrollbar { display: none; }

  /* Header */
  .header-area { padding: 30px 24px 10px; display: flex; justify-content: space-between; align-items: flex-start; }
  .greeting { font-size: 1.25rem; font-weight: 600; color: var(--text-main-dark); display: flex; alignItems: center; gap: 8px;}
  .subtitle { font-size: 0.85rem; color: var(--text-muted-dark); margin-top: -4px;}
  
  /* Balances & Wallets */
  .wallet-slider { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 16px; padding: 0 24px 24px; }
  .total-balance-box {
    flex: 0 0 100%; scroll-snap-align: center;
    padding: 24px;
    background: linear-gradient(135deg, #3DCEA8 0%, #7FFFd4 100%);
    border-radius: 28px; color: white;
    box-shadow: 0 10px 30px rgba(61, 206, 168, 0.3);position: relative; overflow: hidden;
  }
  .total-balance-box::after { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%; }
  
  /* Month Picker */
  .month-picker-container { padding: 0 24px; margin-bottom: 20px; display: flex; justify-content: flex-end; }
  .month-select {
    appearance: none; background: var(--bg-surface-dark); color: var(--text-main-dark);
    border: 1px solid var(--border-dark); padding: 10px 36px 10px 16px; border-radius: 20px;
    font-weight: 500; font-size: 0.85rem; cursor: pointer;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24"><path stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>');
    background-repeat: no-repeat; background-position: right 12px center;
  }

  /* Content Cards */
  .content-pad { padding: 0 24px; display: flex; flex-direction: column; gap: 16px; animation: popIn 0.4s ease; }
  .card-row { display: flex; gap: 16px; }
  .card-half { flex: 1; background: var(--bg-surface-dark); padding: 16px 20px; border-radius: 24px; display: flex; flex-direction: column; justify-content: center; }
  .card-half .icon-circ { width: 36px; height: 36px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .card-half.inc .icon-circ { background: rgba(18, 201, 155, 0.15); color: var(--color-income); }
  .card-half.exp .icon-circ { background: rgba(255, 74, 107, 0.15); color: var(--color-expense); }
  .glass-card { background: var(--bg-surface-dark); border-radius: 24px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .section-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 16px; }

  /* TX List */
  .tx-item { display: flex; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--border-dark); position: relative; overflow: hidden; transition: all 0.3s ease; cursor: pointer; }
  .tx-item:last-child { border-bottom: none; padding-bottom: 0; }
  .tx-item:hover { background: rgba(255,255,255,0.02); border-radius: 12px; padding-left: 8px; padding-right: 8px;}
  .tx-icon-bg { width: 48px; height: 48px; border-radius: 16px; display: flex; justify-content: center; align-items: center; margin-right: 14px; flex-shrink: 0; }
  .tx-texts { flex: 1; min-width: 0; }
  .tx-title { font-weight: 500; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin:0 0 2px; }
  .tx-desc { font-size: 0.75rem; color: var(--text-muted-dark); margin:0; }
  .tx-val { font-weight: 600; font-size: 1rem; text-align: right; }
  .tx-date { font-size: 0.7rem; color: var(--text-muted-dark); text-align: right; }
  
  /* Edit / Delete Layer */
  .tx-actions { display: flex; justify-content: flex-end; gap: 8px; padding: 8px 0 14px; border-bottom: 1px solid var(--border-dark); animation: popIn 0.2s ease;}
  .btn-act { padding: 8px 16px; border-radius: 12px; border: none; font-weight: 500; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 8px; }
  .btn-act.edit { background: var(--bg-surface-hover); color: var(--text-main-dark); }
  .btn-act.del { background: rgba(255, 74, 107, 0.1); color: var(--color-expense); }

  /* Budget Bar */
  .budget-bar-bg { width: 100%; height: 8px; background: var(--border-dark); border-radius: 4px; overflow: hidden; margin-top: 8px; position: relative;}
  .budget-bar-fill { height: 100%; border-radius: 4px; transition: 0.3s; }
  
  /* Search & Settings */
  .search-input { width: 100%; background: var(--bg-surface-dark); border: 1px solid var(--border-dark); padding: 14px 20px 14px 44px; border-radius: 20px; color: white; margin-bottom: 20px; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="%238E9BAE"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>'); background-repeat: no-repeat; background-position: 16px center; }
  .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border-dark); }
  .btn-outline { background: transparent; border: 1px solid var(--color-primary); color: var(--color-primary); padding: 10px 20px; border-radius: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .btn-outline:active { background: var(--color-primary); color: white; }

  /* Forms & Nav */
  .bottom-nav-container { position: fixed; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; pointer-events: none; z-index: 50; }
  .bottom-nav { width: 100%; max-width: 480px; margin: 0 auto; background: rgba(18, 24, 38, 0.85); backdrop-filter: blur(20px); border-top: 1px solid var(--border-dark); padding: 12px 24px calc(12px + env(safe-area-inset-bottom)); display: flex; justify-content: space-between; align-items: center; pointer-events: auto; }
  .nav-item { background: none; border: none; color: var(--text-muted-dark); display: flex; flex-direction: column; align-items: center; font-size: 0.7rem; gap: 4px; font-weight: 500; cursor: pointer; transition: 0.2s; }
  .nav-item.active { color: var(--color-primary); }
  .fab-glass { width: 64px; height: 64px; border-radius: 32px; background: var(--color-primary); color: white; border: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(61, 206, 168, 0.4); transform: translateY(-20px); cursor: pointer; transition: 0.2s; }
  
  /* Overlays */
  .bottom-sheet-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 100; display: flex; justify-content: center; align-items: flex-end; }
  .bottom-sheet { background: var(--bg-page-dark); width: 100%; max-width: 480px; border-top-left-radius: 32px; border-top-right-radius: 32px; padding: 24px 24px calc(24px + env(safe-area-inset-bottom)); animation: slideUpFade 0.35s cubic-bezier(0.1, 0.9, 0.2, 1); max-height: 90vh; overflow-y: auto;}
  .sheet-handle { width: 40px; height: 5px; background: var(--border-dark); border-radius: 5px; margin: 0 auto 20px; }
  .modern-input, .modern-select { width: 100%; background: var(--bg-surface-dark); border: 1px solid var(--border-dark); padding: 16px 20px; border-radius: 16px; color: var(--text-main-dark); font-size: 0.95rem; margin-bottom: 16px; }
  .btn-submit { width: 100%; background: var(--color-primary); color: white; padding: 16px; border: none; border-radius: 16px; font-weight: 600; font-size: 1.05rem; cursor: pointer; margin-top: 10px; box-shadow: 0 8px 20px rgba(89, 68, 255, 0.3); }

  /* Toasts */
  .toast-wrapper { position: fixed; top: 40px; left: 0; right: 0; display: flex; justify-content: center; z-index: 1001; animation: slideUpFade 0.3s ease; }
  .toast-box { background: var(--color-expense); color: white; padding: 14px 24px; border-radius: 100px; font-weight: 500; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(255, 74, 107, 0.4); }

  /* Name Modal */
  .name-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 200; display: flex; justify-content: center; align-items: center; }
  .name-modal { background: var(--bg-surface-dark); padding: 32px; border-radius: 24px; width: 90%; max-width: 360px; text-align: center; animation: popIn 0.4s ease; }
  .name-modal h2 { font-size: 1.4rem; margin-bottom: 8px; color: var(--text-main-dark); }
  .name-modal p { font-size: 0.9rem; color: var(--text-muted-dark); margin-bottom: 24px; }
  .name-modal input { width: 100%; background: var(--bg-page-dark); border: 1px solid var(--border-dark); padding: 14px 16px; border-radius: 14px; color: var(--text-main-dark); font-size: 1rem; margin-bottom: 16px; text-align: center; }
  .name-modal button { width: 100%; background: var(--color-primary); color: white; padding: 14px; border: none; border-radius: 14px; font-weight: 600; font-size: 1rem; cursor: pointer; }
`;

// --- COMPONENTES VISUAIS ---

const ChartBars = ({ options, dataIncome, dataExpense }) => {
  if (options.length === 0) return null;
  const maxVal = Math.max(...dataIncome, ...dataExpense, 1);
  return (
    <div>
      <svg width="100%" height="180" viewBox="0 0 400 180" preserveAspectRatio="none">
        {options.map((m, i) => {
          const x = (400 / options.length) * i + (400 / options.length / 2);
          const incH = (dataIncome[i] / maxVal) * 120;
          const expH = (dataExpense[i] / maxVal) * 120;
          return (
            <g key={m}>
              <rect x={x - 16} y={140 - incH} width="12" height={incH} fill="var(--color-income)" rx="6" />
              <rect x={x + 4} y={140 - expH} width="12" height={expH} fill="var(--color-expense)" rx="6" />
              <text x={x} y="160" textAnchor="middle" fill="var(--text-muted-dark)" fontSize="12" fontWeight="500">{m}</text>
            </g>
          );
        })}
      </svg>
      <div style={{display:'flex', justifyContent:'center', gap:'16px', fontSize:'0.75rem', marginTop:'10px'}}>
        <span style={{display:'flex', alignItems:'center', gap:'4px'}}><div style={{width:8,height:8,borderRadius:4,background:'var(--color-income)'}}></div> Entradas</span>
        <span style={{display:'flex', alignItems:'center', gap:'4px'}}><div style={{width:8,height:8,borderRadius:4,background:'var(--color-expense)'}}></div> Saídas</span>
      </div>
    </div>
  );
};

const ChartDonut = ({ data, safeFormat }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let offset = 0;

  if (total === 0) return (
    <div style={{padding:'20px', textAlign:'center', color:'var(--text-muted-dark)'}}>
      <SvgIcon name="empty_box" size={40} />
      <div style={{fontSize:'0.9rem', marginTop:10}}>Sem dados para exibir.</div>
    </div>
  );

  return (
    <div style={{display:'flex', justifyContent:'center', margin:'10px 0', position:'relative'}}>
      <svg width="180" height="180" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="70" fill="none" stroke="var(--bg-page-dark)" strokeWidth="20" />
        {data.map((item, i) => {
          if (item.value === 0) return null;
          const r = 70;
          const circ = 2 * Math.PI * r;
          const valCirc = (item.value / total) * circ;
          const renderOffset = -offset;
          offset += valCirc;
          return (
            <circle key={item.label} cx="100" cy="100" r={r} fill="none" stroke={item.color} strokeWidth="20" strokeDasharray={`${valCirc} ${circ}`} strokeDashoffset={renderOffset} strokeLinecap="round" transform="rotate(-90 100 100)" style={{ transition: 'stroke-dasharray 1s ease' }} />
          );
        })}
      </svg>
      <div style={{position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <div style={{fontSize:'0.7rem', color:'var(--text-muted-dark)'}}>Total</div>
        <div style={{fontSize:'1rem', fontWeight:600}}>{safeFormat(total)}</div>
      </div>
    </div>
  );
};

const ItemTx = ({ tx, onDelete, onEdit, safeFormat }) => {
  const [opened, setOpened] = useState(false);
  const info = getCategoryInfo(tx.category);
  const isInc = tx.type === 'entrada';
  
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div className="tx-item" onClick={() => setOpened(!opened)}>
        <div className="tx-icon-bg" style={{background: `${info.color}20`, color: info.color}}><SvgIcon name={tx.category} size={24} /></div>
        <div className="tx-texts">
          <h4 className="tx-title">{tx.description}</h4>
          <p className="tx-desc">{info.label} • {tx.accountName || 'Carteira'}</p>
        </div>
        <div>
          <div className="tx-val" style={{color: isInc ? 'var(--color-income)' : 'var(--text-main-dark)'}}>
            {isInc ? '+' : '-'} {safeFormat(tx.amount).replace('R$', '').trim()}
          </div>
          <div className="tx-date">{tx.date.split('-').reverse().join('/')}</div>
        </div>
      </div>
      
      {opened && (
        <div className="tx-actions">
          <button className="btn-act edit" onClick={() => onEdit(tx)}><SvgIcon name="edit" size={16} /> Editar</button>
          <button className="btn-act del" onClick={() => onDelete(tx.id)}><SvgIcon name="trash" size={16} /> Excluir</button>
        </div>
      )}
    </div>
  );
};

// --- FORMULÁRIOS ---

const BottomSheet = ({ onClose, onSave, initialData, accounts }) => {
  const isEdit = !!initialData;
  const [mode, setMode] = useState(isEdit ? 'detail' : 'fast');
  const [type, setType] = useState(initialData?.type || 'saida');
  const [amountStr, setAmountStr] = useState(initialData ? initialData.amount.toString().replace('.',',') : '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [desc, setDesc] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [accountId, setAccountId] = useState(initialData?.accountId || accounts[0].id);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceCount, setRecurrenceCount] = useState('2');
  const [errorMsg, setErrorMsg] = useState('');

  const triggerError = (msg) => { setErrorMsg(msg); setTimeout(() => setErrorMsg(''), 3500); };
  const cats = type === 'saida' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const handleMask = (val) => val.replace(/[^0-9,]/g, '');

  const handleSave = () => {
    const rawVal = parseFloat(amountStr.replace(',', '.'));
    if (!rawVal || isNaN(rawVal) || rawVal <= 0) return triggerError('Insira um valor válido acima de 0.');
    if (!category) return triggerError('Por favor, selecione uma categoria.');

    const catInfo = getCategoryInfo(category);
    const descFinal = mode === 'fast' || !desc.trim() ? catInfo.label : desc;
    const dateFinal = mode === 'fast' ? new Date().toISOString().split('T')[0] : date;
    const numMonths = (!isEdit && mode === 'detail' && isRecurring) ? parseInt(recurrenceCount) || 1 : 1;
    
    const nowStamp = Date.now();
    const newTxs = [];
    const [year, month, day] = dateFinal.split('-');

    for (let i = 0; i < numMonths; i++) {
        const d = new Date(year, parseInt(month) - 1 + i, day);
        const yStr = d.getFullYear(); const mStr = String(d.getMonth() + 1).padStart(2, '0'); const dStr = String(d.getDate()).padStart(2, '0');
        const recurringSuffix = numMonths > 1 ? ` (${i+1}/${numMonths})` : '';

        newTxs.push({
          id: isEdit ? initialData.id : `tx_${nowStamp}_${i}`,
          type, amount: rawVal, category,
          description: descFinal + recurringSuffix,
          date: `${yStr}-${mStr}-${dStr}`,
          timestamp: isEdit ? initialData.timestamp : nowStamp + i,
          accountId
        });
    }

    onSave(isEdit ? newTxs[0] : newTxs, isEdit);
    onClose();
  };

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      {errorMsg && <div className="toast-wrapper"><div className="toast-box"><SvgIcon name="alert" size={20} /> {errorMsg}</div></div>}
      <div className="bottom-sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"></div>
        
        {!isEdit && (
          <div style={{display:'flex', gap:'8px', marginBottom:'24px'}}>
            <button className={`btn-outline ${mode==='fast'?'':'inactive'}`} style={{flex:1, border:'none', background:mode==='fast'?'var(--color-primary)':'var(--bg-surface-dark)', color:mode==='fast'?'white':'var(--text-muted-dark)'}} onClick={()=>setMode('fast')}>Rápido</button>
            <button className={`btn-outline ${mode==='detail'?'':'inactive'}`} style={{flex:1, border:'none', background:mode==='detail'?'var(--color-primary)':'var(--bg-surface-dark)', color:mode==='detail'?'white':'var(--text-muted-dark)'}} onClick={()=>setMode('detail')}>Detalhado</button>
          </div>
        )}

        <div style={{textAlign:'center', marginBottom:'24px'}}>
          <div style={{fontSize:'0.8rem', color:'var(--text-muted-dark)', marginBottom:'8px'}}>Valor do Lançamento</div>
          <div style={{display:'flex', justifyContent:'center', alignItems:'baseline', gap:'4px'}}>
            <span style={{fontSize:'1.5rem', fontWeight:500, color:'var(--text-muted-dark)'}}>R$</span>
            <input type="text" inputMode="decimal" placeholder="0,00" value={amountStr} onChange={e => setAmountStr(handleMask(e.target.value))}
              style={{background:'transparent', border:'none', fontSize:'3rem', fontWeight:700, color:'var(--text-main-dark)', width:'200px', textAlign:'center', WebkitFontSmoothing:'antialiased'}} />
          </div>
        </div>

        <div style={{display:'flex', gap:'12px', marginBottom:'24px'}}>
          <button style={{flex:1, padding:'12px', borderRadius:'16px', fontWeight:600, border:`2px solid ${type==='saida' ? 'var(--color-expense)' : 'var(--bg-surface-dark)'}`, background: type==='saida' ? 'rgba(255,74,107,0.1)' : 'transparent', color: type==='saida'?'var(--color-expense)':'var(--text-muted-dark)'}} onClick={()=>setType('saida')}>Despesa</button>
          <button style={{flex:1, padding:'12px', borderRadius:'16px', fontWeight:600, border:`2px solid ${type==='entrada' ? 'var(--color-income)' : 'var(--bg-surface-dark)'}`, background: type==='entrada' ? 'rgba(18,201,155,0.1)' : 'transparent', color: type==='entrada'?'var(--color-income)':'var(--text-muted-dark)'}} onClick={()=>setType('entrada')}>Receita</button>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'24px'}}>
          {cats.map(c => (
            <div key={c.id} onClick={()=>setCategory(c.id)} style={{display:'flex', flexDirection:'column', alignItems:'center', background:'var(--bg-surface-dark)', borderRadius:'16px', padding:'10px 4px', border:`2px solid ${category===c.id ? 'var(--color-primary)' : 'transparent'}`, cursor:'pointer'}}>
              <div style={{color: c.color, marginBottom:'4px'}}><SvgIcon name={c.id} /></div>
              <div style={{fontSize:'0.65rem', fontWeight:500, color:category===c.id?'var(--color-primary)':'var(--text-muted-dark)'}}>{c.label}</div>
            </div>
          ))}
        </div>

        {mode === 'detail' && (
          <div style={{animation: 'popIn 0.3s ease'}}>
            <select className="modern-select" value={accountId} onChange={e=>setAccountId(e.target.value)}>
              {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
            </select>
            <input type="text" className="modern-input" placeholder="Descrição (ex: Almoço)" value={desc} onChange={e=>setDesc(e.target.value)} />
            <input type="date" className="modern-input" value={date} onChange={e=>setDate(e.target.value)} />
            
            {!isEdit && (
              <>
                <label style={{display:'flex', alignItems:'center', gap:'8px', color:'var(--text-muted-dark)', fontSize:'0.9rem', marginBottom:'16px', cursor:'pointer'}}>
                  <input type="checkbox" checked={isRecurring} onChange={e=>setIsRecurring(e.target.checked)} style={{width:'18px', height:'18px'}} />
                  Habilitar Recorrência Automática
                </label>
                {isRecurring && <input type="number" min="2" max="36" className="modern-input" placeholder="Repetir por quantos meses? (ex: 12)" value={recurrenceCount} onChange={e=>setRecurrenceCount(e.target.value)} />}
              </>
            )}
          </div>
        )}

        <button className="btn-submit" onClick={handleSave}>Confirmar Lançamento</button>
      </div>
    </div>
  );
};

// --- APP ---

const DEFAULT_ACCOUNTS = [
  { id: 'acc_main', name: 'Conta Principal', color: '#5944FF' },
  { id: 'acc_card', name: 'Cartão de Clássico', color: '#8A05BE' },
  { id: 'acc_cash', name: 'Em Dinheiro', color: '#12C99B' }
];

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dash');
  
  // Data States
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [budgets, setBudgets] = useState({});
  const [hideValues, setHideValues] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  
  const safeFormat = (val) => hideValues ? 'R$ •••••' : formatCurrency(val);

  // UI States
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [selectedAccountFilter, setSelectedAccountFilter] = useState(null);

  useEffect(() => {
    const rawTx = localStorage.getItem('financeTransactionsV2');
    const rawAcc = localStorage.getItem('financeAccountsV2');
    const rawBud = localStorage.getItem('financeBudgetsV2');
    const rawName = localStorage.getItem('financeUserName');
    
    if (rawTx) setTransactions(JSON.parse(rawTx));
    if (rawAcc) setAccounts(JSON.parse(rawAcc));
    if (rawBud) setBudgets(JSON.parse(rawBud));
    if (rawName) setUserName(rawName);
    else setShowNameModal(true);
    setIsLoaded(true);
  }, []);

  const availableMonths = useMemo(() => {
    if(!isLoaded) return [];
    if(transactions.length === 0) return [getCurrentMonthStr()];
    const setM = new Set(transactions.map(t => t.date.substring(0, 7)));
    const current = getCurrentMonthStr();
    setM.add(current);
    return Array.from(setM).sort().reverse();
  }, [transactions, isLoaded]);

  useEffect(() => {
    const currentMonth = getCurrentMonthStr();
    if (availableMonths.length > 0 && availableMonths.includes(currentMonth)) {
      setSelectedMonth(currentMonth);
    } else if (availableMonths.length > 0 && !availableMonths.includes(selectedMonth)) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  // Derived Data
  const monthData = useMemo(() => {
    if (!selectedMonth) return [];
    let d = transactions.filter(t => t.date.startsWith(selectedMonth));
    if (searchQuery) d = d.filter(t => t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return d.map(t => ({...t, accountName: accounts.find(a=>a.id === t.accountId)?.name || 'Carteira'}));
  }, [transactions, selectedMonth, searchQuery, accounts]);

  const { totalBal, monthInc, monthExp } = useMemo(() => {
    let tBal = 0, mInc = 0, mExp = 0;
    transactions.forEach(t => { if (t.date.substring(0, 7) <= selectedMonth) tBal += (t.type === 'entrada' ? t.amount : -t.amount); });
    monthData.forEach(t => { if(t.type === 'entrada') mInc += t.amount; else mExp += t.amount; });
    return { totalBal: tBal, monthInc: mInc, monthExp: mExp };
  }, [transactions, monthData, selectedMonth]);

  const accountBalances = useMemo(() => {
    const bals = {};
    accounts.forEach(a => bals[a.id] = 0);
    transactions.forEach(t => {
      if (t.date.substring(0, 7) <= selectedMonth) {
        if (bals[t.accountId] !== undefined) bals[t.accountId] += (t.type === 'entrada' ? t.amount : -t.amount);
      }
    });
    return bals;
  }, [transactions, accounts, selectedMonth]);

  const donutData = useMemo(() => {
    const map = {};
    monthData.filter(t => t.type === 'saida').forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.keys(map).map(k => {
      const info = getCategoryInfo(k);
      return { label: info.label, value: map[k], color: info.color };
    });
  }, [monthData]);

  const barData = useMemo(() => {
    const ms = [...availableMonths].slice(0, 6).reverse(); // Last 6 months
    const inc = ms.map(m => transactions.filter(t=>t.date.startsWith(m) && t.type==='entrada').reduce((s,t)=>s+t.amount,0));
    const exp = ms.map(m => transactions.filter(t=>t.date.startsWith(m) && t.type==='saida').reduce((s,t)=>s+t.amount,0));
    const labels = ms.map(m => `${m.split('-')[1]}/${m.split('-')[0].slice(2)}`);
    return { months: labels, inc, exp };
  }, [transactions, availableMonths]);

  // Handlers
  const openEdit = (tx) => { setEditTx(tx); setSheetOpen(true); };
  
  const handleDelete = (id) => {
    const n = transactions.filter(t => t.id !== id);
    setTransactions(n); localStorage.setItem('financeTransactionsV2', JSON.stringify(n));
  };
  
  const handleSaveTx = (txData, isExistingNode) => {
    let n = [];
    if (isExistingNode) { n = transactions.map(t => t.id === txData.id ? txData : t); } 
    else { const list = Array.isArray(txData) ? txData : [txData]; n = [...list, ...transactions]; }
    n.sort((a,b) => b.timestamp - a.timestamp);
    setTransactions(n); localStorage.setItem('financeTransactionsV2', JSON.stringify(n));
    if(!isExistingNode && Array.isArray(txData)) setSelectedMonth(txData[0].date.substring(0, 7));
  };

  const exportData = () => {
    const dataObj = { transactions, accounts, budgets };
    const blob = new Blob([JSON.stringify(dataObj)], {type: "application/json"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `finance_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const obj = JSON.parse(evt.target.result);
        if(obj.transactions) {
          setTransactions(obj.transactions); localStorage.setItem('financeTransactionsV2', JSON.stringify(obj.transactions));
          if(obj.accounts) { setAccounts(obj.accounts); localStorage.setItem('financeAccountsV2', JSON.stringify(obj.accounts)); }
          if(obj.budgets) { setBudgets(obj.budgets); localStorage.setItem('financeBudgetsV2', JSON.stringify(obj.budgets)); }
          alert('Dados importados com sucesso!');
        }
      } catch(ex) { alert('Arquivo corrompido ou inválido.'); }
    };
    reader.readAsText(file);
  };

  if(!isLoaded) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
      <div className="app-container">
        
        {/* TOP HEADER */}
        <div className="header-area">
          <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
             <div>
<h1 className="greeting">
                  Olá{userName ? ', ' + userName : '!'} 
                  <span style={{cursor:'pointer', color:'var(--text-muted-dark)'}} onClick={()=>setHideValues(!hideValues)}>
                    <SvgIcon name={hideValues ? 'eye_off' : 'eye'} size={20} />
                  </span>
                </h1>
                <p className="subtitle">Gestor de Finanças</p>
             </div>
          </div>
          <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            <div className="month-picker-container" style={{padding:0, margin:0}}>
              <select className="month-select" value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)}>
                {availableMonths.map(m => <option key={m} value={m}>{getMonthLabel(m)}</option>)}
              </select>
            </div>
            <div style={{cursor:'pointer', color:'var(--text-muted-dark)'}} onClick={()=>setActiveTab('config')}>
               <SvgIcon name="config" size={24} />
            </div>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dash' && (
          <div className="content-pad" style={{paddingTop: '20px'}}>
            
            <div className="total-balance-box">
              <div style={{fontSize:'0.9rem', opacity:0.8}}>Saldo Acumulado</div>
              <div style={{fontSize:'2.2rem', fontWeight:700}}>{safeFormat(totalBal)}</div>
            </div>

            <div className="card-row">
              <div className="card-half inc"><div className="icon-circ"><SvgIcon name="investimento" size={20} /></div>
                <div style={{fontSize:'1.15rem', fontWeight:600}}>{safeFormat(monthInc)}</div>
                <div style={{fontSize:'0.75rem', color:'var(--text-muted-dark)'}}>Entradas</div>
              </div>
              <div className="card-half exp"><div className="icon-circ"><SvgIcon name="alimentacao" size={20} /></div>
                <div style={{fontSize:'1.15rem', fontWeight:600}}>{safeFormat(monthExp)}</div>
                <div style={{fontSize:'0.75rem', color:'var(--text-muted-dark)'}}>Saídas</div>
              </div>
            </div>

            <div className="glass-card">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                <h3 className="section-title" style={{margin:0}}>Suas Metas do Mês</h3>
                <span style={{fontSize:'0.7rem', color:'var(--color-primary)', cursor:'pointer'}} onClick={()=>setActiveTab('config')}>Editar</span>
              </div>
              
              {Object.keys(budgets).length === 0 ? (
                <div style={{textAlign:'center', padding:'10px', color:'var(--text-muted-dark)', fontSize:'0.85rem'}}>Nenhuma meta definida. Configure na aba Ajustes!</div>
              ) : (
                <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                  {Object.keys(budgets).map(catKey => {
                    const limit = budgets[catKey]; const info = getCategoryInfo(catKey);
                    const spent = monthData.filter(t=>t.category===catKey && t.type==='saida').reduce((s,t)=>s+t.amount,0);
                    const pct = Math.min((spent / limit) * 100, 100);
                    const barColor = pct > 90 ? 'var(--color-expense)' : pct > 75 ? 'var(--color-warning)' : info.color;
                    
                    return (
                      <div key={catKey}>
                        <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', marginBottom:'4px'}}>
                          <span style={{display:'flex', alignItems:'center', gap:'6px'}}><SvgIcon name={catKey} size={14}/> {info.label}</span>
                          <span style={{fontWeight:600}}>{safeFormat(spent)} <span style={{color:'var(--text-muted-dark)', fontWeight:400}}>/ {safeFormat(limit)}</span></span>
                        </div>
                        <div className="budget-bar-bg"><div className="budget-bar-fill" style={{width: `${pct}%`, background: barColor}}></div></div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="glass-card">
              <h3 className="section-title">Despesas p/ Categoria</h3>
              <ChartDonut data={donutData} safeFormat={safeFormat} />
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
           <div className="content-pad" style={{paddingTop: '20px'}}>
              <div className="glass-card" style={{minHeight:'60vh'}}>
                 <h3 className="section-title">Comparativo Semestral</h3>
                 <div style={{marginBottom:'24px', fontSize:'0.85rem', color:'var(--text-muted-dark)'}}>Veja o avanço da retração ou ganho de capital nos últimos 6 meses.</div>
                 <ChartBars options={barData.months} dataIncome={barData.inc} dataExpense={barData.exp} />
                 
                 <div style={{marginTop:'30px'}}>
                    <h3 className="section-title">Maiores Destinos</h3>
                    {[...donutData].sort((a,b)=>b.value-a.value).map((d,i) => (
                      <div key={d.label} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid var(--border-dark)'}}>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                           <div style={{color:d.color}}><SvgIcon name={Object.keys(EXPENSE_CATEGORIES).find(k=>EXPENSE_CATEGORIES[k]?.label===d.label) || 'outros_saida'} size={18}/></div>
                           <span style={{fontWeight:500, fontSize:'0.9rem'}}>{i+1}º {d.label}</span>
                        </div>
                        <div style={{fontWeight:600}}>{safeFormat(d.value)}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* ACCOUNTS TAB */}
        {activeTab === 'accounts' && (
          <div className="content-pad" style={{paddingTop: '20px'}}>
            <div className="glass-card" style={{minHeight:'60vh'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                 <h3 className="section-title" style={{margin:0}}>Suas Carteiras</h3>
                 <span style={{fontSize:'0.75rem', color:'var(--color-primary)', fontWeight:600}}>Total: {safeFormat(totalBal)}</span>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                {accounts.map(acc => (
                  <div key={acc.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px', borderRadius:'20px', border:'1px solid var(--border-dark)', background:'var(--bg-surface-hover)'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
                       <div style={{width:'44px', height:'44px', borderRadius:'14px', background:`${acc.color}20`, color:acc.color, display:'flex', justifyContent:'center', alignItems:'center'}}><SvgIcon name="wallet" size={20} /></div>
                       <div style={{fontSize:'0.95rem', fontWeight:600, color:'var(--text-main-dark)'}}>{acc.name}</div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <button 
                        style={{
                          padding:'8px 12px', fontSize:'0.7rem', borderRadius:'10px', border:'none', 
                          background: selectedAccountFilter === acc.id ? 'var(--color-expense)' : 'var(--bg-surface-dark)',
                          color: selectedAccountFilter === acc.id ? 'white' : 'var(--text-muted-dark)',
                          cursor:'pointer', fontWeight:500
                        }}
                        onClick={() => setSelectedAccountFilter(selectedAccountFilter === acc.id ? null : acc.id)}
                      >
                        {selectedAccountFilter === acc.id ? 'Todas' : 'Ver Despesas'}
                      </button>
                      <div style={{fontSize:'1.1rem', fontWeight:700, color: (accountBalances[acc.id]||0) < 0 ? 'var(--color-expense)' : 'var(--text-main-dark)'}}>
                         {safeFormat(accountBalances[acc.id] || 0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedAccountFilter && (
              <div className="glass-card" style={{marginTop:'16px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                  <h3 className="section-title" style={{margin:0}}>Despesas de {accounts.find(a => a.id === selectedAccountFilter)?.name}</h3>
                  <span style={{fontSize:'0.7rem', color:'var(--color-expense)', cursor:'pointer'}} onClick={() => setSelectedAccountFilter(null)}>Fechar</span>
                </div>
                {monthData.filter(t => t.accountId === selectedAccountFilter && t.type === 'saida').map(tx => (
                  <ItemTx key={tx.id} tx={tx} onDelete={handleDelete} onEdit={openEdit} safeFormat={safeFormat} />
                ))}
                {monthData.filter(t => t.accountId === selectedAccountFilter && t.type === 'saida').length === 0 && (
                  <div style={{textAlign:'center', padding:'20px', color:'var(--text-muted-dark)', fontSize:'0.85rem'}}>
                    Nenhuma despesa encontrada para esta conta.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* LIST TAB */}
        {activeTab === 'list' && (
          <div className="content-pad" style={{paddingTop: '20px'}}>
             <input type="text" className="search-input" placeholder="Buscar por descrição ou nome..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
             <div className="glass-card" style={{minHeight:'60vh'}}>
                <h3 className="section-title">Resultados de {getMonthLabel(selectedMonth)}</h3>
                {monthData.map(tx => <ItemTx key={tx.id} tx={tx} onDelete={handleDelete} onEdit={openEdit} safeFormat={safeFormat} />)}
                {monthData.length === 0 && (
                  <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'50px', color:'var(--text-muted-dark)'}}>
                    <SvgIcon name="search" size={48} />
                    <div style={{marginTop:'16px'}}>Nenhum lançamento encontrado.</div>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* CONFIG TAB */}
        {activeTab === 'config' && (
          <div className="content-pad" style={{paddingTop: '20px'}}>
            <div className="glass-card">
              <h3 className="section-title">Metas de Gastos</h3>
              <div style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', marginBottom:'16px'}}>Defina limites para ser alertado. Deixe em 0 para remover a meta.</div>
              {EXPENSE_CATEGORIES.map(c => (
                <div key={c.id} style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'8px', background:'var(--bg-page-dark)', display:'flex', justifyContent:'center', alignItems:'center', color:c.color}}><SvgIcon name={c.id} size={18}/></div>
                  <div style={{flex:1, fontSize:'0.9rem'}}>{c.label}</div>
                  <input type="number" className="modern-input" style={{width:'100px', padding:'10px', margin:0, textAlign:'center'}} placeholder="R$ 0" 
                    value={budgets[c.id] || ''} 
                    onChange={e => {
                      const v = parseFloat(e.target.value); const nb = {...budgets};
                      if(v>0) nb[c.id]=v; else delete nb[c.id];
                      setBudgets(nb); localStorage.setItem('financeBudgetsV2', JSON.stringify(nb));
                    }} 
                  />
                </div>
              ))}
            </div>

            <div className="glass-card">
              <h3 className="section-title">Avançado</h3>
              <div className="setting-row">
                <div style={{fontSize:'0.9rem'}}>Fazer Backup (JSON)</div>
                <button className="btn-outline" onClick={exportData}>Baixar</button>
              </div>
              <div className="setting-row" style={{border:0}}>
                <div style={{fontSize:'0.9rem'}}>Restaurar Backup</div>
                <label className="btn-outline"> Escolher <input type="file" style={{display:'none'}} accept=".json" onChange={importData} /></label>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAV */}
        <div className="bottom-nav-container">
          <div className="bottom-nav">
            <button className={`nav-item ${activeTab==='dash'?'active':''}`} onClick={()=>setActiveTab('dash')}><SvgIcon name="lazer" size={24} />Home</button>
            <button className={`nav-item ${activeTab==='analytics'?'active':''}`} onClick={()=>setActiveTab('analytics')}><SvgIcon name="chart" size={24} />Análises</button>
            
            <button className="fab-glass" onClick={()=>{setEditTx(null); setSheetOpen(true);}}>
              <span style={{fontSize:'28px', lineHeight:1}}>{'+'}</span>
            </button>
            
            <button className={`nav-item ${activeTab==='accounts'?'active':''}`} onClick={()=>setActiveTab('accounts')}><SvgIcon name="wallet" size={24} />Contas</button>
            <button className={`nav-item ${activeTab==='list'?'active':''}`} onClick={()=>setActiveTab('list')}><SvgIcon name="search" size={24} />Busca</button>
          </div>
        </div>

        {/* BOTTOM SHEET ROOT */}
        {sheetOpen && <BottomSheet initialData={editTx} accounts={accounts} onClose={()=>setSheetOpen(false)} onSave={handleSaveTx} />}

        {/* NAME MODAL */}
        {showNameModal && (
          <div className="name-modal-overlay">
            <div className="name-modal">
              <h2>Bem-vindo!</h2>
              <p>Qual é o seu nome?</p>
              <input 
                type="text" 
                placeholder="Seu nome" 
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setUserName(e.target.value.trim());
                    localStorage.setItem('financeUserName', e.target.value.trim());
                    setShowNameModal(false);
                  }
                }}
              />
              <button onClick={e => {
                const input = e.target.previousSibling;
                if (input.value.trim()) {
                  setUserName(input.value.trim());
                  localStorage.setItem('financeUserName', input.value.trim());
                  setShowNameModal(false);
                }
              }}>Continuar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
