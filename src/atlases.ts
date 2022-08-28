import { Atlas } from './sprites'

export const palettes = {
  dark: 'PThG/15cZP//////AAAA/z04Rv8kHzH/JB8x/5qZlv8=',
  soul: 'JqJp/zPRev+P8KT/0//E/zPRev8z0Xr/M9F6/4/wpP8=',
  ice: 'HHHY/zWE5P+ZwfH//////5nB8f+ZwfH/mcHx/5nB8f8=',
  bone: '5N3U/7qyp/9hW1L/CQkJ/+Td1P8AAAD/urKn//////8=',
  flesh: '9mFR/+0zO//gGyT/wBwo/6UdLf+lHS3/pR0t/+0zO/8=',
}

export const spr: Promise<Record<keyof typeof palettes, Atlas>> = (async () => {
  const spr: Record<keyof typeof palettes, Atlas> = {} as any
  for (const [k, v] of Object.entries(palettes)) {
    ;(spr as any)[k] = await Atlas.from('sprites.png', [16, 16])
      .then(s => s.colored(v))
      .then(s => s.scaled(4, 4))
      .then(s => s.noised(0.1))
  }
  return spr
})()
