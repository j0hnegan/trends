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

  // Sync displayedChecked when checked prop changes externally
  useEffect(() => {
    if (colorTimeoutRef.current) {
      clearTimeout(colorTimeoutRef.current);
      colorTimeoutRef.current = null;
    }
    setDisplayedChecked(checked);
  }, [checked]);

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

function CompareButton({ onClick, isOpen, toggleStates, onToggleChange, bpmValue, onBpmChange, hrvValue, onHrvChange, hrvLabel = "HRV", minHrvLabel = "Min HRV", showHrvToggle = true, maxBpmLabel = "Max BPM", secondBarGraphLabel }: { 
  onClick: () => void; 
  isOpen: boolean;
  toggleStates: { lastWeek: boolean; sleep: boolean; secondBarGraph?: boolean }; 
  onToggleChange: (key: keyof typeof toggleStates, checked: boolean) => void;
  bpmValue: number | null;
  onBpmChange: (value: number | null) => void;
  hrvValue: number | null;
  onHrvChange: (value: number | null) => void;
  hrvLabel?: string;
  minHrvLabel?: string;
  showHrvToggle?: boolean;
  maxBpmLabel?: string;
  secondBarGraphLabel?: string;
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
      {isOpen && <DropdownMenu toggleStates={toggleStates} onToggleChange={onToggleChange} bpmValue={bpmValue} onBpmChange={onBpmChange} hrvValue={hrvValue} onHrvChange={onHrvChange} hrvLabel={hrvLabel} minHrvLabel={minHrvLabel} showHrvToggle={showHrvToggle} maxBpmLabel={maxBpmLabel} secondBarGraphLabel={secondBarGraphLabel} />}
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

function DropdownMenu({ toggleStates, onToggleChange, bpmValue, onBpmChange, hrvValue, onHrvChange, hrvLabel = "HRV", minHrvLabel = "Min HRV", showHrvToggle = true, maxBpmLabel = "Max BPM", secondBarGraphLabel }: {
  toggleStates: { lastWeek: boolean; sleep: boolean; secondBarGraph?: boolean };
  onToggleChange: (key: keyof typeof toggleStates, checked: boolean) => void;
  bpmValue: number | null;
  onBpmChange: (value: number | null) => void;
  hrvValue: number | null;
  onHrvChange: (value: number | null) => void;
  hrvLabel?: string;
  minHrvLabel?: string;
  showHrvToggle?: boolean;
  maxBpmLabel?: string;
  secondBarGraphLabel?: string;
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
        {showHrvToggle && (
          <div style={{ marginTop: '4px' }}>
            <SettingsRow 
              label={hrvLabel} 
              checked={toggleStates.sleep} 
              onChange={(checked) => onToggleChange('sleep', checked)}
              disabled={false}
            />
          </div>
        )}
        {secondBarGraphLabel && (
          <div style={{ marginTop: '4px' }}>
            <SettingsRow 
              label={secondBarGraphLabel} 
              checked={toggleStates.secondBarGraph || false} 
              onChange={(checked) => onToggleChange('secondBarGraph' as keyof typeof toggleStates, checked)}
              disabled={false}
            />
          </div>
        )}

        {/* GOALS Section */}
        <div style={{ marginTop: '8px' }}>
          <SectionHeader text="GOALS" />
          <div style={{ marginTop: '-4px' }}>
            <GoalRowWithInput 
              label={maxBpmLabel} 
              dotColor="#D946EF"
              value={bpmValue}
              onChange={onBpmChange}
              placeholder=""
              min={40}
              max={99}
            />
          </div>
          {((toggleStates.secondBarGraph !== undefined && toggleStates.secondBarGraph) || (toggleStates.secondBarGraph === undefined && toggleStates.sleep)) && (
            <div style={{ marginTop: '4px' }}>
              <GoalRowWithInput 
                label={minHrvLabel} 
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

function SleepFill({ activeDate, animate, animateSecondBarGraph = false, animateLastWeek = false, onHover, onDateClick, showDefaultBars = true, showSecondBarGraph = false, secondBarGraphValues, secondBarGraphHeights, showLastWeek = false, lastWeekBarGraphValues, lastWeekBarGraphHeights }: { 
  activeDate: string; 
  animate: boolean; 
  animateSecondBarGraph?: boolean;
  animateLastWeek?: boolean;
  onHover: (date: string | null) => void; 
  onDateClick: (date: string) => void;
  showDefaultBars?: boolean;
  showSecondBarGraph?: boolean;
  secondBarGraphValues?: { [key: string]: number };
  secondBarGraphHeights?: Array<{date: string; centerX: number; height: number}>;
  showLastWeek?: boolean;
  lastWeekBarGraphValues?: { [key: string]: number };
  lastWeekBarGraphHeights?: Array<{date: string; centerX: number; height: number}>;
}) {
  // Create bar graph for HRV data - heights based on the reference image
  // Circle centers are at: 23, 70, 116, 163, 210, 256, 303
  // (calculated from circle x positions: inactive x + 7, or activeX + 8.5)
  // HRV values for each date
  const hrvValues: { [key: string]: number } = {
    '14': 62,  // height 103 - lowest
    '15': 72,  // height 123
    '16': 80,  // height 133
    '17': 68,  // height 113
    '18': 85,  // height 137 - highest
    '19': 70,  // height 118
    '20': 78,  // height 128
  };

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

  // Calculate bar positions as percentages for HTML overlay
  const barPercentages = barPositions.map(bar => ({
    ...bar,
    leftPercent: (bar.centerX / 326) * 100,
    topPercent: ((bottomY - bar.height) / 139) * 100,
  }));

  return (
    <div className="absolute inset-0" style={{ overflow: 'visible', zIndex: 5 }}>
      {/* SVG for bars */}
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 139" style={{ pointerEvents: 'none' }}>
        {showDefaultBars && barPositions.map((bar, index) => {
          const isActive = bar.date === activeDate;
          const barTop = bottomY - bar.height;
          const barX = bar.centerX - barWidth / 2;
          const animationDelay = animate ? index * 0.04 : 0;
          
          return (
            <g key={animate ? `${bar.date}-${animate}` : bar.date}>
              {/* Invisible hit area for better hover detection */}
              <rect
                x={barX - 5}
                y={0}
                width={barWidth + 10}
                height={139}
                fill="transparent"
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={() => onHover(bar.date)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onDateClick(bar.date)}
              />
              {/* Visible bar - animate only when animate prop is true (for chart 1) */}
              {animate ? (
                <rect
                  x={barX}
                  y={bottomY}
                  width={barWidth}
                  height={0}
                  fill={isActive ? "#5BA3C0" : "#3D6E8A"}
                  rx="4"
                  ry="4"
                  style={{ pointerEvents: 'none' }}
                >
                  <animate
                    attributeName="height"
                    from="0"
                    to={bar.height}
                    dur="0.2s"
                    begin={`${animationDelay}s`}
                    fill="freeze"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                  />
                  <animate
                    attributeName="y"
                    from={bottomY}
                    to={barTop}
                    dur="0.2s"
                    begin={`${animationDelay}s`}
                    fill="freeze"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                  />
                </rect>
              ) : (
                <rect
                  x={barX}
                  y={barTop}
                  width={barWidth}
                  height={bar.height}
                  fill={isActive ? "#5BA3C0" : "#3D6E8A"}
                  rx="4"
                  ry="4"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>
          );
        })}
        {/* Second bar graph overlay - conditional animation like chart 1 */}
        {showSecondBarGraph && secondBarGraphHeights && secondBarGraphHeights.map((bar, index) => {
          const isActive = bar.date === activeDate;
          const barTop = bottomY - bar.height;
          const barX = bar.centerX - barWidth / 2;
          const animationDelay = animateSecondBarGraph ? index * 0.04 : 0;
          
          // Dynamic color logic:
          // 2nd bar graph uses the specified color with 40% opacity
          const activeColor = "rgba(167, 220, 241, 0.4)";
          const inactiveColor = "rgba(167, 220, 241, 0.4)";
          
          return (
            <g key={animateSecondBarGraph ? `second-${bar.date}-anim` : `second-${bar.date}`}>
              {/* Visible second bar */}
              <rect
                x={barX}
                y={animateSecondBarGraph ? bottomY : barTop}
                width={barWidth}
                height={animateSecondBarGraph ? 0 : bar.height}
                fill={isActive ? activeColor : inactiveColor}
                rx="4"
                ry="4"
                style={{ pointerEvents: 'none' }}
              >
                {animateSecondBarGraph && (
                  <>
                    <animate
                      attributeName="height"
                      from="0"
                      to={bar.height}
                      dur="0.2s"
                      begin={`${animationDelay}s`}
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42 0 0.58 1"
                    />
                    <animate
                      attributeName="y"
                      from={bottomY}
                      to={barTop}
                      dur="0.2s"
                      begin={`${animationDelay}s`}
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42 0 0.58 1"
                    />
                  </>
                )}
              </rect>
            </g>
          );
        })}
        {/* Last week bar graph overlay - conditional animation like chart 1 */}
        {showLastWeek && lastWeekBarGraphHeights && lastWeekBarGraphHeights.map((bar, index) => {
          const isActive = bar.date === activeDate;
          const barTop = bottomY - bar.height;
          const barX = bar.centerX - barWidth / 2;
          const animationDelay = animateLastWeek ? index * 0.04 : 0;
          
          // Dynamic color logic:
          // Last week uses the specified color with 40% opacity
          const activeColor = "rgba(167, 220, 241, 0.4)";
          const inactiveColor = "rgba(167, 220, 241, 0.4)";
          
          return (
            <g key={animateLastWeek ? `lastweek-${bar.date}-anim` : `lastweek-${bar.date}`}>
              {/* Invisible hit area for better hover detection */}
              <rect
                x={barX - 5}
                y={0}
                width={barWidth + 10}
                height={139}
                fill="transparent"
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={() => onHover(bar.date)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onDateClick(bar.date)}
              />
              {/* Visible last week bar */}
              <rect
                x={barX}
                y={animateLastWeek ? bottomY : barTop}
                width={barWidth}
                height={animateLastWeek ? 0 : bar.height}
                fill={isActive ? activeColor : inactiveColor}
                rx="4"
                ry="4"
                style={{ pointerEvents: 'none' }}
              >
                {animateLastWeek && (
                  <>
                    <animate
                      attributeName="height"
                      from="0"
                      to={bar.height}
                      dur="0.2s"
                      begin={`${animationDelay}s`}
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42 0 0.58 1"
                    />
                    <animate
                      attributeName="y"
                      from={bottomY}
                      to={barTop}
                      dur="0.2s"
                      begin={`${animationDelay}s`}
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.42 0 0.58 1"
                    />
                  </>
                )}
              </rect>
            </g>
          );
        })}
      </svg>
      {/* HTML overlay for second bar graph values - only show when second bar graph is on */}
      {showSecondBarGraph && secondBarGraphValues && secondBarGraphHeights && barPercentages.map((bar) => {
        const isActive = bar.date === activeDate;
        const secondValue = secondBarGraphValues[bar.date];
        const showValue = isActive && secondValue !== undefined;
        // Find the corresponding second bar graph height
        const secondBar = secondBarGraphHeights.find(b => b.date === bar.date);
        if (!secondBar || !showValue) return null;
        
        // Find the tallest bar (default, second, or last week)
        const defaultBarHeight = bar.height;
        const secondBarHeight = secondBar.height;
        const lastWeekBar = showLastWeek && lastWeekBarGraphHeights ? lastWeekBarGraphHeights.find(b => b.date === bar.date) : null;
        const lastWeekBarHeight = lastWeekBar ? lastWeekBar.height : 0;
        const tallestHeight = Math.max(defaultBarHeight, secondBarHeight, lastWeekBarHeight);
        
        // Position 4px above the tallest bar top
        const tallestBarTopPixels = ((bottomY - tallestHeight) / 139) * 100;
        
        return (
          <div
            key={`label-second-${bar.date}`}
            className="absolute font-['Mona_Sans',_sans-serif]"
            style={{
              left: `${bar.leftPercent}%`,
              top: `calc(${tallestBarTopPixels}% - 4px)`,
              transform: 'translate(-50%, -100%)',
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              pointerEvents: 'none',
            }}
          >
            {secondValue}
          </div>
        );
      })}
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
  const [fixedDate, setFixedDate] = useState<string>('20');
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
  const [shouldAnimateBars, setShouldAnimateBars] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  // Second chart state
  const [hoveredDate2, setHoveredDate2] = useState<string | null>(null);
  const [displayedDate2, setDisplayedDate2] = useState<string | null>(null);
  const [fixedDate2, setFixedDate2] = useState<string>('20');
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [toggleStates2, setToggleStates2] = useState({
    lastWeek: false,
    sleep: true,
    secondBarGraph: false
  });
  const [bpmValue2, setBpmValue2] = useState<number | null>(null);
  const [hrvValue2, setHrvValue2] = useState<number | null>(null);
  const [lastValidBpm2, setLastValidBpm2] = useState<number | null>(null);
  const [lastValidHrv2, setLastValidHrv2] = useState<number | null>(null);
  const [goalLineAnimatingOut2, setGoalLineAnimatingOut2] = useState(false);
  const [hrvGoalLineAnimatingOut2, setHrvGoalLineAnimatingOut2] = useState(false);
  const [shouldAnimateBars2, setShouldAnimateBars2] = useState(false);
  const [shouldAnimateSecondBarGraph2, setShouldAnimateSecondBarGraph2] = useState(false);
  const [shouldAnimateLastWeek2, setShouldAnimateLastWeek2] = useState(false);
  const [showLegend2, setShowLegend2] = useState(false);

  // Third chart state
  const [hoveredDate3, setHoveredDate3] = useState<string | null>(null);
  const [displayedDate3, setDisplayedDate3] = useState<string | null>(null);
  const [fixedDate3, setFixedDate3] = useState<string>('20');
  const [isMenuOpen3, setIsMenuOpen3] = useState(false);
  const [toggleStates3, setToggleStates3] = useState({
    lastWeek: false,
    sleep: true,
    secondBarGraph: false
  });
  const [bpmValue3, setBpmValue3] = useState<number | null>(null);
  const [hrvValue3, setHrvValue3] = useState<number | null>(null);
  const [lastValidBpm3, setLastValidBpm3] = useState<number | null>(null);
  const [lastValidHrv3, setLastValidHrv3] = useState<number | null>(null);
  const [goalLineAnimatingOut3, setGoalLineAnimatingOut3] = useState(false);
  const [hrvGoalLineAnimatingOut3, setHrvGoalLineAnimatingOut3] = useState(false);
  const [shouldAnimateBars3, setShouldAnimateBars3] = useState(false);
  const [showLegend3, setShowLegend3] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const displayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevSleepStateRef = useRef<boolean>(false);
  const hoverTimeoutRef2 = useRef<NodeJS.Timeout | null>(null);
  const displayTimeoutRef2 = useRef<NodeJS.Timeout | null>(null);
  const prevSleepStateRef2 = useRef<boolean>(false);
  const hoverTimeoutRef3 = useRef<NodeJS.Timeout | null>(null);
  const displayTimeoutRef3 = useRef<NodeJS.Timeout | null>(null);
  const prevSleepStateRef3 = useRef<boolean>(false);

  const heartRateData = {
    '20': { bpm: 60, color: '#ffffff' },
    '19': { bpm: 57, color: '#ffffff' },
    '18': { bpm: 76, color: '#ffffff' },
    '17': { bpm: 64, color: '#ffffff' },
    '16': { bpm: 59, color: '#ffffff' },
    '15': { bpm: 68, color: '#ffffff' },
    '14': { bpm: 54, color: '#ffffff' }
  };

  // Default bar graph values for chart 2 (used in BPM display)
  const defaultBarGraphValues2: { [key: string]: number } = {
    '14': 62,  // height 103 - lowest
    '15': 72,  // height 123
    '16': 80,  // height 133
    '17': 68,  // height 113
    '18': 85,  // height 137 - highest
    '19': 70,  // height 118
    '20': 78,  // height 128
  };

  // Second bar graph data for chart 2 - varied heights
  const secondBarGraphValues2: { [key: string]: number } = {
    '14': 48,
    '15': 85,
    '16': 52,
    '17': 75,
    '18': 58,
    '19': 92,
    '20': 66,
  };

  const secondBarGraphHeights2 = [
    { date: '14', centerX: 23, height: 83 },  // Much shorter
    { date: '15', centerX: 70, height: 133 }, // Same height as default
    { date: '16', centerX: 116, height: 73 }, // Much shorter
    { date: '17', centerX: 163, height: 123 }, // Taller than default
    { date: '18', centerX: 210, height: 98 },   // Much shorter
    { date: '19', centerX: 256, height: 138 }, // Taller
    { date: '20', centerX: 303, height: 108 }, // Much shorter
  ];

  // Last week bar graph data for chart 2 - varied heights, different from default and second
  const lastWeekBarGraphValues2: { [key: string]: number } = {
    '14': 58,
    '15': 66,
    '16': 74,
    '17': 63,
    '18': 79,
    '19': 65,
    '20': 71,
  };

  const lastWeekBarGraphHeights2 = [
    { date: '14', centerX: 23, height: 108 },  // Different from default (103) and second (83)
    { date: '15', centerX: 70, height: 98 },    // Different from default (123) and second (133)
    { date: '16', centerX: 116, height: 93 },  // Shorter (was 143)
    { date: '17', centerX: 163, height: 103 },  // Different from default (113) and second (123)
    { date: '18', centerX: 210, height: 98 },  // Shorter than before (was 128)
    { date: '19', centerX: 256, height: 108 },  // Different from default (118) and second (138)
    { date: '20', centerX: 303, height: 118 },  // Different from default (128) and second (108)
  ];

  // Third chart - second line overlay data (new varied set)
  const secondLinePoints3 = [
    { date: '14', x: 16, y: 95, activeX: 14.5, activeY: 93.5 },
    { date: '15', x: 63, y: 65, activeX: 61.5, activeY: 63.5 },
    { date: '16', x: 109, y: 55, activeX: 107.5, activeY: 53.5 },
    { date: '17', x: 156, y: 78, activeX: 154.5, activeY: 76.5 },
    { date: '18', x: 203, y: 40, activeX: 201.5, activeY: 38.5 },
    { date: '19', x: 249, y: 68, activeX: 247.5, activeY: 66.5 },
    { date: '20', x: 296, y: 88, activeX: 294.5, activeY: 86.5 },
  ];
  const secondLinePath3 = "M 23 100 L 70 70 L 116 60 L 163 82 L 210 44 L 256 72 L 303 92";


  const activeDisplayDate = displayedDate || fixedDate;
  const currentData = heartRateData[activeDisplayDate as keyof typeof heartRateData] || heartRateData['20'];

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
      // Immediately set the new hovered date
      setHoveredDate(date);
      displayTimeoutRef.current = setTimeout(() => {
        setDisplayedDate(date);
      }, 150);
    } else {
      // Add a small delay before snapping back to fixed date
      // This prevents jarring transitions when moving between dates
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredDate(null);
        displayTimeoutRef.current = setTimeout(() => {
          setDisplayedDate(null);
        }, 300);
      }, 50);
    }
  };

  const handleDateClick = (date: string) => {
    setFixedDate(date);
    setDisplayedDate(date);
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
      // If enabling lastWeek, disable HRV
      if (checked) {
        setToggleStates({ lastWeek: true, sleep: false });
        setShowLegend(false);
        setShouldAnimateBars(false);
        prevSleepStateRef.current = false; // Reset so HRV animation triggers next time
        if (hrvValue !== null) {
          setHrvValue(null);
        }
      } else {
        setToggleStates(prev => ({ ...prev, lastWeek: false }));
      }
    } else if (key === 'sleep') {
      // If enabling HRV, disable lastWeek
      if (checked) {
        setToggleStates({ lastWeek: false, sleep: true });
      } else {
        setToggleStates(prev => ({ ...prev, sleep: false }));
      }
      // If HRV is turned off, clear the HRV value
      if (!checked && hrvValue !== null) {
        setHrvValue(null);
        setShouldAnimateBars(false);
      } else if (checked && !prevSleepStateRef.current) {
        // HRV is being turned on - trigger animation
        setShouldAnimateBars(true);
        setShowLegend(false);
        // Last bar (index 6) starts at 0.24s and finishes at 0.44s (0.24 + 0.2)
        // Fade in legend after last bar finishes
        setTimeout(() => {
          setShowLegend(true);
          setShouldAnimateBars(false);
        }, 440);
      } else if (checked) {
        // If HRV is already on, show legend immediately
        setShowLegend(true);
      } else {
        // If HRV is turned off, hide legend
        setShowLegend(false);
      }
      prevSleepStateRef.current = checked;
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

  // Second chart handlers
  const activeDisplayDate2 = displayedDate2 || fixedDate2;
  const currentData2 = heartRateData[activeDisplayDate2 as keyof typeof heartRateData] || heartRateData['20'];

  const handleHover2 = (date: string | null) => {
    if (hoverTimeoutRef2.current) {
      clearTimeout(hoverTimeoutRef2.current);
      hoverTimeoutRef2.current = null;
    }
    if (displayTimeoutRef2.current) {
      clearTimeout(displayTimeoutRef2.current);
      displayTimeoutRef2.current = null;
    }

    if (date) {
      setHoveredDate2(date);
      displayTimeoutRef2.current = setTimeout(() => {
        setDisplayedDate2(date);
      }, 150);
    } else {
      hoverTimeoutRef2.current = setTimeout(() => {
        setHoveredDate2(null);
        displayTimeoutRef2.current = setTimeout(() => {
          setDisplayedDate2(null);
        }, 300);
      }, 50);
    }
  };

  const handleDateClick2 = (date: string) => {
    setFixedDate2(date);
    setDisplayedDate2(date);
  };

  const toggleMenu2 = () => {
    setIsMenuOpen2(!isMenuOpen2);
  };

  const closeMenu2 = () => {
    setIsMenuOpen2(false);
  };

  const handleBpmChange2 = (newValue: number | null) => {
    setBpmValue2(newValue);
    
    if (newValue === null) {
      if (lastValidBpm2 !== null) {
        setGoalLineAnimatingOut2(true);
        setTimeout(() => {
          setLastValidBpm2(null);
          setGoalLineAnimatingOut2(false);
        }, 500);
      }
      return;
    }
    
    setLastValidBpm2(newValue);
    setGoalLineAnimatingOut2(false);
  };

  const handleHrvChange2 = (newValue: number | null) => {
    setHrvValue2(newValue);
    
    if (newValue === null) {
      if (lastValidHrv2 !== null) {
        setHrvGoalLineAnimatingOut2(true);
        setTimeout(() => {
          setLastValidHrv2(null);
          setHrvGoalLineAnimatingOut2(false);
        }, 500);
      }
      return;
    }
    
    setLastValidHrv2(newValue);
    setHrvGoalLineAnimatingOut2(false);
  };

  const handleToggleChange2 = (key: keyof typeof toggleStates2, checked: boolean) => {
    if (key === 'lastWeek') {
      // If enabling lastWeek, disable secondBarGraph - mutual exclusivity
      // sleep (first bar graph) always stays true
      if (checked) {
        setToggleStates2({ lastWeek: true, sleep: true, secondBarGraph: false });
        setShowLegend2(false); // Don't show legend when lastWeek is on
        // Trigger animation - same pattern as chart 1
        setShouldAnimateLastWeek2(true);
        setTimeout(() => {
          setShouldAnimateLastWeek2(false);
        }, 440);
      } else {
        setToggleStates2(prev => ({ ...prev, lastWeek: false, sleep: true }));
        setShowLegend2(false); // Hide legend when only sleep is on
        setShouldAnimateLastWeek2(false);
      }
    } else if (key === 'sleep') {
      // sleep (first bar graph) should always be true - don't allow it to be toggled off
      // This toggle shouldn't be visible in the dropdown for chart 2, but handle it just in case
      setToggleStates2(prev => ({ ...prev, sleep: true }));
    } else if (key === 'secondBarGraph') {
      // If enabling secondBarGraph, disable lastWeek - mutual exclusivity
      // sleep (first bar graph) always stays true
      if (checked) {
        setToggleStates2({ lastWeek: false, sleep: true, secondBarGraph: true });
        setShowLegend2(true); // Show legend when both sleep and secondBarGraph are on
        // Trigger animation - same pattern as chart 1
        setShouldAnimateSecondBarGraph2(true);
        setTimeout(() => {
          setShouldAnimateSecondBarGraph2(false);
        }, 440);
      } else {
        setToggleStates2(prev => ({ ...prev, secondBarGraph: false, sleep: true }));
        setShowLegend2(false); // Hide legend when only sleep is on
        setShouldAnimateSecondBarGraph2(false);
      }
    }
  };

  // Conversion function for bar graph values in chart 2
  const barGraphToY = (value: number) => {
    const topPadding = 17;
    const bottomPadding = 97;
    const usableHeight = bottomPadding - topPadding;
    // Use range that covers all bar graph values (48-92)
    const valueRange = 92 - 48;
    const normalized = (value - 48) / valueRange;
    return bottomPadding - (normalized * usableHeight);
  };

  const goalLineY2 = lastValidBpm2 !== null ? barGraphToY(lastValidBpm2) : null;
  const hrvGoalLineY2 = lastValidHrv2 !== null ? barGraphToY(lastValidHrv2) : null;

  // Third chart handlers
  const activeDisplayDate3 = displayedDate3 || fixedDate3;
  const currentData3 = heartRateData[activeDisplayDate3 as keyof typeof heartRateData] || heartRateData['20'];

  const handleHover3 = (date: string | null) => {
    if (hoverTimeoutRef3.current) {
      clearTimeout(hoverTimeoutRef3.current);
      hoverTimeoutRef3.current = null;
    }
    if (displayTimeoutRef3.current) {
      clearTimeout(displayTimeoutRef3.current);
      displayTimeoutRef3.current = null;
    }

    if (date) {
      setHoveredDate3(date);
      displayTimeoutRef3.current = setTimeout(() => {
        setDisplayedDate3(date);
      }, 150);
    } else {
      hoverTimeoutRef3.current = setTimeout(() => {
        setHoveredDate3(null);
        displayTimeoutRef3.current = setTimeout(() => {
          setDisplayedDate3(null);
        }, 300);
      }, 50);
    }
  };

  const handleDateClick3 = (date: string) => {
    setFixedDate3(date);
    setDisplayedDate3(date);
  };

  const toggleMenu3 = () => {
    setIsMenuOpen3(!isMenuOpen3);
  };

  const closeMenu3 = () => {
    setIsMenuOpen3(false);
  };

  const handleBpmChange3 = (newValue: number | null) => {
    setBpmValue3(newValue);
    
    if (newValue === null) {
      if (lastValidBpm3 !== null) {
        setGoalLineAnimatingOut3(true);
        setTimeout(() => {
          setLastValidBpm3(null);
          setGoalLineAnimatingOut3(false);
        }, 500);
      }
      return;
    }
    
    setLastValidBpm3(newValue);
    setGoalLineAnimatingOut3(false);
  };

  const handleHrvChange3 = (newValue: number | null) => {
    setHrvValue3(newValue);
    
    if (newValue === null) {
      if (lastValidHrv3 !== null) {
        setHrvGoalLineAnimatingOut3(true);
        setTimeout(() => {
          setLastValidHrv3(null);
          setHrvGoalLineAnimatingOut3(false);
        }, 500);
      }
      return;
    }
    
    setLastValidHrv3(newValue);
    setHrvGoalLineAnimatingOut3(false);
  };

  const handleToggleChange3 = (key: keyof typeof toggleStates3, checked: boolean) => {
    if (key === 'lastWeek') {
      if (checked) {
        setToggleStates3({ lastWeek: true, sleep: true, secondBarGraph: false });
        setShowLegend3(false);
      } else {
        setToggleStates3(prev => ({ ...prev, lastWeek: false, sleep: true }));
        setShowLegend3(false);
      }
    } else if (key === 'secondBarGraph') {
      if (checked) {
        setToggleStates3({ lastWeek: false, sleep: true, secondBarGraph: true });
        setShowLegend3(true);
      } else {
        setToggleStates3(prev => ({ ...prev, secondBarGraph: false, sleep: true }));
        setShowLegend3(false);
      }
    } else if (key === 'sleep') {
      setToggleStates3(prev => ({ ...prev, sleep: true }));
    }
  };

  const goalLineY3 = lastValidBpm3 !== null ? bpmToY(lastValidBpm3) : null;
  const hrvGoalLineY3 = lastValidHrv3 !== null ? hrvToY(lastValidHrv3) : null;

  return (
    <div className="bg-[#171719] fixed inset-0 flex flex-col items-center overflow-y-auto" style={{ paddingTop: '40px', paddingBottom: '40px' }} onClick={(e) => {
      closeMenu();
      closeMenu2();
      closeMenu3();
    }}>
      <DevTools />

      {/* Outer wrapper - contains header + inner content */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-[8px]" style={{ padding: '24px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header row - Resting and icon button */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '24px', fontWeight: 600 }}>
            Line Graph
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
              hrvLabel="Bar Graph"
              minHrvLabel="Min Bar"
              maxBpmLabel="Max Line"
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
                {activeDisplayDate === '20' ? 'Today' : `April ${activeDisplayDate} 2025`}
              </div>
            </div>
            {/* Legend - shown when both RHR and HRV are visible */}
            {toggleStates.sleep && (
              <div 
                className="flex flex-col gap-2"
                style={{
                  opacity: showLegend ? 1 : 0,
                  transition: 'opacity 0.3s ease-in',
                  transitionDelay: toggleStates.sleep ? '0s' : '0s'
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#B9E3F4' }} />
                  <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>Line Graph</span>
                </div>
                <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                  <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#3D6E8A' }} />
                  <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>Bar Graph</span>
                </div>
              </div>
            )}
          </div>

          {/* Graph area */}
          <div className="relative h-[139px] w-full mb-1">
            {toggleStates.sleep && <SleepFill activeDate={hoveredDate || fixedDate} animate={shouldAnimateBars} onHover={handleHover} onDateClick={handleDateClick} />}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: toggleStates.lastWeek ? 1 : 0,
                transition: 'opacity 0.25s ease-in-out'
              }}
            >
              {toggleStates.lastWeek && <Frame2608475 />}
            </div>

            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 139">
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
                    const isActive = hoveredDate ? hoveredDate === point.date : point.date === fixedDate;
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
                          onClick={() => handleDateClick(point.date)}
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
                const isActive = hoveredDate ? hoveredDate === date : date === fixedDate;
                return (
                  <button
                    key={date}
                    onClick={() => handleDateClick(date)}
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

      {/* Second chart - full duplicate with header and icon button */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-[8px]" style={{ padding: '24px', marginTop: '40px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header row - Resting and icon button */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '24px', fontWeight: 600 }}>
            Bar Graph
          </div>
          <CompareButton
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu2();
              }}
              isOpen={isMenuOpen2}
              toggleStates={toggleStates2}
              onToggleChange={handleToggleChange2}
              bpmValue={bpmValue2}
              onBpmChange={handleBpmChange2}
              hrvValue={hrvValue2}
              onHrvChange={handleHrvChange2}
              showHrvToggle={false}
              maxBpmLabel="Max Bar"
              minHrvLabel="Min Bar"
              secondBarGraphLabel="Bar Graph"
            />
        </div>

        {/* Inner wrapper - contains BPM, graph, and dates */}
        <div className="rounded-[8px] relative w-[358px]" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '0px' }}>
          {/* Top row - BPM/Today on left, Legend on right */}
          <div className="flex items-start justify-between" style={{ marginBottom: '40px' }}>
            {/* Bar graph value display */}
            <div>
              <div className="font-['Mona_Sans',_sans-serif]" style={{ fontSize: '20px', fontWeight: 600, color: currentData2.color }}>
                {defaultBarGraphValues2[activeDisplayDate2] || defaultBarGraphValues2['20']}
              </div>
              <div className="font-['Mona_Sans',_sans-serif]" style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.6)', marginTop: '-2px' }}>
                {activeDisplayDate2 === '20' ? 'Today' : `April ${activeDisplayDate2} 2025`}
              </div>
            </div>
            {/* Legend - shown when sleep is on and secondBarGraph is on (not lastWeek) */}
            {toggleStates2.sleep && toggleStates2.secondBarGraph && !toggleStates2.lastWeek && (
              <div 
                className="flex flex-col gap-2"
                style={{
                  opacity: showLegend2 ? 1 : 0,
                  transition: 'opacity 0.3s ease-in'
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#3D6E8A' }} />
                  <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>Bar Graph 1</span>
                </div>
                {toggleStates2.secondBarGraph && (
                  <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                    <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#A7DCF1' }} />
                    <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>Bar Graph 2</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Graph area */}
          <div className="relative h-[139px] w-full mb-1">
            {toggleStates2.sleep && (
              <SleepFill
                key={`sleepfill-2-${toggleStates2.secondBarGraph}-${toggleStates2.lastWeek}-${shouldAnimateSecondBarGraph2}-${shouldAnimateLastWeek2}`}
                activeDate={hoveredDate2 || fixedDate2}
                animate={false}
                animateSecondBarGraph={shouldAnimateSecondBarGraph2}
                animateLastWeek={shouldAnimateLastWeek2}
                onHover={handleHover2}
                onDateClick={handleDateClick2}
                showDefaultBars={true}
                showSecondBarGraph={toggleStates2.secondBarGraph}
                secondBarGraphValues={secondBarGraphValues2}
                secondBarGraphHeights={secondBarGraphHeights2}
                showLastWeek={toggleStates2.lastWeek}
                lastWeekBarGraphValues={lastWeekBarGraphValues2}
                lastWeekBarGraphHeights={lastWeekBarGraphHeights2}
              />
            )}

            {bpmValue2 !== null && goalLineY2 !== null && (
              <div
                className={`absolute left-0 w-full h-[2px] z-20 transition-opacity duration-500 ${goalLineAnimatingOut2 ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  top: `${goalLineY2 - 6}px`,
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
            {hrvValue2 !== null && hrvGoalLineY2 !== null && (
              <div
                className={`absolute left-0 w-full h-[2px] z-20 transition-opacity duration-500 ${hrvGoalLineAnimatingOut2 ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  top: `${hrvGoalLineY2}px`,
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
                const isActive2 = hoveredDate2 ? hoveredDate2 === date : date === fixedDate2;
                return (
                  <button
                    key={date}
                    onClick={() => handleDateClick2(date)}
                    onMouseEnter={() => handleHover2(date)}
                    onMouseLeave={() => handleHover2(null)}
                    className="basis-0 grow min-h-px min-w-px relative shrink-0 cursor-pointer"
                  >
                    <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
                      <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
                        <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isActive2 ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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

      {/* Third chart - full duplicate with header and icon button */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-[8px]" style={{ padding: '24px', marginTop: '40px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header row - Resting and icon button */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '24px', fontWeight: 600 }}>
            Resting Heart Rate
          </div>
          <CompareButton
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu3();
              }}
              isOpen={isMenuOpen3}
              toggleStates={toggleStates3}
              onToggleChange={handleToggleChange3}
              bpmValue={bpmValue3}
              onBpmChange={handleBpmChange3}
              hrvValue={hrvValue3}
              onHrvChange={handleHrvChange3}
              showHrvToggle={false}
              maxBpmLabel="Max Line"
              minHrvLabel="Min Bar"
              secondBarGraphLabel="Line Graph 2"
            />
        </div>

        {/* Inner wrapper - contains BPM, graph, and dates */}
        <div className="rounded-[8px] relative w-[358px]" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '0px' }}>
          {/* Top row - BPM/Today on left, Legend on right */}
          <div className="flex items-start justify-between" style={{ marginBottom: '40px' }}>
            {/* BPM display */}
            <div>
              <div className="font-['Mona_Sans',_sans-serif]" style={{ fontSize: '20px', fontWeight: 600, color: currentData3.color }}>
                {currentData3.bpm} bpm
              </div>
              <div className="font-['Mona_Sans',_sans-serif]" style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.6)', marginTop: '-2px' }}>
                {activeDisplayDate3 === '20' ? 'Today' : `April ${activeDisplayDate3} 2025`}
              </div>
            </div>
            {/* Legend - shown when main + second line are visible (not last week) */}
            {toggleStates3.sleep && toggleStates3.secondBarGraph && !toggleStates3.lastWeek && (
              <div 
                className="flex flex-col gap-2"
                style={{
                  opacity: showLegend3 ? 1 : 0,
                  transition: 'opacity 0.3s ease-in',
                  transitionDelay: '0s'
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#B9E3F4' }} />
                  <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>Line Graph 1</span>
                </div>
                <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                  <div className="rounded-full" style={{ width: '13px', height: '13px', backgroundColor: '#3D6E8A' }} />
                  <span className="font-['Mona_Sans',_sans-serif] text-[#ffffff]" style={{ fontSize: '14px' }}>Line Graph 2</span>
                </div>
              </div>
            )}
          </div>

          {/* Graph area */}
          <div className="relative h-[139px] w-full mb-1">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: toggleStates3.lastWeek ? 1 : 0,
                transition: 'opacity 0.25s ease-in-out'
              }}
            >
              {toggleStates3.lastWeek && <Frame2608475 />}
            </div>

            {/* Second line overlay (line graph) with fade */}
            <div
              className="absolute inset-0"
              style={{
                zIndex: 6,
                opacity: toggleStates3.secondBarGraph ? 1 : 0,
                transition: 'opacity 0.25s ease-in-out',
                pointerEvents: toggleStates3.secondBarGraph ? 'auto' : 'none'
              }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 139" style={{ pointerEvents: 'none' }}>
                <path
                  d={secondLinePath3}
                  stroke="#3D6E8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {secondLinePoints3.map((point) => {
                  const isActive3 = hoveredDate3 ? hoveredDate3 === point.date : point.date === fixedDate3;
                  return (
                    <g key={point.date}>
                      <rect
                        fill="transparent"
                        height="24"
                        width="24"
                        x={point.x - 7}
                        y={point.y - 5}
                        className="cursor-pointer pointer-events-auto"
                        onMouseEnter={() => handleHover3(point.date)}
                        onMouseLeave={() => handleHover3(null)}
                        onClick={() => handleDateClick3(point.date)}
                      />
                      <rect
                        fill="#3D6E8A"
                        height={isActive3 ? 17 : 14}
                        rx={isActive3 ? 8.5 : 7}
                        width={isActive3 ? 17 : 14}
                        x={isActive3 ? point.activeX : point.x}
                        y={isActive3 ? point.activeY : point.y}
                        className="cursor-pointer transition-all"
                        style={{ pointerEvents: 'none' }}
                      />
                      {isActive3 && (
                        <rect
                          height="17"
                          rx="8.5"
                          stroke="#E5F4FB"
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
              </svg>
            </div>

            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 139">
                <g id="Frame 2608472-3">
                  <path d="M 23 97 L 70 54 L 116 79 L 163 59 L 210 17 L 256 79 L 303 64" id="Vector 97-3" stroke="var(--stroke-0, #B9E3F4)" strokeLinecap="round" strokeWidth="3" />

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
                    const isActive3 = hoveredDate3 ? hoveredDate3 === point.date : point.date === fixedDate3;
                    return (
                      <g key={point.date}>
                        <rect
                          fill="transparent"
                          height="24"
                          width="24"
                          x={point.x - 7}
                          y={point.y - 5}
                          className="cursor-pointer pointer-events-auto"
                          onMouseEnter={() => handleHover3(point.date)}
                          onMouseLeave={() => handleHover3(null)}
                          onClick={() => handleDateClick3(point.date)}
                        />
                        <rect
                          fill="var(--fill-0, #B9E3F4)"
                          height={isActive3 ? 17 : 14}
                          rx={isActive3 ? 8.5 : 7}
                          width={isActive3 ? 17 : 14}
                          x={isActive3 ? point.activeX : point.x}
                          y={isActive3 ? point.activeY : point.y}
                          className="cursor-pointer transition-all"
                          style={{ pointerEvents: 'none' }}
                        />
                        {isActive3 && (
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

            {bpmValue3 !== null && goalLineY3 !== null && (
              <div
                className={`absolute left-0 w-full h-[2px] z-20 transition-opacity duration-500 ${goalLineAnimatingOut3 ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  top: `${goalLineY3 - 6}px`,
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
            {hrvValue3 !== null && hrvGoalLineY3 !== null && toggleStates3.sleep && (
              <div
                className={`absolute left-0 w-full h-[2px] z-20 transition-opacity duration-500 ${hrvGoalLineAnimatingOut3 ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  top: `${hrvGoalLineY3}px`,
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
                const isActive3 = hoveredDate3 ? hoveredDate3 === date : date === fixedDate3;
                return (
                  <button
                    key={date}
                    onClick={() => handleDateClick3(date)}
                    onMouseEnter={() => handleHover3(date)}
                    onMouseLeave={() => handleHover3(null)}
                    className="basis-0 grow min-h-px min-w-px relative shrink-0 cursor-pointer"
                  >
                    <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
                      <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative w-full">
                        <div className={`-webkit-box css-j5jd4p font-['Mona_Sans',_sans-serif] font-medium leading-[1.2] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] ${isActive3 ? 'text-[#ffffff]' : 'text-[rgba(255,255,255,0.6)]'} text-center text-nowrap whitespace-pre`}>
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
