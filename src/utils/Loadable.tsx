import { Suspense, type ComponentProps, type ElementType } from 'react'
import Loader from '@/components/ui/Loader'

const Loadable =
  (Component: ElementType) => (props: ComponentProps<typeof Component>) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )

export default Loadable
