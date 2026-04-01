import { useExportPDF } from "../utils/useExportPDF"
import { useHistory } from "../contexts/HistoryContext"
import styles from '../styles/History.module.css'

const ExportPDFButton = () => {
  const { history } = useHistory()
  const { exportPDF } = useExportPDF()

  return (
    <button onClick={exportPDF} disabled={history.length === 0} className={styles.cleanBtn}>
      Exportar PDF
    </button>
  )
}

export default ExportPDFButton