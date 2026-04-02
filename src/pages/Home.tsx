
import styles from "../styles/Home.module.css"
import CalculateForm from "../components/CalculateForm"
import { useIR } from "../contexts/IRContext"
import { useICMS } from "../contexts/ICMSContext"
import { useIPVA } from "../contexts/IPVAContext"
import { useActiveTax } from "../contexts/ActiveTaxContext"
import DialogText from "../components/DialogText"

const Home = () => {
  const { lastCalculation } = useActiveTax()
  const { resultIR } = useIR()
  const { resultICMS } = useICMS()
  const { resultIPVA } = useIPVA()

  return (
    <div className={styles.container}>
      <div className={styles.homeTitle}>
        <h2>Bem Vindo ao SimulaTributo!</h2>
      </div>
      <div className={styles.homeSubTitle}>
        <h3>Grátis e sem cadastro.</h3>
      </div>
      <div className={styles.homeText}>
        <p>
          Com este simulador, você pode calcular rapidamente os principais
          impostos brasileiros, como IR, INSS, IPVA e ICMS, sem precisar fazer
          contas complicadas. Basta informar seu salário ou o valor de um bem, e
          o sistema mostrará quanto será descontado de imposto e qual será o
          valor final líquido. Explore os gráficos e descubra como os impostos
          impactam seus ganhos ou investimentos, de forma simples e visual!
        </p>
      </div>

      <div className={styles.homeTitle2}>
        <h3>Calcule Agora</h3>
      </div>
      <div className={styles.homeForm}>
        <CalculateForm />
      </div>
      <div className={styles.homeTitle2}>
        <DialogText />
      </div>
      <div className={styles.resultContainer}>
        {!lastCalculation && <p>Nenhum cálculo realizado ainda</p>}

        {lastCalculation === "IR" && resultIR && (
          <div className={styles.resultBox}>
            <p className={styles.item1}>INSS: {resultIR.inss.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            <p className={styles.item2}>IR: {resultIR.ir.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            <p className={styles.item3}>
              Salário Líquido: R${resultIR.netSalary.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}
            </p>
          </div>
        )}

        {lastCalculation === "ICMS" && resultICMS && (
          <div className={styles.resultBox}>
            <p>Valor da Alíquota: R${resultICMS.rate}</p>
            <p>Alíquota: {resultICMS.ratePercent.toFixed(1)}%</p>
            <p>ICMS: {resultICMS.icms.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            <p>Valor Líquido: {resultICMS.valueWithoutICMS.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            <p>
              Tipo:{" "}
              {resultICMS.operation === "internal"
                ? "Operação Interna"
                : "Operação Interestadual"}
            </p>
          </div>
        )}

        {lastCalculation === "IPVA" && resultIPVA && (
          <div className={styles.resultBox}>
            <p>Valor do Veículo: R$ {resultIPVA.vehicleValue.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            <p>Alíquota: {resultIPVA.rate.toFixed(2)}%</p>
            <p>IPVA: {resultIPVA.ipva.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            <p>Valor Líquido: {resultIPVA.netValue.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            <p>Tipo de Veículo: {resultIPVA.vehicleType}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home