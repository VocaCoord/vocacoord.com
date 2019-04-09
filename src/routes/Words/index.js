import { Loadable } from 'utils/components'

export default {
  path: ':wordbankId',
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Words' */ './components/WordsPage')
  })
}
