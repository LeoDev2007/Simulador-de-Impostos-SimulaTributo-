import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import styles from '../styles/Dialog.module.css'

const DialogText = () => {
  return (
    <Dialog.Root size="sm" scrollBehavior="outside">
      <Dialog.Trigger asChild>
        <p className={styles.trigger}>Saiba mais como calcular imposto</p>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Header>
              <Dialog.Title className={styles.dialogTitle}>
                Saiba como calcular o imposto
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <div className={styles.section}>
                <h2>INSS</h2>
                <p>
                  O INSS é calculado sobre o salário bruto com alíquotas
                  progressivas por faixa — cada faixa tem sua própria alíquota e
                  só a parcela do salário que cai naquela faixa é tributada por
                  ela. O resultado é a soma de todas as faixas.
                </p>
              </div>
              <div className={styles.section}>
                <h2>IR (Imposto de Renda)</h2>
                <p>
                  O IR é calculado sobre a base de cálculo, que é o salário
                  bruto menos o desconto do INSS e menos o abatimento por
                  dependentes (R$ 189,59 por dependente). Sobre essa base
                  aplicam-se alíquotas progressivas por faixa, igual ao INSS. Do
                  valor encontrado ainda se subtrai uma parcela dedutível de
                  cada faixa, chegando ao IR devido.
                </p>
              </div>

              <div className={styles.section}>
                <h2>
                  IPVA (Imposto sobre Propriedade de Veículos Automotores)
                </h2>
                <p>
                  O IPVA é calculado diretamente sobre o valor do veículo. Cada
                  estado define sua própria alíquota, que também varia conforme
                  o tipo do veículo (carro, moto, caminhão). O cálculo é
                  simples: valor do veículo × alíquota. O valor líquido é o
                  valor do veículo menos o IPVA.
                </p>
              </div>

              <div className={styles.section}>
                <h2>ICMS (Imposto sobre Circulação de Mercadorias e Serviços)</h2>
                <p>
                  O ICMS incide sobre o valor da mercadoria ou serviço. A
                  alíquota varia conforme o tipo de operação — operações
                  internas (dentro do mesmo estado) geralmente têm alíquota
                  maior do que operações interestaduais. O cálculo é valor da
                  mercadoria × alíquota, e o valor sem ICMS é obtido subtraindo
                  o imposto do valor original.
                </p>
              </div>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogText;
