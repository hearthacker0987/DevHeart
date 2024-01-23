import React from 'react'
import styles from './textarea.module.css'
function Textarea(props) {
  return (
    <>
        <div className={styles.textareaWrapper}>
            <textarea {...props}></textarea>
            {props.error && <span className={`${styles.errorMessage} text-danger`}>{props.errormessages}</span>}
        </div>
    </>
  )
}

export default Textarea
