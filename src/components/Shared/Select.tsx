// src/components/Shared/Select.tsx

import clsx from "clsx";
import { Fragment, type ReactElement } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

/**
 * Type representing an option in the select dropdown.
 */
export type SelectOption = {
  label: string;
  value: string;
};

/**
 * Props for the Select component.
 */
export type SelectProps = {
  /** The label for the select element */
  label: string;
  /** The currently selected value */
  value: string;
  /** Function to handle when the selected value changes */
  onChange: (_value: string) => void;
  /** Array of options to display in the select dropdown */
  options: SelectOption[];
  /** Additional CSS classes to apply to the select element */
  className?: string;
  /** Optional placeholder when no value is selected */
  placeholder?: string;
  /** Optional data-testid attribute for testing */
  dataTestid?: string;
};

/**
 * Reusable Select component.
 *
 * @param {SelectProps} props - The props for the component.
 * @returns {ReactElement} The rendered Select component.
 */
const Select = ({
  label,
  value,
  onChange,
  options,
  className,
  placeholder = "Select an option",
  dataTestid,
}: SelectProps): ReactElement => {
  // Find the selected option based on the value
  const selectedOption = options.find((option) => option.value === value) || null;

  return (
    <div className={clsx("w-full", className)} data-testid={dataTestid}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            {label && <Label className="mb-1 block text-gray-700 dark:text-gray-50">{label}</Label>}
            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500">
                <span className="block truncate">
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/95 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <ListboxOption
                      key={option.value}
                      className={({ focus }) =>
                        clsx(
                          focus ? "bg-gray-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-10 pr-4",
                          "mx-2 rounded-md",
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, focus }) => (
                        <>
                          <span
                            className={clsx(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate",
                            )}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span
                              className={clsx(
                                focus ? "text-white" : "text-gray-600",
                                "absolute inset-y-0 left-0 flex items-center pl-3",
                              )}
                            >
                              <FaCheck className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
