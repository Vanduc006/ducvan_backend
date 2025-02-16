import markdownit from 'markdown-it'


export function MarkdownRespone(respone, callback) {
    const md = markdownit()
    const result = md.renderInline(respone);
    callback(result)
}
