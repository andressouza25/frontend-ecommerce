import { FunctionComponent, useState } from 'react'

interface AppProps {
  message?: string
}

const App: FunctionComponent<AppProps> = ({ message }) => {
  const [name, setName] = useState<string>()

  return <h1>Hello World!</h1>
}

export default App
