"use client";

import { useState, useMemo } from "react";
import SidebarFilter from "@/components/SidebarFilter";
import RecipeCard from "@/components/RecipeCard";
import { mockRecipes } from "@/src/data/mockRecipes";
import { Menu, X, Flame, Sparkles, Inbox, RefreshCw } from "lucide-react";

export default function Home() {
  const [category, setCategory] = useState("All");
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [maxSpicyLevel, setMaxSpicyLevel] = useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "KR">("EN");

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      if (category !== "All" && recipe.category !== category) {
        return false;
      }
      if (selectedTastes.length > 0 && !selectedTastes.every((taste) => recipe.tasteProfile.includes(taste))) {
        return false;
      }
      if (recipe.spicyLevel > maxSpicyLevel) {
        return false;
      }
      return true;
    });
  }, [category, selectedTastes, maxSpicyLevel]);

  const handleResetFilters = () => {
    setCategory("All");
    setSelectedTastes([]);
    setMaxSpicyLevel(5);
  };

  return (
    <div className="flex min-h-screen relative bg-brand-bg text-brand-text">
      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-brand-surface border-b border-border-brand px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-brand-primary" />
          <span className="font-bold text-white tracking-wider">
            Bite<span className="text-brand-primary">Seoul</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex bg-brand-bg border border-border-brand rounded-full p-0.5 text-[10px] font-bold">
            <button
              onClick={() => setLang("EN")}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === "EN" ? "bg-brand-primary text-white" : "text-brand-text/60 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("KR")}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === "KR" ? "bg-brand-primary text-white" : "text-brand-text/60 hover:text-white"
              }`}
            >
              KR
            </button>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar Drawer Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity"
        />
      )}

      {/* Sidebar Filter Container */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform lg:transform-none transition-transform duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarFilter
          selectedCategory={category}
          onCategoryChange={(cat) => {
            setCategory(cat);
            setIsSidebarOpen(false);
          }}
          selectedTastes={selectedTastes}
          onTasteChange={setSelectedTastes}
          maxSpicyLevel={maxSpicyLevel}
          onSpicyChange={setMaxSpicyLevel}
          onClearFilters={handleResetFilters}
          lang={lang}
        />
      </div>

      {/* Main Recipe Feed Grid */}
      <main className="flex-1 lg:pl-80 pt-16 lg:pt-0 min-h-screen">
        <div className="px-6 py-8 md:px-10 md:py-12">
          {/* Feed Header */}
          <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                  {lang === "EN" ? "Curated Recipes" : "큐레이션 레시피"}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {lang === "EN" ? "Global K-Food Feed" : "글로벌 K-Food 피드"}
              </h2>
              <p className="text-xs md:text-sm text-brand-text/60 mt-1">
                {lang === "EN" 
                  ? "Authentic dishes and popular fusions tailored for global kitchens."
                  : "글로벌 주방에 맞춘 전통 한식과 인기 퓨전 레시피를 만나보세요."}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="text-xs text-brand-text/50 font-medium bg-brand-surface border border-border-brand px-3 py-1.5 rounded-full">
                {lang === "EN" ? "Found " : "검색 결과 "}
                <span className="text-white font-bold">{filteredRecipes.length}</span>
                {lang === "EN" ? " recipes" : "개"}
              </div>

              {/* Desktop Language Switch */}
              <div className="hidden sm:flex bg-brand-surface border border-border-brand rounded-full p-1 text-xs font-bold">
                <button
                  onClick={() => setLang("EN")}
                  className={`px-3 py-1 rounded-full transition-all ${
                    lang === "EN" ? "bg-brand-primary text-white" : "text-brand-text/60 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("KR")}
                  className={`px-3 py-1 rounded-full transition-all ${
                    lang === "KR" ? "bg-brand-primary text-white" : "text-brand-text/60 hover:text-white"
                  }`}
                >
                  KR
                </button>
              </div>
            </div>
          </header>

          {/* Grid Layout / Empty State */}
          {filteredRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border-brand rounded-2xl bg-brand-surface/20">
              <div className="w-14 h-14 rounded-full bg-brand-surface flex items-center justify-center border border-border-brand mb-4">
                <Inbox className="w-5 h-5 text-brand-text/40" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {lang === "EN" ? "No matches found" : "일치하는 레시피가 없습니다"}
              </h3>
              <p className="text-xs text-brand-text/50 max-w-xs text-center mb-4">
                {lang === "EN" 
                  ? "Adjust your category, taste preferences, or spicy heat levels to discover more dishes."
                  : "카테고리, 맛 선호도 또는 매운맛 단계를 조정하여 더 많은 요리를 찾아보세요."}
              </p>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-xs font-bold text-white transition-all shadow-md shadow-brand-primary/20"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? "Reset Filters" : "필터 리셋"}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
