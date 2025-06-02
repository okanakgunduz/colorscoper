import useMediaQuery from "./useMediaQuery"

export default function usePrinting(): boolean {
  const printing = useMediaQuery("only print")
  return printing
}
