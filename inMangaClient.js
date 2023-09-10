import cheerio from 'cheerio';
import axios from 'axios';

export const getChapters = (id) => {
    return new Promise((resolve, reject) => {
        axios.get('https://inmanga.com/chapter/chapterIndexControls?identification=' + id, {
        headers: {
        'Content-Type': 'text/html',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

        }})
        .then(response => {
                const $ = cheerio.load(response.data);
                const options = $('.ChapterListClass option');
                const result = [];

                options.each((index, option) => {
                    result.push({
                        value: $(option).attr('value'),
                        text: $(option).text(),
                    });
                });
                resolve(result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                reject(error);
            });
    });
}

export const getChaptersDetails = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get('https://inmanga.com/chapter/chapterIndexControls?identification=' + id)
            .then(response => {
                const $ = cheerio.load(response.data);
                const selectElements = $('.PageListClass');

                const options = $(selectElements[0]).find('option');
                const pages = [];
                options.each((index, option) => {
                    let page = $(option).text();
                    let value = $(option).attr('value')
                    pages.push({
                        value: page,
                        page: value,
                        img: `https://pack-yak.intomanga.com/images/manga/One-Piece/chapter/1047/page/${page}/${value}`

                    });
                });

                resolve(pages);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                reject(error);
            });
    });
}

export const getPages = async () => {
    try {
        const chapters = await getChapters('89fcccde-30c5-485d-bc7a-8dd6c6b21612');
        const chaptersFull = await getChaptersDetails('89fcccde-30c5-485d-bc7a-8dd6c6b21612')
        const dataChapter = { chapter: chapters[0].value, page: chapters[0].text , pages: chaptersFull }
    } catch (error) {
        console.error('Error in getPages:', error);
    }
}
