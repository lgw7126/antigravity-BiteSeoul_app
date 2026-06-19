"use client";

import { Flame, UtensilsCrossed, Sparkles, Sliders, CheckSquare, Square, RefreshCw } from "lucide-react";

interface SidebarFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTastes: string[];
  onTasteChange: (tastes: string[]) => void;
  maxSpicyLevel: number;
  onSpicyChange: (level: number) => void;
  onClearFilters: () => void;
  lang: "EN" | "KR";
}

export default function SidebarFilter({
  selectedCategory,
  onCategoryChange,
  selectedTastes,
  onTasteChange,
  maxSpicyLevel,
  onSpicyChange,
  onClearFilters,
  lang,
}: SidebarFilterProps) {
  const categories = ["All", "Stew", "Noodle", "Rice", "Meat", "Vegan", "Street Food"];
  const tastes = ["Spicy", "Sweet", "Umami", "Salty", "Sour"];

  // Translators
  const translateCategory = (cat: string) => {
    if (lang === "EN") return cat === "All" ? "All Categories" : cat;
    const map: Record<string, string> = {
      "All": "전체 카테고리",
      "Stew": "찌개/국",
      "Noodle": "면 요리",
      "Rice": "밥 요리",
      "Meat": "고기 요리",
      "Vegan": "비건",
      "Street Food": "길거리 음식"
    };
    return map[cat] || cat;
  };

  const translateTaste = (taste: string) => {
    if (lang === "EN") return taste;
    const map: Record<string, string> = {
      "Spicy": "매운맛",
      "Sweet": "단맛",
      "Umami": "감칠맛",
      "Salty": "짠맛",
      "Sour": "신맛"
    };
    return map[taste] || taste;
  };

  const toggleTaste = (taste: string) => {
    if (selectedTastes.includes(taste)) {
      onTasteChange(selectedTastes.filter((t) => t !== taste));
    } else {
      onTasteChange([...selectedTastes, taste]);
    }
  };

  const handleSpicySliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSpicyChange(parseInt(e.target.value, 10));
  };

  return (
    <aside className="w-80 h-screen bg-brand-surface border-r border-border-brand flex flex-col fixed left-0 top-0 overflow-y-auto z-30 transition-transform duration-300">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-border-brand flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/30">
            <Flame className="w-6 h-6 text-brand-primary animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-1">
              Bite<span className="text-brand-primary">Seoul</span>
            </h1>
            <p className="text-[10px] text-brand-text/50 uppercase tracking-widest font-semibold">
              {lang === "EN" ? "Global K-Food Curator" : "글로벌 K-Food 큐레이터"}
            </p>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] text-brand-primary font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> MVP
        </div>
      </div>

      {/* Filter Options */}
      <div className="p-6 space-y-8 flex-1">
        {/* Category Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border-brand">
            <UtensilsCrossed className="w-4 h-4 text-brand-primary" />
            <h3 className="text-xs font-semibold text-brand-text/40 uppercase tracking-wider">
              {lang === "EN" ? "Category" : "카테고리"}
            </h3>
          </div>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                    : "text-brand-text hover:bg-white/5 hover:text-white"
                }`}
              >
                {translateCategory(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Taste Profile Filters (Checkboxes) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border-brand">
            <Sliders className="w-4 h-4 text-brand-primary" />
            <h3 className="text-xs font-semibold text-brand-text/40 uppercase tracking-wider">
              {lang === "EN" ? "Taste Profile" : "맛 프로필"}
            </h3>
          </div>
          <div className="space-y-2">
            {tastes.map((taste) => {
              const isChecked = selectedTastes.includes(taste);
              return (
                <button
                  key={taste}
                  onClick={() => toggleTaste(taste)}
                  className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm text-brand-text hover:text-white hover:bg-white/5 transition-all"
                >
                  <div className="text-brand-primary">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 fill-brand-primary/10" />
                    ) : (
                      <Square className="w-4 h-4 text-brand-text/30" />
                    )}
                  </div>
                  <span className={isChecked ? "font-semibold text-white" : ""}>
                    {translateTaste(taste)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Spicy Level Slider */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border-brand">
            <Flame className="w-4 h-4 text-brand-primary" />
            <h3 className="text-xs font-semibold text-brand-text/40 uppercase tracking-wider">
              {lang === "EN" ? "Max Spicy Level" : "최대 매운맛 단계"}
            </h3>
          </div>
          <div className="px-1 space-y-3">
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={maxSpicyLevel}
              onChange={handleSpicySliderChange}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-brand-text/60">
                {lang === "EN" ? "Mild (0)" : "순한맛 (0)"}
              </span>
              <div className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-bold border border-brand-primary/20">
                {maxSpicyLevel === 0 
                  ? (lang === "EN" ? "Non-Spicy" : "안 매움") 
                  : (lang === "EN" ? `Level ${maxSpicyLevel}` : `${maxSpicyLevel}단계`)}
              </div>
              <span className="font-semibold text-brand-primary">
                {lang === "EN" ? "Hell (5)" : "핵매운맛 (5)"}
              </span>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={onClearFilters}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-brand-primary border border-white/5 hover:border-brand-primary/20 text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{lang === "EN" ? "Clear All Filters" : "필터 초기화"}</span>
        </button>
      </div>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-border-brand bg-black/20 text-center">
        <p className="text-xs text-brand-text/40">
          {lang === "EN" ? "Made with ❤️ for K-Food Lovers" : "한식을 사랑하는 분들을 위해 ❤️로 제작되었습니다"}
        </p>
      </div>
    </aside>
  );
}
