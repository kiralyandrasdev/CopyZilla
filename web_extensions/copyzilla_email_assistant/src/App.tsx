import { useContext } from 'react'
import './App.css'
import { AuthContext } from './context/authContext'
import SignedInView from './views/SignedInView'
import SignedOutView from './views/SignedOutView'
import LoadingIndicator from './components/LoadingIndicator'
import { initializeApp } from '@firebase/app'
import { firebaseConfig } from './config/firebaseConfig'

initializeApp(firebaseConfig);

function App() {
  const { user } = useContext(AuthContext)

  const view = () => {
    if (user) {
      return <SignedInView />
    }

    return <SignedOutView />
  }

  return (
    <div className="popup">
      <div className="popup__header">
        <h2>CopyZilla</h2>
        <h3 className="green">Email Assistant</h3>
      </div>
      {view()}
      <div className="popup__footer">
        <p className="description textButton" onClick={() => window.open("https://copyzilla.hu/contact", "_blank")}>Segítségre van szükséged?</p>
        <p className="description">© 2023 CopyZilla</p>
      </div>
    </div>
  )
}

export default App


