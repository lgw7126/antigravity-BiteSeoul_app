"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Flame, Heart, ExternalLink, X } from "lucide-react";
import { Recipe } from "@/src/data/mockRecipes";

interface RecipeCardProps {
  recipe: Recipe;
  lang: "EN" | "KR";
}

export default function RecipeCard({ recipe, lang }: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Translation helpers
  const translateCategory = (cat: string) => {
    if (lang === "EN") return cat;
    const map: Record<string, string> = {
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

  const handleOpenRecipe = () => {
    window.open(recipe.sourceUrl, "_blank", "noopener,noreferrer");
    setShowModal(false);
  };

  return (
    <>
      <div className="group bg-brand-surface border border-border-brand rounded-2xl overflow-hidden hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden bg-zinc-900">
          <Image
            src={recipe.thumbnail}
            alt={recipe.title}
            width={600}
            height={400}
            unoptimized
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-brand-primary transition-colors z-10"
          >
            <Heart className={`w-3.5 h-3.5 transition-all ${isLiked ? "fill-brand-primary text-brand-primary scale-110" : ""}`} />
          </button>

          <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-brand-primary/95 text-[10px] font-bold text-white uppercase tracking-wider">
            {translateCategory(recipe.category)}
          </span>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-xs font-bold text-brand-primary">
              {recipe.koreanName}
            </span>
            <div className="flex gap-1">
              {recipe.tasteProfile.map((taste) => (
                <span key={taste} className="px-1.5 py-0.5 rounded-full bg-white/10 border border-white/5 text-[9px] font-medium text-white">
                  {translateTaste(taste)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-brand-primary transition-colors leading-snug mb-3">
              {recipe.title}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-t border-border-brand">
              <div className="flex items-center gap-1.5 text-xs text-brand-text/80">
                <Clock className="w-3.5 h-3.5 text-brand-primary/80" />
                <span className="font-semibold">{recipe.prepTime}</span>
              </div>
              
              <div className="flex items-center gap-0.5 min-h-[16px]">
                {recipe.spicyLevel > 0 ? (
                  Array.from({ length: recipe.spicyLevel }).map((_, i) => (
                    <Flame key={i} className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
                  ))
                ) : (
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                    {lang === "EN" ? "Mild 😋" : "순한맛 😋"}
                  </span>
                )}
              </div>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-brand-primary border border-white/5 hover:border-brand-primary/20 flex items-center justify-center gap-1.5 text-xs font-bold text-white transition-all cursor-pointer"
            >
              <span>{lang === "EN" ? "View Recipe" : "레시피 보기"}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Outlink Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-surface border border-border-brand w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-brand-text/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-2">
                {lang === "EN" ? "Open External Recipe Site" : "원본 레시피 사이트로 이동"}
              </h4>
              <p className="text-xs text-brand-text/70 leading-relaxed mb-4">
                {lang === "EN" 
                  ? "You are now leaving BiteSeoul. Would you like to view the original recipe source?"
                  : "BiteSeoul 앱 외부 사이트로 이동합니다. 출처 레시피 페이지를 열어보시겠습니까?"}
              </p>
              <div className="p-3 bg-black/30 border border-border-brand rounded-lg break-all text-[11px] text-brand-primary font-mono select-all">
                {recipe.sourceUrl}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors border border-white/5"
              >
                {lang === "EN" ? "Cancel" : "취소"}
              </button>
              <button
                onClick={handleOpenRecipe}
                className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-xs font-bold text-white transition-colors shadow-lg shadow-brand-primary/25"
              >
                {lang === "EN" ? "Go to Recipe" : "레시피 보러가기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
