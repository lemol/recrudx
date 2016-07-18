import { createActionCreators } from 'recrudx'
import * as schemas from '../schemas'
import * as sources from '../sources'

export default createActionCreators({ schemas, sources })

