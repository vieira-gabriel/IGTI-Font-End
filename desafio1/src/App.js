import React, {useState, useEffect} from 'react';

import {getNewTimestamp} from './helpers/dateTimeHelpers';

export default function App() {
  const [clickArray, setCliclArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  });

  const handleClick = () =>{
    const newClickArray = Object.assign([], clickArray);

    newClickArray.push(getNewTimestamp());

    setCliclArray(newClickArray);
  };

  return (
    <div>
      <h1>
        React e <em>Hooks</em>
      </h1>

      <button onClick={handleClick}>clique aqui</button>

      <ul>{clickArray.map(item => {
        return <li key={item}>{item}</li>
      })}</ul>
    </div>
  );
}