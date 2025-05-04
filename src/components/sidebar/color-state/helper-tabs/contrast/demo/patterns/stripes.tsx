type Props = {
  foregroundColor?: string
  backgroundColor?: string
}

export default function Stripes({
  foregroundColor = "#000000",
  backgroundColor = "#FFFFFF",
}: Props) {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      className="**:transition-colors **:duration-300"
    >
      <defs>
        <pattern id="bg" patternUnits="userSpaceOnUse" width="40" height="40">
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="diagonal-stripes" fill={foregroundColor}>
              <polygon id="Path-2" points="0 40 40 0 20 0 0 20"></polygon>
              <polygon id="Path-2-Copy" points="40 40 40 20 20 40"></polygon>
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={backgroundColor} />
      <rect width="100%" height="100%" fill="url(#bg)" />
    </svg>
  )
}
