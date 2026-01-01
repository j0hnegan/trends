import { useState, useRef, useEffect } from "react";
import svgPaths from "./imports/svg-bbkk6a277";
import svgPathsLastWeek from "./imports/svg-2xoyo2mn13";
import svgPathsSleep from "./imports/svg-ixldz9axe4";
import imgImage5 from "figma:asset/5551f2ffc84c48cc9a5dff421ac5238fa2a0fa42.png";
import { Switch } from "./components/ui/switch";
import DevTools from "./components/DevTools";

// Helper functions for bulletproof number validation
const toNumberOrNull = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};

const isFiniteNum = (v: unknown): v is number => Number.isFinite(v as number);

// Formatter that never calls numeric methods on non-finite values
const fmt = (n: unknown) => (isFiniteNum(n) ? `${n}` : "");

function AnimatedCheckmark({ isVisible, onAnimationComplete }: { isVisible: boolean; onAnimationComplete: () => void }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 pointer-events-none">
      <div 
        className="transition-all duration-1000 ease-out"
        style={{
          animation: isVisible ? 'fadeUpAndOut 1s ease-out forwards' : 'none'
        }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          className="text-[#73E292]"
        >
          <path
            d="M13.5 4.5L6 12L2.5 8.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <style>{`
        @keyframes fadeUpAndOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
}

function ToggleSwitch({ checked, onCheckedChange, disabled = false }: { checked: boolean; onCheckedChange: (checked: boolean) => void; disabled?: boolean }) {
  const [displayedChecked, setDisplayedChecked] = useState(checked);
  const colorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    const newChecked = !checked;
    onCheckedChange(newChecked);

    if (colorTimeoutRef.current) {
      clearTimeout(colorTimeoutRef.current);
      colorTimeoutRef.current = null;
    }

    if (newChecked) {
      setDisplayedChecked(true);
    } else {
      colorTimeoutRef.current = setTimeout(() => {
        setDisplayedChecked(false);
      }, 250);
    }
  };

  if (checked && !displayedChecked) {
    setDisplayedChecked(true);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      className={`h-[19.444px] relative shrink-0 w-[35px] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      data-name="Toggle Switch"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 20">
        <g clipPath="url(#clip0_5_30)" id="Toggle Switch">
          <rect 
            fill={displayedChecked ? "#3DB2E0" : "#C2C2C2"} 
            height="19.2073" 
            id="canvas" 
            rx="9.60366" 
            width="35" 
            className="transition-all duration-200"
            opacity={disabled ? 0.3 : 1}
          />
          <ellipse 
            cx={checked ? "25.0309" : "9.96906"} 
            cy="9.4051" 
            fill="white" 
            id="circle" 
            rx="7.68293" 
            ry="7.68293"
            className="transition-all duration-200"
            opacity={disabled ? 0.3 : 1}
          />
        </g>
        <defs>
          <clipPath id="clip0_5_30">
            <rect fill="white" height="19.4444" width="35" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

function CompareButton({ onClick, isOpen, toggleStates, onToggleChange, bpmValue, onBpmChange, hrvValue, onHrvChange }: { 
  onClick: () => void; 
  isOpen: boolean;
  toggleStates: { lastWeek: boolean; sleep: boolean }; 
  onToggleChange: (key: keyof typeof toggleStates, checked: boolean) => void;
  bpmValue: number | null;
  onBpmChange: (value: number | null) => void;
  hrvValue: number | null;
  onHrvChange: (value: number | null) => void;
}) {
  return (
    <div className="relative">
      <button 
        onClick={onClick}
        className="bg-[#343434] hover:bg-[#484848] transition-colors duration-200 relative rounded-[8px] cursor-pointer border border-[rgba(255,255,255,0.05)]" 
        data-name="Compare Button"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex items-center justify-center px-1.5 py-1 relative size-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-5 h-5 text-[#ffffff]"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" 
              />
            </svg>
          </div>
        </div>
      </button>
      {isOpen && <DropdownMenu toggleStates={toggleStates} onToggleChange={onToggleChange} bpmValue={bpmValue} onBpmChange={onBpmChange} hrvValue={hrvValue} onHrvChange={onHrvChange} />}
    </div>
  );
}

function ListItem({ label, checked, onChange, disabled = false }: { label: string; checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }) {
  return (
    <div className="relative shrink-0 w-full" data-name="list item">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-4 py-1 relative w-full">
          <div className={`font-semibold leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[-0.25px] ${disabled ? 'text-[rgba(255,255,255,0.3)]' : 'text-[#ffffff]'}`}>
            <p className="leading-[1.43] whitespace-pre">{label}</p>
          </div>
          <ToggleSwitch checked={checked} onCheckedChange={onChange} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ text }: { text: string }) {
  return (
    <div className="py-1.5" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
      <div className="font-['Mona_Sans',_sans-serif] text-[12px] font-medium tracking-[0.5px] uppercase text-[rgba(255,255,255,0.6)]">
        {text}
      </div>
    </div>
  );
}

function SettingsRow({ label, checked, onChange, disabled = false }: { label: string; checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between py-1 relative w-full" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          <div className={`font-semibold leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[-0.25px] ${disabled ? 'text-[rgba(255,255,255,0.3)]' : 'text-[#ffffff]'}`}>
            <p className="leading-[1.43] whitespace-pre">{label}</p>
          </div>
          <ToggleSwitch checked={checked} onCheckedChange={onChange} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

function GoalRowWithInput({ label, dotColor, value, onChange, placeholder, min, max, disabled = false }: { 
  label: string; 
  dotColor: string; 
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder: string;
  min: number;
  max: number;
  disabled?: boolean;
}) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center py-1 relative w-full" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          <div className="flex items-center gap-2" style={{ marginRight: '16px' }}>
            <div 
              className="rounded-full shrink-0" 
              style={{ backgroundColor: dotColor, width: '12px', height: '12px' }}
            />
            <div className={`font-semibold leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[-0.25px] ${disabled ? 'text-[rgba(255,255,255,0.3)]' : 'text-[#ffffff]'}`}>
              <p className="leading-[1.43] whitespace-pre">{label}</p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Frame2608430 
              value={value} 
              onChange={onChange} 
              placeholder={placeholder} 
              min={min} 
              max={max}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2608430({ value, onChange, placeholder, min, max, disabled }: { 
  value: number | null; 
  onChange: (value: number | null) => void; 
  placeholder: string;
  min: number;
  max: number;
  disabled?: boolean;
}) {
  const [inputValue, setInputValue] = useState<string>(value !== null ? value.toString() : "");
  const [isFocused, setIsFocused] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== null) {
      setInputValue(value.toString());
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === "") {
      onChange(null);
      setShowCheckmark(false);
      return;
    }

    const num = parseInt(newValue, 10);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
      setShowCheckmark(true);
    } else {
      onChange(null);
      setShowCheckmark(false);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue === "") {
      onChange(null);
    } else {
      const num = parseInt(inputValue, 10);
      if (isNaN(num) || num < min || num > max) {
        setInputValue(value !== null ? value.toString() : "");
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="relative" style={{ width: '35px', flexShrink: 0 }}>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            rounded-[8px]
            text-[#ffffff] text-[14px] font-semibold tracking-[-0.25px]
            placeholder:text-[rgba(255,255,255,0.3)]
            outline-none
            transition-all duration-200
            ${isFocused ? 'ring-2 ring-[#3DB2E0] border-[#3DB2E0]' : ''}
            ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
          `}
          style={{
            width: '35px',
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '6px',
            paddingRight: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxSizing: 'border-box'
          }}
        />
        <AnimatedCheckmark 
          isVisible={showCheckmark} 
          onAnimationComplete={() => setShowCheckmark(false)} 
        />
      </div>
    </div>
  );
}

function DropdownMenu({ toggleStates, onToggleChange, bpmValue, onBpmChange, hrvValue, onHrvChange }: {
  toggleStates: { lastWeek: boolean; sleep: boolean };
  onToggleChange: (key: keyof typeof toggleStates, checked: boolean) => void;
  bpmValue: number | null;
  onBpmChange: (value: number | null) => void;
  hrvValue: number | null;
  onHrvChange: (value: number | null) => void;
}) {
  return (
    <div 
      className="absolute top-[calc(100%+8px)] left-0 bg-[#262626] rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.05)] z-50"
      onClick={(e) => e.stopPropagation()}
      style={{ paddingTop: '6px', paddingBottom: '6px' }}
    >
      <div className="flex flex-col">
        {/* Title */}
        <div className="py-2" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          <div className="font-['Mona_Sans',_sans-serif] text-[16px] font-semibold text-[#ffffff]">
            Customize
          </div>
        </div>

        {/* COMPARE Section */}
        <SectionHeader text="COMPARE" />
        <SettingsRow 
          label="Last week" 
          checked={toggleStates.lastWeek} 
          onChange={(checked) => onToggleChange('lastWeek', checked)}
          disabled={false}
        />
        <div style={{ marginTop: '4px' }}>
          <SettingsRow 
            label="HRV" 
            checked={toggleStates.sleep} 
            onChange={(checked) => onToggleChange('sleep', checked)}
            disabled={false}
          />
        </div>

        {/* GOALS Section */}
        <div style={{ marginTop: '8px' }}>
          <SectionHeader text="GOALS" />
          <div style={{ marginTop: '-4px' }}>
            <GoalRowWithInput 
              label="Max BPM" 
              dotColor="#D946EF"
              value={bpmValue}
              onChange={onBpmChange}
              placeholder=""
              min={40}
              max={99}
            />
          </div>
          {toggleStates.sleep && (
            <div style={{ marginTop: '4px' }}>
              <GoalRowWithInput 
                label="Min HRV" 
                dotColor="#8B5CF6"
                value={hrvValue}
                onChange={onHrvChange}
                placeholder=""
                min={10}
                max={99}
                disabled={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SleepFill({ activeDate }: { activeDate: string }) {
  // Create bar graph for HRV data - heights based on the reference image
  // Circle centers are at: 23, 70, 116, 163, 210, 256, 303
  // (calculated from circle x positions: inactive x + 7, or activeX + 8.5)
  const barPositions = [
    { date: '14', centerX: 23, height: 103 }, // -12px
    { date: '15', centerX: 70, height: 123 }, // -12px
    { date: '16', centerX: 116, height: 133 }, // -12px
    { date: '17', centerX: 163, height: 113 }, // -12px
    { date: '18', centerX: 210, height: 137 }, // Adjusted so top is 8px above circle (y=10, so bar top at y=2)
    { date: '19', centerX: 256, height: 118 }, // -12px
    { date: '20', centerX: 303, height: 128 }, // -12px
  ];

  const bottomY = 139; // At bottom of viewBox
  const barWidth = 32; // Bars width

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 139">
        {barPositions.map((bar) => {
          const isActive = bar.date === activeDate;
          // Position bars so they extend 24px beyond viewBox bottom (y=139) to be closer to dates
          // Keep the top position the same, but extend height downward
          const barTop = bottomY - bar.height;
          // Center the bar on the circle's center position
          const barX = bar.centerX - barWidth / 2;
          return (
            <rect
              key={bar.date}
              x={barX}
              y={barTop}
              width={barWidth}
              height={bar.height}
              fill={isActive ? "#5BA3C0" : "#3D6E8A"}
              rx="4"
              ry="4"
            />
          );
        })}
      </svg>
    </div>
  );
}

function Frame2608475() {
  return (
    <div className="absolute inset-0">
      <svg className="block size-full pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 326 139">
        <g id="Frame 2608473" opacity="0.2">
          <g id="Frame 2608411">
            <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="16" y="90" />
          </g>
          <g id="Frame 2608411_2">
            <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="63" y="118.5" />
          </g>
          <g id="Frame 2608412">
            <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="109" y="34.5" />
          </g>
          <g id="Frame 2608412_2">
            <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="156" y="108.5" />
          </g>
          <g id="Frame 2608414">
            <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="203" y="11.5" />
          </g>
          <g id="Frame 2608414_2">
            <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="249" y="54.5" />
          </g>
          <g id="Frame 2608413">
            <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="296" y="69.5" />
          </g>
          <path d="M 23 97 L 70 125.5 L 116 41.5 L 163 115.5 L 210 18.5 L 256 61.5 L 303 76.5" id="Vector 97" stroke="var(--stroke-0, #B9E3F4)" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Frame2608472({ onHover, hoveredDate }: { onHover: (date: string | null) => void; hoveredDate: string | null }) {
  const isActive = (date: string) => hoveredDate ? hoveredDate === date : date === '20';

  return (
    <div className="absolute h-[139px] left-4 top-[103px] w-[350px] z-30">
      <div className="absolute inset-0">
        <svg className="block size-full pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 350 139">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B9E3F4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#B9E3F4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <g id="Frame 2608472">
            <path 
              d="M 11 97 L 71.8061 54.2327 L 123.399 78.8868 L 171.307 59.2641 L 227.814 17 L 278.179 78.8868 L 331 64.2956 L 333 64.2956 L 333 137 A 2 2 0 0 1 331 139 L 13 139 A 2 2 0 0 1 11 137 Z" 
              fill="url(#areaGradient)" 
            />
            
            <path d="M 11 97 L 71.8061 54.2327 L 123.399 78.8868 L 171.307 59.2641 L 227.814 17 L 278.179 78.8868 L 331 64.2956" id="Vector 97" stroke="var(--stroke-0, #B9E3F4)" strokeLinecap="round" strokeWidth="3" />
            
            {/* April 14th */}
            <g id="Frame 2608411">
              <rect 
                fill="transparent" 
                height="24" 
                width="24" 
                x="2" 
                y="85.5" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover('14')}
                onMouseLeave={() => onHover(null)}
              />
              <rect 
                fill="var(--fill-0, #B9E3F4)" 
                height={isActive('14') ? "17" : "14"} 
                rx={isActive('14') ? "8.5" : "7"} 
                width={isActive('14') ? "17" : "14"} 
                x={isActive('14') ? "5.5" : "7"} 
                y={isActive('14') ? "88.5" : "90"} 
                className="cursor-pointer transition-all"
                style={{ pointerEvents: 'none' }}
              />
              {isActive('14') && (
                <rect 
                  height="17" 
                  rx="8.5" 
                  stroke="var(--stroke-0, #E5F4FB)" 
                  strokeWidth="3" 
                  width="17" 
                  x="5.5" 
                  y="88.5" 
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>
            
            {/* April 15th */}
            <g id="Frame 2608411_2">
              <rect 
                fill="transparent" 
                height="24" 
                width="24" 
                x="57" 
                y="39.2327" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover('15')}
                onMouseLeave={() => onHover(null)}
              />
              <rect 
                fill="var(--fill-0, #B9E3F4)" 
                height={isActive('15') ? "17" : "14"} 
                rx={isActive('15') ? "8.5" : "7"} 
                width={isActive('15') ? "17" : "14"} 
                x={isActive('15') ? "63.3061" : "64.8061"} 
                y={isActive('15') ? "45.7327" : "47.2327"} 
                className="cursor-pointer transition-all"
                style={{ pointerEvents: 'none' }}
              />
              {isActive('15') && (
                <rect 
                  height="17" 
                  rx="8.5" 
                  stroke="var(--stroke-0, #E5F4FB)" 
                  strokeWidth="3" 
                  width="17" 
                  x="63.3061" 
                  y="45.7327" 
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>

            {/* April 16th */}
            <g id="Frame 2608412">
              <rect 
                fill="transparent" 
                height="24" 
                width="24" 
                x="111" 
                y="66.8868" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover('16')}
                onMouseLeave={() => onHover(null)}
              />
              <rect 
                fill="var(--fill-0, #B9E3F4)" 
                height={isActive('16') ? "17" : "14"} 
                rx={isActive('16') ? "8.5" : "7"} 
                width={isActive('16') ? "17" : "14"} 
                x={isActive('16') ? "114.899" : "116.399"} 
                y={isActive('16') ? "70.3868" : "71.8868"} 
                className="cursor-pointer transition-all"
                style={{ pointerEvents: 'none' }}
              />
              {isActive('16') && (
                <rect 
                  height="17" 
                  rx="8.5" 
                  stroke="var(--stroke-0, #E5F4FB)" 
                  strokeWidth="3" 
                  width="17" 
                  x="114.899" 
                  y="70.3868" 
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>

            {/* April 17th */}
            <g id="Frame 2608412_2">
              <rect 
                fill="transparent" 
                height="24" 
                width="24" 
                x="159" 
                y="47.2641" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover('17')}
                onMouseLeave={() => onHover(null)}
              />
              <rect 
                fill="var(--fill-0, #B9E3F4)" 
                height={isActive('17') ? "17" : "14"} 
                rx={isActive('17') ? "8.5" : "7"} 
                width={isActive('17') ? "17" : "14"} 
                x={isActive('17') ? "162.807" : "164.307"} 
                y={isActive('17') ? "50.7641" : "52.2641"} 
                className="cursor-pointer transition-all"
                style={{ pointerEvents: 'none' }}
              />
              {isActive('17') && (
                <rect 
                  height="17" 
                  rx="8.5" 
                  stroke="var(--stroke-0, #E5F4FB)" 
                  strokeWidth="3" 
                  width="17" 
                  x="162.807" 
                  y="50.7641" 
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>

            {/* April 18th */}
            <g id="Frame 2608414">
              <rect 
                fill="transparent" 
                height="24" 
                width="24" 
                x="215" 
                y="5" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover('18')}
                onMouseLeave={() => onHover(null)}
              />
              <rect 
                fill="var(--fill-0, #B9E3F4)" 
                height={isActive('18') ? "17" : "14"} 
                rx={isActive('18') ? "8.5" : "7"} 
                width={isActive('18') ? "17" : "14"} 
                x={isActive('18') ? "219.314" : "220.814"} 
                y={isActive('18') ? "8.5" : "10"} 
                className="cursor-pointer transition-all"
                style={{ pointerEvents: 'none' }}
              />
              {isActive('18') && (
                <rect 
                  height="17" 
                  rx="8.5" 
                  stroke="var(--stroke-0, #E5F4FB)" 
                  strokeWidth="3" 
                  width="17" 
                  x="219.314" 
                  y="8.5" 
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>

            {/* April 19th */}
            <g id="Frame 2608414_2">
              <rect 
                fill="transparent" 
                height="24" 
                width="24" 
                x="266" 
                y="66.8868" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover('19')}
                onMouseLeave={() => onHover(null)}
              />
              <rect 
                fill="var(--fill-0, #B9E3F4)" 
                height={isActive('19') ? "17" : "14"} 
                rx={isActive('19') ? "8.5" : "7"} 
                width={isActive('19') ? "17" : "14"} 
                x={isActive('19') ? "269.679" : "271.179"} 
                y={isActive('19') ? "70.3868" : "71.8868"} 
                className="cursor-pointer transition-all"
                style={{ pointerEvents: 'none' }}
              />
              {isActive('19') && (
                <rect 
                  height="17" 
                  rx="8.5" 
                  stroke="var(--stroke-0, #E5F4FB)" 
                  strokeWidth="3" 
                  width="17" 
                  x="269.679" 
                  y="70.3868" 
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>

            {/* April 20th */}
            <g id="Frame 2608413">
              <rect 
                fill="transparent" 
                height="24" 
                width="24" 
                x="319" 
                y="52.2956" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover('20')}
                onMouseLeave={() => onHover(null)}
              />
              <rect 
                fill="var(--fill-0, #B9E3F4)" 
                height={isActive('20') ? "17" : "14"} 
                rx={isActive('20') ? "8.5" : "7"} 
                width={isActive('20') ? "17" : "14"} 
                x={isActive('20') ? "322.5" : "324"} 
                y={isActive('20') ? "55.7956" : "57.2956"} 
                className="cursor-pointer transition-all"
                style={{ pointerEvents: 'none' }}
              />
              {isActive('20') && (
                <rect 
                  height="17" 
                  rx="8.5" 
                  stroke="var(--stroke-0, #E5F4FB)" 
                  strokeWidth="3" 
                  width="17" 
                  x="322.5" 
                  y="55.7956" 
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Tab2({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`basis-0 grow min-h-px min-w-px relative rounded-[360px] shrink-0 cursor-pointer transition-all ${isSelected ? 'bg-[#343434]' : ''}`} data-name="Tab 2">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
            <p className="mb-0">APRIL</p>
            <p>14</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Tab4({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`basis-0 grow min-h-px min-w-px relative rounded-[360px] shrink-0 cursor-pointer transition-all ${isSelected ? 'bg-[#343434]' : ''}`} data-name="Tab 4">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
            <p className="mb-0">APRIL</p>
            <p>15</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Tab5({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`basis-0 grow min-h-px min-w-px relative rounded-[360px] shrink-0 cursor-pointer transition-all ${isSelected ? 'bg-[#343434]' : ''}`} data-name="Tab 5">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
            <p className="mb-0">APRIL</p>
            <p>16</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Tab6({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`basis-0 grow min-h-px min-w-px relative rounded-[360px] shrink-0 cursor-pointer transition-all ${isSelected ? 'bg-[#343434]' : ''}`} data-name="Tab 6">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
            <p className="mb-0">APRIL</p>
            <p>17</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Tab7({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`basis-0 grow min-h-px min-w-px relative rounded-[360px] shrink-0 cursor-pointer transition-all ${isSelected ? 'bg-[#343434]' : ''}`} data-name="Tab 7">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
            <p className="mb-0">APRIL</p>
            <p>18</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Tab8({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`basis-0 grow min-h-px min-w-px relative rounded-[360px] shrink-0 cursor-pointer transition-all ${isSelected ? 'bg-[#343434]' : ''}`} data-name="Tab 8">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
            <p className="mb-0">APRIL</p>
            <p>19</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Tab9({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`basis-0 grow min-h-px min-w-px relative rounded-[360px] shrink-0 cursor-pointer transition-all ${isSelected ? 'bg-[#343434]' : ''}`} data-name="Tab 9">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
            <p className="mb-0">APRIL</p>
            <p>20</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Frame2608462({ selectedTab, onTabClick }: { selectedTab: string; onTabClick: (tab: string) => void }) {
  return (
    <div className="absolute bg-[#1f1f21] box-border h-[44px] left-4 rounded-[12px] top-[256px] w-[358px]" data-name="Frame 2608462">
      <div className="box-border content-stretch flex flex-row gap-1 items-stretch justify-start p-1 relative w-full">
        <Tab2 isSelected={selectedTab === '14'} onClick={() => onTabClick('14')} />
        <Tab4 isSelected={selectedTab === '15'} onClick={() => onTabClick('15')} />
        <Tab5 isSelected={selectedTab === '16'} onClick={() => onTabClick('16')} />
        <Tab6 isSelected={selectedTab === '17'} onClick={() => onTabClick('17')} />
        <Tab7 isSelected={selectedTab === '18'} onClick={() => onTabClick('18')} />
        <Tab8 isSelected={selectedTab === '19'} onClick={() => onTabClick('19')} />
        <Tab9 isSelected={selectedTab === '20'} onClick={() => onTabClick('20')} />
      </div>
    </div>
  );
}

export default function App() {
  const [selectedTab, setSelectedTab] = useState<string>('20');
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [displayedDate, setDisplayedDate] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    lastWeek: false,
    sleep: false
  });
  const [goalStates, setGoalStates] = useState({
    maxBpm: false,
    minHrv: false
  });
  const [bpmValue, setBpmValue] = useState<number | null>(null);
  const [hrvValue, setHrvValue] = useState<number | null>(null);
  const [lastValidBpm, setLastValidBpm] = useState<number | null>(null);
  const [lastValidHrv, setLastValidHrv] = useState<number | null>(null);
  const [goalLineAnimatingOut, setGoalLineAnimatingOut] = useState(false);
  const [hrvGoalLineAnimatingOut, setHrvGoalLineAnimatingOut] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const displayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const heartRateData = {
    '20': { bpm: 60, color: '#ffffff' },
    '19': { bpm: 57, color: '#ffffff' },
    '18': { bpm: 76, color: '#ffffff' },
    '17': { bpm: 64, color: '#ffffff' },
    '16': { bpm: 59, color: '#ffffff' },
    '15': { bpm: 68, color: '#ffffff' },
    '14': { bpm: 54, color: '#ffffff' }
  };


  const currentData = (displayedDate && heartRateData[displayedDate as keyof typeof heartRateData]) 
    ? heartRateData[displayedDate as keyof typeof heartRateData] 
    : heartRateData['20'];

  const handleHover = (date: string | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (displayTimeoutRef.current) {
      clearTimeout(displayTimeoutRef.current);
      displayTimeoutRef.current = null;
    }

    if (date) {
      setHoveredDate(date);
      displayTimeoutRef.current = setTimeout(() => {
        setDisplayedDate(date);
      }, 150);
    } else {
      // Immediately snap back to April 20th when unhovering
      setHoveredDate(null);
      displayTimeoutRef.current = setTimeout(() => {
        setDisplayedDate(null);
      }, 300);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBpmChange = (newValue: number | null) => {
    setBpmValue(newValue);
    
    if (newValue === null) {
      if (lastValidBpm !== null) {
        setGoalLineAnimatingOut(true);
        setTimeout(() => {
          setLastValidBpm(null);
          setGoalLineAnimatingOut(false);
        }, 500);
      }
      return;
    }
    
    setLastValidBpm(newValue);
    setGoalLineAnimatingOut(false);
  };

  const handleHrvChange = (newValue: number | null) => {
    setHrvValue(newValue);
    
    if (newValue === null) {
      if (lastValidHrv !== null) {
        setHrvGoalLineAnimatingOut(true);
        setTimeout(() => {
          setLastValidHrv(null);
          setHrvGoalLineAnimatingOut(false);
        }, 500);
      }
      return;
    }
    
    setLastValidHrv(newValue);
    setHrvGoalLineAnimatingOut(false);
  };

  const handleToggleChange = (key: keyof typeof toggleStates, checked: boolean) => {
    if (key === 'lastWeek') {
      setToggleStates(prev => ({ ...prev, lastWeek: checked }));
    } else if (key === 'sleep') {
      setToggleStates(prev => ({ ...prev, sleep: checked }));
      // If HRV is turned off, clear the HRV value
      if (!checked && hrvValue !== null) {
        setHrvValue(null);
      }
    }
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const bpmToY = (bpm: number) => {
    const topPadding = 17;
    const bottomPadding = 97;
    const usableHeight = bottomPadding - topPadding;
    const bpmRange = 76 - 54;
    const normalized = (bpm - 54) / bpmRange;
    return bottomPadding - (normalized * usableHeight);
  };

  const hrvToY = (hrv: number) => {
    // Assuming HRV uses similar scale, adjust as needed
    const topPadding = 17;
    const bottomPadding = 97;
    const usableHeight = bottomPadding - topPadding;
    const hrvRange = 76 - 54; // Adjust range based on actual HRV data
    const normalized = (hrv - 54) / hrvRange;
    return bottomPadding - (normalized * usableHeight);
  };

  const goalLineY = lastValidBpm !== null ? bpmToY(lastValidBpm) : null;
  const hrvGoalLineY = lastValidHrv !== null ? hrvToY(lastValidHrv) : null;

  return (
    <div className="bg-[#171719] fixed inset-0 flex items-center justify-center" onClick={closeMenu}>
      <DevTools />

      {/* Outer wrapper - contains header + inner content */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-[8px]" style={{ padding: '24px' }}>
        {/* Header row - Resting and icon button */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '24px', fontWeight: 600 }}>
            Resting Heart Rate
          </div>
          <CompareButton
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
              isOpen={isMenuOpen}
              toggleStates={toggleStates}
              onToggleChange={handleToggleChange}
              bpmValue={bpmValue}
              onBpmChange={handleBpmChange}
              hrvValue={hrvValue}
              onHrvChange={handleHrvChange}
            />
        </div>

        {/* Inner wrapper - contains BPM, graph, and dates */}
        <div className="rounded-[8px] relative w-[358px]" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '0px' }}>
          {/* Top row - BPM/Today on left, Legend on right */}
          <div className="flex items-start justify-between" style={{ marginBottom: '40px' }}>
            {/* BPM display */}
            <div>
              <div className="font-['Mona_Sans',_sans-serif]" style={{ fontSize: '20px', fontWeight: 600, color: currentData.color }}>
                {currentData.bpm} bpm
              </div>
              <div className="font-['Mona_Sans',_sans-serif]" style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.6)', marginTop: '-2px' }}>
                {(displayedDate || '20') === '20' ? 'Today' : `April ${displayedDate || '20'} 2025`}
              </div>
            </div>
            {/* Legend - shown when both RHR and HRV are visible */}
            {toggleStates.sleep && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#B9E3F4' }} />
                  <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>Heart Rate</span>
                </div>
                <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                  <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#3D6E8A' }} />
                  <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>HRV</span>
                </div>
              </div>
            )}
          </div>

          {/* Graph area */}
          <div className="relative h-[139px] w-full mb-1">
            {toggleStates.sleep && <SleepFill activeDate={hoveredDate || '20'} />}
            {toggleStates.lastWeek && <Frame2608475 />}

            <div className="absolute inset-0">
              <svg className="block size-full pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 326 139">
                <g id="Frame 2608472">
                  <path d="M 23 97 L 70 54 L 116 79 L 163 59 L 210 17 L 256 79 L 303 64" id="Vector 97" stroke="var(--stroke-0, #B9E3F4)" strokeLinecap="round" strokeWidth="3" />

                  {/* Data points - centered over each date column */}
                  {[
                    { date: '14', x: 16, y: 90, activeX: 14.5, activeY: 88.5 },
                    { date: '15', x: 63, y: 47, activeX: 61.5, activeY: 45.5 },
                    { date: '16', x: 109, y: 72, activeX: 107.5, activeY: 70.5 },
                    { date: '17', x: 156, y: 52, activeX: 154.5, activeY: 50.5 },
                    { date: '18', x: 203, y: 10, activeX: 201.5, activeY: 8.5 },
                    { date: '19', x: 249, y: 72, activeX: 247.5, activeY: 70.5 },
                    { date: '20', x: 296, y: 57, activeX: 294.5, activeY: 55.5 },
                  ].map((point) => {
                    const isActive = hoveredDate ? hoveredDate === point.date : point.date === '20';
                    return (
                      <g key={point.date}>
                        <rect
                          fill="transparent"
                          height="24"
                          width="24"
                          x={point.x - 7}
                          y={point.y - 5}
                          className="cursor-pointer pointer-events-auto"
                          onMouseEnter={() => handleHover(point.date)}
                          onMouseLeave={() => handleHover(null)}
                        />
                        <rect
                          fill="var(--fill-0, #B9E3F4)"
                          height={isActive ? 17 : 14}
                          rx={isActive ? 8.5 : 7}
                          width={isActive ? 17 : 14}
                          x={isActive ? point.activeX : point.x}
                          y={isActive ? point.activeY : point.y}
                          className="cursor-pointer transition-all"
                          style={{ pointerEvents: 'none' }}
                        />
                        {isActive && (
                          <rect
                            height="17"
                            rx="8.5"
                            stroke="var(--stroke-0, #E5F4FB)"
                            strokeWidth="3"
                            width="17"
                            x={point.activeX}
                            y={point.activeY}
                            fill="none"
                            style={{ pointerEvents: 'none' }}
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {bpmValue !== null && goalLineY !== null && (
              <div
                className={`absolute left-0 w-full h-[2px] z-20 transition-opacity duration-500 ${goalLineAnimatingOut ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  top: `${goalLineY - 6}px`,
                }}
              >
                <svg width="100%" height="2" className="block">
                  <line
                    x1="0"
                    y1="1"
                    x2="100%"
                    y2="1"
                    stroke="#D946EF"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            )}
            {hrvValue !== null && hrvGoalLineY !== null && toggleStates.sleep && (
              <div
                className={`absolute left-0 w-full h-[2px] z-20 transition-opacity duration-500 ${hrvGoalLineAnimatingOut ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  top: `${hrvGoalLineY}px`,
                }}
              >
                <svg width="100%" height="2" className="block">
                  <line
                    x1="0"
                    y1="1"
                    x2="100%"
                    y2="1"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Date tabs */}
          <div className="w-full">
            <div className="box-border content-stretch flex flex-row gap-1 items-stretch justify-start p-1 relative w-full">
              {['14', '15', '16', '17', '18', '19', '20'].map((date) => {
                const isActive = hoveredDate ? hoveredDate === date : date === '20';
                return (
                  <button
                    key={date}
                    onClick={() => handleTabClick(date)}
                    onMouseEnter={() => handleHover(date)}
                    onMouseLeave={() => handleHover(null)}
                    className="basis-0 grow min-h-px min-w-px relative shrink-0 cursor-pointer"
                  >
                    <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
                      <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
                        <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isActive ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
                          <p className="mb-0">APRIL</p>
                          <p>{date}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
