import LinearProgress from '@mui/material/LinearProgress'

import { LoaderWrapper } from './LoaderStyle'

function Loader() {
  return (
    <LoaderWrapper>
      <LinearProgress color="primary" sx={{ height: 2 }} />
    </LoaderWrapper>
  )
}

export default Loader
