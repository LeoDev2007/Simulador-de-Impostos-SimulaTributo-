import { useState } from 'react'
import FormICMS from './FormICMS';
import FormIPVA from './FormIPVA';
import styles from '../styles/Form.module.css'

type typeTax = 'ICMS' | 'IPVA';

const Property_RealEstate = () => {

  const [type, setType] = useState<typeTax>('ICMS')
  return (
    <div>
      <div >
      <select value={type} onChange={(e) => setType(e.target.value as typeTax)} className={styles.select } style={{marginBottom: '1rem'}}>
        <option value="ICMS">ICMS</option>
        <option value="IPVA">IPVA</option>
      </select>

       {type === 'ICMS' && <FormICMS />}
       {type === 'IPVA' && <FormIPVA />}  
    </div>
    </div>
  )
}

export default Property_RealEstate