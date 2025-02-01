import styles from './CustomHeader.module.css';

const CustomHeader = ({ metaData, status, children }) => {
  const mystatus = status ?? (metaData ? metaData.status : 'normal');
  return (
    <div className={`${styles[`customheader-container`]} ${styles[`header-` + mystatus ]}` }>
      <h3>
        <label className={styles.customheader} >
          {children ?? (metaData ? metaData.label : '')} 
          {mystatus === 'required' ? <span className={ styles.requiredmark}>※</span> : ''}
        </label>
      
      </h3>
    </div>
  );
};

export default CustomHeader;