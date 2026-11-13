const paths = {
  'up-right': 'M5 19 19 5M5 5h14v14',
  down: 'M12 3v18m-7-7 7 7 7-7',
  up: 'M12 21V3m-7 7 7-7 7 7',
  left: 'M21 12H3m7-7-7 7 7 7',
}

export default function ArrowIcon({ direction = 'up-right' }: { direction?: keyof typeof paths }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
      <path d={paths[direction]} />
    </svg>
  )
}
