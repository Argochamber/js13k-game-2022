import { ReactNode } from 'react'
import { state } from './ui'

export const toast = state<null | ReactNode>(null)

let lastTimer: NodeJS.Timeout | null = null

export const msg = (what: string) =>
  new Promise<void>(r => {
    toast.value = what
    if (lastTimer != null) {
      clearTimeout(lastTimer)
    }
    lastTimer = setTimeout(() => {
      toast.value = null
      lastTimer = null
      r()
    }, 2000)
  })
