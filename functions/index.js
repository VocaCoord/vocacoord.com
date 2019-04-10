const glob = require('glob')
const path = require('path')
const admin = require('firebase-admin')
const functions = require('firebase-functions')

try {
  admin.initializeApp(functions.config().firebase)
} catch (e) {
  console.error(
    'Caught error initializing app with functions.config():',
    e.message || e
  )
}

if (process.env.NODE_ENV !== 'test') {
  admin.firestore().settings({ timestampsInSnapshots: true })
}

const codeFolder = process.env.NODE_ENV === 'test' ? './src' : './dist'

const files = glob.sync(codeFolder + '/**/index.js', {
  cwd: __dirname,
  ignore: [
    './node_modules/**',
    codeFolder + '/utils/**',
    codeFolder + '/constants'
  ]
})

files.forEach(functionFile => {
  const folderName = path
    .basename(path.dirname(functionFile))
    .replace(/[-]/g, '')

  !process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === folderName // eslint-disable-line no-unused-expressions
    ? (exports[folderName] = require(functionFile).default) // eslint-disable-line global-require
    : () => {}
})
