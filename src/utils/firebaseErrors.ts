export const extractFirebaseErrorCode = (errorMessage: string | null | undefined): string => {
  if (!errorMessage) return ''
  
  const match = errorMessage.match(/\(([^)]+)\)/)
  if (match && match[1]) {
    return match[1]
  }
  
  if (errorMessage.startsWith('auth/')) {
    return errorMessage
  }
  
  return errorMessage
}

const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'Este email já está cadastrado. Tente fazer login ou use outro email.',
  'auth/invalid-email': 'Email inválido. Verifique o formato do email.',
  'auth/weak-password': 'Senha muito fraca. Use no mínimo 6 caracteres.',
  'auth/user-not-found': 'Usuário não encontrado. Verifique o email ou cadastre-se.',
  'auth/wrong-password': 'Senha incorreta. Tente novamente.',
  'auth/invalid-credential': 'Credenciais inválidas. Verifique seu email e senha.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
  'auth/user-disabled': 'Esta conta foi desabilitada. Entre em contato com o suporte.',
  'auth/operation-not-allowed': 'Operação não permitida.',
}


export const getFirebaseErrorMessage = (error: string | null | undefined): string => {
  if (!error) return 'Ocorreu um erro. Tente novamente.'
  
  const errorCode = extractFirebaseErrorCode(error)
  const friendlyMessage = firebaseErrorMessages[errorCode]
  
  return friendlyMessage || `Erro: ${errorCode || error}`
}

