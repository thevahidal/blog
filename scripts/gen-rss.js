const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'Vahid Al.',
    site_url: 'https://thevahidal.hoopoe.app',
    feed_url: 'https://thevahidal.hoopoe.app/feed.xml'
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'pages', 'posts'))

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return
      try {
        const content = await fs.readFile(
          path.join(__dirname, '..', 'pages', 'posts', name)
        )

        const frontmatter = matter(content)

        feed.item({
          title: frontmatter.data.title,
          url: '/posts/' + name.replace(/\.mdx?/, ''),
          date: frontmatter.data.date,
          description: frontmatter.data.description,
          categories: frontmatter.data.tag.split(', '),
          author: frontmatter.data.author
        })
      } catch (e) {
        console.error(e)
      }
    })
  )

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
