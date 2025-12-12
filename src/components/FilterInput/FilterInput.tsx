import '../../styles/FilterInput.css'

interface FilterInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

const FilterInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: FilterInputProps) => {
  return (
    <div className="filter-input">
      {label && <label className="filter-input__label">{label}</label>}
      <input
        type={type}
        className="filter-input__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid="filter-input"
      />
    </div>
  )
}

export default FilterInput

