import puppeteer from "puppeteer";
import moment from "moment";
import esMain from "es-main";

const api_url = "https://cubingusa.org/async/state_rankings";

let browser, page;

// Browser and page for webscraping
async function openBrowser() {
    browser = await puppeteer.launch({headless: "new"})
    page = await browser.newPage();
}

// Closing browser after use
async function closeBrowser() {
    await browser.close();
}

/* Function to get the top 100 in a region for any particular event */
async function getRegionTop100(eventId, useAverage) {
    const getStateTop100 = async (stateId) => {
        await page.goto(`${api_url}/${eventId}/${stateId}/${useAverage}`, {
            waitUntil: "domcontentloaded"
        });
    
        const rankings = await page.evaluate(() => {
            const stateRanks = [];

            // fetching competitors from the divs with class "row"
            const rows = Array.from(document.querySelectorAll(".row"));

            // iterating through rows and getting person, rank, and time
            for(let i = 0; i < rows.length; i++) {
                const person_elem = rows[i].querySelector(".person-col").children[0];
                stateRanks.push({
                    person: person_elem.textContent.trim(),
                    rank: rows[i].querySelector(".rank-col").textContent.trim(),
                    time: rows[i].querySelector(".time-col").textContent.trim(),
                    link: person_elem.attributes.getNamedItem("href").value
                });
            };

            return stateRanks;
        });

        return rankings;
    };

    const cali_array = await getStateTop100("ca");
    const nevada_array = await getStateTop100("nv");
    const hawaii_array = await getStateTop100("hi");

    const region_array = [];

    // show top 100 people at most for rankings
    let total_people = Math.min(cali_array.length + nevada_array.length + hawaii_array.length, 100);
    let i = 0, j = 0, k = 0;

    for (let x = 0; x < total_people; x++) {
        let cali_time, nevada_time, hawaii_time;

        if (i < cali_array.length) {
            cali_time = getTimeFromString(cali_array[i].time);
        } else {
            cali_time = Infinity;
        }

        if (j < nevada_array.length) {
            nevada_time = getTimeFromString(nevada_array[j].time);
        } else {
            nevada_time = Infinity;
        }

        if (k < hawaii_array.length) {
            hawaii_time = getTimeFromString(hawaii_array[k].time);
        } else {
            hawaii_time = Infinity;
        }

        let entry = [x + 1];

        if (cali_time < nevada_time && cali_time < hawaii_time) {
            entry.push(cali_array[i].person, cali_array[i].time, "California", cali_array[i].link);
            i++;
        } else if (nevada_time < hawaii_time) {
            entry.push(nevada_array[j].person, nevada_array[j].time, "Nevada", nevada_array[j].link);
            j++;
        } else {
            entry.push(hawaii_array[k].person, hawaii_array[k].time, "Hawaii", hawaii_array[k].link);
            k++;
        }

        if (x > 0 && entry[2] === region_array[x - 1][2]) {
            entry[0] = region_array[x - 1][0];
        }

        region_array.push(entry);
    }

    // return array of rankings for west coast region
    return region_array;
};

function getTimeFromString(str) {
    let time = moment(str, "s.SS");
    return time.seconds() + (time.millisecond()/1000);
}

/* Only run this code if this module is called directly */
if (esMain(import.meta)) {
    await openBrowser();
    const result = await getRegionTop100("333", "0");
    console.log(result);
    await closeBrowser();
}

export default {getRegionTop100, openBrowser, closeBrowser};