import { useContext } from 'react'
import './App.css'
import { AuthContext } from './context/authContext'
import SignedInView from './views/SignedInView'
import SignedOutView from './views/SignedOutView'
import LoadingIndicator from './components/LoadingIndicator'
import { initializeApp } from '@firebase/app'
import { firebaseConfig } from './config/firebaseConfig'
import { getWebsiteUrl } from './config/envConfig'

initializeApp(firebaseConfig);

function App() {
  const { user } = useContext(AuthContext)

  const view = () => {
    if (user) {
      return <SignedInView />
    }

    return <SignedOutView />
  }

  const handleHelpClick = async () => {
    const websiteUrl = await getWebsiteUrl() as string;
    window.open(websiteUrl, "_blank");
  }

  return (
    <div className="popup">
      <div className="popup__header">
        <h2>CopyZilla</h2>
        <h3 className="green">Email Assistant</h3>
      </div>
      {view()}
      <div className="popup__footer">
        <p className="description textButton" onClick={() => handleHelpClick()}>Contact us</p>
        <p className="description">© 2023 CopyZilla</p>
      </div>
    </div>
  )
}

export default App


