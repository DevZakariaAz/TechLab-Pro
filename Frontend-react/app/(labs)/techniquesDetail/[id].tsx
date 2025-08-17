import { useLocalSearchParams } from "expo-router"
import TechniquesDetail from "../techniquesDetail";

export default function TechniqueDetailPage() {
  const { id } = useLocalSearchParams()

  return <TechniquesDetail techniqueId={id as string} />
}
