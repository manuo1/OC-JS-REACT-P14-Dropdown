import React from 'react'
import ReactDOM from 'react-dom/client'
import Dropdown from './Dropdown'

const options = ['Option 1', 'Option 2', 'Option 3']

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ padding: '2rem' }}>
      <Dropdown
        label="Choose an option"
        value="Option 1"
        options={options}
        onChange={(val) => console.log('Selected:', val)}
      />
    </div>
  </React.StrictMode>
)
