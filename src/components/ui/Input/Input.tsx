import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

import type { OutlinedInputProps } from '@mui/material/OutlinedInput'

interface InputMUIProps {
  type?: string
  error?: string
  placeholder: string
  Icon: React.ElementType
  field: OutlinedInputProps
}

function InputMUI(props: InputMUIProps) {
  const { Icon, field, error, placeholder, type } = props
  return (
    <FormControl variant="outlined" error={!!error} fullWidth>
      <OutlinedInput
        {...field}
        size="small"
        type={type}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <Icon sx={{ fontSize: 18 }} />
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ mx: 0 }}>{error}</FormHelperText>
    </FormControl>
  )
}

export default InputMUI
