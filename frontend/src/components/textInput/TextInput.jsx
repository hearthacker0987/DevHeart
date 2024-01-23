import React from 'react'
import styles from './textInput.module.css'
function TextInput(props) {
  return (
    <div className={styles.textInputWrapper}>
      <input  {...props} />
      {props.error && <div className='w-100'><span className={`${styles.errorMessage} text-danger`}>{props.errormessage}</span></div>}
    </div>
    
  )
}

export default TextInput
