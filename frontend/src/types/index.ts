export interface AnalysisResponse {
    prediction: string
    probabilities: Map<String, number>
}