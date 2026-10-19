import React from "react";
import { Link } from "react-router-dom";
import "./PillButton.css";

type PillButtonProps = {
  label: string;
  variant?: "primary" | "outline" | "dark" | "light";
  onClick?: () => void;
  to?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const PillButton: React.FC<PillButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  to,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const classes = `pill-button pill-button--${variant} ${className}`.trim();

  const content = (
    <>
      <span className="pill-button__label">{label}</span>
      <span className="pill-button__wipe" aria-hidden="true" />
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};