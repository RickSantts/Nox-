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
    trash: <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/><line x1="4" y1="7" x2="4" y2="7.01"/><line x1="9" y1="5" x2="9" y2="4"/><line x1="14" y1="5" x2="14" y2="4"/><line x1="19" y1="5" x2="19" y2="4"/></g>,
    alert: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    config: <g><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>,
    wallet: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z m0 0V8a2 2 0 012-2h10" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    edit: <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></g>,
    eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
    eye_off: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    bank: <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><polygon points="12 2 2 7 22 7"/><line x1="6" y1="22" x2="6" y2="11"/><line x1="10" y1="22" x2="10" y2="11"/><line x1="14" y1="22" x2="14" y2="11"/><line x1="18" y1="22" x2="18" y2="11"/><line x1="2" y1="22" x2="22" y2="22"/></g>,
    credit_card: <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></g>,
    money: <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></g>,
    pix: <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 3l8 9-8 9-8-9 8-9z" /><path d="M12 6.5l4.5 5.5-4.5 5.5-4.5-5.5 4.5-5.5z" /></g>,
    airplane: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    camera: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
  };
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {paths[name] || paths['outros_saida']}
    </svg>
  );
};

// --- DEFINIÇÕES DE DADOS ---
const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'alimentacao', label: 'Alimentação', color: '#FF7A59' },
  { id: 'transporte', label: 'Transporte', color: '#FFB142' },
  { id: 'moradia', label: 'Moradia', color: '#00C896' },
  { id: 'saude', label: 'Saúde', color: '#0097E6' },
  { id: 'lazer', label: 'Lazer', color: '#8C7AE6' },
  { id: 'educacao', label: 'Educação', color: '#B33771' },
  { id: 'vestuario', label: 'Vestuário', color: '#D6A2E8' },
  { id: 'outros_saida', label: 'Outros', color: '#A0AEC0' }
];

const DEFAULT_INCOME_CATEGORIES = [
  { id: 'salario', label: 'Salário', color: '#00C896' },
  { id: 'freelance', label: 'Freelance', color: '#0097E6' },
  { id: 'investimento', label: 'Invstmnt', color: '#8C7AE6' },
  { id: 'presente', label: 'Presente', color: '#FFB142' }
];

const getCategoryInfo = (id, allCats) => (allCats || []).find(c => c.id === id) || { label: 'Desconhecido', color: '#A0AEC0' };

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
const getMonthLabel = (dateStr) => {
  if (!dateStr || dateStr.length < 7) return '';
  const [year, month] = dateStr.split('-');
  const date = new Date(year, parseInt(month) - 1, 1);
  const m = date.toLocaleDateString('pt-BR', { month: 'long' });
  const label = m.charAt(0).toUpperCase() + m.slice(1) + ' ' + year;
  return dateStr > getCurrentMonthStr() ? `${label} (Projeção)` : label;
};
const getCurrentMonthStr = () => new Date().toISOString().substring(0, 7);

// --- ESTILIZAÇÃO NEUMORPHISM/MODERNA (V2) ---
const globalStyle = `
  :root {
    --bg-page-dark: #060910;
    --bg-surface-dark: #0F1624;
    --bg-surface-hover: #172033;
    --border-dark: #1E293B;
    --text-main-dark: #F8FAFC;
    --text-muted-dark: #94A3B8;
    
    --color-primary: #3B82F6; 
    --color-secondary: #60A5FA;
    --color-income: #10B981;
    --color-expense: #EF4444; 
    --color-warning: #F59E0B;
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
  .header-area { padding: 16px 12px 10px; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  
  @media (max-width: 480px) {
    .header-area {
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 24px 16px 16px;
    }
    .header-left {
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
      gap: 12px !important;
    }
    .header-right {
      width: 100%;
      justify-content: center;
      position: relative;
      min-height: 40px;
      gap: 16px;
    }
    .month-picker-wrapper {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .month-select {
      width: auto;
      min-width: 160px;
      text-align: center;
    }
    .config-btn {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: var(--text-muted-dark);
    }
    .greeting {
      justify-content: center;
    }
  }

  .config-btn { cursor: pointer; color: var(--text-muted-dark); }
  .month-picker-wrapper { display: flex; align-items: center; }

  .header-left { display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1; }
  .app-logo { 
    height: 60px; 
    width: 60px; 
    object-fit: contain; 
    border-radius: 18px; 
    flex-shrink: 0;
    filter: drop-shadow(0 4px 15px rgba(0,0,0,0.4));
    background: white;
    padding: 4px;
    border: 2px solid var(--border-dark);
  }
  @media (max-width: 360px) { .app-logo { height: 50px !important; width: 50px !important; } }
  .greeting { font-size: 1.2rem; font-weight: 600; color: var(--text-main-dark); display: flex; align-items: center; gap: 8px; white-space: nowrap; }
  .subtitle { font-size: 0.8rem; color: var(--text-muted-dark); margin-top: 2px; }
  .header-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  
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
  .month-picker-container { padding: 0; margin: 0; display: flex; justify-content: flex-end; }
  .month-select {
    appearance: none; -webkit-appearance: none; -moz-appearance: none;
    background: var(--bg-surface-dark); color: var(--text-main-dark);
    border: 1px solid var(--border-dark); padding: 6px 28px 6px 10px; border-radius: 12px;
    font-weight: 500; font-size: 0.7rem; cursor: pointer;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>');
    background-repeat: no-repeat; background-position: right 8px center;
    pointer-events: auto;
  }
  @media (max-width: 360px) { .month-select { padding: 5px 24px 5px 8px; font-size: 0.65rem; border-radius: 10px; } }

  .insight-card {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
    border: 1px solid var(--border-dark);
    padding: 16px;
    border-radius: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: popIn 0.5s ease;
  }
  .insight-row { display: flex; align-items: center; gap: 12px; }
  .insight-icon { width: 40px; height: 40px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items:center; justify-content:center; }
  .insight-title { font-size: 0.75rem; color: var(--text-muted-dark); }
  .insight-val { font-size: 1rem; fontWeight: 600; color: var(--text-main-dark); }
  
  .credit-card-modern {
    background: rgba(255,255,255,0.03);
    border-radius: 20px;
    padding: 20px;
    border: 1px solid var(--border-dark);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .credit-card-modern .insight-title { color: var(--color-primary); font-weight: 600; font-size: 0.9rem; }
  
  .tab-content { animation: slideUpFade 0.4s cubic-bezier(0, 0, 0.2, 1); }

  /* Content Cards */
  .content-pad { padding: 0 16px; display: flex; flex-direction: column; gap: 16px; animation: popIn 0.4s ease; }
  @media (max-width: 380px) { .content-pad { padding: 0 12px; gap: 12px; } }
  .card-row { display: flex; gap: 12px; }
  @media (max-width: 380px) { .card-row { gap: 8px; } }
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
  .chip { padding: 8px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: 0.2s; background: var(--bg-surface-dark); border: 1px solid var(--border-dark); color: var(--text-muted-dark); }
  .chip.active { background: var(--color-primary); color: white; border-color: var(--color-primary); }
  .alert-banner { background: rgba(255, 217, 61, 0.15); color: #FFD93D; padding: 12px 16px; border-radius: 16px; font-size: 0.85rem; font-weight: 500; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border: 1px solid rgba(255, 217, 61, 0.3); }
  .smart-input-container { display: flex; align-items: center; background: var(--bg-surface-dark); border: 1px solid var(--border-dark); border-radius: 20px; padding: 6px 6px 6px 16px; margin-bottom: 16px; }
  .smart-input { flex: 1; background: transparent; border: none; color: white; font-size: 0.95rem; }
  .smart-btn { background: var(--color-primary); color: white; border: none; width: 36px; height: 36px; border-radius: 14px; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: 0.2s; }
  .quick-action-btn { background: var(--bg-surface-dark); border: 1px solid var(--border-dark); border-radius: 16px; padding: 10px 14px; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 100px; cursor: pointer; flex-shrink: 0; transition: 0.2s; }
  .quick-action-btn:active { background: var(--bg-surface-hover); transform: scale(0.95); }
  .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border-dark); }
  .btn-outline { background: transparent; border: 1px solid var(--color-primary); color: var(--color-primary); padding: 10px 20px; border-radius: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .btn-outline:active { background: var(--color-primary); color: white; }

  /* Forms & Nav */
  .bottom-nav-container { position: fixed; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; pointer-events: none; z-index: 50; }
  .bottom-nav { width: 100%; max-width: 480px; margin: 0 auto; background: rgba(21, 46, 39, 0.9); backdrop-filter: blur(20px); border-top: 1px solid var(--border-dark); padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); display: flex; justify-content: space-between; align-items: center; pointer-events: auto; }
  @media (max-width: 380px) { .bottom-nav { padding: 8px 12px calc(8px + env(safe-area-inset-bottom)); } }
  .nav-item { background: none; border: none; color: var(--text-muted-dark); display: flex; flex-direction: column; align-items: center; font-size: 0.65rem; gap: 2px; font-weight: 500; cursor: pointer; transition: 0.2s; }
  .nav-item.active { color: var(--color-primary); }
  .fab-glass { width: 56px; height: 56px; border-radius: 28px; background: var(--color-primary); color: white; border: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(61, 206, 168, 0.4); transform: translateY(-18px); cursor: pointer; transition: 0.2s; }
  @media (max-width: 380px) { .fab-glass { width: 50px; height: 50px; transform: translateY(-16px); } }
  
  /* Overlays */
  .bottom-sheet-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 100; display: flex; justify-content: center; align-items: flex-end; }
  .bottom-sheet { background: var(--bg-page-dark); width: 100%; max-width: 480px; border-top-left-radius: 28px; border-top-right-radius: 28px; padding: 20px 16px calc(20px + env(safe-area-inset-bottom)); animation: slideUpFade 0.35s cubic-bezier(0.1, 0.9, 0.2, 1); max-height: 90vh; overflow-y: auto; }
  @media (max-width: 380px) { .bottom-sheet { padding: 16px 12px calc(16px + env(safe-area-inset-bottom)); border-top-left-radius: 24px; border-top-right-radius: 24px; } }
  .sheet-handle { width: 40px; height: 5px; background: var(--border-dark); border-radius: 5px; margin: 0 auto 20px; }
  .modern-input, .modern-select { width: 100%; background: var(--bg-surface-dark); border: 1px solid var(--border-dark); padding: 14px 16px; border-radius: 14px; color: var(--text-main-dark); font-size: 0.95rem; margin-bottom: 14px; }
  .btn-submit { width: 100%; background: var(--color-primary); color: white; padding: 14px; border: none; border-radius: 14px; font-weight: 600; font-size: 1rem; cursor: pointer; margin-top: 10px; box-shadow: 0 6px 16px rgba(61, 206, 168, 0.3); }
  @media (max-width: 380px) { .modern-input, .modern-select { padding: 12px 14px; font-size: 0.9rem; } .btn-submit { padding: 12px; font-size: 0.95rem; } }

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

const ChartDonut = ({ data, safeFormat, allCats }) => {
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

const ItemTx = ({ tx, onDelete, onEdit, safeFormat, showDate = true, allCats, trips = [] }) => {
  const [opened, setOpened] = useState(false);
  const info = getCategoryInfo(tx.category, allCats);
  const isInc = tx.type === 'entrada';
  const trip = tx.tripId ? trips.find(t => t.id === tx.tripId) : null;
  
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div className="tx-item" onClick={() => setOpened(!opened)}>
        <div className="tx-icon-bg" style={{background: `${info.color}20`, color: info.color}}><SvgIcon name={tx.category} size={24} /></div>
        <div className="tx-texts">
          <h4 className="tx-title">
            {tx.description}
            {tx.attachment && <span style={{marginLeft:6, color:'var(--text-muted-dark)'}}><SvgIcon name="paperclip" size={12}/></span>}
          </h4>
          <p className="tx-desc">
            {info.label} • {tx.accountName || 'Carteira'}
            {trip && <span style={{color: trip.color, marginLeft: 6}}>✈ {trip.name}</span>}
          </p>
        </div>
        <div>
          <div className="tx-val" style={{color: isInc ? 'var(--color-income)' : 'var(--text-main-dark)'}}>
            {isInc ? '+' : '-'} {safeFormat(tx.amount).replace('R$', '').trim()}
          </div>
          {showDate && <div className="tx-date">{tx.date.split('-').reverse().join('/')}</div>}
        </div>
      </div>
      
      {opened && (
        <div className="tx-actions" style={{flexDirection: 'column'}}>
          {tx.attachment && (
            <div style={{marginBottom:'12px', display:'flex', justifyContent:'center'}}>
              <img src={tx.attachment} alt="Comprovante" style={{maxHeight:'200px', borderRadius:'12px', objectFit:'contain', background:'rgba(0,0,0,0.2)', width:'100%'}}/>
            </div>
          )}
          <div style={{display:'flex', justifyContent:'flex-end', gap:'8px'}}>
            <button className="btn-act edit" onClick={() => onEdit(tx)}><SvgIcon name="edit" size={16} /> Editar</button>
            <button className="btn-act del" onClick={() => onDelete(tx.id)}><SvgIcon name="trash" size={16} /> Excluir</button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- FORMULÁRIOS ---

const BottomSheet = ({ onClose, onSave, initialData, accounts, expenseCats, incomeCats, trips = [] }) => {
  const isEdit = !!initialData;
  const [mode, setMode] = useState(isEdit ? 'detail' : 'fast');
  const [type, setType] = useState(initialData?.type || 'saida');
  const [amountStr, setAmountStr] = useState(initialData ? initialData.amount.toString().replace('.',',') : '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [desc, setDesc] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [dateEnabled, setDateEnabled] = useState(false);
  const [accountId, setAccountId] = useState(initialData?.accountId || 'acc_pix');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceCount, setRecurrenceCount] = useState('2');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [attachment, setAttachment] = useState(initialData?.attachment || null);
  const [tripId, setTripId] = useState(initialData?.tripId || '');
  const [splitAmountStr, setSplitAmountStr] = useState('');

  const triggerError = (msg) => { setErrorMsg(msg); setTimeout(() => setErrorMsg(''), 3500); };
  const cats = type === 'saida' ? expenseCats : incomeCats;
  const handleMask = (val) => val.replace(/[^0-9,]/g, '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      const img = new Image();
      img.src = evt.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const scaleSize = Math.min(MAX_WIDTH / img.width, 1);
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setAttachment(canvas.toDataURL('image/jpeg', 0.6));
      }
    };
  };

  const handleSave = () => {
    const rawVal = parseFloat(amountStr.replace(',', '.'));
    if (!rawVal || isNaN(rawVal) || rawVal <= 0) return triggerError('Insira um valor válido acima de 0.');
    if (!category) return triggerError('Por favor, selecione uma categoria.');

    const allCats = [...expenseCats, ...incomeCats];
    const catInfo = getCategoryInfo(category, allCats);
    const descFinal = (mode === 'fast' && !dateEnabled) || !desc.trim() ? catInfo.label : desc;
    const dateFinal = (mode === 'fast' && !dateEnabled) ? new Date().toISOString().split('T')[0] : date;
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
          accountId,
          attachment,
          tripId: tripId || null
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

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'16px'}}>
          {cats.map(c => (
            <div key={c.id} onClick={()=>setCategory(c.id)} style={{display:'flex', flexDirection:'column', alignItems:'center', background:'var(--bg-surface-dark)', borderRadius:'16px', padding:'10px 4px', border:`2px solid ${category===c.id ? 'var(--color-primary)' : 'transparent'}`, cursor:'pointer'}}>
              <div style={{color: c.color, marginBottom:'4px'}}><SvgIcon name={c.id} /></div>
              <div style={{fontSize:'0.65rem', fontWeight:500, color:category===c.id?'var(--color-primary)':'var(--text-muted-dark)'}}>{c.label}</div>
            </div>
          ))}
        </div>

        {mode === 'fast' && (
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'flex', alignItems:'center', gap:'8px', color:'var(--text-muted-dark)', fontSize:'0.85rem', cursor:'pointer'}}>
              <input type="checkbox" checked={dateEnabled} onChange={e=>setDateEnabled(e.target.checked)} style={{width:'18px', height:'18px'}} />
              Definir data de vencimento
            </label>
            {dateEnabled && (
              <input type="date" className="modern-input" style={{marginTop:'8px'}} value={date} onChange={e=>setDate(e.target.value)} />
            )}
          </div>
        )}

        {mode === 'detail' && (
          <div style={{animation: 'popIn 0.3s ease'}}>
            <select className="modern-select" value={accountId} onChange={e=>setAccountId(e.target.value)}>
              {(type === 'entrada' ? accounts : accounts.filter(a => a.type !== 'income')).map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
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

            {!isEdit && type === 'saida' && (
              <div style={{marginBottom:'16px', background:'var(--bg-surface-dark)', padding:'12px', borderRadius:'14px'}}>
                <label style={{fontSize:'0.85rem', color:'var(--text-muted-dark)'}}><SvgIcon name="users" size={16}/> Cobrar de Terceiros</label>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginTop:'8px'}}>
                  <span style={{fontSize:'1rem', fontWeight:500, color:'var(--text-muted-dark)'}}>R$</span>
                  <input type="text" inputMode="decimal" className="modern-input" placeholder="0,00" style={{margin:0, flex:1}} value={splitAmountStr} onChange={e=>setSplitAmountStr(handleMask(e.target.value))} />
                </div>
                {parseFloat(splitAmountStr.replace(',','.')) > 0 && amountStr && (
                  <div style={{marginTop:'12px', fontSize:'0.9rem', color:'var(--color-primary)'}}>
                    <button className="btn-outline" style={{width:'100%', fontSize:'0.8rem', padding:'8px'}} onClick={() => {
                       const val = parseFloat(splitAmountStr.replace(',','.')).toFixed(2);
                       navigator.clipboard.writeText(`A despesa "${desc || 'Gasto'}" teve uma parte sua de R$ ${val.replace('.',',')}. Me faz o Pix!`);
                       triggerError('Mensagem copiada!');
                    }}>Copiar Cobrança</button>
                  </div>
                )}
              </div>
            )}

            {trips && trips.length > 0 && (
               <select className="modern-select" value={tripId} onChange={e=>setTripId(e.target.value)}>
                 <option value="">Sem Viagem / Evento</option>
                 {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
               </select>
            )}

            <div style={{marginBottom:'16px'}}>
              <label className="btn-outline" style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', cursor:'pointer'}}>
                <SvgIcon name="camera" size={18} /> {attachment ? 'Trocar Comprovante' : 'Anexar Comprovante'}
                <input type="file" accept="image/*" style={{display:'none'}} onChange={handleImageUpload} />
              </label>
              {attachment && <img src={attachment} alt="Anexo" style={{marginTop:'12px', borderRadius:'12px', maxHeight:'120px', objectFit:'cover', width:'100%'}} />}
            </div>
          </div>
        )}

        <button className="btn-submit" onClick={handleSave}>Confirmar Lançamento</button>
      </div>
    </div>
  );
};

// --- APP ---

const DEFAULT_ACCOUNTS = [
  { id: 'acc_pix', name: 'PIX', color: '#00C896', type: 'default' },
  { id: 'acc_cash', name: 'Dinheiro', color: '#12C99B', type: 'default' },
  { id: 'acc_income', name: 'Receita', color: '#FFD93D', type: 'income' }
];

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dash');
  
  // Data States
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [expenseCategories, setExpenseCategories] = useState(DEFAULT_EXPENSE_CATEGORIES);
  const [incomeCategories, setIncomeCategories] = useState(DEFAULT_INCOME_CATEGORIES);
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('financeTripsV2');
    return saved ? JSON.parse(saved) : [];
  });
  const [budgets, setBudgets] = useState({});
  const [quickActions, setQuickActions] = useState([{ id: 'qa1', title: '☕ Café', amount: 5, category: 'alimentacao' }, { id: 'qa2', title: '🚌 Ônibus', amount: 4.5, category: 'transporte' }]);
  const [hideValues, setHideValues] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
const [notificationDays, setNotificationDays] = useState(1);
  const [showMonthPicker, setShowMonthPicker] = useState(() => {
    const saved = localStorage.getItem('financeShowMonthPicker');
    return saved !== null ? saved === 'true' : true;
  });
  const [showDateOnExpense, setShowDateOnExpense] = useState(() => {
    const saved = localStorage.getItem('financeShowDateOnExpense');
    return saved !== null ? saved === 'true' : true;
  });
   
  const safeFormat = (val) => hideValues ? 'R$ •••••' : formatCurrency(val);

  // UI States
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [smartInputText, setSmartInputText] = useState('');
  const [smartInputDate, setSmartInputDate] = useState('');
  const [smartDateEnabled, setSmartDateEnabled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [selectedAccountFilter, setSelectedAccountFilter] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [addingShortcut, setAddingShortcut] = useState(false);
  const [shortcutTitle, setShortcutTitle] = useState('');
  const [shortcutAmount, setShortcutAmount] = useState('');
  const [accountLimits, setAccountLimits] = useState(() => {
    const saved = localStorage.getItem('financeAccountLimits');
    return saved ? JSON.parse(saved) : {};
  });
  const [accountClosingDays, setAccountClosingDays] = useState(() => {
    const saved = localStorage.getItem('financeAccountClosingDays');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedAccountMonth, setSelectedAccountMonth] = useState('');
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountType, setNewAccountType] = useState('default');
  const [newAccountColor, setNewAccountColor] = useState('#5944FF');
  const [newAccountLimit, setNewAccountLimit] = useState('');
  const [newAccountClosingDay, setNewAccountClosingDay] = useState('');

  const showToast = (msg, type = 'success') => {
    setToastMsg({msg, type});
    setTimeout(() => setToastMsg(null), 3000);
  };


  useEffect(() => {
    const rawTx = localStorage.getItem('financeTransactionsV2');
    const rawAcc = localStorage.getItem('financeAccountsV2');
    const rawExpCats = localStorage.getItem('financeExpenseCategories');
    const rawIncCats = localStorage.getItem('financeIncomeCategories');
    const rawBud = localStorage.getItem('financeBudgetsV2');
    const rawQa = localStorage.getItem('financeQuickActions');
    const rawName = localStorage.getItem('financeUserName');
    const rawNotiDays = localStorage.getItem('financeNotificationDays');
    
    if (rawTx) setTransactions(JSON.parse(rawTx));
    if (rawAcc) setAccounts(JSON.parse(rawAcc));
    if (rawExpCats) setExpenseCategories(JSON.parse(rawExpCats));
    if (rawIncCats) setIncomeCategories(JSON.parse(rawIncCats));
    if (rawBud) setBudgets(JSON.parse(rawBud));
    if (rawQa) setQuickActions(JSON.parse(rawQa));
    if (rawName) setUserName(rawName);
    else setShowNameModal(true);
    if (rawNotiDays) setNotificationDays(parseInt(rawNotiDays, 10));
    setIsLoaded(true);
  }, []);

  const availableMonths = useMemo(() => {
    if(!isLoaded) return [];
    const setM = new Set(transactions.map(t => t.date.substring(0, 7)));
    
    const now = new Date();
    const current = getCurrentMonthStr();
    setM.add(current);
    
    // Adiciona os próximos 12 meses para planejamento futuro
    for (let i = 1; i <= 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      setM.add(`${y}-${m}`);
    }
    
    return Array.from(setM).sort().reverse();
  }, [transactions, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !("Notification" in window) || Notification.permission !== "granted") return;
    
    const lastNotis = JSON.parse(localStorage.getItem('financeLastNotis') || '{}');
    const todayStr = new Date().toISOString().split('T')[0];
    const todayObj = new Date();
    todayObj.setHours(0,0,0,0);
    
    const toNotify = transactions.filter(t => {
      if (t.type !== 'saida' || !t.date) return false;
      const [year, month, day] = t.date.split('-');
      const dueObj = new Date(year, parseInt(month)-1, day);
      dueObj.setHours(0,0,0,0);
      
      const diffTime = dueObj.getTime() - todayObj.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const isToday = t.date === todayStr;
      return !isToday && diffDays >= 0 && diffDays <= notificationDays && lastNotis[t.id] !== todayStr;
    });

    // Closing date notifications
    accounts.forEach(acc => {
      if (acc.type === 'credit' && accountClosingDays[acc.id]) {
        const closing = parseInt(accountClosingDays[acc.id]);
        const day = todayObj.getDate();
        const diff = closing - day;
        
        // Notify if it's nearing closing (2 days before or today)
        if (diff >= 0 && diff <= 2 && lastNotis[`closing_${acc.id}`] !== todayStr) {
          const msg = diff === 0 ? `A fatura do ${acc.name} fecha hoje!` : `A fatura do ${acc.name} fecha em ${diff} dias.`;
          if (navigator.serviceWorker && navigator.serviceWorker.ready) {
            navigator.serviceWorker.ready.then(reg => reg.showNotification('Fatura fechando!', { body: msg, icon: '/nox_finance_icone.png' }));
          } else {
            new Notification('Fatura fechando!', { body: msg, icon: '/nox_finance_icone.png' });
          }
          lastNotis[`closing_${acc.id}`] = todayStr;
        }
      }
    });

    if (toNotify.length > 0) {
      if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification('Contas a Pagar (Nox Finance)', {
            body: `Você tem ${toNotify.length} despesa(s) vencendo em até ${notificationDays} dia(s).`,
            icon: '/nox_finance_icone.png',
            vibrate: [200, 100, 200]
          });
        });
      } else {
        new Notification('Contas a Pagar (Nox Finance)', {
          body: `Você tem ${toNotify.length} despesa(s) vencendo em até ${notificationDays} dia(s).`,
          icon: '/nox_finance_icone.png'
        });
      }
      toNotify.forEach(t => lastNotis[t.id] = todayStr);
    }
    localStorage.setItem('financeLastNotis', JSON.stringify(lastNotis));
  }, [isLoaded, transactions, notificationDays, accounts, accountClosingDays]);

  useEffect(() => {
    if (!isLoaded || selectedMonth) return;
    const currentMonth = getCurrentMonthStr();
    if (availableMonths.includes(currentMonth)) {
      setSelectedMonth(currentMonth);
    } else if (availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [isLoaded, availableMonths, selectedMonth]); // Mantido selectedMonth apenas para checagem interna

  // Derived Data
  const monthData = useMemo(() => {
    if (!selectedMonth) return [];
    let d = transactions.filter(t => t.date.startsWith(selectedMonth));
    if (searchQuery) d = d.filter(t => t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategoryFilter) {
      if (selectedCategoryFilter === 'entrada') d = d.filter(t => t.type === 'entrada');
      else d = d.filter(t => t.category === selectedCategoryFilter);
    }
    if (selectedAccountFilter) d = d.filter(t => t.accountId === selectedAccountFilter);
    return d.map(t => ({...t, accountName: accounts.find(a=>a.id === t.accountId)?.name || 'Carteira'}));
  }, [transactions, selectedMonth, searchQuery, selectedCategoryFilter, accounts, selectedAccountFilter]);

  const { totalBal, monthInc, monthExp } = useMemo(() => {
    let tBal = 0, mInc = 0, mExp = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    transactions.forEach(t => { 
      if (t.date <= todayStr) {
        const acc = accounts.find(a => a.id === t.accountId);
        if (acc && acc.type === 'income') {
          if (t.type === 'entrada') tBal += t.amount;
        } else {
          tBal += (t.type === 'entrada' ? t.amount : -t.amount);
        }
      }
    });
    monthData.forEach(t => { if(t.type === 'entrada') mInc += t.amount; else mExp += t.amount; });
    return { totalBal: tBal, monthInc: mInc, monthExp: mExp };
  }, [transactions, monthData, accounts]);

  const accountBalances = useMemo(() => {
    const bals = {};
    const todayStr = new Date().toISOString().split('T')[0];
    accounts.forEach(a => bals[a.id] = 0);
    transactions.forEach(t => {
      if (bals[t.accountId] !== undefined && t.date <= todayStr) {
        const acc = accounts.find(a => a.id === t.accountId);
        if (acc) {
          if (acc.type === 'income') {
            if (t.type === 'entrada') bals[t.accountId] += t.amount;
          } else {
            bals[t.accountId] += (t.type === 'entrada' ? t.amount : -t.amount);
          }
        }
      }
    });
    return bals;
  }, [transactions, accounts]);

  const donutData = useMemo(() => {
    const map = {};
    const allCats = [...expenseCategories, ...incomeCategories];
    monthData.filter(t => t.type === 'saida').forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.keys(map).map(k => {
      const info = getCategoryInfo(k, allCats);
      return { label: info.label, value: map[k], color: info.color };
    });
  }, [monthData, expenseCategories, incomeCategories]);

  const barData = useMemo(() => {
    const ms = [...availableMonths].slice(0, 6).reverse(); // Last 6 months
    const inc = ms.map(m => transactions.filter(t=>t.date.startsWith(m) && t.type==='entrada').reduce((s,t)=>s+t.amount,0));
    const exp = ms.map(m => transactions.filter(t=>t.date.startsWith(m) && t.type==='saida').reduce((s,t)=>s+t.amount,0));
    const labels = ms.map(m => `${m.split('-')[1]}/${m.split('-')[0].slice(2)}`);
    return { months: labels, inc, exp };
  }, [transactions, availableMonths]);

  const activeAlerts = useMemo(() => {
    const alerts = [];
    // Budget Alerts
    const allCats = [...expenseCategories, ...incomeCategories];
    Object.keys(budgets).forEach(catKey => {
      const limit = budgets[catKey];
      const spent = transactions.filter(t => t.date.startsWith(selectedMonth) && t.category === catKey && t.type === 'saida').reduce((s,t) => s + t.amount, 0);
      const pct = (spent / limit) * 100;
      if (pct >= 85) alerts.push({ type: 'budget', catKey, pct });
    });
    
    // Credit Limit Alerts
    accounts.forEach(acc => {
      if (acc.type === 'credit' && accountLimits[acc.id] > 0) {
        const bal = Math.abs(accountBalances[acc.id] || 0);
        const limit = accountLimits[acc.id];
        if (bal > limit) alerts.push({ type: 'limit', accName: acc.name, bal, limit });
      }
    });

    return alerts;
  }, [budgets, transactions, selectedMonth, accounts, accountBalances, accountLimits]);

  const monthProjection = useMemo(() => {
    const current = getCurrentMonthStr();
    if (selectedMonth !== current) return null;
    
    const today = new Date();
    const dayOfMonth = today.getDate();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const monthProgress = dayOfMonth / daysInMonth;
    
    const totalSpent = monthData.filter(t => t.type === 'saida').reduce((s,t) => s + t.amount, 0);
    const projectedTotal = monthProgress > 0 ? totalSpent / monthProgress : totalSpent;
    
    return { spent: totalSpent, projected: projectedTotal, progress: monthProgress * 100 };
  }, [monthData, selectedMonth]);

  const patrimonyEvolution = useMemo(() => {
    // Pegamos apenas meses que possuem transações REAIS ou o mês atual
    const monthsWithTx = new Set(transactions.map(t => t.date.substring(0, 7)));
    const currentM = getCurrentMonthStr();
    
    // Filtramos os meses disponíveis para exibir apenas os que têm dados e não são futuros
    const ms = availableMonths
      .filter(m => m <= currentM && (monthsWithTx.has(m) || m === currentM))
      .sort(); // Ordem cronológica para cálculo do saldo acumulado
      
    let runningBal = 0;
    const evolution = ms.map(m => {
      const monthTxs = transactions.filter(t => t.date.startsWith(m));
      monthTxs.forEach(t => {
        const acc = accounts.find(a => a.id === t.accountId);
        if (acc && acc.type === 'income') {
          if (t.type === 'entrada') runningBal += t.amount;
        } else {
          runningBal += (t.type === 'entrada' ? t.amount : -t.amount);
        }
      });
      return { month: m, balance: runningBal };
    });

    // Retornamos apenas os que possuem algum valor (para evitar meses vazios no início da lista)
    return evolution.filter(e => e.balance !== 0 || e.month === currentM);
  }, [transactions, availableMonths, accounts]);


  const categoryTrend = useMemo(() => {
    const ms = [...availableMonths].slice(0, 3).reverse();
    const trendMap = {};
    
    ms.forEach(m => {
      const monthTxs = transactions.filter(t => t.date.startsWith(m) && t.type === 'saida');
      monthTxs.forEach(t => {
        if (!trendMap[t.category]) trendMap[t.category] = [];
        trendMap[t.category].push({ month: m, amount: t.amount });
      });
    });
    
    return Object.keys(trendMap).map(cat => {
      const months = trendMap[cat];
      if (months.length < 2) return null;
      const first = months[0].amount;
      const last = months[months.length - 1].amount;
      const change = first > 0 ? ((last - first) / first) * 100 : 0;
      const allCats = [...expenseCategories, ...incomeCategories];
      const info = getCategoryInfo(cat, allCats);
      return { category: cat, label: info.label, color: info.color, change, first, last };
    }).filter(Boolean).sort((a,b) => Math.abs(b.change) - Math.abs(a.change));
  }, [transactions, availableMonths, expenseCategories, incomeCategories]);

  const monthlyComparison = useMemo(() => {
    const ms = [...availableMonths].slice(0, 2).reverse();
    if (ms.length < 2) return null;
    const [current, previous] = ms;
    const currentMonth = transactions.filter(t => t.date.startsWith(current));
    const prevMonth = transactions.filter(t => t.date.startsWith(previous));
    
    const currInc = currentMonth.filter(t => t.type === 'entrada').reduce((s,t) => s + t.amount, 0);
    const prevInc = prevMonth.filter(t => t.type === 'entrada').reduce((s,t) => s + t.amount, 0);
    const currExp = currentMonth.filter(t => t.type === 'saida').reduce((s,t) => s + t.amount, 0);
    const prevExp = prevMonth.filter(t => t.type === 'saida').reduce((s,t) => s + t.amount, 0);
    
    return {
      current: { income: currInc, expense: currExp, balance: currInc - currExp },
      previous: { income: prevInc, expense: prevExp, balance: prevInc - prevExp },
      incomeChange: prevInc > 0 ? ((currInc - prevInc) / prevInc) * 100 : 0,
      expenseChange: prevExp > 0 ? ((currExp - prevExp) / prevExp) * 100 : 0,
      balanceChange: prevInc - prevExp !== 0 ? ((currInc - currExp) - (prevInc - prevExp)) / Math.abs(prevInc - prevExp) * 100 : 0
    };
  }, [transactions, availableMonths]);

  const financialInsights = useMemo(() => {
    const list = [];
    if (monthlyComparison) {
      const { expenseChange, incomeChange } = monthlyComparison;
      
      if (expenseChange > 10) {
        list.push({ 
          type: 'warning', 
          title: 'Gastos em Alta', 
          text: `Suas despesas subiram ${expenseChange.toFixed(0)}% comparado ao mês passado. Tente identificar gastos não planejados.`,
          icon: 'alert'
        });
      } else if (expenseChange < -5) {
        list.push({ 
          type: 'success', 
          title: 'Belo Trabalho!', 
          text: `Você poupou ${Math.abs(expenseChange).toFixed(0)}% a mais que no mês anterior.`,
          icon: 'investimento'
        });
      }

      if (incomeChange > 5) {
        list.push({
          type: 'success',
          title: 'Renda Maior',
          text: `Sua receita aumentou ${incomeChange.toFixed(0)}% este mês. Ótimo momento para investir!`,
          icon: 'salario'
        });
      }
    }

    if (monthProjection && monthProjection.projected > monthInc && monthInc > 0) {
      list.push({
        type: 'warning',
        title: 'Alerta de Projeção',
        text: `Nesse ritmo, você fechará o mês com gastos acima da sua receita.`,
        icon: 'alert'
      });
    }

    if (categoryTrend.length > 0) {
      const topIncrease = categoryTrend.find(t => t.change > 15);
      if (topIncrease) {
        list.push({
          type: 'info',
          title: `Foco em ${topIncrease.label}`,
          text: `Os gastos com ${topIncrease.label} subiram ${topIncrease.change.toFixed(0)}% recentemente.`,
          icon: topIncrease.category
        });
      }
    }

    const savingsRate = monthInc > 0 ? ((monthInc - monthExp) / monthInc) * 100 : 0;
    if (savingsRate > 20) {
      list.push({
        type: 'success',
        title: 'Taxa de Economia',
        text: `Você está guardando ${savingsRate.toFixed(0)}% do que ganha. Excelente nível!`,
        icon: 'money'
      });
    }

    return list;
  }, [monthlyComparison, monthProjection, categoryTrend, monthInc, monthExp]);


  const cardStatementData = useMemo(() => {
    if (!selectedAccountFilter) return null;
    const acc = accounts.find(a => a.id === selectedAccountFilter);
    if (!acc || acc.type !== 'credit') return null;
    
    const closingDay = accountClosingDays[selectedAccountFilter] || 0;
    const now = new Date();
    let startDate, endDate;
    
    if (now.getDate() <= closingDay) {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, closingDay + 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), closingDay);
    } else {
      startDate = new Date(now.getFullYear(), now.getMonth(), closingDay + 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, closingDay);
    }
    
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];
    
    const periodTxs = transactions.filter(t => 
      t.accountId === selectedAccountFilter && 
      t.date >= startStr && t.date <= endStr
    ).sort((a,b) => a.date.localeCompare(b.date));
    
    const total = periodTxs.filter(t => t.type === 'saida').reduce((s,t) => s + t.amount, 0);
    const limit = accountLimits[selectedAccountFilter] || 0;
    
    return { startStr, endStr, transactions: periodTxs, total, limit, closingDay };
  }, [transactions, selectedAccountFilter, accountLimits, accountClosingDays, accounts]);

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

  const handleAddAccount = () => {
    if (!newAccountName.trim()) { showToast('Nome é obrigatório', 'error'); return; }
    const newId = 'acc_' + Date.now();
    const newAcc = { 
      id: newId, 
      name: newAccountName.trim(), 
      color: newAccountColor, 
      type: newAccountType 
    };
    const updated = [...accounts, newAcc];
    setAccounts(updated);
    localStorage.setItem('financeAccountsV2', JSON.stringify(updated));
    
    if (newAccountType === 'credit' && newAccountLimit) {
      const nl = {...accountLimits, [newId]: parseFloat(newAccountLimit)};
      setAccountLimits(nl);
      localStorage.setItem('financeAccountLimits', JSON.stringify(nl));
    }
    if (newAccountType === 'credit' && newAccountClosingDay) {
      const nc = {...accountClosingDays, [newId]: parseInt(newAccountClosingDay)};
      setAccountClosingDays(nc);
      localStorage.setItem('financeAccountClosingDays', JSON.stringify(nc));
    }
    
    setShowAddAccount(false);
    setNewAccountName('');
    setNewAccountType('default');
    setNewAccountColor('#5944FF');
    setNewAccountLimit('');
    setNewAccountClosingDay('');
    showToast('Conta adicionada!', 'success');
  };

  const handleDeleteAccount = (accId) => {
    const acc = accounts.find(a => a.id === accId);
    const balance = accountBalances[accId] || 0;
    if (balance !== 0 && !confirm(`Esta conta tem saldo de ${safeFormat(balance)}. Deseja excluir mesmo assim?`)) return;
    
    if (confirm(`Tem certeza que deseja excluir "${acc?.name}"?`)) {
      const updated = accounts.filter(a => a.id !== accId);
      setAccounts(updated);
      localStorage.setItem('financeAccountsV2', JSON.stringify(updated));
      if (selectedAccountFilter === accId) setSelectedAccountFilter(null);
      if (selectedAccountFilter === accId + '_edit') setSelectedAccountFilter(null);
      showToast('Conta removida', 'success');
    }
  };

  const handleEditAccount = (accId, newName, newColor) => {
    const updated = accounts.map(a => a.id === accId ? { ...a, name: newName, color: newColor } : a);
    setAccounts(updated);
    localStorage.setItem('financeAccountsV2', JSON.stringify(updated));
    showToast('Conta atualizada!', 'success');
  };

  const [editingAccount, setEditingAccount] = useState(null);
  const [editAccountName, setEditAccountName] = useState('');
  const [editAccountColor, setEditAccountColor] = useState('#5944FF');
  const [deleteConfirmAccount, setDeleteConfirmAccount] = useState(null);

  const triggerQuickAction = (qa) => {
    const newTx = {
      id: `tx_${Date.now()}`, type: 'saida', amount: qa.amount, category: qa.category, 
      description: qa.title.replace(/[^\w\sà-úÀ-Ú]/g, '').trim(), 
      date: new Date().toISOString().split('T')[0], timestamp: Date.now(), accountId: 'acc_pix'
    };
    handleSaveTx(newTx, false);
  };

  const handleSmartInput = () => {
    const text = smartInputText.trim();
    if(!text) return;
    const numMatch = text.match(/\d+(?:[.,]\d+)?/);
    if (!numMatch) { showToast('Digite um valor numérico. ex: "50 uber"', 'error'); return; }
    
    const valStr = numMatch[0];
    const amountVal = parseFloat(valStr.replace(',', '.'));
    const desc = text.replace(valStr, '').trim() || 'Despesa rápida';
    
    const lowerDesc = desc.toLowerCase();
    let cat = 'outros_saida';
    if(/(uber|99|taxi|onibus|passagem|gasolina|metro|estac)/.test(lowerDesc)) cat = 'transporte';
    else if(/(ifood|lanche|mercado|cafe|padaria|almoco|janta|restaurante|pizza|marmita|agua|doce)/.test(lowerDesc)) cat = 'alimentacao';
    else if(/(farmacia|remedio|medico|convenio|hospital|consulta)/.test(lowerDesc)) cat = 'saude';
    else if(/(luz|agua|internet|aluguel|condominio|energia|celular)/.test(lowerDesc)) cat = 'moradia';
    else if(/(cinema|festa|jogo|netflix|bar)/.test(lowerDesc)) cat = 'lazer';
    
    const newTx = {
      id: `tx_${Date.now()}`, type: 'saida', amount: amountVal, category: cat, 
      description: desc.charAt(0).toUpperCase() + desc.slice(1), 
      date: smartDateEnabled && smartInputDate ? smartInputDate : new Date().toISOString().split('T')[0], timestamp: Date.now(), accountId: 'acc_pix'
    };
    handleSaveTx(newTx, false);
    setSmartInputText('');
    setSmartInputDate('');
    setSmartDateEnabled(false);
  };

  const exportData = () => {
    const data = {
      transactions,
      accounts,
      expenseCategories,
      incomeCategories,
      trips,
      budgets,
      quickActions,
      userName,
      settings: {
        showMonthPicker,
        showDateOnExpense,
        notificationDays
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nox_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const exportToCSV = () => {
    const allCats = [...expenseCategories, ...incomeCategories];
    const headers = ['Data', 'Descrição', 'Valor', 'Tipo', 'Categoria', 'Conta'];
    const rows = transactions.map(t => [
      t.date,
      t.description,
      t.amount.toString().replace('.', ','),
      t.type === 'entrada' ? 'Entrada' : 'Saída',
      getCategoryInfo(t.category, allCats).label,
      accounts.find(a => a.id === t.accountId)?.name || 'Carteira'
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(';')).join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nox_transacoes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Relatório CSV baixado!', 'success');
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
          if(obj.expenseCategories) { setExpenseCategories(obj.expenseCategories); localStorage.setItem('financeExpenseCategories', JSON.stringify(obj.expenseCategories)); }
          if(obj.incomeCategories) { setIncomeCategories(obj.incomeCategories); localStorage.setItem('financeIncomeCategories', JSON.stringify(obj.incomeCategories)); }
          if(obj.trips) { setTrips(obj.trips); localStorage.setItem('financeTripsV2', JSON.stringify(obj.trips)); }
          showToast('Dados importados com sucesso!', 'success');
        }
      } catch(ex) { showToast('Arquivo corrompido ou inválido.', 'error'); }
    };
    reader.readAsText(file);
  };

  const getAccountIcon = (acc) => {
    const n = acc.name.toLowerCase();
    if (n.includes('pix')) return 'pix';
    if (n.includes('dinheiro') || n.includes('cash')) return 'money';
    if (acc.type === 'credit' || n.includes('cartão') || n.includes('cartao') || n.includes('card')) return 'credit_card';
    if (acc.type === 'income' || n.includes('receita')) return 'chart';
    return 'bank';
  };

  if(!isLoaded) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
      <div className="app-container">
        {toastMsg && (
          <div className="toast-wrapper" style={{zIndex: 9999}}>
            <div className="toast-box" style={{background: toastMsg.type === 'error' ? 'var(--color-expense)' : 'var(--color-primary)'}}>
              <SvgIcon name={toastMsg.type === 'error' ? 'alert' : 'wallet'} size={20} /> {toastMsg.msg}
            </div>
          </div>
        )}
        
        {deleteConfirmAccount && (
          <div className="name-modal-overlay">
            <div className="name-modal" style={{maxWidth:'320px'}}>
              <div style={{marginBottom:'16px', display:'flex', justifyContent:'center'}}>
                <div style={{width:'60px', height:'60px', borderRadius:'30px', background:'rgba(255,74,107,0.1)', display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <SvgIcon name="alert" size={32} />
                </div>
              </div>
              <h2 style={{fontSize:'1.2rem', marginBottom:'8px'}}>Excluir Conta?</h2>
              {(accountBalances[deleteConfirmAccount] || 0) !== 0 && (
                <p style={{fontSize:'0.85rem', color:'var(--color-warning)', marginBottom:'12px'}}>
                  Esta conta tem saldo de {safeFormat(accountBalances[deleteConfirmAccount])}.
                </p>
              )}
              <p style={{fontSize:'0.9rem', color:'var(--text-muted-dark)', marginBottom:'24px'}}>
                Tem certeza que deseja excluir "{accounts.find(a => a.id === deleteConfirmAccount)?.name}"? Esta ação não pode ser desfeita.
              </p>
              <div style={{display:'flex', gap:'12px'}}>
                <button 
                  style={{flex:1, padding:'12px', borderRadius:'12px', border:'1px solid var(--border-dark)', background:'var(--bg-surface-dark)', color:'var(--text-muted-dark)', fontWeight:600, cursor:'pointer'}}
                  onClick={() => setDeleteConfirmAccount(null)}
                >
                  Cancelar
                </button>
                <button 
                  style={{flex:1, padding:'12px', borderRadius:'12px', border:'none', background:'var(--color-expense)', color:'white', fontWeight:600, cursor:'pointer'}}
                  onClick={() => {
                    const updated = accounts.filter(a => a.id !== deleteConfirmAccount);
                    setAccounts(updated);
                    localStorage.setItem('financeAccountsV2', JSON.stringify(updated));
                    if (selectedAccountFilter === deleteConfirmAccount) setSelectedAccountFilter(null);
                    setDeleteConfirmAccount(null);
                    showToast('Conta removida', 'success');
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* TOP HEADER */}
        <div className="header-area">
          <div className="header-left">
             <img src="/nox_finance_icone.png" alt="Nox Finance" className="app-logo" />
             <div style={{minWidth: 0}}>
                <h1 className="greeting">
                  Olá{userName ? ', ' + userName : '!'} 
                  <span style={{cursor:'pointer', color:'var(--text-muted-dark)', flexShrink: 0}} onClick={()=>setHideValues(!hideValues)}>
                    <SvgIcon name={hideValues ? 'eye_off' : 'eye'} size={18} />
                  </span>
                </h1>
                <p className="subtitle">Gestor de Finanças</p>
             </div>
          </div>
          <div className="header-right">
            {showMonthPicker && (
              <div className="month-picker-wrapper">
                <select className="month-select" value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)}>
                  {availableMonths.map(m => <option key={m} value={m}>{getMonthLabel(m)}</option>)}
                </select>
              </div>
            )}
            <div className="config-btn" onClick={()=>setActiveTab('trips')} style={{ color: activeTab === 'trips' ? 'var(--color-primary)' : 'var(--text-muted-dark)' }}>
               <SvgIcon name="airplane" size={24} />
            </div>
            <div className="config-btn" onClick={()=>setActiveTab('config')} style={{ color: activeTab === 'config' ? 'var(--color-primary)' : 'var(--text-muted-dark)' }}>
               <SvgIcon name="config" size={24} />
            </div>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dash' && (
          <div className="tab-content content-pad" style={{paddingTop: '20px'}}>
            
            <div className="total-balance-box">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div>
                  <div style={{fontSize:'0.9rem', opacity:0.8}}>Saldo Atual</div>
                  <div style={{fontSize:'2.2rem', fontWeight:700}}>{safeFormat(totalBal)}</div>
                </div>
              </div>
            </div>

            <div className="insight-card">
               <div className="insight-row">
                  <div className="insight-icon" style={{color:'var(--color-primary)'}}><SvgIcon name="chart" size={20}/></div>
                  <div style={{flex:1}}>
                     <div className="insight-title">Sobra disponível no mês</div>
                     <div className="insight-val" style={{color: (monthInc - monthExp) >= 0 ? 'var(--color-income)' : 'var(--color-expense)'}}>
                        {safeFormat(monthInc - monthExp)}
                     </div>
                  </div>
                  {selectedMonth === getCurrentMonthStr() && (
                    <div style={{textAlign:'right'}}>
                       <div className="insight-title">Orçamento Diário</div>
                       <div className="insight-val" style={{fontSize:'0.9rem'}}>
                          {safeFormat(Math.max((monthInc - monthExp) / (31 - new Date().getDate() + 1), 0))}
                       </div>
                    </div>
                  )}
               </div>
            </div>

            {activeAlerts.map((a, idx) => (
              <div key={idx} className="alert-banner" style={{marginTop: '16px', marginBottom: 0, background: a.type === 'limit' ? 'rgba(255,74,107,0.1)' : undefined, color: a.type === 'limit' ? 'var(--color-expense)' : undefined}}>
                <SvgIcon name="alert" size={18}/> 
                {a.type === 'limit' ? (
                  `Limite Excedido: O cartão ${a.accName} passou do limite (${safeFormat(a.limit)})!`
                ) : (
                  `Cuidado: Você atingiu ${a.pct.toFixed(0)}% da meta de ${getCategoryInfo(a.catKey).label}!`
                )}
              </div>
            ))}

            <div style={{marginTop: '16px', marginBottom: '8px'}}>
              <div className="smart-input-container">
                <input type="text" className="smart-input" placeholder="Expresso (ex: 35 ifood para 15/05)" value={smartInputText} onChange={e => setSmartInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSmartInput()} />
                <button className="smart-btn" onClick={handleSmartInput}><SvgIcon name="edit" size={18} /></button>
              </div>
              <label style={{display:'flex', alignItems:'center', gap:'8px', color:'var(--text-muted-dark)', fontSize:'0.8rem', marginTop:'8px', cursor:'pointer'}}>
                <input type="checkbox" checked={smartDateEnabled} onChange={e=>setSmartDateEnabled(e.target.checked)} style={{width:'16px', height:'16px'}} />
                Definir data de vencimento
              </label>
              {smartDateEnabled && (
                <input type="date" className="modern-input" style={{marginTop:'8px', marginBottom:'16px'}} value={smartInputDate} onChange={e=>setSmartInputDate(e.target.value)} />
              )}
              
              {quickActions.length > 0 && (
                <div style={{display:'flex', gap:'12px', overflowX:'auto', paddingBottom:'8px'}}>
                  {quickActions.map(qa => (
                    <button key={qa.id} className="quick-action-btn" onClick={() => triggerQuickAction(qa)}>
                      <div style={{fontSize:'0.85rem', fontWeight:600, color:'var(--text-main-dark)'}}>{qa.title}</div>
                      <div style={{fontSize:'0.75rem', color:'var(--color-expense)'}}>{formatCurrency(qa.amount)}</div>
                    </button>
                  ))}
                </div>
              )}
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
                    const limit = budgets[catKey]; 
                    const allCats = [...expenseCategories, ...incomeCategories];
                    const info = getCategoryInfo(catKey, allCats);
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
              <ChartDonut data={donutData} safeFormat={safeFormat} allCats={[...expenseCategories, ...incomeCategories]} />
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="tab-content content-pad" style={{paddingTop: '20px'}}>
              
              {/* Header Didático */}
              <div style={{marginBottom: '20px'}}>
                <h3 className="section-title" style={{marginBottom: '4px'}}>Análise de Saúde Financeira</h3>
                <p style={{fontSize: '0.85rem', color: 'var(--text-muted-dark)'}}>Entenda o comportamento do seu dinheiro de forma simples.</p>
              </div>

              {/* Insights Dinâmicos */}
              {financialInsights.length > 0 && (
                <div style={{display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '8px'}}>
                  {financialInsights.map((ins, i) => (
                    <div key={i} className="glass-card" style={{
                      minWidth: '260px', 
                      padding: '16px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px', 
                      border: ins.type === 'warning' ? '1px solid rgba(239, 68, 68, 0.3)' : ins.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-dark)',
                      background: ins.type === 'warning' ? 'rgba(239, 68, 68, 0.05)' : ins.type === 'success' ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-surface-dark)'
                    }}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <div style={{color: ins.type === 'warning' ? 'var(--color-expense)' : ins.type === 'success' ? 'var(--color-income)' : 'var(--color-primary)'}}>
                          <SvgIcon name={ins.icon} size={18} />
                        </div>
                        <span style={{fontSize: '0.9rem', fontWeight: 700, color: ins.type === 'warning' ? 'var(--color-expense)' : ins.type === 'success' ? 'var(--color-income)' : 'var(--text-main-dark)'}}>{ins.title}</span>
                      </div>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-main-dark)', margin: 0, lineHeight: 1.4}}>{ins.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Comparativo de Mês Anterior vs Atual */}
              {monthlyComparison && (
                <div className="glass-card" style={{marginBottom:'16px'}}>
                  <h3 className="section-title">Como você está hoje vs Mês Passado</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-muted-dark)'}}>Entradas</div>
                        <div style={{fontSize: '1.2rem', fontWeight: 600}}>{safeFormat(monthInc)}</div>
                      </div>
                      <div style={{
                        padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                        background: monthlyComparison.incomeChange >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: monthlyComparison.incomeChange >= 0 ? 'var(--color-income)' : 'var(--color-expense)'
                      }}>
                        {monthlyComparison.incomeChange >= 0 ? '↑' : '↓'} {Math.abs(monthlyComparison.incomeChange).toFixed(1)}%
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-muted-dark)'}}>Mês Anterior</div>
                        <div style={{fontSize: '1rem', color: 'var(--text-muted-dark)'}}>{safeFormat(monthlyComparison.previous.income)}</div>
                      </div>
                    </div>

                    <div style={{height: '1px', background: 'var(--border-dark)'}}></div>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-muted-dark)'}}>Saídas</div>
                        <div style={{fontSize: '1.2rem', fontWeight: 600}}>{safeFormat(monthExp)}</div>
                      </div>
                      <div style={{
                        padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                        background: monthlyComparison.expenseChange <= 5 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: monthlyComparison.expenseChange <= 5 ? 'var(--color-income)' : 'var(--color-expense)'
                      }}>
                        {monthlyComparison.expenseChange >= 0 ? '↑' : '↓'} {Math.abs(monthlyComparison.expenseChange).toFixed(1)}%
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-muted-dark)'}}>Mês Anterior</div>
                        <div style={{fontSize: '1rem', color: 'var(--text-muted-dark)'}}>{safeFormat(monthlyComparison.previous.expense)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projeção do Mês (Somente se for o mês atual) */}
              {monthProjection && selectedMonth === getCurrentMonthStr() && (
                <div className="glass-card" style={{marginBottom:'16px', borderLeft: '4px solid var(--color-primary)'}}>
                  <h3 className="section-title">Onde você vai chegar</h3>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                    <div>
                      <div style={{fontSize:'0.8rem', color:'var(--text-muted-dark)'}}>Gasto Real</div>
                      <div style={{fontSize:'1.4rem', fontWeight:700}}>{safeFormat(monthProjection.spent)}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:'0.8rem', color:'var(--text-muted-dark)'}}>Previsão de Final</div>
                      <div style={{fontSize:'1.4rem', fontWeight:700, color: monthProjection.projected > monthInc ? 'var(--color-expense)' : 'var(--color-income)'}}>{safeFormat(monthProjection.projected)}</div>
                    </div>
                  </div>
                  <div className="budget-bar-bg">
                    <div className="budget-bar-fill" style={{width: `${Math.min(monthProjection.progress, 100)}%`, background: 'var(--color-primary)'}}></div>
                  </div>
                  <div style={{fontSize:'0.75rem', color:'var(--text-muted-dark)', marginTop:'8px', textAlign:'center'}}>
                    {monthProjection.progress < 50 ? 'O mês está apenas começando! Mantenha o foco.' : monthProjection.progress > 90 ? 'Mês quase no fim. Como estão as metas?' : 'Você já percorreu ' + monthProjection.progress.toFixed(0) + '% do mês.'}
                  </div>
                </div>
              )}

              {/* Evolução Patrimonial Gráfica */}
              <div className="glass-card" style={{marginBottom:'16px'}}>
                <h3 className="section-title">Acúmulo de Capital</h3>
                <p style={{fontSize:'0.8rem', color:'var(--text-muted-dark)', marginBottom:'20px'}}>
                  Este gráfico mostra o total de dinheiro que você possui em todas as contas somadas ao final de cada mês.
                </p>
                
                {patrimonyEvolution.length > 1 ? (
                  <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                    {patrimonyEvolution.slice().reverse().slice(0, 6).map((p, i) => {
                      const maxAbs = Math.max(...patrimonyEvolution.map(x=>Math.abs(x.balance)), 1);
                      const pct = Math.abs((p.balance / maxAbs) * 100);
                      const isCurrent = p.month === getCurrentMonthStr();
                      
                      return (
                        <div key={p.month} style={{display:'flex', flexDirection:'column', gap:'4px', opacity: isCurrent ? 1 : 0.7}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                            <span style={{fontSize:'0.8rem', fontWeight: 600, color: isCurrent ? 'var(--color-primary)' : 'var(--text-main-dark)'}}>
                              {getMonthLabel(p.month).split(' ')[0]} {isCurrent ? '(Hoje)' : ''}
                            </span>
                            <span style={{fontSize:'0.85rem', fontWeight:700, color: p.balance >= 0 ? 'var(--color-income)' : 'var(--color-expense)'}}>
                              {safeFormat(p.balance)}
                            </span>
                          </div>
                          <div className="budget-bar-bg" style={{height: '11px', background: 'rgba(255,255,255,0.05)'}}>
                            <div className="budget-bar-fill" style={{
                              width: `${pct}%`,
                              background: p.balance >= 0 
                                ? (isCurrent ? 'var(--color-primary)' : 'var(--color-income)') 
                                : 'var(--color-expense)',
                              borderRadius:'6px',
                              boxShadow: isCurrent ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                            }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : patrimonyEvolution.length === 1 ? (
                  <div style={{padding: '24px', textAlign: 'center', background: 'rgba(59,130,246,0.05)', borderRadius: '20px', border: '1px solid var(--border-dark)'}}>
                    <div style={{color: 'var(--color-primary)', marginBottom: '12px'}}><SvgIcon name="investimento" size={40} /></div>
                    <h4 style={{fontSize: '1rem', color: 'var(--text-main-dark)', marginBottom: '8px'}}>Sua jornada começou!</h4>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-muted-dark)', margin: 0, lineHeight: 1.5}}>
                      Você já tem **{safeFormat(patrimonyEvolution[0].balance)}** acumulados este mês. Continue registrando para ver seu gráfico de crescimento nos próximos meses!
                    </p>
                  </div>
                ) : (
                  <div style={{textAlign:'center', color:'var(--text-muted-dark)', padding:'20px'}}>
                    Registre sua primeira transação para ver sua evolução.
                  </div>
                )}
              </div>


              {/* Tendências e Top Categorias */}
              <div className="glass-card">
                 <h3 className="section-title">Hábitos de Consumo</h3>
                 
                 <div style={{marginBottom: '20px'}}>
                   <ChartDonut data={donutData} safeFormat={safeFormat} />
                 </div>

                 {categoryTrend.length > 0 ? (
                   <div style={{marginTop:'30px'}}>
                      <h4 style={{fontSize:'0.9rem', color:'var(--text-muted-dark)', marginBottom:'16px', fontWeight:600}}>Tendência de Mudança</h4>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        {categoryTrend.slice(0, 4).map(t => (
                          <div key={t.category} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px', background: 'var(--bg-page-dark)', borderRadius: '14px'}}>
                            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                               <div style={{width: '32px', height: '32px', borderRadius: '10px', background: `${t.color}20`, color:t.color, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><SvgIcon name={t.category} size={16}/></div>
                               <div>
                                 <div style={{fontWeight:600, fontSize:'0.85rem'}}>{t.label}</div>
                                 <div style={{fontSize:'0.7rem', color:'var(--text-muted-dark)'}}>Mês anterior: {safeFormat(t.first)}</div>
                               </div>
                            </div>
                            <div style={{
                              fontWeight:700, 
                              color: t.change <= 0 ? 'var(--color-income)' : 'var(--color-expense)',
                              fontSize:'0.85rem'
                            }}>
                              {t.change >= 0 ? '↑' : '↓'} {Math.abs(t.change).toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                 ) : (
                   <p style={{fontSize: '0.8rem', color: 'var(--text-muted-dark)', textAlign: 'center'}}>Ainda não temos dados de meses anteriores para tendências.</p>
                 )}

                 <div style={{marginTop:'30px'}}>
                    <h4 style={{fontSize:'0.9rem', color:'var(--text-muted-dark)', marginBottom:'16px', fontWeight:600}}>Seu Dinheiro foi para:</h4>
                    {[...donutData].sort((a,b)=>b.value-a.value).slice(0, 5).map((d,i) => (
                      <div key={d.label} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid var(--border-dark)'}}>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                           <span style={{fontSize: '0.8rem', color: 'var(--text-muted-dark)', width: '20px'}}>{i+1}º</span>
                           <span style={{fontWeight:500, fontSize:'0.9rem'}}>{d.label}</span>
                        </div>
                        <div style={{fontWeight:600, fontSize: '0.9rem'}}>{safeFormat(d.value)}</div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Guia Didático Rápido */}
              <div style={{margin: '24px 0 40px', padding: '16px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', border: '1px dashed var(--color-primary)'}}>
                <h4 style={{fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '8px', fontWeight: 700}}>Dica de Gestão</h4>
                <p style={{fontSize: '0.8rem', color: 'var(--text-main-dark)', margin: 0, lineHeight: 1.5}}>
                  Tente manter seus gastos fixos (Moradia, Saúde) abaixo de 50% da sua receita total. Use os outros 50% para lazer, investimentos e metas variáveis!
                </p>
              </div>
           </div>
        )}

        {/* ACCOUNTS TAB */}
        {activeTab === 'accounts' && (
          <div className="tab-content content-pad" style={{paddingTop: '20px'}}>
            <div className="glass-card" style={{minHeight:'60vh'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                 <h3 className="section-title" style={{margin:0}}>Suas Carteiras</h3>
                 <button 
                  style={{
                    padding:'6px 12px', fontSize:'0.7rem', borderRadius:'10px', border:'none', 
                    background: 'var(--color-primary)', color: 'white', cursor:'pointer', fontWeight:600
                  }}
                  onClick={() => setShowAddAccount(true)}
                 >+ Adicionar</button>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                {accounts.map(acc => (
                  <div key={acc.id} style={{
                    display:'flex', 
                    alignItems:'center', 
                    justifyContent:'space-between', 
                    padding:'12px', 
                    borderRadius:'16px', 
                    border: '1px solid var(--border-dark)', 
                    background: 'var(--bg-surface-hover)',
                    marginBottom: '12px'
                  }}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', minWidth: 0, flex: 1}}>
                       <div style={{width:'36px', height:'36px', borderRadius:'10px', background:`${acc.color}20`, color:acc.color, display:'flex', justifyContent:'center', alignItems:'center', flexShrink: 0}}><SvgIcon name={getAccountIcon(acc)} size={18} /></div>
                       <div style={{minWidth: 0}}>

                          <div style={{fontSize: '0.85rem', fontWeight:600, color:'var(--text-main-dark)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{acc.name}</div>
                          {acc.type === 'credit' && accountLimits[acc.id] > 0 && (
                            <div style={{fontSize:'0.65rem', color:'var(--text-muted-dark)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                              Limite: {safeFormat(accountLimits[acc.id])} • Fech: dia {accountClosingDays[acc.id] || 0}
                            </div>
                          )}
                          {acc.type === 'income' && (
                            <div style={{fontSize:'0.65rem', color:'var(--color-income)'}}>Apenas receitas</div>
                          )}
                          {acc.type === 'default' && (
                            <div style={{fontSize:'0.65rem', color:'var(--text-muted-dark)'}}>Padrão</div>
                          )}
                       </div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'4px', flexShrink: 0}}>
                       <button 
                         style={{
                           padding:'5px 6px', fontSize:'0.55rem', borderRadius:'6px', border:'none', 
                           background: 'var(--bg-surface-dark)',
                           color: 'var(--text-muted-dark)',
                           cursor:'pointer', fontWeight:500
                         }}
                         onClick={() => setSelectedAccountFilter(selectedAccountFilter === acc.id + '_edit' ? null : acc.id + '_edit')}
                         title="Editar"
                       >
                         <SvgIcon name="edit" size={14} />
                       </button>
                       {acc.type !== 'default' && (
                         <button 
                           style={{
                             padding:'5px 6px', fontSize:'0.55rem', borderRadius:'6px', border:'none', 
                             background: 'rgba(255,74,107,0.1)',
                             color: 'var(--color-expense)',
                             cursor:'pointer', fontWeight:500
                           }}
                           onClick={() => setDeleteConfirmAccount(acc.id)}
                           title="Excluir"
                         >
                           <SvgIcon name="trash" size={14} />
                         </button>
                       )}
                       <button 
                         style={{
                           padding:'5px 8px', fontSize:'0.6rem', borderRadius:'6px', border:'none', 
                           background: selectedAccountFilter === acc.id ? 'var(--color-primary)' : 'var(--bg-surface-dark)',
                           color: selectedAccountFilter === acc.id ? 'white' : 'var(--text-muted-dark)',
                           cursor:'pointer', fontWeight:500
                         }}
                         onClick={() => setSelectedAccountFilter(selectedAccountFilter === acc.id ? null : acc.id)}
                       >
                         {selectedAccountFilter === acc.id ? '✕' : 'Ver'}
                       </button>
                       <div style={{fontSize:'0.85rem', fontWeight:700, color: (accountBalances[acc.id]||0) < 0 ? 'var(--color-expense)' : 'var(--text-main-dark)', minWidth:'60px', textAlign:'right', whiteSpace:'nowrap'}}>
                          {safeFormat(accountBalances[acc.id] || 0)}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedAccountFilter && selectedAccountFilter.endsWith('_config') && (
              <div className="glass-card" style={{marginTop:'16px'}}>
                <h3 className="section-title">Configurar {accounts.find(a => a.id === selectedAccountFilter.replace('_config',''))?.name}</h3>
                <div style={{marginBottom:'16px'}}>
                  <label style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', display:'block', marginBottom:'8px'}}>Limite total do cartão</label>
                  <input 
                    type="number" 
                    className="modern-input" 
                    placeholder="Ex: 5000" 
                    value={accountLimits[selectedAccountFilter.replace('_config','')] || ''}
                    onChange={e => {
                      const v = parseFloat(e.target.value) || 0;
                      const accId = selectedAccountFilter.replace('_config','');
                      const nl = {...accountLimits, [accId]: v};
                      setAccountLimits(nl);
                      localStorage.setItem('financeAccountLimits', JSON.stringify(nl));
                    }}
                  />
                </div>
                <div style={{marginBottom:'16px'}}>
                  <label style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', display:'block', marginBottom:'8px'}}>Dia de fechamento da fatura</label>
                  <input 
                    type="number" 
                    className="modern-input" 
                    placeholder="Ex: 15" 
                    min="1" max="31"
                    value={accountClosingDays[selectedAccountFilter.replace('_config','')] || ''}
                    onChange={e => {
                      const v = parseInt(e.target.value) || 0;
                      const accId = selectedAccountFilter.replace('_config','');
                      const nc = {...accountClosingDays, [accId]: v};
                      setAccountClosingDays(nc);
                      localStorage.setItem('financeAccountClosingDays', JSON.stringify(nc));
                    }}
                  />
                </div>
                <div style={{fontSize:'0.8rem', color:'var(--text-muted-dark)'}}>
                  Configure o limite e o dia de fechamento para ver a fatura atual e projeção de uso.
                </div>
              </div>
            )}

            {selectedAccountFilter && selectedAccountFilter.endsWith('_edit') && (() => {
              const accId = selectedAccountFilter.replace('_edit','');
              const acc = accounts.find(a => a.id === accId);
              return (
                <div className="glass-card" style={{marginTop:'16px'}}>
                  <h3 className="section-title">Editar {acc?.name}</h3>
                  <div style={{marginBottom:'16px'}}>
                    <label style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', display:'block', marginBottom:'8px'}}>Nome</label>
                    <input 
                      type="text" 
                      className="modern-input" 
                      placeholder="Nome da conta"
                      defaultValue={acc?.name}
                      id={`edit-name-${accId}`}
                    />
                  </div>
                  <div style={{marginBottom:'16px'}}>
                    <label style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', display:'block', marginBottom:'8px'}}>Cor</label>
                    <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}} id={`edit-color-${accId}`}>
                      {['#5944FF', '#8A05BE', '#12C99B', '#FF7A59', '#FFB142', '#0097E6', '#B33771', '#FFD93D'].map(c => (
                        <div 
                          key={c}
                          onClick={() => {
                            const nameInput = document.getElementById(`edit-name-${accId}`).value;
                            const newColor = c;
                            handleEditAccount(accId, nameInput || acc?.name, newColor);
                            setSelectedAccountFilter(null);
                          }}
                          style={{
                            width:'32px', height:'32px', borderRadius:'8px', background:c, 
                            cursor:'pointer', border: acc?.color === c ? '3px solid white' : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <button 
                    style={{background:'var(--color-primary)', color:'white', border:'none', padding:'12px', borderRadius:'12px', width:'100%', fontWeight:600, cursor:'pointer'}}
                    onClick={() => {
                      const nameInput = document.getElementById(`edit-name-${accId}`).value;
                      handleEditAccount(accId, nameInput || acc?.name, acc?.color);
                      setSelectedAccountFilter(null);
                    }}
                  >
                    Salvar
                  </button>
                </div>
              );
            })()}

            {selectedAccountFilter && !selectedAccountFilter.endsWith('_edit') && cardStatementData && (
              <div className="glass-card" style={{marginTop:'16px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                  <h3 className="section-title" style={{margin:0}}>Fatura Atual</h3>
                  <span style={{fontSize:'0.7rem', color:'var(--color-primary)', cursor:'pointer'}} onClick={() => setSelectedAccountFilter(null)}>Fechar</span>
                </div>
                <div style={{fontSize:'0.75rem', color:'var(--text-muted-dark)', marginBottom:'12px'}}>
                  Período: {cardStatementData.startStr.split('-').reverse().join('/')} a {cardStatementData.endStr.split('-').reverse().join('/')}
                </div>
                
                {cardStatementData.limit > 0 && (
                  <div style={{marginBottom:'16px', padding:'12px', background:'var(--bg-page-dark)', borderRadius:'12px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                      <span style={{fontSize:'0.8rem', color:'var(--text-muted-dark)'}}>Limite disponível</span>
                      <span style={{fontSize:'0.9rem', fontWeight:600, color:'var(--color-primary)'}}>{safeFormat(cardStatementData.limit - cardStatementData.total)}</span>
                    </div>
                    <div className="budget-bar-bg">
                      <div className="budget-bar-fill" style={{
                        width: `${Math.min((cardStatementData.total / cardStatementData.limit) * 100, 100)}%`,
                        background: (cardStatementData.total / cardStatementData.limit) > 0.9 ? 'var(--color-expense)' : (cardStatementData.total / cardStatementData.limit) > 0.7 ? 'var(--color-warning)' : 'var(--color-primary)'
                      }}></div>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px', fontSize:'0.7rem', color:'var(--text-muted-dark)'}}>
                      <span>{safeFormat(cardStatementData.total)} usado</span>
                      <span>{safeFormat(cardStatementData.limit)} limite</span>
                    </div>
                  </div>
                )}

                {cardStatementData.transactions.length > 0 ? (
                  cardStatementData.transactions.map(tx => (
                    <ItemTx key={tx.id} tx={tx} onDelete={handleDelete} onEdit={openEdit} safeFormat={safeFormat} showDate={showDateOnExpense} allCats={[...expenseCategories, ...incomeCategories]} />
                  ))
                ) : (
                  <div style={{textAlign:'center', padding:'20px', color:'var(--text-muted-dark)', fontSize:'0.85rem'}}>
                    Nenhum movimento neste período.
                  </div>
                )}
              </div>
            )}

            {selectedAccountFilter && !selectedAccountFilter.endsWith('_edit') && !cardStatementData && (
              <div className="glass-card" style={{marginTop:'16px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                  <h3 className="section-title" style={{margin:0}}>Movimentos de {accounts.find(a => a.id === selectedAccountFilter)?.name}</h3>
                  <span style={{fontSize:'0.7rem', color:'var(--color-primary)', cursor:'pointer'}} onClick={() => setSelectedAccountFilter(null)}>Fechar</span>
                </div>
                {monthData.filter(t => t.accountId === selectedAccountFilter).map(tx => (
                  <ItemTx key={tx.id} tx={tx} onDelete={handleDelete} onEdit={openEdit} safeFormat={safeFormat} showDate={showDateOnExpense} allCats={[...expenseCategories, ...incomeCategories]} />
                ))}
                {monthData.filter(t => t.accountId === selectedAccountFilter).length === 0 && (
                  <div style={{textAlign:'center', padding:'20px', color:'var(--text-muted-dark)', fontSize:'0.85rem'}}>
                    Nenhum movimento encontrado.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* LIST TAB */}
        {activeTab === 'list' && (
          <div className="tab-content content-pad" style={{paddingTop: '20px'}}>
             <input type="text" className="search-input" style={{marginBottom:'12px'}} placeholder="Buscar por descrição ou nome..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
             
             <div style={{display:'flex', gap:'8px', overflowX:'auto', marginBottom:'20px', paddingBottom:'8px'}}>
               <div className={`chip ${!selectedCategoryFilter ? 'active' : ''}`} onClick={() => setSelectedCategoryFilter('')}>Todas</div>
               <div className={`chip ${selectedCategoryFilter === 'entrada' ? 'active' : ''}`} onClick={() => setSelectedCategoryFilter('entrada')}>Entradas</div>
               {expenseCategories.map(c => <div key={c.id} className={`chip ${selectedCategoryFilter === c.id ? 'active' : ''}`} onClick={() => setSelectedCategoryFilter(c.id)}>{c.label}</div>)}
               {incomeCategories.map(c => <div key={c.id} className={`chip ${selectedCategoryFilter === c.id ? 'active' : ''}`} onClick={() => setSelectedCategoryFilter(c.id)}>{c.label}</div>)}
             </div>

             <div className="glass-card" style={{minHeight:'60vh'}}>
                <h3 className="section-title">Resultados de {getMonthLabel(selectedMonth)}</h3>
                {monthData.map(tx => <ItemTx key={tx.id} tx={tx} onDelete={handleDelete} onEdit={openEdit} safeFormat={safeFormat} showDate={showDateOnExpense} allCats={[...expenseCategories, ...incomeCategories]} />)}
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
          <div className="tab-content content-pad" style={{paddingTop: '20px'}}>
            <div className="glass-card">
              <h3 className="section-title">Exibição</h3>
              <div className="setting-row">
                <div style={{fontSize:'0.9rem'}}>Mostrar Seletor de Mês</div>
                <button 
                  style={{
                    width:'50px', height:'28px', borderRadius:'14px', border:'none', 
                    background: showMonthPicker ? 'var(--color-primary)' : 'var(--bg-surface-dark)',
                    color: showMonthPicker ? 'white' : 'var(--text-muted-dark)',
                    cursor:'pointer', fontWeight:600, fontSize:'0.8rem'
                  }}
                  onClick={() => {
                    const v = !showMonthPicker;
                    setShowMonthPicker(v);
                    localStorage.setItem('financeShowMonthPicker', v.toString());
                  }}
                >
                  {showMonthPicker ? 'Sim' : 'Não'}
                </button>
              </div>
              <div className="setting-row">
                <div style={{fontSize:'0.9rem'}}>Mostrar Data nas Despesas</div>
                <button 
                  style={{
                    width:'50px', height:'28px', borderRadius:'14px', border:'none', 
                    background: showDateOnExpense ? 'var(--color-primary)' : 'var(--bg-surface-dark)',
                    color: showDateOnExpense ? 'white' : 'var(--text-muted-dark)',
                    cursor:'pointer', fontWeight:600, fontSize:'0.8rem'
                  }}
                  onClick={() => {
                    const v = !showDateOnExpense;
                    setShowDateOnExpense(v);
                    localStorage.setItem('financeShowDateOnExpense', v.toString());
                  }}
                >
                  {showDateOnExpense ? 'Sim' : 'Não'}
                </button>
              </div>
            </div>

            <div className="glass-card">
              <h3 className="section-title">Categorias e Metas</h3>
              <div style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', marginBottom:'16px'}}>Gerencie suas categorias e defina metas mensais.</div>
              
              <h4 style={{fontSize:'0.9rem', color:'var(--text-main-dark)', marginBottom:'12px'}}>Saídas</h4>
              {expenseCategories.map(c => (
                <div key={c.id} style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'8px', background:'var(--bg-page-dark)', display:'flex', justifyContent:'center', alignItems:'center', color:c.color}}><SvgIcon name={c.id} size={18}/></div>
                  <div style={{flex:1, fontSize:'0.9rem'}}>
                    <input 
                      type="text" 
                      value={c.label} 
                      style={{background:'transparent', border:'none', color:'white', fontSize:'0.9rem', width:'100%'}}
                      onChange={e => {
                        const newCats = expenseCategories.map(cat => cat.id === c.id ? {...cat, label: e.target.value} : cat);
                        setExpenseCategories(newCats);
                        localStorage.setItem('financeExpenseCategories', JSON.stringify(newCats));
                      }}
                    />
                  </div>
                  <input type="number" className="modern-input" style={{width:'80px', padding:'8px', margin:0, textAlign:'center'}} placeholder="Meta" 
                    value={budgets[c.id] || ''} 
                    onChange={e => {
                      const v = parseFloat(e.target.value); const nb = {...budgets};
                      if(v>0) nb[c.id]=v; else delete nb[c.id];
                      setBudgets(nb); localStorage.setItem('financeBudgetsV2', JSON.stringify(nb));
                    }} 
                  />
                  {expenseCategories.length > 1 && (
                    <button style={{background:'transparent', border:'none', color:'var(--color-expense)', cursor:'pointer'}} onClick={() => {
                      if(confirm(`Excluir categoria "${c.label}"? Isso não apaga os lançamentos já feitos.`)) {
                        const newCats = expenseCategories.filter(cat => cat.id !== c.id);
                        setExpenseCategories(newCats);
                        localStorage.setItem('financeExpenseCategories', JSON.stringify(newCats));
                      }
                    }}><SvgIcon name="trash" size={16}/></button>
                  )}
                </div>
              ))}
              <button 
                className="btn-outline" 
                style={{width:'100%', marginTop:'8px', marginBottom:'24px'}}
                onClick={() => {
                  const newId = 'cat_' + Date.now();
                  const newCats = [...expenseCategories, { id: newId, label: 'Nova Categoria', color: '#A0AEC0' }];
                  setExpenseCategories(newCats);
                  localStorage.setItem('financeExpenseCategories', JSON.stringify(newCats));
                }}
              >+ Nova Categoria de Saída</button>

              <h4 style={{fontSize:'0.9rem', color:'var(--text-main-dark)', marginBottom:'12px'}}>Entradas</h4>
              {incomeCategories.map(c => (
                <div key={c.id} style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'8px', background:'var(--bg-page-dark)', display:'flex', justifyContent:'center', alignItems:'center', color:c.color}}><SvgIcon name={c.id} size={18}/></div>
                  <div style={{flex:1, fontSize:'0.9rem'}}>
                    <input 
                      type="text" 
                      value={c.label} 
                      style={{background:'transparent', border:'none', color:'white', fontSize:'0.9rem', width:'100%'}}
                      onChange={e => {
                        const newCats = incomeCategories.map(cat => cat.id === c.id ? {...cat, label: e.target.value} : cat);
                        setIncomeCategories(newCats);
                        localStorage.setItem('financeIncomeCategories', JSON.stringify(newCats));
                      }}
                    />
                  </div>
                  {incomeCategories.length > 1 && (
                    <button style={{background:'transparent', border:'none', color:'var(--color-expense)', cursor:'pointer'}} onClick={() => {
                      if(confirm(`Excluir categoria "${c.label}"?`)) {
                        const newCats = incomeCategories.filter(cat => cat.id !== c.id);
                        setIncomeCategories(newCats);
                        localStorage.setItem('financeIncomeCategories', JSON.stringify(newCats));
                      }
                    }}><SvgIcon name="trash" size={16}/></button>
                  )}
                </div>
              ))}
              <button 
                className="btn-outline" 
                style={{width:'100%', marginTop:'8px'}}
                onClick={() => {
                  const newId = 'cat_' + Date.now();
                  const newCats = [...incomeCategories, { id: newId, label: 'Nova Categoria', color: '#00C896' }];
                  setIncomeCategories(newCats);
                  localStorage.setItem('financeIncomeCategories', JSON.stringify(newCats));
                }}
              >+ Nova Categoria de Entrada</button>
            </div>

            <div className="glass-card" style={{marginBottom: '16px'}}>
              <h3 className="section-title">Notificações</h3>
              <div className="setting-row">
                <div style={{fontSize:'0.9rem'}}>Ativar Alertas no Celular</div>
                <button className="btn-outline" onClick={() => {
                  if ("Notification" in window) {
                    Notification.requestPermission().then(p => {
                      if(p==='granted') showToast('Notificações ativadas com sucesso!', 'success');
                      else showToast('Permissão negada.', 'error');
                    });
                  } else {
                    showToast('Seu navegador não suporta notificações.', 'error');
                  }
                }}>Autorizar</button>
              </div>
              <div className="setting-row">
                <div style={{fontSize:'0.9rem'}}>Antecedência de Vencimento</div>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <input type="number" className="modern-input" style={{width:'80px', padding:'8px', margin:0, textAlign:'center'}} 
                    value={notificationDays} min="0" max="30"
                    onChange={e => {
                      const v = parseInt(e.target.value) || 0;
                      setNotificationDays(v);
                      localStorage.setItem('financeNotificationDays', v.toString());
                    }} 
                  />
                  <span style={{fontSize:'0.85rem'}}>dias</span>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h3 className="section-title">Avançado</h3>
              <div className="setting-row" style={{flexDirection: 'column', alignItems: 'stretch'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:'0.9rem'}}>Atalhos Rápidos na Home</div>
                  <button className="btn-outline" onClick={() => setAddingShortcut(!addingShortcut)}>{addingShortcut ? 'Cancelar' : '+ Adicionar'}</button>
                </div>
                {addingShortcut && (
                  <div style={{display:'flex', gap:'8px', marginTop:'16px', animation:'slideUpFade 0.2s ease'}}>
                    <input type="text" className="modern-input" style={{margin:0, flex: 2}} placeholder="Ex: ☕ Café" value={shortcutTitle} onChange={e=>setShortcutTitle(e.target.value)} />
                    <input type="number" className="modern-input" style={{margin:0, flex: 1}} placeholder="R$ 0" value={shortcutAmount} onChange={e=>setShortcutAmount(e.target.value)} />
                    <button className="btn-submit" style={{margin:0, width:'50px', padding:'0'}} onClick={() => {
                        const amt = parseFloat(shortcutAmount.replace(',','.'));
                        if (!shortcutTitle || !amt) { showToast('Nome e valor são obrigatórios.', 'error'); return; }
                        const newQa = [...quickActions, { id: 'qa_'+Date.now(), title: shortcutTitle, amount: amt, category: 'outros_saida' }];
                        setQuickActions(newQa); localStorage.setItem('financeQuickActions', JSON.stringify(newQa));
                        setAddingShortcut(false); setShortcutTitle(''); setShortcutAmount('');
                        showToast('Atalho criado criado sucesso!', 'success');
                    }}><SvgIcon name="config" size={16} /></button>
                  </div>
                )}
              </div>
              {quickActions.map(qa =>(
                <div key={qa.id} className="setting-row" style={{padding:'8px 0'}}>
                   <div style={{fontSize:'0.85rem'}}>{qa.title} <span style={{color:'var(--color-expense)', marginLeft: 8}}>{formatCurrency(qa.amount)}</span></div>
                   <button className="btn-act del" onClick={() => {
                     const newQa = quickActions.filter(q => q.id !== qa.id);
                     setQuickActions(newQa); localStorage.setItem('financeQuickActions', JSON.stringify(newQa));
                   }}>Cancele</button>
                </div>
              ))}
              <div className="setting-row">
                <div style={{fontSize:'0.9rem'}}>Fazer Backup (JSON)</div>
                <button className="btn-outline" onClick={exportData}>Baixar</button>
              </div>
              <div className="setting-row">
                <div style={{fontSize:'0.9rem'}}>Exportar Relatório (CSV)</div>
                <button className="btn-outline" onClick={exportToCSV}>Baixar CSV</button>
              </div>
              <div className="setting-row" style={{border:0}}>
                <div style={{fontSize:'0.9rem'}}>Restaurar Backup</div>
                <label className="btn-outline"> Escolher <input type="file" style={{display:'none'}} accept=".json" onChange={importData} /></label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="tab-content content-pad" style={{paddingTop: '20px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
              <h2 className="section-title" style={{margin:0}}>Modo Viagem / Eventos</h2>
              <button className="btn-outline" style={{padding:'6px 12px', fontSize:'0.8rem'}} onClick={() => {
                const name = prompt('Nome da Viagem/Evento:');
                if(name) {
                  const newTrip = { id: `trip_${Date.now()}`, name, color: '#FFB142', budget: 0 };
                  const updated = [...trips, newTrip];
                  setTrips(updated);
                  localStorage.setItem('financeTripsV2', JSON.stringify(updated));
                  showToast('Viagem criada!', 'success');
                }
              }}><SvgIcon name="lazer" size={14}/> Criar</button>
            </div>
            {trips.length === 0 ? (
              <div style={{textAlign:'center', padding:'40px 20px', color:'var(--text-muted-dark)'}}>
                <SvgIcon name="airplane" size={48} />
                <p style={{marginTop:'12px'}}>Nenhuma viagem cadastrada.<br/>Crie uma para agrupar gastos específicos!</p>
              </div>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'16px', paddingBottom:'20px'}}>
                {trips.map(trip => {
                  const tripTxs = transactions.filter(t => t.tripId === trip.id);
                  const totalSpent = tripTxs.reduce((acc, t) => acc + (t.type === 'saida' ? t.amount : -t.amount), 0);
                  return (
                    <div key={trip.id} className="glass-card" style={{padding:'16px'}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                        <h3 style={{margin:0, display:'flex', alignItems:'center', gap:'8px'}}><SvgIcon name="airplane" size={18}/> {trip.name}</h3>
                        <span style={{fontWeight:600, color: totalSpent > 0 ? 'var(--color-expense)' : 'var(--text-main-dark)'}}>{safeFormat(totalSpent)}</span>
                      </div>
                      {tripTxs.length > 0 ? (
                        tripTxs.map(tx => <ItemTx key={tx.id} tx={tx} onDelete={(id) => {
                          const updated = transactions.filter(t => t.id !== id);
                          setTransactions(updated);
                          localStorage.setItem('financeTransactionsV2', JSON.stringify(updated));
                        }} onEdit={t => { setEditTx(t); setSheetOpen(true); }} safeFormat={safeFormat} allCats={[...expenseCategories, ...incomeCategories]} trips={trips} />)
                      ) : (
                        <div style={{fontSize:'0.8rem', color:'var(--text-muted-dark)', textAlign:'center'}}>Nenhum gasto nesta viagem ainda.</div>
                      )}
                      <button style={{marginTop:'12px', background:'rgba(255, 74, 107, 0.1)', color:'var(--color-expense)', border:'none', padding:'8px', borderRadius:'8px', width:'100%', cursor:'pointer', fontSize:'0.8rem'}} onClick={() => {
                        if(confirm(`Excluir a viagem "${trip.name}"? Os lançamentos não serão apagados, apenas desvinculados.`)) {
                           const updatedTxs = transactions.map(t => t.tripId === trip.id ? {...t, tripId: null} : t);
                           setTransactions(updatedTxs);
                           localStorage.setItem('financeTransactionsV2', JSON.stringify(updatedTxs));
                           const updatedTrips = trips.filter(t => t.id !== trip.id);
                           setTrips(updatedTrips);
                           localStorage.setItem('financeTripsV2', JSON.stringify(updatedTrips));
                        }
                      }}>Excluir Viagem</button>
                    </div>
                  );
                })}
              </div>
            )}
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
        {sheetOpen && <BottomSheet initialData={editTx} accounts={accounts} expenseCats={expenseCategories} incomeCats={incomeCategories} trips={trips} onClose={()=>setSheetOpen(false)} onSave={handleSaveTx} />}

        {/* ADD ACCOUNT MODAL */}
        {showAddAccount && (
          <div className="name-modal-overlay" onClick={() => setShowAddAccount(false)}>
            <div className="name-modal" onClick={e => e.stopPropagation()}>
              <h2>Nova Conta</h2>
              <p>Adicione uma nova carteira ou cartão</p>
              
              <input 
                type="text" 
                className="modern-input" 
                placeholder="Nome (ex: Nubank, Iti)" 
                value={newAccountName}
                onChange={e => setNewAccountName(e.target.value)}
              />
              
              <div style={{marginBottom:'16px'}}>
                <label style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', display:'block', marginBottom:'8px'}}>Tipo de conta</label>
                <div style={{display:'flex', gap:'8px'}}>
                  <button 
                    style={{
                      flex:1, padding:'10px', borderRadius:'12px', border:'none', 
                      background: newAccountType === 'default' ? 'var(--color-primary)' : 'var(--bg-surface-dark)',
                      color: newAccountType === 'default' ? 'white' : 'var(--text-muted-dark)',
                      fontWeight:600, fontSize:'0.8rem', cursor:'pointer'
                    }}
                    onClick={() => setNewAccountType('default')}
                  >Padrão</button>
                  <button 
                    style={{
                      flex:1, padding:'10px', borderRadius:'12px', border:'none', 
                      background: newAccountType === 'credit' ? '#8A05BE' : 'var(--bg-surface-dark)',
                      color: newAccountType === 'credit' ? 'white' : 'var(--text-muted-dark)',
                      fontWeight:600, fontSize:'0.8rem', cursor:'pointer'
                    }}
                    onClick={() => setNewAccountType('credit')}
                  >Cartão</button>
                  <button 
                    style={{
                      flex:1, padding:'10px', borderRadius:'12px', border:'none', 
                      background: newAccountType === 'income' ? '#FFD93D' : 'var(--bg-surface-dark)',
                      color: newAccountType === 'income' ? 'black' : 'var(--text-muted-dark)',
                      fontWeight:600, fontSize:'0.8rem', cursor:'pointer'
                    }}
                    onClick={() => setNewAccountType('income')}
                  >Receita</button>
                </div>
              </div>

              {newAccountType === 'credit' && (
                <>
                  <input 
                    type="number" 
                    className="modern-input" 
                    placeholder="Limite do cartão (opcional)" 
                    value={newAccountLimit}
                    onChange={e => setNewAccountLimit(e.target.value)}
                  />
                  <input 
                    type="number" 
                    className="modern-input" 
                    placeholder="Dia de fechamento da fatura (ex: 15)" 
                    min="1" max="31"
                    value={newAccountClosingDay}
                    onChange={e => setNewAccountClosingDay(e.target.value)}
                  />
                </>
              )}
              
              <div style={{marginBottom:'16px'}}>
                <label style={{fontSize:'0.85rem', color:'var(--text-muted-dark)', display:'block', marginBottom:'8px'}}>Cor</label>
                <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                  {['#5944FF', '#8A05BE', '#12C99B', '#FF7A59', '#FFB142', '#0097E6', '#B33771', '#FFD93D'].map(c => (
                    <div 
                      key={c}
                      onClick={() => setNewAccountColor(c)}
                      style={{
                        width:'32px', height:'32px', borderRadius:'8px', background:c, 
                        cursor:'pointer', border: newAccountColor === c ? '3px solid white' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button className="btn-submit" onClick={handleAddAccount}>Adicionar Conta</button>
              <button 
                style={{width:'100%', background:'transparent', border:'none', color:'var(--text-muted-dark)', marginTop:'12px', cursor:'pointer'}}
                onClick={() => setShowAddAccount(false)}
              >Cancelar</button>
            </div>
          </div>
        )}

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
