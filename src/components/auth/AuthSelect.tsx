type SelectOption = {
  value: string
  label: string
}

type AuthSelectProps = {
  id: string
  label: string
  placeholder: string
  options: SelectOption[]
  hideLabel?: boolean
}

export default function AuthSelect({
  id,
  label,
  placeholder,
  options,
  hideLabel = false,
}: AuthSelectProps) {
  return (
    <div className="auth-field">
      <label className={hideLabel ? 'hidden-label' : ''} htmlFor={id}>
        {label}
      </label>
      <select id={id} defaultValue="" required>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
