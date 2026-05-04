import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function Preview({ markdown }) {
  return (
    <div>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
    </div>
  )
}
