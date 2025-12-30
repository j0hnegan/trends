import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, EyeOff, Eye } from 'lucide-react';
import { Resizable } from 're-resizable';
import { Switch } from './ui/switch';

interface ElementInfo {
  tagName: string;
  id: string;
  className: string;
  inlineStyles: { property: string; value: string }[];
  computedStyles: { property: string; value: string }[];
  selector: string;
}

interface SelectedProperty {
  section: string;
  property: string;
  value: string;
}

const KEY_STYLES = [
  'display', 'position', 'width', 'height', 'margin', 'padding',
  'background', 'background-color', 'color', 'font-family', 'font-size',
  'font-weight', 'line-height', 'border', 'border-radius', 'flex',
  'flex-direction', 'justify-content', 'align-items', 'gap', 'grid',
  'grid-template-columns', 'grid-gap', 'z-index', 'opacity', 'transform', 'transition'
];

// Extract CSSPropertyRow outside to prevent recreation on every render
function CSSPropertyRow({
  property,
  value,
  section,
  color,
  isHovered,
  isCopied,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  property: string;
  value: string;
  section: string;
  color: string;
  isHovered: boolean;
  isCopied: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`relative flex items-center justify-between px-3 py-1.5 cursor-pointer transition-colors group ${
        isSelected
          ? 'bg-purple-500/30 border border-purple-400/50'
          : isHovered
          ? 'bg-white/10'
          : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      data-devtools
    >
      <div className="flex gap-1 font-mono text-[12px]">
        <span className={color}>{property}</span>
        <span className="text-zinc-400">:</span>
        <span className="text-zinc-300">{value}</span>
        <span className="text-zinc-400">;</span>
      </div>
      <div className="flex items-center gap-2">
        {isHovered && !isCopied && (
          <Copy className="w-3 h-3 text-zinc-400" />
        )}
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1"
          >
            <Check className="w-3 h-3 text-green-400" />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -40] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute right-2 top-0 bg-green-500 text-white px-2 py-1 rounded text-[10px] pointer-events-none"
            style={{ zIndex: 10000 }}
            data-devtools
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DevTools() {
  const [devMode, setDevMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<{ section: string; property: string } | null>(null);
  const [copiedProperty, setCopiedProperty] = useState<{ section: string; property: string } | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: window.innerHeight - 692 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedProperties, setSelectedProperties] = useState<SelectedProperty[]>([]);
  const [size, setSize] = useState({ width: 400, height: 600 });

  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const minimizedButtonRef = useRef<HTMLDivElement>(null);
  const copiedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Copy to clipboard helper
  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        // Fallback
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textarea);
  };

  // Generate element selector
  const getElementSelector = (element: HTMLElement): string => {
    if (element.id) return `#${element.id}`;
    if (element.className) {
      // Handle both string and SVGAnimatedString
      const classNameStr = typeof element.className === 'string' 
        ? element.className 
        : element.className.baseVal || '';
      const classes = classNameStr.split(' ').filter(c => c.trim());
      if (classes.length > 0) {
        return `.${classes[0]}`;
      }
    }
    return element.tagName.toLowerCase();
  };

  // Extract element info
  const getElementInfo = (element: HTMLElement): ElementInfo => {
    const computed = window.getComputedStyle(element);
    const inlineStyles: { property: string; value: string }[] = [];
    
    // Get inline styles
    if (element.style.length > 0) {
      for (let i = 0; i < element.style.length; i++) {
        const property = element.style[i];
        const value = element.style.getPropertyValue(property);
        if (value) {
          inlineStyles.push({ property, value });
        }
      }
    }

    // Get computed styles
    const computedStyles: { property: string; value: string }[] = [];
    for (let i = 0; i < computed.length; i++) {
      const property = computed[i];
      const value = computed.getPropertyValue(property);
      computedStyles.push({ property, value });
    }

    // Handle both string and SVGAnimatedString for className
    const classNameStr = typeof element.className === 'string' 
      ? element.className 
      : element.className?.baseVal || '';

    return {
      tagName: element.tagName.toLowerCase(),
      id: element.id || '',
      className: classNameStr,
      inlineStyles,
      computedStyles: computedStyles.sort((a, b) => a.property.localeCompare(b.property)),
      selector: getElementSelector(element),
    };
  };

  // Handle element selection
  useEffect(() => {
    if (!devMode) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Ignore clicks on DevTools UI
      if (
        target.closest('[data-devtools]') ||
        overlayRef.current?.contains(target) ||
        sidebarRef.current?.contains(target) ||
        minimizedButtonRef.current?.contains(target)
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const info = getElementInfo(target);
      setSelectedElement(info);
      setSidebarOpen(true);
      setIsMinimized(false);
      setSelectedProperties([]); // Clear selection when selecting new element
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Ignore DevTools UI
      if (
        target.closest('[data-devtools]') ||
        overlayRef.current?.contains(target) ||
        sidebarRef.current?.contains(target) ||
        minimizedButtonRef.current?.contains(target)
      ) {
        if (hoveredElement) {
          hoveredElement.style.outline = '';
          hoveredElement.style.outlineOffset = '';
          setHoveredElement(null);
        }
        return;
      }

      if (hoveredElement && hoveredElement !== target) {
        hoveredElement.style.outline = '';
        hoveredElement.style.outlineOffset = '';
      }

      target.style.outline = '2px solid #3b82f6';
      target.style.outlineOffset = '2px';
      setHoveredElement(target);
    };

    const handleMouseLeave = () => {
      if (hoveredElement) {
        hoveredElement.style.outline = '';
        hoveredElement.style.outlineOffset = '';
        setHoveredElement(null);
      }
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (hoveredElement) {
        hoveredElement.style.outline = '';
        hoveredElement.style.outlineOffset = '';
      }
    };
  }, [devMode, hoveredElement]);

  // Auto-open inspector when dev mode is enabled
  useEffect(() => {
    if (devMode) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
      setIsMinimized(false);
      setSelectedElement(null);
    }
  }, [devMode]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragStartPos) return;

    const deltaX = Math.abs(e.clientX - dragStartPos.x);
    const deltaY = Math.abs(e.clientY - dragStartPos.y);

    // 5px threshold to distinguish drag from click
    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragStartPos(null);
    setIsDragging(false);
  };

  useEffect(() => {
    if (dragStartPos) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragStartPos, dragOffset]);

  // Copy property handler
  const handleCopyProperty = (section: string, property: string, value: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Shift+click for multi-select
    if (e.shiftKey) {
      const propertyKey = `${section}-${property}`;
      const exists = selectedProperties.some(
        p => `${p.section}-${p.property}` === propertyKey
      );

      if (exists) {
        setSelectedProperties(selectedProperties.filter(
          p => `${p.section}-${p.property}` !== propertyKey
        ));
      } else {
        setSelectedProperties([...selectedProperties, { section, property, value }]);
      }
      return;
    }

    // Regular click - copy single property
    const text = `${property}: ${value};`;
    copyToClipboard(text);
    setCopiedProperty({ section, property });
    
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = setTimeout(() => {
      setCopiedProperty(null);
    }, 1000);
  };

  // Copy section handler
  const handleCopySection = (section: string, styles: { property: string; value: string }[]) => {
    const text = styles.map(s => `  ${s.property}: ${s.value};`).join('\n');
    copyToClipboard(text);
    setCopiedSection(section);
    
    setTimeout(() => {
      setCopiedSection(null);
    }, 500);
  };

  // Copy all styles handler
  const handleCopyAllStyles = () => {
    if (selectedProperties.length > 0) {
      // Copy selected properties only (raw CSS)
      const text = selectedProperties.map(p => `${p.property}: ${p.value};`).join('\n');
      copyToClipboard(text);
      setSelectedProperties([]); // Clear selection after copying
    } else if (selectedElement) {
      // Copy all styles with selector wrapper
      const text = `${selectedElement.selector} {\n${selectedElement.computedStyles
        .map(s => `  ${s.property}: ${s.value};`)
        .join('\n')}\n}`;
      copyToClipboard(text);
    }
  };

  // Get key styles with filtering
  const getKeyStyles = () => {
    if (!selectedElement) return [];
    return selectedElement.computedStyles
      .filter(s => 
        KEY_STYLES.includes(s.property) &&
        s.value !== 'none' &&
        s.value !== '0px' &&
        s.value !== 'normal'
      );
  };

  if (!devMode) {
    return (
      <div
        ref={overlayRef}
        className="fixed left-6 bottom-6 z-[9999]"
        data-devtools
      >
        <div className="bg-gradient-to-r from-[#5127c4] to-[#9f27c4] rounded-[7px] px-4 py-2 flex items-center gap-3 shadow-lg">
          <span className="text-white font-medium text-[12px]">Dev Mode</span>
          <button
            onClick={() => setDevMode(!devMode)}
            className={`relative h-[20px] w-[40px] rounded-[20px] transition-colors shrink-0 overflow-hidden block ${
              devMode ? 'bg-[#c87ce4] border-2 border-[#c87ce4]' : 'bg-zinc-400 border-2 border-zinc-400'
            }`}
            data-devtools
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full transition-transform ${
                devMode ? 'bg-[#d9a6ed] translate-x-[21px]' : 'bg-white translate-x-[1px]'
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toggle Button */}
      <div
        ref={overlayRef}
        className="fixed left-6 bottom-6 z-[9999]"
        data-devtools
      >
        <div className="bg-gradient-to-r from-[#5127c4] to-[#9f27c4] rounded-[7px] px-4 py-2 flex items-center gap-3 shadow-lg">
          <span className="text-white font-medium text-[12px]">Dev Mode</span>
          <button
            onClick={() => setDevMode(!devMode)}
            className={`relative h-[20px] w-[40px] rounded-[20px] transition-colors shrink-0 overflow-hidden block ${
              devMode ? 'bg-[#c87ce4] border-2 border-[#c87ce4]' : 'bg-zinc-400 border-2 border-zinc-400'
            }`}
            data-devtools
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full transition-transform ${
                devMode ? 'bg-[#d9a6ed] translate-x-[21px]' : 'bg-white translate-x-[1px]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Minimized Button */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            ref={minimizedButtonRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed left-6 bottom-[92px] z-[9998]"
            data-devtools
          >
            <button
              onClick={() => setIsMinimized(false)}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-colors border border-white/10"
              data-devtools
            >
              <Eye className="w-4 h-4" />
              <span className="text-[12px] font-medium">Show Inspector</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inspector Panel */}
      <AnimatePresence>
        {sidebarOpen && !isMinimized && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              zIndex: 9998,
            }}
            data-devtools
          >
            <Resizable
              size={size}
              onResizeStop={(e, direction, ref, d) => {
                setSize({
                  width: size.width + d.width,
                  height: size.height + d.height,
                });
              }}
              minWidth={280}
              minHeight={400}
              maxWidth={800}
              maxHeight={window.innerHeight - 40}
              enable={{
                right: true,
                bottom: true,
                bottomRight: true,
              }}
              handleStyles={{
                right: {
                  width: '8px',
                  right: 0,
                  background: 'transparent',
                  cursor: 'ew-resize',
                },
                bottom: {
                  height: '8px',
                  bottom: 0,
                  background: 'transparent',
                  cursor: 'ns-resize',
                },
                bottomRight: {
                  width: '12px',
                  height: '12px',
                  right: 0,
                  bottom: 0,
                  background: 'transparent',
                  cursor: 'nwse-resize',
                },
              }}
              handleClasses={{
                right: 'hover:bg-white/20 transition-colors',
                bottom: 'hover:bg-white/20 transition-colors',
                bottomRight: 'hover:bg-white/20 transition-colors',
              }}
            >
              <div
                ref={sidebarRef}
                className="w-full h-full bg-[rgba(0,0,0,0.85)] backdrop-blur-[6px] border-2 border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden"
                data-devtools
              >
                {/* Header */}
                <div
                  className="bg-[rgba(0,0,0,0.6)] px-4 py-3 flex items-center justify-between cursor-move border-b border-zinc-800"
                  onMouseDown={handleMouseDown}
                  data-devtools
                >
                  <div className="font-mono text-[12px] text-zinc-400">
                    {selectedElement?.selector || 'No element selected'}
                  </div>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="text-zinc-400 hover:text-white transition-colors"
                    data-devtools
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto text-[12px]" data-devtools>
                  {!selectedElement ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8" data-devtools>
                      <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4" data-devtools>
                        <Eye className="w-8 h-8 text-zinc-600" />
                      </div>
                      <h3 className="text-white font-medium mb-2">No Element Selected</h3>
                      <p className="text-zinc-500 text-[12px]">
                        Click on any element on the page to inspect its styles and properties
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Element Info */}
                      <div className="border-b border-zinc-800 p-4" data-devtools>
                        <div className="flex items-center gap-2 mb-2" data-devtools>
                          <span className="text-blue-400 font-mono">&lt;{selectedElement.tagName}&gt;</span>
                          {selectedElement.id && (
                            <span className="text-green-400 font-mono">#{selectedElement.id}</span>
                          )}
                        </div>
                        {selectedElement.className && (
                          <div className="flex flex-wrap gap-1" data-devtools>
                            {selectedElement.className.split(' ').filter(c => c.trim()).map((cls, i) => (
                              <span
                                key={i}
                                className="text-yellow-400 font-mono bg-yellow-400/10 px-2 py-1 rounded text-[11px]"
                                data-devtools
                              >
                                .{cls}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Inline Styles */}
                      {selectedElement.inlineStyles.length > 0 && (
                        <div className="border-b border-zinc-800" data-devtools>
                          <div className="px-4 py-2 flex items-center justify-between bg-zinc-900/50" data-devtools>
                            <div className="flex items-center gap-2" data-devtools>
                              <div className="w-2 h-2 rounded-full bg-purple-500" data-devtools />
                              <span className="text-white font-medium">Inline Styles</span>
                            </div>
                            <button
                              onClick={() => handleCopySection('inline', selectedElement.inlineStyles)}
                              className="text-zinc-400 hover:text-white transition-colors"
                              data-devtools
                            >
                              {copiedSection === 'inline' ? (
                                <Check className="w-3 h-3 text-green-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <div data-devtools>
                            {selectedElement.inlineStyles.map((style, i) => (
                              <CSSPropertyRow
                                key={i}
                                property={style.property}
                                value={style.value}
                                section="inline"
                                color="text-purple-400"
                                isHovered={hoveredProperty?.section === 'inline' && hoveredProperty?.property === style.property}
                                isCopied={copiedProperty?.section === 'inline' && copiedProperty?.property === style.property}
                                isSelected={selectedProperties.some(
                                  p => p.section === 'inline' && p.property === style.property
                                )}
                                onMouseEnter={() => setHoveredProperty({ section: 'inline', property: style.property })}
                                onMouseLeave={() => setHoveredProperty(null)}
                                onClick={(e) => handleCopyProperty('inline', style.property, style.value, e)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Styles */}
                      {getKeyStyles().length > 0 && (
                        <div className="border-b border-zinc-800" data-devtools>
                          <div className="px-4 py-2 flex items-center justify-between bg-zinc-900/50" data-devtools>
                            <div className="flex items-center gap-2" data-devtools>
                              <div className="w-2 h-2 rounded-full bg-blue-500" data-devtools />
                              <span className="text-white font-medium">Key Styles</span>
                            </div>
                            <button
                              onClick={() => handleCopySection('key', getKeyStyles())}
                              className="text-zinc-400 hover:text-white transition-colors"
                              data-devtools
                            >
                              {copiedSection === 'key' ? (
                                <Check className="w-3 h-3 text-green-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <div data-devtools>
                            {getKeyStyles().map((style, i) => (
                              <CSSPropertyRow
                                key={i}
                                property={style.property}
                                value={style.value}
                                section="key"
                                color="text-blue-400"
                                isHovered={hoveredProperty?.section === 'key' && hoveredProperty?.property === style.property}
                                isCopied={copiedProperty?.section === 'key' && copiedProperty?.property === style.property}
                                isSelected={selectedProperties.some(
                                  p => p.section === 'key' && p.property === style.property
                                )}
                                onMouseEnter={() => setHoveredProperty({ section: 'key', property: style.property })}
                                onMouseLeave={() => setHoveredProperty(null)}
                                onClick={(e) => handleCopyProperty('key', style.property, style.value, e)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* All Computed Styles */}
                      <details className="border-b border-zinc-800" data-devtools>
                        <summary className="px-4 py-2 flex items-center justify-between bg-zinc-900/50 cursor-pointer" data-devtools>
                          <div className="flex items-center gap-2" data-devtools>
                            <div className="w-2 h-2 rounded-full bg-zinc-600" data-devtools />
                            <span className="text-white font-medium">
                              All Computed Styles ({selectedElement.computedStyles.length})
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleCopySection('all', selectedElement.computedStyles);
                            }}
                            className="text-zinc-400 hover:text-white transition-colors"
                            data-devtools
                          >
                            {copiedSection === 'all' ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </summary>
                        <div className="max-h-[400px] overflow-y-auto" data-devtools>
                          {selectedElement.computedStyles.map((style, i) => (
                            <CSSPropertyRow
                              key={i}
                              property={style.property}
                              value={style.value}
                              section="all"
                              color="text-zinc-400"
                              isHovered={hoveredProperty?.section === 'all' && hoveredProperty?.property === style.property}
                              isCopied={copiedProperty?.section === 'all' && copiedProperty?.property === style.property}
                              isSelected={selectedProperties.some(
                                p => p.section === 'all' && p.property === style.property
                              )}
                              onMouseEnter={() => setHoveredProperty({ section: 'all', property: style.property })}
                              onMouseLeave={() => setHoveredProperty(null)}
                              onClick={(e) => handleCopyProperty('all', style.property, style.value, e)}
                            />
                          ))}
                        </div>
                      </details>
                    </>
                  )}
                </div>

                {/* Copy All Button */}
                {selectedElement && (
                  <div className="sticky bottom-0 p-4 border-t border-zinc-800" data-devtools>
                    <button
                      onClick={handleCopyAllStyles}
                      className="w-full bg-gradient-to-r from-[#5127c4] to-[#9f27c4] text-white py-2 px-4 rounded-lg font-medium text-[12px] hover:opacity-90 transition-opacity text-center"
                      data-devtools
                    >
                      {selectedProperties.length > 0
                        ? `Copy Styles (${selectedProperties.length})`
                        : 'Copy All Styles'}
                    </button>
                  </div>
                )}
              </div>
            </Resizable>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
