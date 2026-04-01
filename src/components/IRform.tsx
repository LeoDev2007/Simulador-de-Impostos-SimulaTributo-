
import { Input, Field } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useIR } from "../contexts/IRContext"
import styles from "../styles/Form.module.css"

type FormData = {
  salary: number
  dependents?: number
}

const IRForm = () => {
  const { calculateIR, saveResult } = useIR()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function onSubmit(data: FormData) {
    const result = calculateIR({
      salary: Number(data.salary),
      dependents: Number(data.dependents) || 0,
    })

    saveResult(result)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <Field.Root invalid={!!errors.salary}>
            <Field.Label className={styles.label}>Salário</Field.Label>
            <Input
              variant="outline"
              placeholder="Salário"
              className={styles.input}
              {...register("salary", {
                required: "O salário deve ser inserido",
                pattern: {
                  value: /^\d{1,7}([.,]\d{0,2})?$/,
                  message: "Insira um valor válido!",
                },
              })}
            />
            <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
          </Field.Root>
        </div>
        <div>
          <Field.Root invalid={!!errors.dependents}>
            <Field.Label className={styles.label}>Dependentes</Field.Label>
            <Input
              variant="outline"
              className={styles.input}
              placeholder="Dependentes (Opcional)"
              {...register("dependents", {
                pattern: {
                  value: /^(100|[1-9]?\d)$/,
                  message: "Insira um valor válido!",
                },
              })}
            />
            <Field.ErrorText>{errors.dependents?.message}</Field.ErrorText>
          </Field.Root>
        </div>

        <button className={styles.button} type="submit">Calcular</button>
      </form>
    </div>
  )
}

export default IRForm