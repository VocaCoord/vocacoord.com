import { Loadable } from 'utils/components'
import { WORDBANKS_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Wordbanks' */ './components/WordbanksPage')
  })
}
