import { useState } from "react";
import { Input, Field } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { type StateBR } from "../utils/ICMS";
import { useICMS } from "../contexts/ICMSContext";

type formData = {
  merchandiseValue: string;
  originState: StateBR;
  estadoDestino?: StateBR;
};

const STATES: StateBR[] = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO",
  "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR",
  "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const FormICMS = () => {
  const { calculateICMS, saveResultICMS } = useICMS();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const [originState, setOriginState] = useState<StateBR>("SP");
  const [destinationState, setDestinationstate] = useState<StateBR>("SP");
  const [interstate, setInterstate] = useState(false);

  const onSubmit = (data: formData) => {
    const merchandiseValue = parseFloat(data.merchandiseValue.replace(",", "."));

    const resultado = calculateICMS({
      merchandiseValue,
      originState,
      destinationState: interstate ? destinationState : undefined,
    });

    saveResultICMS(resultado);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field.Root invalid={!!errors.merchandiseValue}>
            <Field.Label className={styles.label}>Valor da Mercadoria</Field.Label>
            <Input
              variant="outline"
              placeholder="Ex: 1000,00"
              className={styles.input}
              {...register("merchandiseValue", {
                required: "O valor da mercadoria deve ser inserido",
                pattern: {
                  value: /^\d{1,7}([.,]\d{0,2})?$/,
                  message: "Insira um valor válido!",
                },
              })}
            />
            <Field.ErrorText>{errors.merchandiseValue?.message}</Field.ErrorText>
          </Field.Root>
        </div>

        <div className={styles.selectDiv}>
          <label className={styles.label}>Estado de Origem</label>
          <select
            value={originState}
            onChange={(e) => setOriginState(e.target.value as StateBR)}
            className={styles.select}
          >
            {STATES.map((acronym) => (
              <option key={acronym} value={acronym}>{acronym}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={interstate}
              onChange={(e) => setInterstate(e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            Operação interestadual
          </label>
        </div>

        {interstate && (
          <div className={styles.selectDiv}>
            <label className={styles.label}>Estado de Destino</label>
            <select
              value={destinationState}
              onChange={(e) => setDestinationstate(e.target.value as StateBR)}
              className={styles.select}
            >
              {STATES.map((acronym) => (
                <option key={acronym} value={acronym}>{acronym}</option>
              ))}
            </select>
          </div>
        )}

        <button className={styles.button} type="submit">
          Calcular
        </button>
      </form>
    </div>
  );
};

export default FormICMS;