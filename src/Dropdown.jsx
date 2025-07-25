import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Dropdown.module.scss";

function Dropdown({ label, name, value, onChange, options, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggle() {
    setIsOpen((open) => !open);
  }

  function handleSelect(option) {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  }

  return (
    <div className={styles.field} ref={dropdownRef}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div
        id={name}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${name}-label`}
        className={`${styles.dropdown} ${error ? styles.invalid : ""}`}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <span className={styles.selected}>{value || "-- Select an option --"}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          width="12"
          height="12"
          aria-hidden="true"
        >
          <path d="M6 8L2 4h8L6 8z" fill="currentColor" />
        </svg>
      </div>
      {isOpen && (
        <ul className={styles.optionsList} role="listbox" tabIndex={-1}>
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              className={`${styles.option} ${value === option ? styles.active : ""}`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(option);
                }
              }}
              tabIndex={0}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string,
};

Dropdown.defaultProps = {
  value: "",
  error: "",
};

export default Dropdown;
