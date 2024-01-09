interface SubtitleProps{
  text: string
}

const Subtitle = ({text} : SubtitleProps) => {
  return (
    <span className="mt-8 italic text-base text-zinc-500">{text}</span>
  )
}

export { Subtitle };