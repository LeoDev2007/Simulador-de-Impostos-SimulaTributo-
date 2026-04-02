import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts"
import styles from "../styles/Charts.module.css"
import { useHistory } from "../contexts/HistoryContext"

const Charts = () => {
  const { history } = useHistory()

  if (history.length === 0) {
    return (
      <div className={styles.container}>
        <p>Nenhum dado encontrado.</p>
      </div>
    )
  }

  const last = history[0]

  const getData = () => {
    if (last.type === "IR") {
      return [
        { name: "IR", value: last.ir, fill: "#120a8f" },
        { name: "INSS", value: last.inss, fill: "#C81616" },
        { name: "Salário Líquido", value: last.netSalary, fill: "#444444" },
      ]
    }

    if (last.type === "ICMS") {
      return [
        { name: "ICMS", value: last.icms, fill: "#120a8f" },
        { name: "Valor sem ICMS", value: last.valueWithoutICMS, fill: "#444444" },
      ]
    }

    if (last.type === "IPVA") {
      return [
        { name: "IPVA", value: last.ipva, fill: "#120a8f" },
        { name: "Valor Líquido", value: last.netValue, fill: "#444444" },
      ]
    }

    return []
  }

  const data = getData()

  const isSmall = window.innerWidth < 480
  const fontSize = isSmall ? 9 : 12
  const radius = isSmall ? 130 : 180

  return (
    <div className={styles.container}>
      <div className={styles.charts}>
        <ResponsiveContainer width="100%" height={450}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={radius}
              label={
                isSmall
                  ? false
                  : ({ name, percent, x, y, textAnchor }) => (
                      <text
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        fill="#444"
                        fontSize={fontSize}
                      >
                        {`${name}: ${(percent! * 100).toFixed(1)}%`}
                      </text>
                    )
              }
              labelLine={!isSmall}
            />
            <Tooltip
              formatter={(value, name) => {
                const total = data.reduce((acc, item) => acc + item.value, 0)
                const percent = ((Number(value) / total) * 100).toFixed(1)
                return isSmall
                  ? [`R$ ${Number(value).toFixed(2)} (${percent}%)`, name]
                  : [`R$ ${Number(value).toFixed(2)}`, name]
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p>Gráfico — {last.type}</p>
      </div>
    </div>
  )
}

export default Charts