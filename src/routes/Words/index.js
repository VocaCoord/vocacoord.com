import { Loadable } from 'utils/components'
import { WORDS_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Words' */ './components/WordsPage')
  })
}
