import { FunctionComponent } from 'react'

// Components
import Header from '../../components/header/header.components'
import CategoriesOverview from '../../components/categories-overview/categories-overview.components'

const ExplorePage: FunctionComponent = () => {
  return (
    <>
      <Header />

      <CategoriesOverview />
    </>
  )
}

export default ExplorePage
