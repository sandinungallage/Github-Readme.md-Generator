import ReactMarkdown from 'react-markdown'

export default function Preview({ markdown }) {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
