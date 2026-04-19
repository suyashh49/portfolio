import React, {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";
import { motion } from "framer-motion";

type FontVariationSettings = string;

type VariableProximityProps = {
  label: string;
  fromFontVariationSettings: FontVariationSettings;
  toFontVariationSettings: FontVariationSettings;
  containerRef: React.RefObject<HTMLElement>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLSpanElement>;

function useAnimationFrameActive(active: boolean, callback: () => void) {
  useEffect(() => {
    if (!active) return;
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [active, callback]);
}

function useMousePositionRef(
  containerRef: React.RefObject<HTMLElement>
): MutableRefObject<{ x: number; y: number }> {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) =>
      updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className = "",
      onClick,
      style,
      ...restProps
    },
    ref
  ) => {
    const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({
      x: null,
      y: null,
    });
    const [active, setActive] = React.useState(false);

    const parsedSettings = useMemo(() => {
      const parseSettings = (settingsStr: string) =>
        new Map<string, number>(
          settingsStr
            .split(",")
            .map((s) => s.trim())
            .map((s) => {
              const [name, value] = s.split(" ");
              return [name.replace(/['"]/g, ""), parseFloat(value)];
            })
        );

      const fromSettings = parseSettings(fromFontVariationSettings);
      const toSettings = parseSettings(toFontVariationSettings);

      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);
    useEffect(() => {
      letterRefs.current.forEach((letterRef) => {
        if (!letterRef) return;
        const settings = parsedSettings
          .map(({ axis, fromValue }) => `"${axis}" ${fromValue.toFixed(2)}`)
          .join(", ");
        letterRef.style.fontVariationSettings = settings;
      });
    }, [parsedSettings]);
    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance: number): number => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case "exponential":
          return norm ** 2;
        case "gaussian":
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case "linear":
        default:
          return norm;
      }
    };

    useEffect(() => {
      if (!containerRef?.current) return;
      const handleEnter = () => setActive(true);
      const handleLeave = () => setActive(false);
      containerRef.current.addEventListener("mouseenter", handleEnter);
      containerRef.current.addEventListener("mouseleave", handleLeave);
      return () => {
        containerRef.current?.removeEventListener("mouseenter", handleEnter);
        containerRef.current?.removeEventListener("mouseleave", handleLeave);
      };
    }, [containerRef]);

    useAnimationFrameActive(active, () => {
      if (!containerRef?.current) return;
      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        return;
      }
      lastPositionRef.current = { x, y };
      const containerRect = containerRef.current.getBoundingClientRect();
      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;
        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
        const distance = calculateDistance(x, y, letterCenterX, letterCenterY);
        const falloffValue = calculateFalloff(distance);
        const interpolatedSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue =
              fromValue + (toValue - fromValue) * falloffValue;
            return `"${axis}" ${interpolatedValue.toFixed(2)}`;
          })
          .join(", ");
        if (interpolatedSettingsRef.current[index] !== interpolatedSettings) {
          interpolatedSettingsRef.current[index] = interpolatedSettings;
          letterRef.style.fontVariationSettings = interpolatedSettings;
        }
      });
    });

    return (
      <span
        ref={ref}
        className={className}
        onClick={onClick}
        style={style}
        {...restProps}
      >
        {label.split("\n").map((line, lineIndex) => (
          <span key={lineIndex} style={{ display: "block" }}>
            {[...line].map((char, i) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const index =
                label
                  .split("\n")
                  .slice(0, lineIndex)
                  .reduce((acc, l) => acc + l.length + 1, 0) + i;

              return (
                <motion.span
                  key={index}
                  ref={(el: HTMLSpanElement | null) => { letterRefs.current[index] = el; }}
                  style={{
                    display: "inline-block",
                    whiteSpace: char === " " ? "pre" : undefined,
                    width: char === " " ? "0.2em" : undefined,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";

export default VariableProximity;
