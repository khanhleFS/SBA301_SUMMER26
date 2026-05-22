type PlaceholderCard = {
  title: string
  accent: string
  tint: string
}

const rowOne: PlaceholderCard[] = [
  { title: 'Img 1', accent: 'from-cyan-300 to-sky-500', tint: 'from-cyan-400/90 via-sky-500/90 to-indigo-600/90' },
  { title: 'Img 2', accent: 'from-fuchsia-300 to-pink-500', tint: 'from-fuchsia-400/90 via-pink-500/90 to-rose-600/90' },
  { title: 'Img 3', accent: 'from-violet-300 to-purple-500', tint: 'from-violet-400/90 via-purple-500/90 to-indigo-700/90' },
  { title: 'Img 4', accent: 'from-amber-200 to-orange-400', tint: 'from-amber-300/90 via-orange-400/90 to-rose-500/90' }
]

const rowTwo: PlaceholderCard[] = [
  { title: 'Img 4', accent: 'from-amber-200 to-orange-400', tint: 'from-amber-300/90 via-orange-400/90 to-rose-500/90' },
  { title: 'Img 3', accent: 'from-violet-300 to-purple-500', tint: 'from-violet-400/90 via-purple-500/90 to-indigo-700/90' },
  { title: 'Img 2', accent: 'from-fuchsia-300 to-pink-500', tint: 'from-fuchsia-400/90 via-pink-500/90 to-rose-600/90' },
  { title: 'Img 1', accent: 'from-cyan-300 to-sky-500', tint: 'from-cyan-400/90 via-sky-500/90 to-indigo-600/90' }
]

const rowThree: PlaceholderCard[] = [
  { title: 'Img 3', accent: 'from-violet-300 to-purple-500', tint: 'from-violet-400/90 via-purple-500/90 to-indigo-700/90' },
  { title: 'Img 4', accent: 'from-amber-200 to-orange-400', tint: 'from-amber-300/90 via-orange-400/90 to-rose-500/90' },
  { title: 'Img 1', accent: 'from-cyan-300 to-sky-500', tint: 'from-cyan-400/90 via-sky-500/90 to-indigo-600/90' },
  { title: 'Img 2', accent: 'from-fuchsia-300 to-pink-500', tint: 'from-fuchsia-400/90 via-pink-500/90 to-rose-600/90' }
]

function PlaceholderCardView({ card }: { card: PlaceholderCard }) {
  return (
    <div className="card relative h-[250px] w-[250px] overflow-hidden rounded-[1.25rem] border-[4px] border-white/10 bg-slate-700 shadow-[-15px_15px_25px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.05] hover:shadow-[-25px_25px_40px_rgba(0,0,0,0.6)] hover:border-white/30">
      <div className={`absolute inset-0 bg-gradient-to-br ${card.tint}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.35),transparent_22%),radial-gradient(circle_at_80%_84%,rgba(0,0,0,0.26),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.18)_48%,rgba(2,6,23,0.5)_100%)]" />
      <div className="relative flex h-full flex-col justify-between p-5 text-white">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.35em] text-white/75">
          <span>Placeholder</span>
          <span>{card.title}</span>
        </div>
        <div>
          <div className={`inline-flex rounded-full bg-gradient-to-r ${card.accent} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white shadow-md`}>
            Frame
          </div>
          <p className="mt-3 max-w-[10rem] text-sm leading-5 text-white/90">Image slot ready for later content.</p>
        </div>
      </div>
    </div>
  )
}

function ScrollingRow({ cards, reverse = false, offset = 0 }: { cards: PlaceholderCard[]; reverse?: boolean; offset?: number }) {
  const track = [...cards, ...cards]

  return (
    <div className="scroller-container w-full max-w-full overflow-hidden [transform-style:preserve-3d]" style={{ marginLeft: offset ? `${offset}px` : undefined }}>
      <div className={`scroller-track flex w-max gap-6 [transform-style:preserve-3d] ${reverse ? 'scroll-right' : 'scroll-left'}`}>
        {track.map((card, index) => (
          <PlaceholderCardView key={`${card.title}-${index}`} card={card} />
        ))}
      </div>
    </div>
  )
}

export default function AuthGalleryPlaceholder() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_center,#1e293b_0%,#0f172a_100%)] text-white [perspective:1500px]">
      <style>{`
        @keyframes scroll-left-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.75rem)); }
        }
        @keyframes scroll-right-anim {
          0% { transform: translateX(calc(-50% - 0.75rem)); }
          100% { transform: translateX(0); }
        }
        .scroll-left { animation: scroll-left-anim 35s linear infinite; }
        .scroll-right { animation: scroll-right-anim 35s linear infinite; }
        @media (max-width: 1024px) {
          .carousel-shell { transform: scale(0.8) rotateX(60deg) rotateY(0deg) rotateZ(45deg); }
        }
        @media (max-width: 768px) {
          .carousel-shell { transform: scale(0.6) rotateX(60deg) rotateY(0deg) rotateZ(45deg); }
        }
      `}</style>

      <div className="absolute bottom-0 left-[-22rem] flex origin-bottom-left translate-x-0 translate-y-40 scale-[1.05] flex-col gap-6 pb-6 pl-6 lg:left-[-34rem] lg:translate-y-64 lg:scale-[0.98] lg:pb-8 lg:pl-8">
        <div className="carousel-shell flex flex-col gap-6 [transform:rotateX(60deg)_rotateY(0deg)_rotateZ(45deg)] [transform-style:preserve-3d] transition-transform duration-500 ease-out">
          <ScrollingRow cards={rowOne} />

          <div className="scroller-container ml-[-64px] w-full max-w-full overflow-hidden [transform-style:preserve-3d]">
            <div className="scroller-track scroll-right flex w-max gap-6 [transform-style:preserve-3d]">
              {[...rowTwo, ...rowTwo].map((card, index) => (
                <PlaceholderCardView key={`${card.title}-rev-${index}`} card={card} />
              ))}
            </div>
          </div>

          <ScrollingRow cards={rowThree} />
        </div>
      </div>
    </div>
  )
}