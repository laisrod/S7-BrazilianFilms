import '../../styles/FilterSelect.css'
import type { FilterOption } from '../../types'

interface FilterSelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
  placeholder?: string
}

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Todos',
}: FilterSelectProps) => {
  return (
    <div className="filter-select">
      {label && <label className="filter-select__label">{label}</label>}
      <select
        className="filter-select__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="filter-select"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelect

