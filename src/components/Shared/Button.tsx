// src/components/Shared/Button.tsx

import clsx from "clsx";
import { type ReactNode, type MouseEventHandler, type CSSProperties } from "react";

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: CSSProperties;
  dataTestid?: string;
};

/**
 * Reusable Button component.
 *
 * @param {ReactNode} props.children - The button label.
 * @param {string} [props.className] - Additional class names.
 * @param {MouseEventHandler<HTMLButtonElement>} [props.onClick] - Click handler function.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {CSSProperties} [props.style] - Additional inline styles.
 * @param {string} [props.dataTestid] - The data-testid attribute value.
 * @returns {ReactNode} The rendered component.
 */
const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  style,
  dataTestid,
}: ButtonProps): ReactNode => {
  return (
    <button
      data-testid={`${dataTestid}-btn`}
      className={clsx(
        "rounded-lg border-2 border-slate-200 px-4 py-2 transition",
        disabled ? "cursor-not-allowed opacity-50" : "",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
