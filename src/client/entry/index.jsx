import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import '@xterm/xterm/css/xterm.css'
import '../common/trzsz'
import 'firacode/distr/fira_code.css'
import Main from '../components/main/index.jsx'
import { notification } from 'antd'
notification.config({
  placement: 'bottomRight'
})

const rootElement = createRoot(document.getElementById('container'))
rootElement.render(
  <Main />
)
