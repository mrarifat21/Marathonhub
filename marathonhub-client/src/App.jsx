import React from 'react';
import ThemeChanger from './components/ThemeChanger';


  
const App = () => {
return(

<>
<h2 className='dark:text-amber-400 text-green-300'>Marathon hub</h2>
  <div className='flex justify-center-safe'>
    <ThemeChanger></ThemeChanger>
    </div>

</>
)
};

export default App;