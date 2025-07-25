# oc-js-react-p14-dropdown

React dropdown component to replace jQuery plugin for the HRnet project.

---

## Installation

```bash
npm install oc-js-react-p14-dropdown
```

or with Yarn:

```bash
yarn add oc-js-react-p14-dropdown
```

---

## Usage

```jsx
import React, { useState } from "react";
import Dropdown from "oc-js-react-p14-dropdown/dist/dropdown.es.js";
import "oc-js-react-p14-dropdown/dist/oc-js-react-p14-dropdown.css";

function Example() {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <Dropdown
      label="Select an option"
      name="example"
      value={value}
      onChange={handleChange}
      options={["Option 1", "Option 2", "Option 3"]}
      error={value ? "" : "This field is required."}
    />
  );
}

export default Example;
```

---

## Props

| Prop     | Type             | Required | Description                                 |
| -------- | ---------------- | -------- | ------------------------------------------- |
| label    | string           | yes      | Label displayed above the dropdown          |
| name     | string           | yes      | HTML name attribute                         |
| value    | string           | no       | Selected value                              |
| onChange | function         | yes      | Change handler function                     |
| options  | array of strings | yes      | List of selectable options                  |
| error    | string           | no       | Error message displayed below the dropdown  |

---

## Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/manuo1/oc-js-react-p14-dropdown.git
cd oc-js-react-p14-dropdown
npm install
```

Start dev server:

```bash
npm run dev
```

Build the package:

```bash
npm run build
```

---

## License

MIT © Ton Nom