import { RecoilRoot } from 'recoil';
import './App.css';
import Routes from "./routes"
import DebugObserver from './components/DebugObserver';
import { initRecoilState } from "./recoil/utils"

function App() {
  return (
    <RecoilRoot initializeState={initRecoilState}>
      <DebugObserver />
      <Routes />
    </RecoilRoot>
  )
}

export default App;
