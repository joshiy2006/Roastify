export type Platform = 'spotify' | 'steam'

export interface StatRow {
  label: string
  value: string
  percent: number
}

export interface RoastResult {
  handle: string
  headline: string
  roast: string
  stats: StatRow[]
  badge: string
}

const STEAM_GAMES = [
  { name: 'Counter-Strike 2', hours: () => 200 + Math.random() * 1800 },
  { name: 'Stardew Valley', hours: () => 50 + Math.random() * 400 },
  { name: "Sid Meier's Civilization VI", hours: () => 30 + Math.random() * 600 },
  { name: 'Skyrim Special Edition', hours: () => 40 + Math.random() * 900 },
  { name: 'Among Us', hours: () => 10 + Math.random() * 150 },
  { name: 'Rocket League', hours: () => 80 + Math.random() * 500 },
  { name: 'Hollow Knight', hours: () => 15 + Math.random() * 60 },
  { name: 'Team Fortress 2', hours: () => 100 + Math.random() * 2000 },
  { name: 'Baldur’s Gate 3', hours: () => 40 + Math.random() * 300 },
  { name: 'Terraria', hours: () => 25 + Math.random() * 350 },
]

const SPOTIFY_ARTISTS = [
  'Ariana Grande',
  'Drake',
  'Taylor Swift',
  'The Weeknd',
  'Bad Bunny',
  'Billie Eilish',
  'Travis Scott',
  'Doja Cat',
  'SZA',
  'Kendrick Lamar',
  'Ice Spice',
  'Zach Bryan',
]

const SPOTIFY_GENRES = [
  'hyperpop',
  'bedroom pop',
  'sad girl indie',
  'phonk',
  'y2k pop-rap',
  'lo-fi study beats',
  'hyperspeed edm',
  'sigma sludge',
]

const STEAM_ROASTS = [
  'You put {hours} hours into {game}. At this point Valve should be paying YOU rent for how much you live there.',
  '{game} for {hours} hours? Your search history is probably just "how to have other hobbies."',
  'Nice library. Shame you only ever launch {game}. The other {gameCount} games are basically a digital haunted house.',
  'You have {hours} hours in {game}. Your character has seen more of the world than you have this year.',
  'Achievement unlocked: {hours} hours in {game}. Achievement locked forever: touching grass.',
  'Your Steam profile screams "main character," but the only thing you’re the main character of is {game}’s leaderboard nobody asked to see.',
]

const SPOTIFY_ROASTS = [
  'Your top artist is {artist}. Bold of you to have a personality that fits in one Spotify Wrapped slide.',
  '{percent}% {genre}? Explains a lot about the vibes in your group chat, none of it good.',
  'You’ve streamed {artist} enough that they probably know your Wi-Fi password by now.',
  'Your taste peaked somewhere between "{genre}" and whatever made you replay the same 5 songs on loop for a month.',
  'Congrats, your top genre is {genre}. Very brave of you to let that be public information.',
  '{artist} in your top 3? At least the algorithm is honest about your emotional damage.',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''))
}

export function generateRoast(platform: Platform, handle: string): RoastResult {
  if (platform === 'steam') {
    const shuffled = [...STEAM_GAMES].sort(() => Math.random() - 0.5).slice(0, 5)
    const rows = shuffled
      .map((g) => ({ name: g.name, hours: Math.round(g.hours()) }))
      .sort((a, b) => b.hours - a.hours)
    const top = rows[0]
    const max = top.hours

    return {
      handle,
      headline: 'YOUR STEAM LIBRARY, EXPOSED',
      roast: fill(pick(STEAM_ROASTS), {
        game: top.name,
        hours: top.hours.toLocaleString(),
        gameCount: rows.length - 1,
      }),
      badge: top.hours > 1000 ? 'cave dweller' : top.hours > 300 ? 'certified addict' : 'casual-ish',
      stats: rows.map((r) => ({
        label: r.name,
        value: `${r.hours.toLocaleString()} hrs`,
        percent: Math.max(8, Math.round((r.hours / max) * 100)),
      })),
    }
  }

  const artists = [...SPOTIFY_ARTISTS].sort(() => Math.random() - 0.5).slice(0, 5)
  const genres = [...SPOTIFY_GENRES].sort(() => Math.random() - 0.5).slice(0, 3)
  const weights = [38, 27, 19, 11, 5]
  const topArtist = artists[0]
  const topGenre = genres[0]

  return {
    handle,
    headline: 'YOUR TOP ARTISTS, ON TRIAL',
    roast: fill(pick(SPOTIFY_ROASTS), {
      artist: topArtist,
      genre: topGenre,
      percent: weights[0],
    }),
    badge: weights[0] > 35 ? 'one-track mind' : 'certified shuffler',
    stats: artists.map((name, i) => ({
      label: name,
      value: `${weights[i]}%`,
      percent: weights[i] * 2.4,
    })),
  }
}
