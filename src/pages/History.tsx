import { useHistory } from "../contexts/HistoryContext"
import styles from "../styles/History.module.css"
import ExportPDFButton from "../components/exportPDFButton"

const History = () => {
  const { history, cleanHistory } = useHistory()

  return (
    <div className={styles.container}>
      <h2>Histórico de Simulações</h2>
      {history.length > 0 && (
        <>
          <button onClick={cleanHistory} className={styles.cleanBtn}>
            Excluir Histórico
          </button>
          <ExportPDFButton />
        </>
      )}

      {history.length === 0 && <p>Nenhum cálculo realizado ainda</p>}

      <ul className={styles.boxes}>
        {history.map((item, index) => (
          <li key={index} className={styles.list}>
            <span className={styles.date}>
              {new Date(item.dateOfItem).toLocaleDateString("pt-BR")} —{" "}
              {item.type}
            </span>

            <div className={styles.grid}>
              {item.type === "IR" && (
                <>
                  <div>
                    <span>Salário</span>
                    <strong>{item.salary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>INSS</span>
                    <strong>{item.inss.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>Imposto de Renda</span>
                    <strong>{item.ir.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>Salário líquido</span>
                    <strong>{item.netSalary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  {(item.dependents ?? 0) > 0 && (
                    <div>
                      <span>Dependentes</span>
                      <strong>{item.dependents}</strong>
                    </div>
                  )}
                </>
              )}

              {item.type === "IPVA" && (
                <>
                  <div>
                    <span>Valor do veículo</span>
                    <strong>{item.vehicleValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>IPVA</span>
                    <strong>{item.ipva.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>Valor líquido</span>
                    <strong>{item.netValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>Alíquota</span>
                    <strong>{item.rate}%</strong>
                  </div>
                  <div>
                    <span>Tipo de veículo</span>
                    <strong>{item.vehicleType}</strong>
                  </div>
                </>
              )}

              {item.type === "ICMS" && (
                <>
                  <div>
                    <span>Valor da mercadoria</span>
                    <strong>{item.merchandiseValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>ICMS</span>
                    <strong>{item.icms.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>Valor sem ICMS</span>
                    <strong>{item.valueWithoutICMS.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                  </div>
                  <div>
                    <span>Alíquota</span>
                    <strong>{item.ratePercent}%</strong>
                  </div>
                  <div>
                    <span>Operação</span>
                    <strong>{item.operation === "internal" ? "Interno" : "Interestadual"}</strong>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History