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

  const handleClick = () => {
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
  toggleStates: { goals: boolean; lastWeek: boolean; sleep: boolean }; 
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
    <div className="relative w-full pr-4">
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
            bg-[#343434] rounded-[8px] px-3 py-1.5 w-full
            text-[#ffffff] text-[14px] font-semibold tracking-[-0.25px]
            placeholder:text-[rgba(255,255,255,0.3)]
            outline-none
            transition-all duration-200
            ${isFocused ? 'ring-2 ring-[#3DB2E0]' : ''}
            ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
          `}
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
  toggleStates: { goals: boolean; lastWeek: boolean; sleep: boolean };
  onToggleChange: (key: keyof typeof toggleStates, checked: boolean) => void;
  bpmValue: number | null;
  onBpmChange: (value: number | null) => void;
  hrvValue: number | null;
  onHrvChange: (value: number | null) => void;
}) {
  return (
    <div className="absolute top-[calc(100%+8px)] right-0 bg-[#262626] rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.05)] overflow-hidden z-50 min-w-[180px]">
      <div className="flex flex-col">
        <ListItem 
          label="Add goals" 
          checked={toggleStates.goals} 
          onChange={(checked) => onToggleChange('goals', checked)}
          disabled={toggleStates.lastWeek}
        />
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${toggleStates.goals && !toggleStates.lastWeek ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-2 space-y-2">
            <Frame2608430 
              value={bpmValue} 
              onChange={onBpmChange} 
              placeholder="Max BPM" 
              min={40} 
              max={99}
              disabled={toggleStates.lastWeek}
            />
            <Frame2608430 
              value={hrvValue} 
              onChange={onHrvChange} 
              placeholder="Min HRV" 
              min={10} 
              max={99}
              disabled={toggleStates.lastWeek}
            />
          </div>
        </div>
        <div className="h-[1px] bg-[rgba(255,255,255,0.05)]" />
        <ListItem 
          label="HRV" 
          checked={toggleStates.sleep} 
          onChange={(checked) => onToggleChange('sleep', checked)}
          disabled={toggleStates.lastWeek}
        />
        <div className="h-[1px] bg-[rgba(255,255,255,0.05)]" />
        <ListItem 
          label="Last week" 
          checked={toggleStates.lastWeek} 
          onChange={(checked) => onToggleChange('lastWeek', checked)}
        />
      </div>
    </div>
  );
}

function SleepFill() {
  return (
    <div className="absolute h-[106px] left-4 top-[103px] w-[350px] pointer-events-none">
      <div className="absolute bottom-[-5.66%] left-0 right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 112">
          <defs>
            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B9E3F4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#B9E3F4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <g id="Frame 2608473" opacity="0.3">
            <path d={svgPathsSleep.p1e94a100} fill="url(#sleepGradient)" id="sleep-fill" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame2608475() {
  return (
    <div className="absolute h-[98px] left-4 top-[68px] w-[350px]">
      <div className="absolute bottom-[-35.2%] left-0 right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 133">
          <g id="Frame 2608473" opacity="0.2">
            <g id="Frame 2608414">
              <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="222" y="11.5" />
            </g>
            <g id="Frame 2608411">
              <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="7" y="90" />
            </g>
            <path d={svgPathsLastWeek.p1e95b100} id="Vector 97" stroke="var(--stroke-0, #B9E3F4)" strokeLinecap="round" strokeWidth="3" />
            <g id="Frame 2608411_2">
              <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="62" y="118.5" />
            </g>
            <g id="Frame 2608412">
              <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="116" y="34.5" />
            </g>
            <g id="Frame 2608413">
              <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="326" y="69.5" />
            </g>
            <g id="Frame 2608412_2">
              <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="170.666" y="108.5" />
            </g>
            <g id="Frame 2608414_2">
              <rect fill="var(--fill-0, #B9E3F4)" height="14" rx="7" width="14" x="275" y="54.5" />
            </g>
          </g>
        </svg>
      </div>
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
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans:Medium',_sans-serif] leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans:Medium',_sans-serif] leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans:Medium',_sans-serif] leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans:Medium',_sans-serif] leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans:Medium',_sans-serif] leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans:Medium',_sans-serif] leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
          <div className={`-webkit-box css-j5jd4p font-['Mona_Sans:Medium',_sans-serif] leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isSelected ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
    goals: false,
    lastWeek: false,
    sleep: false
  });
  const [bpmValue, setBpmValue] = useState<number | null>(null);
  const [hrvValue, setHrvValue] = useState<number | null>(null);
  const [lastValidBpm, setLastValidBpm] = useState<number | null>(null);
  const [goalLineAnimatingOut, setGoalLineAnimatingOut] = useState(false);

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
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredDate(null);
      }, 300);
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
  };

  const handleToggleChange = (key: keyof typeof toggleStates, checked: boolean) => {
    if (key === 'lastWeek') {
      if (checked) {
        setToggleStates({
          goals: false,
          lastWeek: true,
          sleep: false
        });
      } else {
        setToggleStates(prev => ({ ...prev, lastWeek: false }));
      }
    } else if (key === 'goals' || key === 'sleep') {
      if (checked && toggleStates.lastWeek) {
        return;
      }
      setToggleStates(prev => ({ ...prev, [key]: checked }));
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

  const goalLineY = lastValidBpm !== null ? bpmToY(lastValidBpm) : null;

  return (
    <div className="bg-[#171719] relative w-[390px] h-[844px] overflow-hidden" onClick={closeMenu}>
      <DevTools />
      
      <div className="absolute left-4 right-4 top-[22px] flex items-center justify-between">
        <div className="flex flex-col font-['Mona_Sans:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-nowrap">
          <p className="leading-[1.2] whitespace-pre">Resting</p>
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

      <div className="absolute left-4 top-[62px]">
        <div className="flex items-center gap-1">
          <div className="flex flex-col font-['Mona_Sans:SemiBold',_sans-serif] justify-center leading-[0] not-italic text-[48px] text-nowrap" style={{ color: currentData.color }}>
            <p className="leading-[1] whitespace-pre">{currentData.bpm}</p>
          </div>
          <div className="flex flex-col font-['Mona_Sans:Medium',_sans-serif] justify-center leading-[0] not-italic text-[20px] text-[rgba(255,255,255,0.5)] text-nowrap">
            <p className="leading-[1] whitespace-pre">BPM</p>
          </div>
        </div>
      </div>

      {toggleStates.sleep && <SleepFill />}
      {toggleStates.lastWeek && <Frame2608475 />}
      
      <Frame2608472 onHover={handleHover} hoveredDate={hoveredDate} />

      {toggleStates.goals && goalLineY !== null && (
        <div 
          className={`absolute left-4 w-[350px] h-[2px] z-20 transition-opacity duration-500 ${goalLineAnimatingOut ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            top: `${103 + goalLineY}px`,
          }}
        >
          <svg width="350" height="2" className="block">
            <line 
              x1="0" 
              y1="1" 
              x2="350" 
              y2="1" 
              stroke="#FF6B6B" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      )}

      <Frame2608462 selectedTab={selectedTab} onTabClick={handleTabClick} />
    </div>
  );
}
