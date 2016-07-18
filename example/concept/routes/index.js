import { createCrudRoutes } from 'recrudx'
import * as schemas from '../schemas'
import * as sources from '../sources'

const crudRoutes = createCrudRoutes({ schemas, sources })

export default (
  <Route path="/" component={Container.Main}>
    {crudRoutes}
  </Route>
)
