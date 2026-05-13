const TechCard = (props) => {
  return (
    <span className="rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
      {props.children}
    </span>
  )
}

export default TechCard
