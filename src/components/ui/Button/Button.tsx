import Button from '@mui/material/Button'

interface ButtonKrixxProps {
  variant?: 'outlined' | 'contained'
  text: string
}

function ButtonKrixx({ variant, text }: ButtonKrixxProps) {
  return (
    <Button
      variant={variant}
      sx={{ display: 'none', sm: { display: 'inline-flex' } }}
    >
      {text}
    </Button>
  )
}

export default ButtonKrixx
