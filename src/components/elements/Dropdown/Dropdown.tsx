import React from "react"
import { DropdownProps, StringArray, TOption } from "./Dropdown.types"
import * as El from "./Dropdown.styled"
import { ThemeCtx } from "../../../contexts/ThemeCtx";
import Checkbox from "../Checkbox";

const Dropdown: React.FC<DropdownProps> = (props) => {
  const ref = React.useRef<null | HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selected, setSelected] = React.useState<string | number | null>(null)
  const [checked, setChecked] = React.useState<(string | number)[]>([])
  const options = Array.isArray(props.options) ? props.options : []

  React.useEffect(() => {
    const listener = (event: any) => {
      if (!ref?.current || ref?.current?.contains(event.target)) return
      setIsOpen(false);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.addEventListener("keyup", listener);
    };
  }, [ref]);

  React.useEffect(() => {
    setSelected(props.value!);
  }, [props.value]);

  React.useEffect(() => {
    if (props.disabled) {
      setIsOpen(false)
      setSearch("")
      setSelected(null)
    }
  }, [props.disabled])


  const onClickOption = (newValue: TOption) => {
    switch (props.type) {
      case "SINGLE": {
        setSearch("")
        setSelected(newValue.value);
        props.onChange!(newValue.value);
        setIsOpen(false);
        break
      }
      case "MULTIPLE": {
        props.onChange!(checked.includes(newValue.value) ? checked.filter((val) => val !== newValue.value) : [...checked, newValue.value])
        setChecked((prevState) => prevState.includes(newValue.value) ? prevState.filter((val) => val !== newValue.value) : [...prevState, newValue.value])
        break
      }
      default:
        break;
    }
  };

  const onClickDropdown = () => {
    setSearch("");
    if (!props.disabled) {
      setIsOpen(!isOpen);
    }
  };

  const onKeyDownDropdown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      onClickDropdown();
    }
  };

  const onKeyDownOption = (e: React.KeyboardEvent<HTMLLIElement>, value: TOption) => {
    if (e.key === " ") {
      e.preventDefault();
      onClickOption(value);
    }
  };

  const filterOptions = options?.filter((val) => {
    return props.searchKeys!.length > 0 ? props.searchKeys!.some((key) => String((val as StringArray)[key])?.toLowerCase()?.includes(search?.toLowerCase())) : true;
  });

  return (
    <El.Main className={`Dropdown-root ${props.className}`} ref={ref!} width={props.width}>
      <El.Dropdown className="DropdownSelected-root" isSelected={!!options.find((val) => val.value === selected)} onClick={onClickDropdown} isOpen={isOpen} tabIndex={props.disabled ? undefined : 0} onKeyDown={onKeyDownDropdown} disabled={props.disabled}>
        <div className="label">{props.label}</div>
        {props.type === "SINGLE" && <p className="value">{props.renderSelected!(options.find((val) => val.value === selected)!!)}</p>}
        {props.type === "MULTIPLE" && <p className="value">{props.renderSelected!(`${checked.length} items selected`)}</p>}
        {props.placeholder && <p className="placeholder">{props.placeholder}</p>}
        <ChevronUp />
      </El.Dropdown>
      {!isOpen && props.helperText && (
        <El.HelperText error={props.error}>
          {props.error && <DropdownWarning />}
          {props.helperText}
        </El.HelperText>
      )}
      <El.Options isOpen={isOpen} className="DropdownOptions-root" maxHeight={props.maxHeight}>
        {props.withSearch && options.length > 0 && (
          <div className="search">
            <Search />
            <input type="text" value={search} placeholder="Pencarian.." onChange={(e) => setSearch(e.target.value)} />
          </div>
        )}
        {filterOptions.length === 0 && (
          <div className="no-data">No Data</div>
        )}
        <div className="options-scroll">
          {filterOptions.length > 0 && options.map((option) => (
            <El.Option
              key={option.value}
              className="DropdownOption-root"
              selected={option.value === selected}
              onClick={() => onClickOption(option)}
              onKeyDown={(e) => onKeyDownOption(e, option)}
              show={filterOptions.some((val) => val.value === option.value)}
              tabIndex={0}
              disabled={option.disabled}
            >
              <div className="label-wrapper">
                <Checkbox checked={checked.includes(option?.value)} />
                {props.renderOption!(option)}
              </div>
              {option.value === selected && <CheckOutline />}
            </El.Option>
          ))}
        </div>
      </El.Options>
    </El.Main>
  );
};

Dropdown.defaultProps = {
  label: "Caption",
  placeholder: "Placeholder",
  disabled: false,
  withSearch: false,
  onChange: (value) => value,
  searchKeys: ["label", "value"],
  type: "SINGLE",
  options: [],
  error: false,
  width: "300px",
  className: "",
  renderSelected: (value) => value?.label!!,
  renderOption: (value) => value?.label!!
};

export default Dropdown;

const CheckOutline = () => {
  const { theme } = React.useContext(ThemeCtx)
  return (
    <svg viewBox="0 0 512 512" width={20}><path fill="none" stroke={theme?.colors?.primary?.default} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M416 128L192 384l-96-96" />
    </svg>
  )
}

const DropdownWarning = () => {
  const { theme } = React.useContext(ThemeCtx)
  return (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.99996 2.5886V6.80238M6.99996 8.33466V8.71774M1.18622 8.47934L6.0238 1.02776C6.48064 0.324077 7.51941 0.32408 7.97625 1.02777L12.8138 8.47934C13.3103 9.24416 12.7557 10.25 11.8376 10.25H2.16244C1.24426 10.25 0.689701 9.24415 1.18622 8.47934Z" stroke={theme?.colors?.stateColor?.red?.medium} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ChevronUp = () => {
  const { theme } = React.useContext(ThemeCtx)
  return (
    <svg viewBox="0 0 512 512" width={20} className="end-icon"><path fill="none" stroke={theme?.colors?.primary?.default} strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 328l144-144 144 144" />
    </svg>
  )
}

const Search = () => {
  const { theme } = React.useContext(ThemeCtx)
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.14807 9.11811C9.98386 8.27481 10.5001 7.11428 10.5001 5.83317C10.5001 3.25584 8.41074 1.1665 5.83341 1.1665C3.25609 1.1665 1.16675 3.25584 1.16675 5.83317C1.16675 8.4105 3.25609 10.4998 5.83341 10.4998C7.12964 10.4998 8.30243 9.97136 9.14807 9.11811ZM9.14807 9.11811L12.8334 12.8332" stroke={theme?.colors?.text?.medium} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}