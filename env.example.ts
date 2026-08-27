const prodUrl = 'https://<sua-instancia-feednews-next>.vercel.app/api'

const ENV = {
  dev: {
    apiUrl: 'http://<seu-ip-local>:3000/api',
    placeholder: true,
  },
  staging: {
    apiUrl: prodUrl,
    placeholder: false,
  },
  prod: {
    apiUrl: prodUrl,
    placeholder: false,
    debugRequests: true,
  },
}

// Copie este arquivo para `env.ts` (fora do controle de versão) e ajuste os valores acima.
export default { ...(__DEV__ ? ENV.dev : ENV.prod) }
