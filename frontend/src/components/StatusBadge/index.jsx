import styles from './StatusBadge.module.scss'

const CONFIG_STATUS = {
  em_casa: { label: 'Em Casa', classe: 'emCasa' },
  resgatada: { label: 'Resgatada', classe: 'resgatada' },
  em_abrigo: { label: 'Em Abrigo', classe: 'emAbrigo' },
  nao_localizada: { label: 'Não Localizada', classe: 'naoLocalizada' },
}

const StatusBadge = ({ status }) => {
  const config = CONFIG_STATUS[status] || { label: status, classe: 'padrao' }

  return (
    <span className={`${styles.badge} ${styles[config.classe]}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge