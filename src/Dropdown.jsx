import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

/**
 * Dropdown component with keyboard and mouse accessibility.
 *
 * @param {object} props
 * @param {string} props.label - Label displayed above the dropdown.
 * @param {string} props.name - Name attribute of the dropdown.
 * @param {string} props.value - Selected value.
 * @param {(event: { target: { name: string; value: string } }) => void} props.onChange - Callback on selection change.
 * @param {string[]} props.options - Array of string options.
 * @param {string} [props.error] - Optional error message.
 * @returns {JSX.Element}
 */
function Dropdown({ label, name, value, onChange, options, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    /**
     * Close dropdown if clicked outside.
     * @param {MouseEvent} event
     */
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Toggle dropdown open/close state.
   */
  function handleToggle() {
    setIsOpen((open) => !open);
  }

  /**
   * Handle option selection.
   * @param {string} option - Selected option.
   */
  function handleSelect(option) {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  }

  return (
    <div className="lib-dropdown-field" ref={dropdownRef}>
      <label htmlFor={name} className="lib-dropdown-label">
        {label}
      </label>
      <div
        id={name}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${name}-label`}
        className={`lib-dropdown ${error ? "lib-dropdown-invalid" : ""}`}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <span className="lib-dropdown-selected">
          {value || "-- Select an option --"}
        </span>
        <svg
          className={`lib-dropdown-arrow ${isOpen ? "open" : ""}`}
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
        <ul className="lib-dropdown-list" role="listbox" tabIndex={-1}>
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              className={`lib-dropdown-option ${
                value === option ? "lib-dropdown-active" : ""
              }`}
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
      {error && <span className="lib-dropdown-error">{error}</span>}
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
