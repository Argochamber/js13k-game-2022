import { Game } from '../Game'
import { Island } from '../Island'
import { h, state } from '../ui'
import { genIslandAvatar } from './Islands'

type Props = { game: Game }

let s = null as Island | null
const avatar = state('')

export const Dashboard = ({ game }: Props) => {
  const island = new Island(game.selected[0], game.selected[1]).hydrate()
  if (s !== island) {
    genIslandAvatar(island).then(s => {
      if (avatar.value !== s.data) {
        avatar.value = s.data
      }
    })
  }
  return (
    <div>
      <div>
        <div>{island.name} overview</div>
        <div className="flex" style={{ paddingTop: '2rem' }}>
          <img
            className="sprite"
            style={{ marginTop: '2rem' }}
            src={avatar.value}
          />
          <div className="wide">
            <h4>Buildings</h4>
            <div>Headquarters: {island.buildings.hq}</div>
            <div>Resurrection Altar: {island.buildings.altar}</div>
            <div>Soul Gate: {island.buildings.soulgate}</div>
            <div>Ritual Mound: {island.buildings.ritual}</div>
            <div>Tartarus Gate: {island.buildings.tartarus}</div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}
