import { Loadable } from 'utils/components'
import { IMAGES_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Images' */ './components/ImagesPage')
  })
}
