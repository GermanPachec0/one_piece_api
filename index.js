import { getPages , getChapters , getChaptersDetails } from "./inMangaClient.js";

import express, { json } from 'express' // require -> commonJS
import { corsMiddleware } from './middlewares/cors.js'
console.clear()

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/chapters', async (req, res) => {
    try {
        const chapters = await getChapters('89fcccde-30c5-485d-bc7a-8dd6c6b21612');
        res.json(chapters);
    } catch (error) {
        console.error('Error fetching chapters:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/chapter_details/:id', async (req, res) => {
    try {
        const id = req.params.id
        const chaptersFull = await getChaptersDetails(id)
        const dataChapter = { chapter: id, pages: chaptersFull }
        res.json(dataChapter);
    } catch (error) {
        console.error('Error fetching chapters:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT ?? 1234


app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
