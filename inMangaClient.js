import cheerio from 'cheerio';
import axios from 'axios';

export const getChapters = (id) => {
    return new Promise((resolve, reject) => {
        axios.get('https://inmanga.com/chapter/chapterIndexControls?identification=' + id, {
        headers: {
        'Content-Type': 'text/html',
        }})
        .then(response => {
                const $ = cheerio.load(response.data);
                const selectElements = $('.ChapterListClass');
                const options = $(selectElements[0]).find('option');
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
                // Handle errors here
                if (error.response) {
                // The request was made, but the server responded with an error status
                console.error(`Status: ${error.response.status}`);
                console.error(`Data: ${error.response.data}`);
                } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server');
                } else {
                // Something else went wrong
                console.error(`Error: ${error.message}`);
            }});
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
