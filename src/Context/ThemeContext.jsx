import React, {useContext} from 'react'

const ThemeContext = React.createContext();

export function useDarkTheme() {
  return useContext(ThemeContext);
}

function ThemeWrapper({children}) {
  const [isDark, setIsDark] = React.useState(false);
  const handleToggleTheme = () => {
    setIsDark(!isDark);
  }
  
  return (
   <>
        <ThemeContext.Provider value={{isDark, handleToggleTheme}}>
        {children}
        </ThemeContext.Provider>
   </> 
  )
}

export default ThemeWrapper;