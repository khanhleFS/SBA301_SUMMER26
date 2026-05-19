import { Sun } from 'lucide-react'

type ThemeType = 'nocturne' | 'charcoal' | 'sepia' | 'ivory' | 'day'
type FontType = 'serif' | 'sans' | 'mono'
type LineHeightType = 'tight' | 'normal' | 'loose'

interface ReaderConfigMenuProps {
  theme: ThemeType
  setTheme: (t: ThemeType) => void
  fontSize: number
  setFontSize: (s: number) => void
  fontFamily: FontType
  setFontFamily: (f: FontType) => void
  lineHeight: LineHeightType
  setLineHeight: (l: LineHeightType) => void
  fullFrame?: boolean
  setFullFrame?: (val: any) => void
  brightness: number
  setBrightness: (b: number) => void
}

export default function ReaderConfigMenu({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  lineHeight,
  setLineHeight,
  fullFrame,
  setFullFrame,
  brightness,
  setBrightness
}: ReaderConfigMenuProps) {
  return (
    <div className="space-y-5">
      {/* 1. Theme Canvas Select */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider opacity-70">Màu nền trình đọc</label>
        <div className="flex justify-between items-center bg-surface-container rounded-full px-5 py-3 border border-outline/5 select-none gap-2">
          {(['nocturne', 'charcoal', 'sepia', 'ivory', 'day'] as ThemeType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              title={t.toUpperCase()}
              className={`h-7 w-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${theme === t ? 'border-primary scale-110 shadow' : 'border-outline/10 hover:scale-105 active:scale-95'
                }`}
              style={{
                backgroundColor:
                  t === 'nocturne' ? '#151419' :
                    t === 'charcoal' ? '#1e1e24' :
                      t === 'sepia' ? '#f4ebd4' :
                        t === 'ivory' ? '#FAF5E6' : '#ffffff'
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. Font Size Control (Gorgeous Range Slider with small/large A indicators) */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider opacity-70">
          <span>Cỡ chữ (Font Size)</span>
          <span className="text-primary text-xs font-extrabold">{fontSize}px</span>
        </div>
        <div className="flex items-center gap-3 bg-surface-container rounded-full px-5 py-3 border border-outline/5">
          <span className="text-[10px] font-bold opacity-60">A</span>
          <input
            type="range"
            min="14"
            max="32"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-1 accent-primary h-1 bg-surface-container-high rounded-full appearance-none cursor-pointer"
          />
          <span className="text-lg font-bold opacity-80">A</span>
        </div>
      </div>

      {/* 3. Font Family Selection */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider opacity-70">Kiểu chữ (Font Family)</label>
        <div className="grid grid-cols-3 gap-1 bg-surface-container rounded-xl p-1">
          {[
            { id: 'serif', label: 'Serif' },
            { id: 'sans', label: 'Sans' },
            { id: 'mono', label: 'Mono' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFontFamily(f.id as FontType)}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${fontFamily === f.id
                ? 'bg-primary text-on-primary shadow'
                : 'text-foreground hover:bg-surface-container-high'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Line Height Selection */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider opacity-70">Giãn dòng (Line Height)</label>
        <div className="grid grid-cols-3 gap-1 bg-surface-container rounded-xl p-1">
          {[
            { id: 'tight', label: 'Hẹp' },
            { id: 'normal', label: 'Thường' },
            { id: 'loose', label: 'Rộng' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setLineHeight(l.id as LineHeightType)}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${lineHeight === l.id
                ? 'bg-primary text-on-primary shadow'
                : 'text-foreground hover:bg-surface-container-high'
                }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Display Frame Options */}
      {setFullFrame && (
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider opacity-70">Khung hiển thị</label>
          <button
            onClick={() => setFullFrame((prev: boolean) => !prev)}
            className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${fullFrame
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-transparent bg-surface-container hover:bg-surface-bright text-foreground'
              }`}
          >
            {fullFrame ? 'Đang tràn khung (Bật)' : 'Cân đối (Tắt)'}
          </button>
        </div>
      )}

      {/* 6. Brightness Control */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider opacity-70">
          <span>Độ sáng màn hình</span>
          <span className="text-primary text-xs font-extrabold">{brightness}%</span>
        </div>
        <div className="flex items-center gap-3 bg-surface-container rounded-full px-5 py-3 border border-outline/5">
          <Sun className="h-4 w-4 text-on-surface-variant shrink-0" />
          <input
            type="range"
            min="40"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="flex-1 accent-primary h-1 bg-surface-container-high rounded-full appearance-none cursor-pointer"
          />
          <Sun className="h-5 w-5 text-on-surface-variant shrink-0 font-bold opacity-80" />
        </div>
      </div>
    </div>
  )
}
