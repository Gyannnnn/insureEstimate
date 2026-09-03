import { motion } from 'framer-motion';
import { BriefcaseBusiness, ShieldCheck, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { calculateBusinessPremium } from '../lib/calculators/businessInsurance';
import type { CoverageType, RevenueTier } from '../lib/calculators/types';

export default function BusinessCalculator({ professionRiskFactor, professionName }: { professionRiskFactor: number; professionName: string }) {
  const [revenueTier, setRevenueTier] = useState<RevenueTier>('50-150k');
  const [coverageType, setCoverageType] = useState<CoverageType>('GL+EO');
  const [employeeCount, setEmployeeCount] = useState(1);

  const estimate = useMemo(() => calculateBusinessPremium({ professionRiskFactor, revenueTier, employeeCount, coverageType }), [professionRiskFactor, revenueTier, employeeCount, coverageType]);
  const money = (n: number) => `$${n.toLocaleString('en-US')}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div>
          <label className="field-label">Annual revenue</label>
          <select className="field-control mt-2" value={revenueTier} onChange={e => setRevenueTier(e.target.value as RevenueTier)}>
            {(['0-50k','50-150k','150-500k','500k+'] as RevenueTier[]).map(v => <option key={v}>{v}</option>)}
          </select>
        </div>

        <div>
          <label className="field-label">Coverage level</label>
          <select className="field-control mt-2" value={coverageType} onChange={e => setCoverageType(e.target.value as CoverageType)}>
            <option value="GL">General liability</option>
            <option value="GL+EO">General liability + professional liability</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="field-label">Employee Count</label>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              <Users size={14} />
              {employeeCount} {employeeCount === 1 ? 'employee' : 'employees'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
            value={employeeCount}
            onChange={e => setEmployeeCount(Number(e.target.value))}
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>0 (Solo)</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100+</span>
          </div>
        </div>
      </div>

      <motion.div layout className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-2 text-ink-muted">
          <BriefcaseBusiness size={18}/>
          <span className="field-label">Estimated annual premium</span>
        </div>
        <motion.div key={`${estimate.low}-${estimate.high}`} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mt-5">
          <p className="font-data text-3xl font-semibold tracking-tight text-ink">{money(estimate.low)}–{money(estimate.high)}</p>
          <p className="mt-1 text-sm text-ink-muted">for a {professionName.toLowerCase()}</p>
        </motion.div>
        <ul className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm text-ink-muted">
          {estimate.breakdown.map(item => <li key={item.label} className="between gap-3"><span>{item.label}</span><span className="font-data text-ink">{money(item.value)}</span></li>)}
        </ul>
        <div className="mt-6 flex gap-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
          <ShieldCheck size={18} className="shrink-0"/>
          This is a planning estimate, not a binding quote.
        </div>
      </motion.div>
    </div>
  );
}

