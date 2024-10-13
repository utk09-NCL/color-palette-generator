// src/components/Shared/Button.jsx

import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * Reusable Button component.
 *
 * @param {React.ReactNode} props.children - The button label.
 * @param {string} props.className - Additional class names.
 * @param {function} props.onClick - Click handler function.
 * @param {boolean} props.disabled - Whether the button is disabled.
 * @param {object} props.style - Additional inline styles.
 * @param {string} props.dataTestid - The data-testid attribute value.
 * @returns {JSX.Element} The rendered component.
 */
const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  style,
  dataTestid,
}) => {
  return (
    <button
      data-testid={`${dataTestid}-btn`}
      className={clsx(
        "py-2 px-4 rounded-lg transition border-2 border-slate-200",
        disabled ? "opacity-50 cursor-not-allowed" : "",
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  dataTestid: PropTypes.string,
};

export default Button;
