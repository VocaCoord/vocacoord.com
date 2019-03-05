import { Loadable } from 'utils/components'

export default {
  path: ':wordbankId',
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Words2' */ './components/WordsPage')
  })
}
