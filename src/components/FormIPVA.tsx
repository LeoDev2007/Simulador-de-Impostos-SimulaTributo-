import { useState } from "react"
import { Input, Field } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import styles from "../styles/Form.module.css"
import { type StateBR, type VehicleType } from "../utils/IPVA"
import { useIPVA } from "../contexts/IPVAContext"

type FormData = {
  vehicleValue: string
  vehicleType: VehicleType
  state: StateBR
}

const STATES: StateBR[] = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
]

const VEHICLE_TYPES: VehicleType[] = ["car", "motorcycle", "truck", "bus"]

const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  car: "Carro",
  motorcycle: "Moto",
  truck: "Caminhão",
  bus: "Ônibus",
}

const FormIPVA = () => {
  const { calculateIPVA, saveResultIPVA } = useIPVA()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [originState, setOriginState] = useState<StateBR>("SP")
  const [vehicleType, setVehicleType] = useState<VehicleType>("car")

  const onSubmit = (data: FormData) => {
    const vehicleValue = parseFloat(data.vehicleValue.replace(",", "."))

    const result = calculateIPVA({
      vehicleValue,
      originState,
      vehicleType,
    })

    saveResultIPVA(result)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field.Root invalid={!!errors.vehicleValue}>
            <Field.Label className={styles.label}>Valor do Veículo</Field.Label>
            <Input
              variant="outline"
              placeholder="Ex: 1000,00"
              className={styles.input}
              {...register("vehicleValue", {
                required: "O valor do veículo deve ser inserido",
                pattern: {
                  value: /^\d{1,7}([.,]\d{0,2})?$/,
                  message: "Insira um valor válido!",
                },
              })}
            />
            <Field.ErrorText>{errors.vehicleValue?.message}</Field.ErrorText>
          </Field.Root>
        </div>

        <div className={styles.selectDiv}>
          <label className={styles.label}>Estado de Origem</label>
          <select
            value={originState}
            onChange={(e) => setOriginState(e.target.value as StateBR)}
            className={styles.select}
          >
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectDiv}>
          <label className={styles.label}>Tipo do Veículo</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
            className={styles.select}
          >
            {VEHICLE_TYPES.map((type) => (
              <option key={type} value={type}>
                {VEHICLE_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.button} type="submit">
          Calcular
        </button>
      </form>
    </div>
  )
}

export default FormIPVA