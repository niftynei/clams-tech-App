import type { Auth } from '$lib/types'
import { logger } from '$lib/utils'
import CoreLn from './core-lightning'
export * from './core-lightning/types'

export type LnAPI = CoreLn
export type LnBackend = 'core_lightning'

export function initLn(options: { backend: LnBackend; auth: Auth }): LnAPI {
  const { backend, auth } = options

  switch (backend) {
    case 'core_lightning':
      return new CoreLn(auth, logger)
    default:
      throw new Error(`${backend} is not a valid backend`)
  }
}
