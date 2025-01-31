interface Props {
  section: number
}

export default function LineDetails({ section }: Props) {
  return <dialog>{section}</dialog>
}
