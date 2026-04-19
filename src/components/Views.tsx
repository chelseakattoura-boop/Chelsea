import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  Droplets, 
  Zap, 
  Moon, 
  Wind, 
  Flame, 
  Activity, 
  Plus, 
  ArrowRight, 
  Camera, 
  MessageCircle, 
  Search,
  Star,
  CheckCircle2,
  ShoppingBag,
  RefreshCw,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Package,
  Leaf,
  Brain,
  BookOpen,
  Sparkles,
  Info,
  X,
  Send,
  Gift,
  User,
  Wand2,
  Sun,
  Monitor,
  Dumbbell,
  Cloud,
  Utensils,
  Coffee,
  Heart,
  History,
  Calendar,
  Truck,
  Pause,
  Play,
  Trash2,
  Edit3,
  AlertCircle,
  FlaskConical,
  Smile,
  Thermometer,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { 
  Card, 
  SkinIndicator, 
  SurrealPlantBody, 
  GlowingDroplet, 
  DistillationProcess,
  LiquidContainer,
  StepByStepTutorial,
  ChatMessage,
  RefillIndicator,
  ProductScanner,
  SkinScanCompare,
  IllustratedFace,
  IllustratedProduct,
  AICoachEntity,
  StreakPlant,
  Confetti,
  ReflectionModal,
  RosemaryGroomingIllustration,
  View
} from "./UI";

// --- Skin Analytics Components ---

// --- Skin Evolution Visual System ---

const LiquidEcosystem = ({ history }: { history: any[] }) => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ dayIndex: number, metricId: string } | null>(null);
  const [activeMetrics, setActiveMetrics] = useState<string[]>(["hydration", "redness", "irritation", "stress", "sleep", "water"]);
  const [focusedMetric, setFocusedMetric] = useState<string | null>("hydration");

  const metricsConfig = [
    { id: "hydration", label: "Hydration", color: "#4FC3F7", icon: Droplets, behavior: "fluid" },
    { id: "water", label: "Water Intake", color: "#4DB6AC", icon: ActionIcon, behavior: "clear" },
    { id: "redness", label: "Redness", color: "#FF8A65", icon: Flame, behavior: "pulsing" },
    { id: "irritation", label: "Irritation", color: "#F06292", icon: Zap, behavior: "vibrating" },
    { id: "stress", label: "Stress", color: "#FB8C00", icon: Brain, behavior: "thick" },
    { id: "sleep", label: "Sleep", color: "#BA68C8", icon: Moon, behavior: "calm" },
  ];

  const toggleMetric = (id: string) => {
    setActiveMetrics(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
    setFocusedMetric(id);
  };

  const getPoints = (id: string) => {
    const width = 340; 
    const height = 240;
    const step = width / (history.length - 1);
    
    return history.map((d, i) => {
      const val = id === "water" || id === "sleep" || id === "stress" ? (d[id] * 10) : d[id];
      const y = height - (val / 100) * height;
      return { x: i * step, y };
    });
  };

  const getPath = (points: { x: number, y: number }[]) => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const x_mid = (points[i].x + points[i + 1].x) / 2;
        const y_mid = (points[i].y + points[i + 1].y) / 2;
        d += ` Q ${points[i].x} ${points[i].y} ${x_mid} ${y_mid}`;
    }
    d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
    return d;
  };

  const insights = useMemo(() => {
    if (selectedDay !== null) {
      const day = history[selectedDay];
      const dailyInsights = [];

      // Logic for Daily Insights
      if (day.stress > 6) {
        dailyInsights.push({
          type: "Correlation",
          text: `Higher stress today correlates with your increased irritation.`,
          highlight: "stress",
          color: "#FB8C00",
          icon: Brain
        });
      } else {
        dailyInsights.push({
          type: "Trend",
          text: `Your skin feels unusually calm and balanced today.`,
          highlight: "calm",
          color: "#BA68C8",
          icon: Sparkles
        });
      }

      if (day.hydration > 70) {
        dailyInsights.push({
          type: "Behavior",
          text: `Great job! Your hydration levels are peaking at 72%.`,
          highlight: "hydration",
          color: "#4FC3F7",
          icon: Droplets
        });
      }

      return dailyInsights;
    }

    // Logic for Weekly Overview Insights
    return [
      {
        type: "Trend",
        text: "Your overall hydration improved by 15% this week.",
        highlight: "hydration",
        color: "#4FC3F7",
        icon: TrendingUp
      },
      {
        type: "Correlation",
        text: "Consistent sleep is helping your skin stay more balanced.",
        highlight: "sleep",
        color: "#BA68C8",
        icon: Moon
      },
      {
        type: "Behavior",
        text: "Higher stress mid-week increased irritation slightly.",
        highlight: "stress",
        color: "#FB8C00",
        icon: Brain
      }
    ];
  }, [selectedDay, history]);

  const todayIndex = 5; // Saturday

  const getMetricValue = (dayIndex: number, metricId: string) => {
    const val = history[dayIndex][metricId];
    const unit = metricId === "water" ? "L" : metricId === "sleep" ? "h" : "%";
    return `${val}${unit}`;
  };

  return (
    <section className="px-6 py-4 space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {selectedDay !== null ? `${history[selectedDay].day} Breakdown` : "Skin Evolution"}
          </label>
          <h2 className="text-xl font-black tracking-tight">
            {selectedDay !== null ? "Daily Botanical Focus" : "Condition & Lifestyle Flow"}
          </h2>
        </div>
        {selectedDay !== null && (
          <button 
            onClick={() => setSelectedDay(null)}
            className="text-[10px] font-bold text-myrea-blue uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity"
          >
            Reset to Weekly <X size={12} />
          </button>
        )}
      </div>

      <div className="relative">
        {/* Graph Container */}
        <div className="relative h-72 w-full bg-slate-50/50 rounded-[40px] p-6 border border-slate-100 overflow-hidden">
          <svg viewBox="0 0 340 240" className="w-full h-full overflow-visible">
            <defs>
              <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Column Divisions */}
            {history.map((_, i) => {
              const step = 340 / (history.length - 1);
              const isToday = i === todayIndex;
              const isSelected = i === selectedDay;
              
              return (
                <rect 
                  key={i}
                  x={i * step - step/2} 
                  y={0} 
                  width={step} 
                  height={240} 
                  fill={isSelected ? "rgba(110, 189, 186, 0.08)" : (i % 2 === 0 ? "rgba(15, 23, 42, 0.02)" : "transparent")} 
                  className={`transition-colors duration-500 ${isToday && !isSelected ? "fill-myrea-blue/5" : ""}`}
                />
              );
            })}

            {/* Metric Lines */}
            {metricsConfig.map((m) => {
              const isActive = activeMetrics.includes(m.id);
              if (!isActive) return null;

              const isFocused = focusedMetric === m.id;
              const opacity = selectedDay !== null ? (focusedMetric ? (isFocused ? 0.2 : 0.05) : 0.1) : (focusedMetric ? (isFocused ? 1 : 0.2) : 0.6);
              const strokeWidth = isFocused ? 5 : 3;
              const points = getPoints(m.id);

              return (
                <g key={m.id} className="transition-all duration-500">
                  <motion.path
                    d={getPath(points)}
                    fill="none"
                    stroke={m.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    opacity={opacity}
                    filter="url(#subtle-glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, opacity }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  {/* Data Point Drops */}
                  {points.map((p, pi) => {
                    const isPointSelected = selectedDay === pi;
                    const isPointHovered = hoveredPoint?.dayIndex === pi && hoveredPoint?.metricId === m.id;
                    const pointOpacity = selectedDay !== null ? (isPointSelected ? 1 : 0.15) : opacity;
                    const radius = isPointHovered ? 6 : (isPointSelected ? 5 : (isFocused ? 3 : 2));

                    return (
                      <g key={pi}>
                        <motion.circle 
                          cx={p.x}
                          cy={p.y}
                          r={radius}
                          fill={m.color}
                          stroke="white"
                          strokeWidth={isPointSelected || isPointHovered ? 2 : 1}
                          opacity={pointOpacity}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, opacity: pointOpacity, r: radius }}
                          onMouseEnter={() => setHoveredPoint({ dayIndex: pi, metricId: m.id })}
                          onMouseLeave={() => setHoveredPoint(null)}
                          className="cursor-pointer transition-all duration-200"
                        />
                        
                        {/* Interactive Value Tooltip */}
                        <AnimatePresence>
                          {isPointHovered && (
                            <motion.g
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: -12 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <rect 
                                x={p.x - 20} 
                                y={p.y - 32} 
                                width={40} 
                                height={18} 
                                rx={9} 
                                fill="#0f172a" 
                              />
                              <text 
                                x={p.x} 
                                y={p.y - 20} 
                                textAnchor="middle" 
                                className="text-[9px] font-black fill-white pointer-events-none"
                              >
                                {history[pi][m.id]}{m.id === "water" ? "L" : m.id === "sleep" ? "h" : "%"}
                              </text>
                            </motion.g>
                          )}
                        </AnimatePresence>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* Selection/Hover Vertical Indicator */}
            {(hoveredDay !== null || selectedDay !== null) && (
              <line 
                x1={((hoveredDay ?? selectedDay!) / (history.length - 1)) * 340} 
                y1={0} 
                x2={((hoveredDay ?? selectedDay!) / (history.length - 1)) * 340} 
                y2={240} 
                stroke="#0f172a" 
                strokeWidth={1} 
                strokeDasharray="4 4" 
                opacity={selectedDay !== null ? 0.3 : 1}
              />
            )}
          </svg>

          {/* Data Peek on Interaction */}
          <AnimatePresence>
            {(hoveredDay !== null || selectedDay !== null) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-3xl soft-shadow z-20 border border-slate-100 min-w-[140px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedDay !== null ? 'bg-myrea-blue' : 'bg-slate-300'}`} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {history[hoveredDay ?? selectedDay!].day} Stats
                  </p>
                </div>
                <div className="space-y-1.5">
                  {metricsConfig.filter(m => activeMetrics.includes(m.id)).map(m => (
                    <div key={m.id} className={`flex justify-between items-center text-[10px] font-bold transition-opacity ${focusedMetric === m.id ? 'opacity-100' : 'opacity-60'}`}>
                      <span className="text-slate-400 font-medium">{m.label}</span>
                      <span style={{ color: m.color }}>
                        {history[hoveredDay ?? selectedDay!][m.id]}
                        {m.id === "water" ? "L" : m.id === "sleep" ? "h" : "%"}
                      </span>
                    </div>
                  ))}
                </div>
                {selectedDay !== null && (
                  <div className="mt-4 pt-3 border-t border-slate-50 italic text-[9px] text-slate-400 leading-tight">
                    "Skin balance looks optimal today. Maintain current hydration routine."
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* X-Axis: Aligned Day Markers */}
        <div className="flex justify-between px-6 mt-6">
          {history.map((day, i) => {
            const isToday = i === todayIndex;
            const isHovered = hoveredDay === i;
            const isSelected = selectedDay === i;
            
            return (
              <button 
                key={i}
                onMouseEnter={() => setHoveredDay(i)}
                onMouseLeave={() => setHoveredDay(null)}
                onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                className={`flex flex-col items-center gap-1.5 transition-all outline-none ${isHovered || isSelected || isToday ? 'scale-110' : ''}`}
              >
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-myrea-blue text-white shadow-lg' : isHovered ? 'bg-slate-900 text-white' : isToday ? 'bg-slate-50 text-myrea-blue border border-myrea-blue/20' : 'bg-white text-slate-400 border border-slate-100'}`}>
                  <span className="text-[9px] font-black uppercase tracking-tighter">{day.day}</span>
                </div>
                {isSelected ? <div className="w-1 h-3 rounded-full bg-myrea-blue" /> : (isToday && <div className="w-1 h-1 rounded-full bg-myrea-blue" />)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simplified Filter Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {metricsConfig.map(m => (
          <button
            key={m.id}
            onClick={() => toggleMetric(m.id)}
            className={`flex items-center gap-2 px-3 py-3 rounded-2xl transition-all border ${
              activeMetrics.includes(m.id)
                ? (focusedMetric === m.id ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-100 border-slate-100 text-slate-600")
                : "bg-white border-slate-100 text-slate-400"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
            <span className="text-[8px] font-bold uppercase tracking-widest truncate">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Flow Analysis</label>
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence mode="wait">
            {insights.map((insight, i) => (
              <motion.div 
                key={`${selectedDay}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-white rounded-[28px] border border-slate-100 soft-shadow flex items-start gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${insight.color}15` }}>
                  <insight.icon size={18} style={{ color: insight.color }} />
                </div>
                <div className="space-y-1 py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">{insight.type}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">
                    {insight.text.split(insight.highlight).map((part, index, arr) => (
                      <React.Fragment key={index}>
                        {part}
                        {index !== arr.length - 1 && (
                          <span className="font-bold text-slate-900 border-b-2" style={{ borderColor: `${insight.color}40` }}>
                            {insight.highlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ActionIcon = ({ size }: { size: number }) => <Droplets size={size} />;

// --- Lifestyle Flow Components ---

const LifestyleCard = ({ 
  icon: Icon, 
  label, 
  value, 
  onClick, 
  active = false, 
  color = "bg-myrea-blue" 
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  onClick: () => void, 
  active?: boolean, 
  color?: string,
  key?: string | number
}) => (
  <Card 
    onClick={onClick}
    className={`p-4 flex flex-col items-center justify-center gap-2 transition-all aspect-square relative overflow-hidden group active:scale-95 ${active ? `${color}/10` : "bg-white"}`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? `${color} text-white` : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"}`}>
      <Icon size={18} />
    </div>
    <div className="text-center">
      <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-[10px] font-bold truncate max-w-[80px]">{value}</p>
    </div>
  </Card>
);

const LifestyleFlow = ({ lifestyle, setLifestyle }: { lifestyle: any, setLifestyle: any }) => {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const generateInsight = () => {
    let insights = [];
    if (lifestyle.stress === "high" && lifestyle.sleep === "bad") {
      insights.push("Your skin may feel more sensitive today due to high stress + low sleep. Focus on calming chamomile.");
    }
    if (lifestyle.sun === "high") {
      insights.push("Increased sun exposure detected — consider soothing aloe or rose water mist.");
    }
    if (lifestyle.hormonal === "active") {
      insights.push("Hormonal phase detected — expect potential breakouts, focus on balancing thyme.");
    }
    if (lifestyle.water < 4) {
      insights.push("Hydration levels are low. Your skin might look dull; try a hydrating olive oil balm.");
    }
    if (lifestyle.environment === "polluted" || lifestyle.environment === "dry") {
      insights.push("Environmental stressors detected. Strengthen your barrier with protective laurel berry.");
    }
    return insights[0] || "Your lifestyle is in flow. Keep up the consistency for that natural glow!";
  };

  const updateField = (field: string, value: any) => {
    setLifestyle((prev: any) => ({ ...prev, [field]: value }));
    setActiveInsight(generateInsight());
  };

  const categories = [
    { id: "water", icon: Droplets, label: "Water", value: `${lifestyle.water}/8`, active: lifestyle.water >= 8, color: "bg-myrea-blue", onClick: () => updateField("water", lifestyle.water >= 8 ? 0 : lifestyle.water + 1) },
    { id: "sleep", icon: Moon, label: "Sleep", value: lifestyle.sleep === "good" ? "Good" : "Bad", active: lifestyle.sleep === "good", color: "bg-myrea-purple", onClick: () => updateField("sleep", lifestyle.sleep === "good" ? "bad" : "good") },
    { id: "stress", icon: Brain, label: "Stress", value: lifestyle.stress === "low" ? "Low" : "High", active: lifestyle.stress === "high", color: "bg-myrea-orange", onClick: () => updateField("stress", lifestyle.stress === "low" ? "high" : "low") },
    { id: "hormonal", icon: Sparkles, label: "Cycle", value: lifestyle.hormonal === "normal" ? "Normal" : "Active", active: lifestyle.hormonal === "active", color: "bg-myrea-pink", onClick: () => updateField("hormonal", lifestyle.hormonal === "normal" ? "active" : "normal") },
    { id: "sun", icon: Sun, label: "Sun", value: lifestyle.sun === "low" ? "Low" : "High", active: lifestyle.sun === "high", color: "bg-myrea-yellow", onClick: () => updateField("sun", lifestyle.sun === "low" ? "high" : "low") },
    { id: "screen", icon: Monitor, label: "Screen", value: `${lifestyle.screen}h`, active: lifestyle.screen > 6, color: "bg-slate-900", onClick: () => updateField("screen", lifestyle.screen >= 12 ? 0 : lifestyle.screen + 2) },
    { id: "activity", icon: Dumbbell, label: "Activity", value: lifestyle.activity === "none" ? "None" : "Active", active: lifestyle.activity === "active", color: "bg-myrea-green", onClick: () => updateField("activity", lifestyle.activity === "none" ? "active" : "none") },
    { id: "environment", icon: Cloud, label: "Env", value: lifestyle.environment === "dry" ? "Dry" : "Fresh", active: lifestyle.environment === "dry", color: "bg-myrea-blue", onClick: () => updateField("environment", lifestyle.environment === "dry" ? "fresh" : "dry") },
    { id: "mood", icon: Smile, label: "Mood", value: lifestyle.mood === "happy" ? "Happy" : "Tired", active: lifestyle.mood === "happy", color: "bg-myrea-yellow", onClick: () => updateField("mood", lifestyle.mood === "happy" ? "tired" : "happy") },
    { id: "diet", icon: Utensils, label: "Diet", value: lifestyle.diet.length > 0 ? "Logged" : "Empty", active: lifestyle.diet.length > 0, color: "bg-myrea-orange", onClick: () => updateField("diet", lifestyle.diet.length > 0 ? [] : ["balanced"]) },
    { id: "consistency", icon: CheckCircle2, label: "Routine", value: lifestyle.consistency === "completed" ? "Done" : "Missed", active: lifestyle.consistency === "completed", color: "bg-myrea-green", onClick: () => updateField("consistency", lifestyle.consistency === "completed" ? "missed" : "completed") },
    { id: "breakouts", icon: AlertCircle, label: "Skin", value: lifestyle.breakouts.length > 0 ? "Active" : "Clear", active: lifestyle.breakouts.length > 0, color: "bg-myrea-pink", onClick: () => updateField("breakouts", lifestyle.breakouts.length > 0 ? [] : ["redness"]) }
  ];

  const visibleCategories = isExpanded ? categories : categories.slice(0, 6);

  return (
    <section className="px-6 space-y-4">
      <div className="flex justify-between items-center">
        <label>Lifestyle Flow</label>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] font-bold text-myrea-blue uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Smart Insight Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={generateInsight()}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="p-4 bg-slate-50 rounded-2xl relative overflow-hidden"
        >
          <div className="flex gap-3 items-start relative z-10">
            <div className="w-6 h-6 rounded-lg bg-myrea-yellow flex items-center justify-center shrink-0">
              <Wand2 size={12} className="text-slate-900" />
            </div>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              {generateInsight()}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Grid of Cards */}
      <div className="grid grid-cols-3 gap-3">
        {visibleCategories.map((cat) => (
          <LifestyleCard 
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            value={cat.value}
            active={cat.active}
            color={cat.color}
            onClick={cat.onClick}
          />
        ))}
      </div>

      {/* Daily Streak Tracker */}
      <div className="mt-6 p-4 rounded-2xl bg-white flex items-center justify-between soft-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-myrea-orange/10 rounded-xl flex items-center justify-center">
            <Flame size={20} className="text-myrea-orange" />
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Consistency</p>
            <p className="text-xs font-bold">5 Day Streak</p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5,6,7].map(d => (
            <div key={d} className={`w-2 h-2 rounded-full ${d <= 5 ? "bg-myrea-orange" : "bg-slate-100"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Home View ---

// --- Skin Scan Components ---

const SkinScanModal = ({ 
  onClose, 
  onComplete 
}: { 
  onClose: () => void, 
  onComplete: (results: any) => void 
}) => {
  const [step, setStep] = useState<"scanning" | "results">("scanning");
  const [scanProgress, setScanProgress] = useState(0);

  React.useEffect(() => {
    if (step === "scanning") {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("results"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const results = {
    hydration: 85,
    redness: 8,
    irritation: 4,
    breakouts: 2,
    improvements: ["Hydration up 15%", "Redness decreased"],
    newConcerns: ["Slight dryness around eyes"]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-slate-900 flex flex-col"
    >
      <header className="px-6 py-10 flex justify-between items-center relative z-20">
        <button onClick={onClose} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
          <X size={20} />
        </button>
        <h2 className="text-white font-bold uppercase tracking-[0.15em] text-xs">Skin Intelligence Scan</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 relative flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "scanning" ? (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative w-full max-w-xs aspect-[3/4] flex flex-col items-center justify-center"
            >
              {/* Framing Guide */}
              <div className="absolute inset-0 rounded-[60px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full mt-8" />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full" />
              </div>

              {/* Abstract Face Representation */}
              <div className="relative z-10 opacity-40">
                <IllustratedFace status="normal" className="scale-125" />
              </div>

              {/* Scanning Line */}
              <motion.div 
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-4 right-4 h-1 bg-myrea-blue shadow-[0_0_20px_#4FC3F7] z-20 rounded-full"
              />

              {/* Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      y: [Math.random() * 400, Math.random() * 400]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="absolute w-1 h-1 bg-myrea-blue rounded-full"
                    style={{ left: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>

              <div className="absolute bottom-[-60px] w-full text-center">
                <p className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Analyzing Skin Soul...</p>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    className="h-full bg-myrea-blue"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm bg-white rounded-[40px] p-8 soft-shadow"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-myrea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-myrea-green" size={32} />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Scan Complete</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">Today's Insights</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-3xl">
                    <p className="text-[8px] font-bold uppercase text-slate-400 mb-1">Hydration</p>
                    <p className="text-xl font-bold text-myrea-blue">{results.hydration}%</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-3xl">
                    <p className="text-[8px] font-bold uppercase text-slate-400 mb-1">Clarity</p>
                    <p className="text-xl font-bold text-myrea-green">92%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Highlights</h4>
                  {results.improvements.map((imp, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 bg-myrea-green rounded-full flex items-center justify-center text-white">
                        <Plus size={12} />
                      </div>
                      {imp}
                    </div>
                  ))}
                  {results.newConcerns.map((con, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 bg-myrea-orange rounded-full flex items-center justify-center text-white">
                        <AlertCircle size={12} />
                      </div>
                      {con}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onComplete(results)}
                className="w-full mt-8 py-5 bg-slate-900 text-white rounded-[24px] font-bold uppercase tracking-[0.15em] text-xs soft-shadow active:scale-95 transition-all"
              >
                Update My Routine
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SkinScanSection = ({ onOpen, lastUpdated }: { onOpen: () => void, lastUpdated: string }) => (
  <section className="px-6">
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="group cursor-pointer"
    >
      <Card className="p-6 bg-white soft-shadow hover:scale-[1.01] transition-all relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-myrea-blue rounded-2xl flex items-center justify-center group-hover:bg-myrea-blue group-hover:text-white transition-colors">
              <Camera size={28} className="group-hover:animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Scan Your Skin</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">Track today's changes</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <ArrowRight size={20} className="text-myrea-blue group-hover:translate-x-1 transition-transform" />
            <span className="text-[8px] font-bold text-slate-300 uppercase mt-2">{lastUpdated}</span>
          </div>
        </div>
        
        {/* Animated Background Glow */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-myrea-blue/10 pointer-events-none"
        />
      </Card>
    </motion.div>
  </section>
);

export const HomeView = ({ 
  lifestyle, 
  skinStatus, 
  setSkinStatus,
  setCurrentView,
  history
}: { 
  lifestyle: any, 
  skinStatus: any, 
  setSkinStatus: any,
  setCurrentView: (v: View) => void,
  history: any[]
}) => {
  const [showCoach, setShowCoach] = useState(false);
  const [showScan, setShowScan] = useState(false);

  const handleScanComplete = (results: any) => {
    setSkinStatus({
      hydration: results.hydration,
      redness: results.redness,
      irritation: results.irritation,
      breakouts: results.breakouts,
      lastUpdated: "Updated Today"
    });
    setShowScan(false);
  };

  return (
    <div className="flex flex-col gap-10 pb-32 pt-12">
      <AnimatePresence>
        {showCoach && <AICoachView onClose={() => setShowCoach(false)} />}
        {showScan && (
          <SkinScanModal 
            onClose={() => setShowScan(false)} 
            onComplete={handleScanComplete} 
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="px-6 flex justify-between items-end">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tighter"
          >
            Myrēa<span className="text-myrea-orange">.</span>
          </motion.h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">Good Morning, Chelsea</p>
        </div>
        <div className="text-right">
          <label className="block text-[8px] opacity-60">Skin Intelligence</label>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Dashboard</span>
        </div>
      </header>

      {/* Today's Reflection (Skin Status) */}
      <section className="px-6">
        <Card className="p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h3>Today's Reflection</h3>
              <label>Skin Analysis</label>
            </div>
            <div className="bg-myrea-green/10 px-3 py-1 rounded-full">
              <span className="text-[10px] font-bold text-myrea-green uppercase tracking-widest">Balanced</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <SkinIndicator label="Hydration" value={skinStatus.hydration} color="text-myrea-blue" icon={Droplets} />
            <SkinIndicator label="Redness" value={skinStatus.redness} color="text-myrea-orange" icon={Flame} />
            <SkinIndicator label="Irritation" value={skinStatus.irritation} color="text-myrea-pink" icon={Zap} />
            <SkinIndicator label="Breakouts" value={skinStatus.breakouts} color="text-myrea-purple" icon={Activity} />
          </div>

          <button 
            onClick={() => setShowScan(true)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] active:scale-[0.98] transition-all"
          >
            Start New Scan
          </button>
        </Card>
      </section>

      {/* Skin Evolution Dashboard */}
      <LiquidEcosystem history={history} />

      {/* Quick Actions */}
      <section className="px-6 grid grid-cols-2 gap-4">
        <Card 
          onClick={() => setCurrentView("library")}
          className="p-6 flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-myrea-green/10 rounded-xl flex items-center justify-center text-myrea-green group-hover:bg-myrea-green group-hover:text-white transition-colors">
            <Leaf size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Botanical Library</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Indigenous Wisdom</p>
          </div>
        </Card>

        <Card 
          onClick={() => setCurrentView("tools")}
          className="p-6 flex flex-col gap-4 group"
        >
          <div className="w-10 h-10 bg-myrea-blue/10 rounded-xl flex items-center justify-center text-myrea-blue group-hover:bg-myrea-blue group-hover:text-white transition-colors">
            <FlaskConical size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Digital Lab</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Create Formula</p>
          </div>
        </Card>
      </section>
    </div>
  );
};

// --- Routine View ---

export const RoutineView = ({ 
  skinStatus, 
  lifestyle, 
  setLifestyle 
}: { 
  skinStatus: any, 
  lifestyle: any, 
  setLifestyle: any 
}) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [streak, setStreak] = useState(7);
  const [rewardProgress, setRewardProgress] = useState(18);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [isRitualComplete, setIsRitualComplete] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const steps = [
    { 
      id: "cleanser",
      title: "Cleanser", 
      product: "Gentle Thyme Wash", 
      frequency: "Daily",
      purpose: "Removes impurities and excess oil without stripping the skin.",
      instructions: "Massage onto damp skin for 60 seconds, then rinse with lukewarm water.",
      tips: "Use the '60-second rule' to allow active ingredients to actually work.",
      color: "bg-myrea-blue",
      shape: "bottle" as const
    },
    { 
      id: "toner",
      title: "Toner", 
      product: "Rose Water Mist", 
      frequency: "Daily",
      purpose: "Balances pH levels and provides immediate hydration.",
      instructions: "Spray directly onto face or apply with a reusable cotton pad.",
      tips: "Apply while skin is still damp to lock in maximum moisture.",
      color: "bg-myrea-pink",
      shape: "bottle" as const
    },
    { 
      id: "serum",
      title: "Serum", 
      product: "Thyme Infused Serum", 
      frequency: "Daily",
      purpose: "Concentrated treatment for specific skin concerns like breakouts.",
      instructions: "Apply 2-3 drops to fingertips and gently press into the skin.",
      tips: "Wait 30 seconds for the serum to absorb before moving to moisturizer.",
      color: "bg-myrea-green",
      shape: "bottle" as const
    },
    { 
      id: "moisturizer",
      title: "Moisturizer", 
      product: "Olive Squalane Cream", 
      frequency: "Daily",
      purpose: "Seals in hydration and strengthens the skin barrier.",
      instructions: "Apply a pea-sized amount in upward circular motions.",
      tips: "Don't forget your neck! It needs hydration just as much as your face.",
      color: "bg-myrea-yellow",
      shape: "jar" as const
    },
    { 
      id: "spf",
      title: "UV Protection", 
      product: "Solar Shield SPF 50", 
      frequency: "Daily",
      purpose: "Protects against UV damage and premature aging.",
      instructions: "Apply generously as the final step of your morning routine.",
      tips: "Reapply every 2 hours if you're spending time outdoors.",
      color: "bg-myrea-orange",
      shape: "tube" as const
    }
  ];

  const toggleComplete = (id: string) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  const handleCompleteRitual = () => {
    if (completedSteps.length === steps.length) {
      setIsRitualComplete(true);
      setStreak(prev => prev + 1);
      setRewardProgress(prev => {
        const next = prev + 1;
        if (next >= 30) {
          setShowRewardModal(true);
          return 0;
        }
        return next;
      });
      
      setTimeout(() => {
        setIsRitualComplete(false);
        setShowReflection(true);
      }, 3000);
    }
  };

  const handleReflectionSelect = (feeling: string) => {
    setShowReflection(false);
    setCompletedSteps([]);
    setExpandedStep(null);
  };

  return (
    <div className="relative flex flex-col gap-10 px-6 pt-12 pb-32 min-h-full">
      {isRitualComplete && <Confetti />}
      <AnimatePresence>
        {showReflection && <ReflectionModal onSelect={handleReflectionSelect} />}
      </AnimatePresence>
      
      <header className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1>Routine</h1>
            <label>Personalized Ritual</label>
          </div>
          <div className="bg-myrea-orange/10 rounded-2xl p-2 px-3 flex items-center gap-2">
            <Flame className="text-myrea-orange" size={14} fill="currentColor" />
            <span className="text-xs font-bold">{streak} Day Streak</span>
          </div>
        </div>

        {/* Streak Plant & Reward Progress */}
        <Card className="p-6 relative overflow-hidden">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="scale-125">
                <StreakPlant streak={rewardProgress} />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h4 className="text-sm font-bold">Botanical Reward</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{30 - rewardProgress} days until next gift</p>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(rewardProgress / 30) * 100}%` }}
                  className="h-full bg-myrea-green rounded-full"
                />
              </div>
            </div>
          </div>
        </Card>
      </header>

      {/* Routine Steps */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label>Today's Ritual</label>
          <span className="text-[10px] font-bold text-slate-400">{completedSteps.length}/{steps.length} Completed</span>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isExpanded = expandedStep === step.id;

            return (
              <motion.div key={step.id} layout>
                <Card 
                  className={`p-0 overflow-hidden transition-all ${isCompleted ? "bg-slate-50/50" : "bg-white"}`}
                >
                  <div className="p-4 flex items-center gap-4">
                    <button 
                      onClick={() => toggleComplete(step.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCompleted ? "bg-myrea-green text-white" : "bg-slate-100 text-slate-300"}`}
                    >
                      <CheckCircle2 size={16} />
                    </button>
                    
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold ${isCompleted ? "text-slate-400 line-through" : "text-slate-900"}`}>{step.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{step.product}</p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                        className="px-3 py-1.5 bg-slate-50 text-slate-400 text-[8px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        {isExpanded ? "Close" : "View Step"}
                      </button>
                      {!isCompleted && (
                        <button 
                          onClick={() => toggleComplete(step.id)}
                          className="px-3 py-1.5 bg-myrea-blue/10 text-myrea-blue text-[8px] font-bold uppercase tracking-widest rounded-lg hover:bg-myrea-blue/20 transition-colors"
                        >
                          Mark as Done
                        </button>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-50/30"
                      >
                        <div className="p-6 pt-2 space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                              <label>Purpose</label>
                              <p className="text-xs font-medium leading-relaxed">{step.purpose}</p>
                            </div>
                            <div className="space-y-1">
                              <label>Frequency</label>
                              <p className="text-xs font-medium">{step.frequency}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label>Instructions</label>
                            <p className="text-xs font-medium leading-relaxed">{step.instructions}</p>
                          </div>
                          <div className="p-3 bg-white rounded-xl flex gap-3 items-start soft-shadow">
                            <Sparkles size={14} className="text-myrea-orange shrink-0 mt-0.5" />
                            <p className="text-[10px] font-medium text-slate-500 italic">Pro Tip: {step.tips}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lifestyle Logging */}
      <LifestyleFlow lifestyle={lifestyle} setLifestyle={setLifestyle} />

      {/* Botanical Ritual Illustration Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <label>Botanical Ritual</label>
            <h3 className="text-xl font-bold tracking-tight">The Rosemary Brow Lift</h3>
          </div>
          <div className="w-10 h-10 bg-myrea-green/10 rounded-full flex items-center justify-center text-myrea-green">
            <Sparkles size={18} />
          </div>
        </div>
        
        <Card className="p-0 overflow-hidden bg-white border-none soft-shadow">
          <RosemaryGroomingIllustration />
          <div className="p-6 space-y-4">
            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
              "Use a fresh rosemary sprig to gently brush your brows upward. The natural oils stimulate growth while the needle-like leaves provide precise grooming."
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-slate-50 rounded-lg text-[8px] font-bold uppercase tracking-widest text-slate-400">Natural Growth</span>
              <span className="px-3 py-1.5 bg-slate-50 rounded-lg text-[8px] font-bold uppercase tracking-widest text-slate-400">Aromatherapy</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Complete Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleCompleteRitual}
        disabled={completedSteps.length !== steps.length}
        className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all ${completedSteps.length === steps.length ? "bg-slate-900 text-white soft-shadow" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
      >
        Complete Routine
      </motion.button>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <Card className="p-8 w-full max-w-sm text-center space-y-6 relative overflow-hidden">
              <Confetti />
              <div className="w-20 h-20 bg-myrea-yellow rounded-full flex items-center justify-center mx-auto soft-shadow">
                <Gift className="text-slate-900" size={32} />
              </div>
              <div className="space-y-2">
                <h3>Botanical Gift Unlocked!</h3>
                <p>You've completed 30 days of consistent ritual. We're sending a full-sized Lebanese Thyme Serum to your door.</p>
              </div>
              <button 
                onClick={() => setShowRewardModal(false)}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]"
              >
                Claim My Reward
              </button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[40px] p-8 w-full max-w-sm relative overflow-hidden soft-shadow"
            >
              <Confetti />
              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 bg-myrea-yellow rounded-full flex items-center justify-center soft-shadow">
                  <Gift className="text-slate-900" size={32} />
                </div>
                
                <div>
                  <h2 className="text-2xl font-black tracking-tighter mb-2">30 Day Milestone!</h2>
                  <p className="text-sm font-bold text-slate-400 leading-relaxed">
                    Your consistency is incredible. You've earned a free <span className="text-myrea-orange font-black">Myrēa Custom Serum</span>!
                  </p>
                </div>

                <div className="w-full bg-slate-50 rounded-3xl p-6 flex flex-col items-center gap-4">
                  <div className="scale-75">
                    <IllustratedProduct color="bg-myrea-orange" shape="bottle" />
                  </div>
                  <label>Next Shipment Reward</label>
                </div>

                <button 
                  onClick={() => setShowRewardModal(false)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] soft-shadow active:scale-95 transition-all"
                >
                  Claim & Add to Routine
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Lebanon Map Component ---

const LebanonMap = ({ region }: { region: string }) => {
  // Simplified SVG map of Lebanon
  const regions: Record<string, { x: number, y: number }> = {
    "Mount Lebanon Terraces": { x: 50, y: 45 },
    "Northern Coastal Valleys": { x: 55, y: 25 },
    "Bekaa Valley Gardens": { x: 70, y: 50 },
    "Southern Olive Groves": { x: 40, y: 75 }
  };

  const pos = regions[region] || { x: 50, y: 50 };

  return (
    <div className="relative w-full aspect-[3/4] bg-slate-50 rounded-2xl overflow-hidden">
      <svg viewBox="0 0 100 130" className="w-full h-full fill-white stroke-slate-900/20 stroke-[0.5]">
        {/* Simplified Lebanon Outline */}
        <path d="M45,10 L60,15 L75,30 L80,50 L75,80 L65,110 L50,120 L35,115 L25,90 L20,60 L25,30 L35,15 Z" />
        {/* Mediterranean Sea */}
        <text x="10" y="70" className="text-[4px] font-bold fill-myrea-blue/30 uppercase tracking-[0.15em] -rotate-90">Mediterranean Sea</text>
        
        {/* Region Pin */}
        <motion.g
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          whileTap={{ scale: 1.5 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 15,
            delay: 0.5 
          }}
          className="cursor-pointer"
        >
          <circle cx={pos.x} cy={pos.y} r="3" className="fill-myrea-orange" />
          <motion.circle 
            cx={pos.x} 
            cy={pos.y} 
            r="6" 
            className="fill-myrea-orange/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl soft-shadow">
        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-center">{region}</p>
      </div>
    </div>
  );
};

// --- Plant Detail View (Progressive Disclosure) ---

const PlantDetailView = ({ plant, onClose }: { plant: any, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col"
    >
      {/* Header */}
      <header className="px-6 py-8 flex justify-between items-center bg-white border-b border-slate-50">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${plant.color}`} />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Botanical Library</span>
        </div>
        <button onClick={onClose} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <X size={20} />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-8 flex flex-col justify-center space-y-8"
            >
              <div className="space-y-2">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold tracking-tight leading-tight"
                >
                  {plant.name}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm font-medium text-slate-400 italic"
                >
                  {plant.benefit}
                </motion.p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <label>The Essence</label>
                <p className="text-base font-medium leading-relaxed text-slate-700">
                  {plant.description}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <div className="space-y-1">
                  <label>Origin</label>
                  <p className="text-sm font-bold">{plant.origin}</p>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="space-y-1">
                  <label>Process</label>
                  <p className="text-sm font-bold">{plant.process}</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-12"
            >
              <div className="space-y-6">
                <label>Skin Intelligence</label>
                <div className="space-y-6">
                  <div className="space-y-2">
                  <h3 className="text-xl font-bold">Active Properties</h3>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">{plant.detailedBenefits}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                      <label className="mb-2 block">How it Works</label>
                      <p className="text-xs font-medium text-slate-700 leading-relaxed italic">"{plant.howItWorks}"</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label>Targets</label>
                    <div className="flex flex-wrap gap-2">
                      {plant.targets.map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-12"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <label>Transformation Journey</label>
                  <h3 className="text-xl font-bold">From Peak to Product</h3>
                </div>

                <div className="space-y-8 relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-50" />
                  {plant.transformation.map((t: any, i: number) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] font-bold z-10 soft-shadow">
                        0{i+1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase tracking-tight">{t.title}</h4>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <label className="mb-3 block">Lebanese Heritage</label>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    "{plant.commonUses}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <footer className="px-8 py-10 bg-white border-t border-slate-50 flex justify-between items-center">
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step === i ? "w-8 bg-slate-900" : "w-2 bg-slate-100"}`} />
          ))}
        </div>
        <div className="flex gap-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center active:scale-90 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button 
            onClick={step === totalSteps ? onClose : nextStep}
            className="px-8 h-12 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 active:scale-95 transition-all soft-shadow"
          >
            {step === totalSteps ? "Finish Exploration" : "Continue"}
            {step < totalSteps && <ArrowRight size={14} />}
          </button>
        </div>
      </footer>
    </motion.div>
  );
};

// --- Library View ---

export const LibraryView = ({ skinStatus }: { skinStatus: any }) => {
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Acne", "Dryness", "Sensitivity", "Aging", "Hydrating"];

  const plants = [
    { 
      id: "thyme",
      name: "Lebanese Thyme", 
      benefit: "Antibacterial & Balancing", 
      concern: "Acne & Oiliness",
      origin: "Mount Lebanon Terraces",
      terrain: ["Mountain", "Dry", "Limestone"],
      process: "Steam Distillation",
      color: "bg-myrea-green",
      isPersonalized: skinStatus.breakouts > 15,
      description: "A powerful natural antiseptic from the high peaks of Lebanon, perfect for balancing oily skin.",
      detailedBenefits: "Rich in thymol, it acts as a powerful natural antiseptic that reduces acne-causing bacteria while balancing sebum production without stripping the skin's natural barrier.",
      commonUses: "Traditionally used in Lebanese mountain villages as a facial steam or infused in olive oil for treating skin irritations and minor cuts.",
      howItWorks: "Thymol and carvacrol in the essential oil penetrate pores to neutralize bacteria and soothe inflammation at the source.",
      targets: ["Acne", "Oiliness", "Congestion"],
      steps: [
        { title: "Region", desc: "High altitude terraces of Mount Lebanon." },
        { title: "Climate", desc: "Cool mountain air and limestone-rich soil." },
        { title: "Harvest", desc: "Hand-picked during peak flowering in early summer." }
      ],
      transformation: [
        { title: "Collection", desc: "Sun-dried for 48 hours to concentrate oils.", icon: Sun },
        { title: "Extraction", desc: "Low-pressure steam distillation.", icon: RefreshCw },
        { title: "Purification", desc: "Triple-filtered for maximum potency.", icon: CheckCircle2 }
      ],
      products: [
        { name: "Thyme Balancing Toner", type: "Toner", shape: "bottle" },
        { name: "Mountain Herb Serum", type: "Serum", shape: "bottle" }
      ]
    },
    { 
      id: "laurel",
      name: "Laurel Berry", 
      benefit: "Soothing & Cleansing", 
      concern: "Sensitivity",
      origin: "Northern Coastal Valleys",
      terrain: ["Coastal", "Humid", "Valley"],
      process: "Cold Pressing",
      color: "bg-myrea-blue",
      isPersonalized: skinStatus.redness > 15 || skinStatus.irritation > 15,
      description: "The ancient secret of the Levant, known for its incredible soothing and anti-inflammatory properties.",
      detailedBenefits: "Contains high levels of fatty acids and antioxidants that soothe inflammation, making it ideal for eczema-prone or highly sensitive skin.",
      commonUses: "The core ingredient of the world-famous Aleppo soap, used for centuries in the Levant for its gentle yet effective cleansing properties.",
      howItWorks: "Lauric acid provides deep antimicrobial protection while vitamin E strengthens the skin's natural lipid barrier.",
      targets: ["Sensitivity", "Redness", "Eczema"],
      steps: [
        { title: "Region", desc: "Humid valleys of Northern Lebanon." },
        { title: "Climate", desc: "Mediterranean maritime influence." },
        { title: "Harvest", desc: "Berries collected in late autumn." }
      ],
      transformation: [
        { title: "Boiling", desc: "Traditional slow-boil extraction.", icon: Flame },
        { title: "Separation", desc: "Oil skimmed from the surface by hand.", icon: Droplets },
        { title: "Aging", desc: "Cured for 9 months in stone chambers.", icon: Clock }
      ],
      products: [
        { name: "Laurel Berry Cleanser", type: "Cleanser", shape: "bottle" },
        { name: "Heritage Soothing Oil", type: "Face Oil", shape: "bottle" }
      ]
    },
    { 
      id: "rose",
      name: "Damask Rose", 
      benefit: "Hydrating & Toning", 
      concern: "Dryness",
      origin: "Bekaa Valley Gardens",
      terrain: ["Valley", "Sunny", "Garden"],
      process: "Hydro-Distillation",
      color: "bg-myrea-pink",
      isPersonalized: skinStatus.hydration < 75,
      description: "A delicate humectant that captures the morning dew of the Bekaa Valley to hydrate and tone.",
      detailedBenefits: "A natural humectant that draws moisture into the skin. Its astringent properties help tighten pores and refine skin texture while providing a cooling effect.",
      commonUses: "Rose water is a staple in Lebanese households, used both as a refreshing facial toner and a key ingredient in traditional desserts.",
      howItWorks: "Natural sugars and oils in the petals lock in moisture and provide a gentle toning effect without alcohol.",
      targets: ["Dryness", "Dullness", "Large Pores"],
      steps: [
        { title: "Region", desc: "Fertile plains of the Bekaa Valley." },
        { title: "Climate", desc: "Hot days and cool mountain nights." },
        { title: "Harvest", desc: "Pre-dawn picking to preserve scent." }
      ],
      transformation: [
        { title: "Sorting", desc: "Petals separated from stems manually.", icon: Leaf },
        { title: "Distillation", desc: "Copper alembic hydro-distillation.", icon: RefreshCw },
        { title: "Condensation", desc: "Slow cooling to capture rose otto.", icon: Thermometer }
      ],
      products: [
        { name: "Bekaa Rose Mist", type: "Mist", shape: "bottle" },
        { name: "Velvet Petal Cream", type: "Moisturizer", shape: "jar" }
      ]
    },
    { 
      id: "olive",
      name: "Ancient Olive", 
      benefit: "Nourishing & Protective", 
      concern: "Aging & Barrier",
      origin: "Southern Olive Groves",
      terrain: ["Coastal", "Arid", "Forest"],
      process: "Cold Pressing",
      color: "bg-myrea-yellow",
      isPersonalized: false,
      description: "The 'Liquid Gold' of Southern Lebanon, providing unmatched nourishment and environmental protection.",
      detailedBenefits: "Packed with Vitamin E and polyphenols, it provides intense hydration and creates a breathable protective layer that shields against environmental pollutants.",
      commonUses: "Often referred to as 'liquid gold' in Southern Lebanon, it is used as a full-body moisturizer and a base for almost all traditional skin remedies.",
      howItWorks: "Oleic acid and squalene mimic the skin's natural sebum, providing biocompatible nourishment and protection.",
      targets: ["Aging", "Dehydration", "Pollution"],
      steps: [
        { title: "Region", desc: "Ancient groves of Southern Lebanon." },
        { title: "Climate", desc: "Arid, sun-drenched Mediterranean hills." },
        { title: "Harvest", desc: "Traditional tree shaking in October." }
      ],
      transformation: [
        { title: "Crushing", desc: "Stone-milled within 24 hours.", icon: Activity },
        { title: "Pressing", desc: "First cold press extraction.", icon: Zap },
        { title: "Decanting", desc: "Natural sediment settling in clay jars.", icon: Package }
      ],
      products: [
        { name: "Ancient Grove Balm", type: "Cleansing Balm", shape: "jar" },
        { name: "Southern Gold Elixir", type: "Night Oil", shape: "bottle" }
      ]
    }
  ];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         plant.benefit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || 
                         plant.concern.toLowerCase().includes(activeFilter.toLowerCase()) ||
                         plant.benefit.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const sortedPlants = [...filteredPlants].sort((a, b) => (b.isPersonalized ? 1 : 0) - (a.isPersonalized ? 1 : 0));

  return (
    <div className="flex flex-col gap-8 px-6 pt-12 pb-32 min-h-full">
      <header className="flex flex-col gap-6">
        <div>
          <h1>Botanical Library</h1>
          <label>Indigenous Wisdom</label>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search plants, concerns..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-myrea-blue/20 transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter ? "bg-slate-900 text-white" : "bg-white text-slate-400"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {sortedPlants.map((plant) => (
          <motion.div key={plant.id} layout>
            <Card 
              onClick={() => setSelectedPlant(plant)}
              className="p-0 overflow-hidden group cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 ${plant.color} rounded-3xl flex items-center justify-center text-white soft-shadow relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                  <span className="text-3xl font-bold opacity-40">{plant.name.charAt(0)}</span>
                  {plant.isPersonalized && (
                    <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </div>
                <div className="flex-1 py-2 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                  <h4 className="text-lg font-bold tracking-tight">{plant.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{plant.benefit}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {sortedPlants.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-400">No plants found matching your search.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPlant && (
          <PlantDetailView 
            plant={selectedPlant} 
            onClose={() => setSelectedPlant(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Digital Lab Components ---

const LAB_STEPS = [
  "Goal",
  "Base",
  "Ingredients",
  "Balance",
  "Texture",
  "Evaluate",
  "Summary"
];

const GOALS = [
  { id: "hydration", label: "Hydration", icon: Droplets, color: "bg-myrea-blue", desc: "Deep moisture & plumpness" },
  { id: "brightening", label: "Brightening", icon: Sun, color: "bg-myrea-yellow", desc: "Even tone & natural glow" },
  { id: "acne", label: "Acne Control", icon: Zap, color: "bg-myrea-green", desc: "Clear pores & balance oil" },
  { id: "soothing", label: "Soothing", icon: Wind, color: "bg-myrea-pink", desc: "Calm redness & sensitivity" }
];

const BASES = [
  { id: "water", label: "Water", desc: "Lightweight, fast-absorbing", viscosity: 0.2, opacity: 0.3 },
  { id: "oil", label: "Oil", desc: "Nourishing, protective barrier", viscosity: 0.8, opacity: 0.6 },
  { id: "gel", label: "Gel", desc: "Cooling, refreshing texture", viscosity: 0.5, opacity: 0.4 },
  { id: "cream", label: "Cream", desc: "Rich, deeply emollient", viscosity: 1.0, opacity: 0.9 }
];

const LAB_PLANTS = [
  { id: "thyme", name: "Thyme", color: "bg-myrea-green", strength: 0.8, compatibility: ["water", "gel"], benefit: "Antiseptic" },
  { id: "rose", name: "Rose", color: "bg-myrea-pink", strength: 0.4, compatibility: ["water", "oil", "gel", "cream"], benefit: "Hydrating" },
  { id: "honey", name: "Honey", color: "bg-myrea-yellow", strength: 0.6, compatibility: ["water", "cream"], benefit: "Healing" },
  { id: "laurel", name: "Laurel", color: "bg-myrea-blue", strength: 0.7, compatibility: ["oil", "cream"], benefit: "Soothing" },
  { id: "olive", name: "Olive", color: "bg-myrea-green", strength: 0.5, compatibility: ["oil", "cream"], benefit: "Nourishing" },
  { id: "clay", name: "Clay", color: "bg-slate-400", strength: 0.9, compatibility: ["water", "gel"], benefit: "Purifying" }
];

const TEXTURES = [
  { id: "serum", label: "Serum", desc: "Concentrated active treatment" },
  { id: "cream", label: "Cream", desc: "Daily moisture & protection" },
  { id: "oil", label: "Face Oil", desc: "Deeply nourishing finish" },
  { id: "mask", label: "Mask", desc: "Intensive weekly ritual" }
];

const DigitalLab = ({ skinStatus }: { skinStatus: any }) => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [base, setBase] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<{ id: string, concentration: number }[]>([]);
  const [texture, setTexture] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [showDIY, setShowDIY] = useState(false);

  const handleNext = () => {
    if (step === 5) {
      setIsEvaluating(true);
      setTimeout(() => {
        const totalStrength = selectedIngredients.reduce((acc, curr) => {
          const plant = LAB_PLANTS.find(p => p.id === curr.id);
          return acc + (plant?.strength || 0) * (curr.concentration / 100);
        }, 0);

        let feedback = "A well-balanced formula!";
        let warnings = [];
        let score = 85;

        if (totalStrength > 1.5) {
          feedback = "This formula is very potent.";
          warnings.push("High concentration may cause sensitivity.");
          score -= 20;
        } else if (totalStrength < 0.3) {
          feedback = "This formula might be too mild.";
          warnings.push("Low active concentration may limit effectiveness.");
          score -= 10;
        }

        selectedIngredients.forEach(ing => {
          const plant = LAB_PLANTS.find(p => p.id === ing.id);
          if (base && plant && !plant.compatibility.includes(base)) {
            warnings.push(`${plant.name} is not traditionally stable in a ${base} base.`);
            score -= 15;
          }
        });

        // Recommendation Logic
        const recommendedProduct = {
          name: goal === "hydration" ? "Rose Water Dew" : goal === "brightening" ? "Solar Glow Elixir" : goal === "acne" ? "Thyme Purifying Gel" : "Laurel Soothing Balm",
          ingredients: selectedIngredients.map(i => LAB_PLANTS.find(p => p.id === i.id)?.name).join(", "),
          reason: `Matches your ${goal} goal with a ${base} base and ${selectedIngredients.length} key botanicals.`
        };

        const diyTutorial = {
          prepTime: "15 mins",
          ingredients: [
            `${base === 'water' ? 'Distilled Water' : base === 'oil' ? 'Jojoba Oil' : 'Aloe Vera Gel'} (Base)`,
            ...selectedIngredients.map(i => `${LAB_PLANTS.find(p => p.id === i.id)?.name} Extract`)
          ],
          steps: [
            "Sterilize your mixing container with boiling water.",
            `Measure out your ${base} base carefully.`,
            "Add botanical extracts drop by drop, mixing slowly.",
            "Store in a dark glass bottle to preserve potency."
          ],
          tips: "Keep refrigerated and use within 2 weeks for maximum freshness."
        };

        setEvaluation({ score, feedback, warnings, recommendedProduct, diyTutorial });
        setIsEvaluating(false);
        setStep(6);
      }, 3000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => {
      if (prev.find(i => i.id === id)) {
        return prev.filter(i => i.id !== id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, { id, concentration: 50 }];
    });
  };

  const updateConcentration = (id: string, value: number) => {
    setSelectedIngredients(prev => prev.map(i => i.id === id ? { ...i, concentration: value } : i));
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Goal
        return (
          <div className="grid grid-cols-2 gap-4">
            {GOALS.map(g => (
              <button
                key={g.id}
                onClick={() => { setGoal(g.id); handleNext(); }}
                className={`p-6 rounded-[32px] flex flex-col items-center text-center gap-3 transition-all active:scale-95 soft-shadow ${goal === g.id ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${g.color} text-slate-900`}>
                  <g.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tight">{g.label}</p>
                  <p className="text-[8px] font-bold opacity-60 mt-1">{g.desc}</p>
                </div>
              </button>
            ))}
          </div>
        );
      case 1: // Base
        return (
          <div className="grid grid-cols-1 gap-4">
            {BASES.map(b => (
              <button
                key={b.id}
                onClick={() => { setBase(b.id); handleNext(); }}
                className={`p-6 rounded-[32px] flex items-center justify-between transition-all active:scale-95 soft-shadow ${base === b.id ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
              >
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-tight">{b.label}</p>
                  <p className="text-[10px] font-bold opacity-60 mt-1">{b.desc}</p>
                </div>
                <div className={`w-10 h-10 rounded-full ${b.id === 'water' ? 'bg-myrea-blue' : b.id === 'oil' ? 'bg-myrea-orange' : b.id === 'gel' ? 'bg-myrea-green' : 'bg-slate-200'}`} />
              </button>
            ))}
          </div>
        );
      case 2: // Ingredients
        return (
          <div className="grid grid-cols-2 gap-4">
            {LAB_PLANTS.map(p => {
              const isSelected = selectedIngredients.find(i => i.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleIngredient(p.id)}
                  className={`p-4 rounded-[24px] flex flex-col items-center text-center gap-2 transition-all active:scale-95 soft-shadow ${isSelected ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${p.color}`} />
                  <div>
                    <p className="text-[10px] font-bold uppercase">{p.name}</p>
                    <p className="text-[8px] font-bold opacity-60">{p.benefit}</p>
                  </div>
                </button>
              );
            })}
            <div className="col-span-2 mt-4">
              <button 
                disabled={selectedIngredients.length === 0}
                onClick={handleNext}
                className="w-full py-4 bg-myrea-orange text-white rounded-2xl font-bold uppercase tracking-[0.15em] text-[10px] disabled:opacity-50 soft-shadow"
              >
                Continue with {selectedIngredients.length} Ingredients
              </button>
            </div>
          </div>
        );
      case 3: // Balance
        return (
          <div className="flex flex-col gap-6">
            <div className="flex justify-center py-8">
              <LiquidContainer 
                ingredients={selectedIngredients.map(i => LAB_PLANTS.find(p => p.id === i.id)?.name || "")} 
                isMixing={false} 
              />
            </div>
            <div className="space-y-6">
              {selectedIngredients.map(ing => {
                const plant = LAB_PLANTS.find(p => p.id === ing.id);
                return (
                  <div key={ing.id} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{plant?.name}</p>
                      <p className="text-xs font-bold">{ing.concentration}%</p>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={ing.concentration}
                      onChange={(e) => updateConcentration(ing.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-full appearance-none accent-slate-900"
                    />
                  </div>
                );
              })}
            </div>
            <button 
              onClick={handleNext}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-bold uppercase tracking-[0.15em] text-xs mt-4 soft-shadow"
            >
              Finalize Balance
            </button>
          </div>
        );
      case 4: // Texture
        return (
          <div className="grid grid-cols-1 gap-4">
            {TEXTURES.map(t => (
              <button
                key={t.id}
                onClick={() => { setTexture(t.id); handleNext(); }}
                className={`p-6 rounded-[32px] flex items-center justify-between transition-all active:scale-95 soft-shadow ${texture === t.id ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
              >
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-tight">{t.label}</p>
                  <p className="text-[10px] font-bold opacity-60 mt-1">{t.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <FlaskConical size={20} className={texture === t.id ? "text-slate-900" : "text-slate-400"} />
                </div>
              </button>
            ))}
          </div>
        );
      case 5: // Evaluate
        return (
          <div className="flex flex-col items-center text-center gap-8 py-12">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  rotate: 360,
                  borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-myrea-blue/10"
              />
              <Brain size={64} className="text-slate-900 animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">AI Lab Analysis</h3>
              <p className="text-sm font-bold text-slate-400 mt-2">Checking compatibility, stability, and effectiveness...</p>
            </div>
            <button 
              onClick={handleNext}
              className="w-full py-5 bg-myrea-orange text-white rounded-[24px] font-bold uppercase tracking-[0.15em] text-xs soft-shadow"
            >
              Run Analysis
            </button>
          </div>
        );
      case 6: // Summary
        if (showDIY) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={() => setShowDIY(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white soft-shadow"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-xl font-bold tracking-tight">DIY Tutorial</h3>
              </div>

              <Card className="p-6 bg-white space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Prep Time</span>
                  </div>
                  <span className="text-xs font-black">{evaluation?.diyTutorial.prepTime}</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.15em]">Ingredients Needed</h4>
                  <ul className="space-y-2">
                    {evaluation?.diyTutorial.ingredients.map((ing: string, i: number) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-myrea-blue" />
                        <span className="text-xs font-bold text-slate-600">{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.15em]">Steps</h4>
                  <div className="space-y-4">
                    {evaluation?.diyTutorial.steps.map((s: string, i: number) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-xs font-bold text-myrea-blue">0{i + 1}</span>
                        <p className="text-xs font-bold text-slate-600 leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-myrea-yellow/10 p-4 rounded-xl flex gap-3">
                  <Info size={16} className="text-myrea-yellow shrink-0" />
                  <p className="text-[10px] font-bold text-slate-600 leading-tight">{evaluation?.diyTutorial.tips}</p>
                </div>
              </Card>

              <button 
                onClick={() => setShowDIY(false)}
                className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-bold uppercase tracking-[0.15em] text-xs soft-shadow"
              >
                Back to Formula
              </button>
            </motion.div>
          );
        }

        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 pb-12"
          >
            {/* Formula Summary */}
            <Card className="p-6 bg-white soft-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-myrea-green/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">Formula Summary</h3>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">Lab ID: #MYR-{Math.floor(Math.random() * 10000)}</p>
                  </div>
                  <div className="w-12 h-12 bg-myrea-yellow rounded-xl flex flex-col items-center justify-center">
                    <p className="text-[6px] font-bold uppercase">Score</p>
                    <p className="text-lg font-bold">{evaluation?.score}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-100 rounded-md text-[8px] font-bold uppercase">{base} Base</span>
                    {selectedIngredients.map(ing => (
                      <span key={ing.id} className="px-2 py-1 bg-white rounded-md text-[8px] font-bold uppercase">
                        {LAB_PLANTS.find(p => p.id === ing.id)?.name} ({ing.concentration}%)
                      </span>
                    ))}
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-600 leading-relaxed">{evaluation?.feedback}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Product Recommendation */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.15em] ml-2">Smart Recommendation</h4>
              <Card 
                onClick={() => {}}
                className="p-5 bg-myrea-blue/5 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all soft-shadow"
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center relative overflow-hidden shrink-0">
                  <div className="scale-50">
                    <IllustratedProduct color="bg-myrea-blue" shape={texture === 'cream' ? 'jar' : 'bottle'} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[8px] font-bold text-myrea-blue uppercase tracking-[0.15em] mb-1">Equivalent Product</p>
                  <h4 className="text-sm font-bold tracking-tight">{evaluation?.recommendedProduct.name}</h4>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 leading-tight">{evaluation?.recommendedProduct.reason}</p>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </Card>
            </div>

            {/* DIY Option */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.15em] ml-2">Alternative Path</h4>
              <Card 
                onClick={() => setShowDIY(true)}
                className="p-5 bg-white flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all soft-shadow"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                  <Wand2 size={24} className="text-slate-900" />
                </div>
                <div className="flex-1">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Home Laboratory</p>
                  <h4 className="text-sm font-bold tracking-tight">Create at home</h4>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 leading-tight">Step-by-step guide for a DIY version of this formula.</p>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </Card>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setStep(0)}
                className="flex-1 py-5 bg-white text-slate-900 rounded-[24px] font-bold uppercase tracking-[0.15em] text-xs soft-shadow"
              >
                Remix
              </button>
              <button 
                onClick={() => {}}
                className="flex-1 py-5 bg-slate-900 text-white rounded-[24px] font-bold uppercase tracking-[0.15em] text-xs soft-shadow"
              >
                Save Formula
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Bar */}
      <div className="flex justify-between items-center px-2">
        {LAB_STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <div className={`w-2 h-2 rounded-full transition-all ${i <= step ? "bg-slate-900 scale-125" : "bg-slate-200"}`} />
            <span className={`text-[6px] font-bold uppercase tracking-tight ${i <= step ? "text-slate-900" : "text-slate-300"}`}>{s}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="min-h-[400px]"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">{LAB_STEPS[step]} Selection</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">Step 0{step + 1} of 07</p>
          </div>
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {step > 0 && step < 6 && (
        <button 
          onClick={() => setStep(prev => prev - 1)}
          className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-slate-900 transition-colors self-center mt-4"
        >
          ← Back to {LAB_STEPS[step - 1]}
        </button>
      )}
    </div>
  );
};

// --- Tools View (Lab) ---

export const ToolsView = ({ skinStatus }: { skinStatus: any }) => {
  const [activeTab, setActiveTab] = useState<"lab" | "scanner">("lab");
  const [scannedProduct, setScannedProduct] = useState<any>(null);

  return (
    <div className="flex flex-col gap-8 px-6 pt-12 pb-32">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">The Lab</h1>
        <div className="flex gap-4 mt-6">
          <button 
            onClick={() => setActiveTab("lab")}
            className={`text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-colors soft-shadow ${activeTab === "lab" ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
          >
            Formula Builder
          </button>
          <button 
            onClick={() => setActiveTab("scanner")}
            className={`text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full transition-colors soft-shadow ${activeTab === "scanner" ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
          >
            Product Scanner
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === "lab" ? (
          <motion.div 
            key="lab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-8"
          >
            <DigitalLab skinStatus={skinStatus} />
          </motion.div>
        ) : (
          <motion.div 
            key="scanner"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            <ProductScanner onScan={setScannedProduct} />
            
            <AnimatePresence>
              {scannedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4"
                >
                  <Card className="p-6 bg-myrea-blue/5 soft-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{scannedProduct.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analysis Complete</p>
                      </div>
                      <div className="w-12 h-12 bg-myrea-green rounded-2xl flex items-center justify-center text-white font-bold">
                        {scannedProduct.score}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {scannedProduct.ingredients.map((ing: string) => (
                        <span key={ing} className="px-3 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-[0.15em] soft-shadow">
                          {ing}
                        </span>
                      ))}
                    </div>

                    <div className="bg-white p-4 rounded-2xl soft-shadow">
                      <p className="text-xs font-medium text-slate-600 leading-relaxed">
                        This product is <span className="text-myrea-green font-bold">highly compatible</span> with your current routine. The Laurel Berry content will help with your morning hydration goals.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Shop View ---

const SHOP_CATEGORIES = [
  { id: "cleansers", label: "Cleansers", icon: Droplets },
  { id: "serums", label: "Serums", icon: Zap },
  { id: "moisturizers", label: "Moisturizers", icon: Wind },
  { id: "masks", label: "Masks", icon: Moon },
  { id: "oils", label: "Oils", icon: Flame },
  { id: "soaps", label: "Soaps", icon: ShoppingBag }
];

const SHOP_BRANDS = [
  {
    id: "khan-el-saboun",
    name: "Khan El Saboun",
    origin: "Tripoli, Lebanon",
    story: "With a heritage dating back to 1480, Khan El Saboun is the world's oldest soap-making family. They combine ancient artisanal techniques with organic Lebanese botanicals.",
    philosophy: "Organic, artisanal, and deeply rooted in Levantine history.",
    color: "bg-myrea-green",
    focus: ["Artisanal Soap", "Organic Oils", "Heritage"]
  },
  {
    id: "beesline",
    name: "Beesline",
    origin: "Beirut, Lebanon",
    story: "A leading natural cosmetic lab based on the principles of Apitherapy (bee therapy). Beesline uses honey, royal jelly, and propolis to create effective natural solutions.",
    philosophy: "Nature-based science using the healing power of bees.",
    color: "bg-myrea-yellow",
    focus: ["Apitherapy", "Natural Science", "Protection"]
  },
  {
    id: "helwe",
    name: "Helwé",
    origin: "Beirut, Lebanon",
    story: "Founded by Josiane Azar, Helwé focuses on high-performance natural skincare that respects the skin's physiology and the environment.",
    philosophy: "Minimalist, effective, and physiologically respectful skincare.",
    color: "bg-myrea-pink",
    focus: ["High Performance", "Minimalism", "Physiology"]
  },
  {
    id: "potion-kitchen",
    name: "Potion Kitchen",
    origin: "Beirut, Lebanon",
    story: "A clean beauty brand that creates plant-based 'potions' using Mediterranean ingredients to promote self-care and holistic wellness.",
    philosophy: "Clean, plant-based, and Mediterranean-inspired wellness.",
    color: "bg-myrea-blue",
    focus: ["Clean Beauty", "Plant-Based", "Wellness"]
  },
  {
    id: "senteurs-d-orient",
    name: "Senteurs d’Orient",
    origin: "Beirut, Lebanon",
    story: "A tribute to the sensory heritage of the Orient, creating exquisite handcrafted soaps and bath products infused with traditional scents.",
    philosophy: "Sensory, artisanal, and culturally rich bath rituals.",
    color: "bg-myrea-orange",
    focus: ["Sensory Rituals", "Handcrafted", "Fragrance"]
  }
];

const SHOP_PRODUCTS = [
  {
    id: "thyme-soap",
    brandId: "khan-el-saboun",
    name: "Organic Thyme Soap",
    category: "soaps",
    price: 12,
    color: "bg-myrea-green",
    ingredients: ["Organic Thyme Oil", "Olive Oil", "Coconut Oil"],
    benefits: "Naturally antibacterial, deeply cleansing, and balancing for oily skin.",
    usage: "Lather with water and massage onto face or body. Rinse thoroughly.",
    relatedPlants: ["thyme", "olive"],
    matchReason: "Matches your current need for antibacterial balancing.",
    isRecommended: true
  },
  {
    id: "honey-serum",
    brandId: "beesline",
    name: "Propolis Skin Whitening Serum",
    category: "serums",
    price: 32,
    color: "bg-myrea-yellow",
    ingredients: ["Propolis", "Royal Jelly", "Vitamin C", "Aloe Vera"],
    benefits: "Brightens skin tone, reduces dark spots, and provides antioxidant protection.",
    usage: "Apply a few drops to clean skin morning and night before moisturizing.",
    relatedPlants: ["honey"],
    matchReason: "Highly effective for the brightening goals you set in the lab.",
    isRecommended: true
  },
  {
    id: "rose-cream",
    brandId: "helwe",
    name: "Rose & Hyaluronic Cream",
    category: "moisturizers",
    price: 48,
    color: "bg-myrea-pink",
    ingredients: ["Damask Rose Water", "Hyaluronic Acid", "Jojoba Oil"],
    benefits: "Intense 24-hour hydration and skin plumping effect.",
    usage: "Massage a small amount into face and neck as the final step of your routine.",
    relatedPlants: ["rose"],
    matchReason: "Provides the deep hydration your skin analysis suggested.",
    isRecommended: true
  },
  {
    id: "laurel-oil",
    brandId: "potion-kitchen",
    name: "Laurel Berry Facial Oil",
    category: "oils",
    price: 35,
    color: "bg-myrea-blue",
    ingredients: ["Laurel Berry Oil", "Argan Oil", "Vitamin E"],
    benefits: "Soothes irritation, repairs the skin barrier, and calms redness.",
    usage: "Warm 2-3 drops in palms and press gently into skin after moisturizing.",
    relatedPlants: ["laurel"],
    matchReason: "Ideal for calming the redness detected in your last scan.",
    isRecommended: false
  }
];

const USER_SUBSCRIPTIONS = [
  {
    id: "sub-1",
    productId: "thyme-soap",
    level: 35, // 35% remaining
    nextDelivery: "12 days",
    status: "preparing",
    frequency: "Monthly"
  },
  {
    id: "sub-2",
    productId: "honey-serum",
    level: 80, // 80% remaining
    nextDelivery: "24 days",
    status: "active",
    frequency: "Every 2 Months"
  }
];

const PAST_ORDERS = [
  {
    id: "ord-101",
    date: "Mar 15, 2026",
    items: ["thyme-soap", "rose-cream"],
    total: 60,
    status: "delivered"
  },
  {
    id: "ord-98",
    date: "Feb 10, 2026",
    items: ["laurel-oil"],
    total: 35,
    status: "delivered"
  }
];

export const ShopView = ({ skinStatus }: { skinStatus: any }) => {
  const [activeTab, setActiveTab] = useState<"home" | "product" | "brand" | "subscriptions" | "history">("home");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setActiveTab("product");
  };

  const handleBrandClick = (brand: any) => {
    setSelectedBrand(brand);
    setActiveTab("brand");
  };

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const renderHome = () => (
    <div className="space-y-10 pb-32">
      {/* Search & Top Bar */}
      <header className="px-6 pt-12 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Marketplace</h1>
          <div className="relative">
            <button className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center soft-shadow active:scale-95 transition-all">
              <ShoppingBag size={20} />
            </button>
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-myrea-orange text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                {cart.length}
              </div>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search brands, products, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-white rounded-2xl pl-12 pr-4 text-sm font-medium soft-shadow focus:outline-none focus:ring-2 ring-slate-900/5 transition-all"
          />
        </div>
      </header>

      {/* Categories Dropdown System */}
      <section className="px-6 space-y-4">
        <label>Categories</label>
        <div className="space-y-2">
          {SHOP_CATEGORIES.map(cat => {
            const isExpanded = expandedCategory === cat.id;
            const categoryProducts = SHOP_PRODUCTS.filter(p => p.category === cat.id);
            
            return (
              <div key={cat.id} className="overflow-hidden">
                <button 
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full p-5 bg-white rounded-2xl flex items-center justify-between transition-all active:scale-[0.99] soft-shadow ${isExpanded ? "rounded-b-none" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                      <cat.icon size={20} className="text-slate-900" />
                    </div>
                  <span className="text-sm font-bold uppercase tracking-widest">{cat.label}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white/50 rounded-b-2xl overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        {categoryProducts.length > 0 ? (
                          categoryProducts.map(p => (
                            <div 
                              key={p.id}
                              onClick={() => handleProductClick(p)}
                              className="p-3 bg-white rounded-xl flex items-center gap-3 cursor-pointer active:scale-95 transition-all soft-shadow"
                            >
                              <div className={`w-10 h-10 rounded-lg ${p.color} flex items-center justify-center shrink-0`}>
                                <div className="scale-[0.25]">
                                  <IllustratedProduct color={p.color} />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold">{p.name}</p>
                  <span className="text-sm font-bold tracking-tight">${p.price}</span>
                              </div>
                              <ChevronRight size={14} className="text-slate-300" />
                            </div>
                          ))
                        ) : (
                          <p className="text-[10px] text-center py-4 text-slate-400 font-bold uppercase tracking-widest">No products in this category yet</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-6">
          <label>Recommended for You</label>
          <span className="text-[8px] font-bold text-myrea-orange uppercase tracking-[0.2em] flex items-center gap-1">
            <Sparkles size={10} /> Personalized Selection
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-4">
          {SHOP_PRODUCTS.filter(p => p.isRecommended).map(product => (
            <div key={product.id}>
              <Card 
                className="min-w-[280px] p-0 overflow-hidden group border-none bg-white soft-shadow"
              >
                <div className={`h-40 ${product.color} relative flex items-center justify-center overflow-hidden`}>
                  <div className="scale-75 group-hover:scale-80 transition-transform duration-500">
                    <IllustratedProduct color={product.color} />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                    <span className="text-sm font-bold tracking-tight">${product.price}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                  <h4 className="text-lg font-bold tracking-tight">{product.name}</h4>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-2">{SHOP_BRANDS.find(b => b.id === product.brandId)?.name}</p>
                    <p className="text-[10px] text-slate-600 font-medium leading-relaxed line-clamp-2">"{product.benefits}"</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {product.ingredients.slice(0, 2).map(ing => (
                      <span key={ing} className="px-2 py-1 bg-slate-50 rounded-md text-[8px] font-bold uppercase text-slate-400">{ing}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <button 
                      onClick={() => handleProductClick(product)}
                      className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all"
                    >
                      View Product
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {}}
                        className="flex-1 py-3 bg-myrea-blue/10 text-myrea-blue rounded-xl text-[8px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all"
                      >
                        Add to Routine
                      </button>
                      <button 
                        onClick={() => {}}
                        className="flex-1 py-3 bg-myrea-orange/10 text-myrea-orange rounded-xl text-[8px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="px-6 space-y-6">
        <div className="flex justify-between items-center">
          <label>Shop by Brand</label>
          <button className="text-[8px] font-bold uppercase tracking-widest text-slate-400">View All</button>
        </div>
        <div className="space-y-3">
          {SHOP_BRANDS.map(brand => (
            <button 
              key={brand.id}
              onClick={() => handleBrandClick(brand)}
              className="w-full p-5 bg-white rounded-2xl flex items-center justify-between group soft-shadow active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${brand.color} flex items-center justify-center text-white font-bold text-xl shrink-0`}>
                  {brand.name[0]}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold tracking-tight">{brand.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium line-clamp-1">"{brand.philosophy}"</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* Subscription Quick View */}
      <section className="px-6 space-y-4">
        <div className="flex justify-between items-center">
          <label>Active Subscriptions</label>
          <button 
            onClick={() => setActiveTab("subscriptions")}
            className="text-[8px] font-bold uppercase tracking-widest text-myrea-orange"
          >
            Manage All
          </button>
        </div>
        <Card 
          onClick={() => setActiveTab("subscriptions")}
          className="bg-slate-900 text-white relative overflow-hidden cursor-pointer group border-none soft-shadow p-8"
        >
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <RefreshCw size={100} className="animate-spin-slow" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-myrea-green rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Next Delivery: 12 Days</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {USER_SUBSCRIPTIONS.map(sub => {
                  const product = SHOP_PRODUCTS.find(p => p.id === sub.productId);
                  return (
                    <div key={sub.id} className={`w-10 h-10 rounded-full ${product?.color} flex items-center justify-center overflow-hidden bg-white`}>
                      <div className="scale-[0.3]">
                        <IllustratedProduct color={product?.color || "bg-slate-200"} fill={sub.level} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">2 Items Included</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Previous Purchases */}
      <section className="px-6 space-y-4">
        <div className="flex justify-between items-center">
          <label>Previous Purchases</label>
          <button 
            onClick={() => setActiveTab("history")}
            className="text-[8px] font-bold uppercase tracking-widest text-slate-400"
          >
            View History
          </button>
        </div>
        <div className="space-y-3">
          {PAST_ORDERS.slice(0, 1).map(order => (
            <div key={order.id}>
              <Card className="p-5 bg-white soft-shadow">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{order.date}</p>
                  <span className="text-[8px] font-bold uppercase px-2 py-1 bg-myrea-green/10 text-myrea-green rounded-full">Delivered</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  {order.items.map(itemId => {
                    const product = SHOP_PRODUCTS.find(p => p.id === itemId);
                    return (
                      <div key={itemId} className={`w-10 h-10 rounded-xl ${product?.color} flex items-center justify-center overflow-hidden`}>
                        <div className="scale-[0.3]">
                          <IllustratedProduct color={product?.color || "bg-slate-200"} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all">
                    Reorder
                  </button>
                  <button 
                    onClick={() => setActiveTab("history")}
                    className="flex-1 py-3 bg-slate-50 text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards Quick Access */}
      <section className="px-6">
        <button className="w-full py-5 bg-myrea-yellow/10 rounded-3xl flex items-center justify-center gap-3 font-bold uppercase tracking-[0.15em] text-[10px] soft-shadow active:scale-95 transition-all">
          <Gift size={18} className="text-myrea-yellow" /> Check Your Rewards
        </button>
      </section>
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    const brand = SHOP_BRANDS.find(b => b.id === selectedProduct.brandId);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-white flex flex-col"
      >
        <header className="px-6 py-10 flex justify-between items-center bg-white relative z-10">
          <button 
            onClick={() => setActiveTab("home")}
            className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-right">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">{brand?.name}</p>
            <h2 className="text-2xl font-bold tracking-tight">{selectedProduct.name}</h2>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-12 pb-48 overflow-y-auto no-scrollbar">
          {/* Hero Image */}
          <div className={`w-full aspect-square ${selectedProduct.color} rounded-[48px] flex items-center justify-center relative overflow-hidden soft-shadow`}>
            <div className="scale-150">
              <IllustratedProduct color={selectedProduct.color} />
            </div>
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl soft-shadow">
              <span className="text-2xl font-bold tracking-tight">${selectedProduct.price}</span>
            </div>
          </div>

          {/* Why it works for you */}
          <section className="space-y-4">
            <label>Why This Works for You</label>
            <div className="bg-myrea-orange/5 p-6 rounded-[32px] flex gap-5 items-center">
              <div className="w-12 h-12 bg-myrea-orange rounded-2xl flex items-center justify-center shrink-0 text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{selectedProduct.matchReason}"</p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="space-y-4">
            <label>Key Benefits</label>
                  <p className="text-lg text-slate-700 leading-relaxed">
              {selectedProduct.benefits}
            </p>
          </section>

          {/* Ingredients */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <label>Ingredients</label>
              <button className="text-[8px] font-bold uppercase tracking-[0.15em] text-myrea-blue">View Full List</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedProduct.ingredients.map((ing: string) => (
                <div 
                  key={ing}
                  className="px-5 py-2.5 bg-slate-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500"
                >
                  {ing}
                </div>
              ))}
            </div>
          </section>

          {/* Usage */}
          <section className="space-y-4">
            <label>How to Use</label>
            <Card className="p-8 bg-slate-50/50 border-none soft-shadow">
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 soft-shadow">
                  <RefreshCw size={20} className="text-myrea-blue" />
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">{selectedProduct.usage}</p>
              </div>
            </Card>
          </section>
        </div>

        {/* Sticky Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-xl space-y-3 z-50">
          <div className="flex gap-3">
            <button 
              onClick={() => addToCart(selectedProduct.id)}
              className="flex-1 h-16 bg-slate-900 text-white rounded-3xl font-bold uppercase tracking-[0.15em] text-[10px] soft-shadow active:scale-95 transition-all"
            >
              Add to Cart
            </button>
            <button 
              className="flex-1 h-16 bg-myrea-orange text-white rounded-3xl font-bold uppercase tracking-[0.15em] text-[10px] soft-shadow active:scale-95 transition-all"
            >
              Subscribe & Save
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold uppercase tracking-[0.15em] text-[8px] active:scale-95 transition-all">
              View Ingredients
            </button>
            <button className="flex-1 py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold uppercase tracking-[0.15em] text-[8px] active:scale-95 transition-all">
              Why This Works
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderBrandDetail = () => {
    if (!selectedBrand) return null;
    const brandProducts = SHOP_PRODUCTS.filter(p => p.brandId === selectedBrand.id);

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="min-h-screen bg-white"
      >
        <header className={`px-8 py-20 ${selectedBrand.color} relative overflow-hidden`}>
          <button 
            onClick={() => setActiveTab("home")}
            className="absolute top-10 left-8 w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform z-10 soft-shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="relative z-10 text-white space-y-2">
            <h2 className="text-5xl font-bold tracking-tight">{selectedBrand.name}</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">{selectedBrand.origin}</p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </header>

        <div className="p-8 space-y-16 pb-32">
          {/* Brand Story */}
          <section className="space-y-6">
            <label>The Heritage</label>
            <p className="text-xl text-slate-700 leading-relaxed">"{selectedBrand.story}"</p>
            <div className="flex flex-wrap gap-2 pt-4">
              {selectedBrand.focus.map((f: string) => (
                <span key={f} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[8px] font-bold uppercase tracking-widest">
                  {f}
                </span>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section className="space-y-4">
            <label>Philosophy</label>
            <div className="p-8 bg-slate-50 rounded-[32px]">
              <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{selectedBrand.philosophy}"</p>
            </div>
          </section>

          {/* Brand Products */}
          <section className="space-y-8">
            <label>Full Product List</label>
            <div className="grid grid-cols-1 gap-4">
              {brandProducts.map(product => (
                <div key={product.id}>
                  <Card 
                    onClick={() => handleProductClick(product)}
                    className="p-4 flex items-center gap-6 cursor-pointer group border-none bg-white soft-shadow"
                  >
                    <div className={`w-20 h-20 rounded-2xl ${product.color} flex items-center justify-center shrink-0 overflow-hidden`}>
                      <div className="scale-[0.4]">
                        <IllustratedProduct color={product.color} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                  <h4 className="text-lg font-bold tracking-tight">{product.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${product.price}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    );
  };

  const renderSubscriptions = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-10 pb-32"
    >
      <header className="flex items-center gap-4 pt-6">
        <button 
          onClick={() => setActiveTab("home")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform soft-shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <h2>Subscriptions</h2>
      </header>

      {/* Subscription Cards */}
      <section className="space-y-8">
        {USER_SUBSCRIPTIONS.map((sub, i) => {
          const product = SHOP_PRODUCTS.find(p => p.id === sub.productId);
          return (
            <div key={sub.id}>
              <Card className="p-8 bg-white soft-shadow space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${product?.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="scale-[0.5]">
                        <IllustratedProduct color={product?.color || "bg-slate-200"} fill={sub.level} />
                      </div>
                    </div>
                    <div>
                  <h4 className="text-lg font-bold tracking-tight">{product?.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{sub.frequency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400">Next Delivery</p>
                    <p className="text-sm font-bold text-myrea-orange">{sub.nextDelivery}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all">
                    Edit Subscription
                  </button>
                  <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all">
                      Skip Delivery
                    </button>
                    <button className="flex-1 py-4 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all">
                      Pause Subscription
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </section>

      <button className="w-full py-5 bg-slate-50 text-slate-400 rounded-3xl font-bold uppercase tracking-[0.15em] text-[10px] border-2 border-dashed border-slate-200">
        Add New Subscription
      </button>
    </motion.div>
  );

  const renderHistory = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 space-y-8 pb-32"
    >
      <header className="flex items-center gap-4 pt-6">
        <button 
          onClick={() => setActiveTab("home")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform soft-shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <h2>Previous Purchases</h2>
      </header>

      <div className="space-y-4">
        {PAST_ORDERS.map(order => (
          <div key={order.id}>
            <Card className="p-6 bg-white soft-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.15em]">Order #{order.id}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{order.date}</p>
                </div>
                <div className="px-3 py-1 bg-myrea-green/10 text-myrea-green rounded-full text-[8px] font-bold uppercase tracking-[0.15em]">
                  {order.status}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                {order.items.map(itemId => {
                  const product = SHOP_PRODUCTS.find(p => p.id === itemId);
                  return (
                    <div key={itemId} className={`w-12 h-12 rounded-xl ${product?.color} flex items-center justify-center overflow-hidden`}>
                      <div className="scale-[0.3]">
                        <IllustratedProduct color={product?.color || "bg-slate-200"} />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex gap-3 pt-6 border-t border-slate-50">
                <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all">
                  Reorder
                </button>
                <button className="flex-1 py-4 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all">
                  View Details
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {activeTab === "home" && <motion.div key="home" exit={{ opacity: 0 }}>{renderHome()}</motion.div>}
        {activeTab === "product" && <motion.div key="product" exit={{ opacity: 0 }}>{renderProductDetail()}</motion.div>}
        {activeTab === "brand" && <motion.div key="brand" exit={{ opacity: 0 }}>{renderBrandDetail()}</motion.div>}
        {activeTab === "subscriptions" && <motion.div key="subs" exit={{ opacity: 0 }}>{renderSubscriptions()}</motion.div>}
        {activeTab === "history" && <motion.div key="history" exit={{ opacity: 0 }}>{renderHistory()}</motion.div>}
      </AnimatePresence>
    </div>
  );
};

// --- AI Coach View ---

export const AICoachView = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Myrēa Skin Coach. How is your skin feeling today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages([...newMessages, { 
        text: "I see. Based on your stress levels and the dry weather in Beirut today, I recommend adding an extra layer of Rosewater Mist tonight.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <header className="px-6 py-10 flex justify-between items-center bg-myrea-blue/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative overflow-hidden soft-shadow">
            <div className="scale-75">
              <AICoachEntity />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Skin Coach</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 bg-myrea-green rounded-full animate-pulse" />
              <p className="text-[10px] font-black text-myrea-blue uppercase tracking-[0.2em]">Always Listening</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="w-12 h-12 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform soft-shadow">
          <X size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatMessage text={msg.text} isBot={msg.isBot} />
          </div>
        ))}
      </div>

      <div className="p-6 pb-12 bg-white">
        <div className="flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-slate-50 rounded-2xl px-5 py-4 text-sm font-black focus:outline-none focus:ring-4 ring-myrea-blue/20 soft-shadow"
          />
          <button 
            onClick={handleSend}
            className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-transform soft-shadow"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const ProfileView = () => {
  const sections = [
    { icon: User, label: "Personal Information", sub: "chelsea.kattoura@gmail.com" },
    { icon: Activity, label: "Skin Profile", sub: "Hydrated, Low Redness" },
    { icon: Sparkles, label: "Routine Preferences", sub: "Morning & Night Rituals" },
    { icon: Droplets, label: "Lifestyle Data", sub: "Water, Sleep, Stress" },
    { icon: Flame, label: "Progress & History", sub: "7 Day Streak Active" },
    { icon: Package, label: "Subscription & Orders", sub: "Next delivery in 12 days" },
    { icon: ShoppingBag, label: "Saved Items", sub: "3 Products, 2 DIYs" },
    { icon: Wand2, label: "Settings", sub: "Notifications & Privacy" },
  ];

  return (
    <div className="flex flex-col gap-8 px-6 pt-12 pb-32">
      <header className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 bg-myrea-yellow rounded-full flex items-center justify-center relative overflow-hidden soft-shadow">
          <div className="scale-75">
            <IllustratedFace status="normal" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chelsea Kattoura</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">Skin Explorer</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3">
        {sections.map((section, i) => (
          <div key={i}>
            <Card 
              className="p-5 flex items-center justify-between bg-white active:scale-[0.98] transition-all cursor-pointer group soft-shadow"
            >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-myrea-blue group-hover:text-white transition-colors">
                <section.icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight">{section.label}</h3>
                <p className="text-[10px] font-bold text-slate-400">{section.sub}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
          </Card>
        </div>
      ))}
      </div>

      <button className="w-full py-4 border-2 border-slate-900 rounded-2xl font-bold uppercase text-[10px] tracking-[0.15em] text-myrea-orange bg-myrea-orange/5">
        Sign Out
      </button>
    </div>
  );
};
